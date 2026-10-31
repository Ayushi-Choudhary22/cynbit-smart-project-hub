import Inquiry from '../models/Inquiry.js';
import { z } from 'zod';

export const getInquiryStats = async (req, res) => {
  try {
    const total = await Inquiry.countDocuments();
    const newCount = await Inquiry.countDocuments({ status: 'New' });
    const reviewingCount = await Inquiry.countDocuments({ status: 'Reviewing' });
    const clarificationCount = await Inquiry.countDocuments({ status: 'Clarification Required' });
    const qualifiedCount = await Inquiry.countDocuments({ status: 'Qualified' });
    const closedCount = await Inquiry.countDocuments({ status: 'Closed' });

    return res.status(200).json({
      success: true,
      data: {
        stats: {
          total,
          byStatus: {
            New: newCount,
            Reviewing: reviewingCount,
            'Clarification Required': clarificationCount,
            Qualified: qualifiedCount,
            Closed: closedCount,
          },
        },
        total,
        new: newCount,
        reviewing: reviewingCount,
        clarificationRequired: clarificationCount,
        qualified: qualifiedCount,
        closed: closedCount,
      },
    });
  } catch (err) {
    console.error('Error fetching inquiry stats:', err);
    return res.status(500).json({
      success: false,
      message: 'Failed to retrieve inquiry statistics.',
      error: err.message,
    });
  }
};

export const getInquiries = async (req, res) => {
  try {
    const { status, category, search, page = 1, limit = 20 } = req.query;

    const query = {};

    if (status && status !== 'all') {
      query.status = status;
    }

    if (category && category !== 'all') {
      query.projectCategory = category;
    }

    if (search && search.trim() !== '') {
      const searchRegex = new RegExp(search.trim(), 'i');
      query.$or = [
        { referenceId: searchRegex },
        { clientName: searchRegex },
        { email: searchRegex },
        { company: searchRegex },
      ];
    }

    const pageNum = parseInt(page, 10);
    const limitNum = parseInt(limit, 10);
    const skip = (pageNum - 1) * limitNum;

    const totalCount = await Inquiry.countDocuments(query);
    const rawInquiries = await Inquiry.find(query)
      .sort({ createdAt: -1 })
      .skip(skip)
      .limit(limitNum)
      .select('-discoveryAnswers -generatedBlueprint -editedBlueprint');

    const inquiries = rawInquiries.map(inq => {
      const obj = inq.toObject();
      return {
        ...obj,
        name: obj.clientName,
        category: obj.projectCategory,
      };
    });

    return res.status(200).json({
      success: true,
      data: {
        inquiries,
        pagination: {
          total: totalCount,
          page: pageNum,
          limit: limitNum,
          totalPages: Math.ceil(totalCount / limitNum),
        },
      },
    });
  } catch (err) {
    console.error('Error fetching inquiries:', err);
    return res.status(500).json({
      success: false,
      message: 'Failed to retrieve inquiries.',
      error: err.message,
    });
  }
};

export const getInquiryById = async (req, res) => {
  try {
    const { id } = req.params;
    const inquiry = await Inquiry.findById(id);

    if (!inquiry) {
      return res.status(404).json({
        success: false,
        message: 'Inquiry not found.',
      });
    }

    const obj = inquiry.toObject();
    const formatted = {
      ...obj,
      name: obj.clientName,
      category: obj.projectCategory,
      answers: obj.discoveryAnswers,
      blueprint: obj.editedBlueprint || obj.generatedBlueprint,
    };

    return res.status(200).json({
      success: true,
      data: {
        inquiry: formatted,
        ...formatted,
      },
    });
  } catch (err) {
    console.error('Error fetching inquiry detail:', err);
    return res.status(500).json({
      success: false,
      message: 'Failed to retrieve inquiry details.',
      error: err.message,
    });
  }
};

const updateStatusSchema = z.object({
  status: z.enum(['New', 'Reviewing', 'Clarification Required', 'Qualified', 'Closed']),
});

export const updateInquiryStatus = async (req, res) => {
  try {
    const { id } = req.params;
    const parseResult = updateStatusSchema.safeParse(req.body);

    if (!parseResult.success) {
      return res.status(400).json({
        success: false,
        message: 'Invalid status provided.',
        errors: parseResult.error.errors,
      });
    }

    const { status } = parseResult.data;

    const updated = await Inquiry.findByIdAndUpdate(
      id,
      { status },
      { new: true, runValidators: true }
    );

    if (!updated) {
      return res.status(404).json({
        success: false,
        message: 'Inquiry not found.',
      });
    }

    const obj = updated.toObject();
    const formatted = {
      ...obj,
      name: obj.clientName,
      category: obj.projectCategory,
      answers: obj.discoveryAnswers,
      blueprint: obj.editedBlueprint || obj.generatedBlueprint,
    };

    return res.status(200).json({
      success: true,
      message: `Inquiry status updated to ${status}.`,
      data: {
        inquiry: formatted,
        ...formatted,
      },
    });
  } catch (err) {
    console.error('Error updating status:', err);
    return res.status(500).json({
      success: false,
      message: 'Failed to update inquiry status.',
      error: err.message,
    });
  }
};

const addNoteSchema = z.object({
  note: z.string().min(1, 'Note cannot be empty'),
});

export const addInternalNote = async (req, res) => {
  try {
    const { id } = req.params;
    const parseResult = addNoteSchema.safeParse(req.body);

    if (!parseResult.success) {
      return res.status(400).json({
        success: false,
        message: 'Note content is required.',
        errors: parseResult.error.errors,
      });
    }

    const { note } = parseResult.data;
    const author = req.user?.name || 'Admin';

    const inquiry = await Inquiry.findById(id);
    if (!inquiry) {
      return res.status(404).json({
        success: false,
        message: 'Inquiry not found.',
      });
    }

    inquiry.internalNotes.push({ note, author, createdAt: new Date() });
    await inquiry.save();

    const obj = inquiry.toObject();
    const formatted = {
      ...obj,
      name: obj.clientName,
      category: obj.projectCategory,
      answers: obj.discoveryAnswers,
      blueprint: obj.editedBlueprint || obj.generatedBlueprint,
    };

    return res.status(200).json({
      success: true,
      message: 'Internal note added successfully.',
      data: {
        inquiry: formatted,
        ...formatted,
      },
    });
  } catch (err) {
    console.error('Error adding internal note:', err);
    return res.status(500).json({
      success: false,
      message: 'Failed to add internal note.',
      error: err.message,
    });
  }
};
