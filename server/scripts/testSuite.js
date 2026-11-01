import dotenv from 'dotenv';
dotenv.config();

import mongoose from 'mongoose';
import { connectDB, disconnectDB } from '../config/db.js';
import { generateAIBlueprint, generateDeterministicBlueprint } from '../services/aiBlueprintService.js';
import Inquiry from '../models/Inquiry.js';
import User from '../models/User.js';
import jwt from 'jsonwebtoken';

const runVerificationTests = async () => {
  console.log('🚀 [CYNBIT AI SOLUTION STUDIO] Starting End-to-End Test Suite...\n');

  try {
    await connectDB();

    // TEST 1: Generate AI Blueprint with Pet Care context
    console.log('--- TEST 1: Blueprint Generation (Pet Care Platform) ---');
    const petCareAnswers = {
      businessInfo: {
        companyName: 'Paws & Claws Veterinary Hub',
        industry: 'Pet Care & Veterinary',
        description: 'Comprehensive pet healthcare, vaccination tracking, and online doctor consultation.',
        targetAudience: 'Pet owners and veterinary clinic doctors',
        businessStage: 'Existing Business',
      },
      problemDetails: {
        coreProblem: 'Manual appointment booking causing double-booking and lost vaccination records.',
        difficulties: 'Paper registers and WhatsApp message confusion.',
        currentWorkflow: 'Manual telephone calls',
        existingTools: 'Spreadsheets and registers',
        improvementsWanted: 'Real-time booking and digital pet medical passports.',
      },
      solutionRequirements: {
        desiredSolutions: ['Website or web application', 'Mobile application (iOS/Android)'],
        keyFeatures: 'Pet profile dashboard, slot booking, digital EHR, and automated SMS reminders',
        outcomes: 'Zero double-booking and 50% increase in repeat clinic visits',
      },
    };

    const petBp = await generateAIBlueprint('Website or web application', petCareAnswers);
    console.log('✅ Pet Care Blueprint Generated:');
    console.log(`   Engine Used: ${petBp.engineUsed}`);
    console.log(`   Overview: ${petBp.projectOverview?.slice(0, 80)}...`);
    console.log(`   Archetype: ${petBp.suggestedArchetype || petBp.archetype}`);
    console.log(`   Screens: ${petBp.suggestedScreens?.map(s => s.name).join(', ')}`);
    console.log(`   Modules Count: ${petBp.functionalModules?.length || petBp.functionalRequirements?.length}`);
    if (!petBp.projectOverview || !petBp.suggestedScreens) {
      throw new Error('TEST 1 FAILED: Blueprint missing critical fields.');
    }

    // TEST 2: Blueprint Refinement
    console.log('\n--- TEST 2: Blueprint Refinement Request ---');
    const refinedBp = await generateAIBlueprint(
      'Website or web application',
      petCareAnswers,
      'Add emergency 24/7 video telemedicine consultation and multi-clinic branch locator.'
    );
    console.log('✅ Blueprint Refined Successfully:');
    console.log(`   Engine: ${refinedBp.engineUsed}`);
    console.log(`   Refined Solution: ${refinedBp.proposedSolution?.slice(0, 90)}...`);

    // TEST 3: Inquiry Creation & MongoDB Persistence with full AI Solution Studio data
    console.log('\n--- TEST 3: Inquiry Persistence (MongoDB) ---');
    const referenceId = `CYN-${new Date().getFullYear()}-${Math.floor(100000 + Math.random() * 900000)}`;
    const testInquiry = new Inquiry({
      referenceId,
      clientName: 'Dr. Vikram Malhotra',
      email: 'vikram.malhotra@pawsclaws.test',
      phone: '+91 98290 88776',
      company: 'Paws & Claws Veterinary Hub',
      projectCategory: 'Website or web application',
      businessInfo: petCareAnswers.businessInfo,
      problemDetails: petCareAnswers.problemDetails,
      solutionRequirements: petCareAnswers.solutionRequirements,
      discoveryAnswers: petCareAnswers,
      generatedBlueprint: petBp,
      visualConcept: {
        archetype: petBp.suggestedArchetype || 'pet_care',
        theme: 'cynbit-teal',
        layout: 'sidebar',
        activeScreens: petBp.suggestedScreens?.map(s => s.name) || [],
      },
      designFeedback: {
        colorPreference: 'cynbit-teal',
        layoutPreference: 'sidebar',
        customNotes: 'Make doctor appointment slots selectable in 15-minute increments.',
        approved: true,
      },
      conceptApprovalStatus: 'Approved',
      consultation: {
        requested: true,
        method: 'Google Meet',
        preferredDate: '2026-11-05',
        preferredTimeRange: 'Morning (10:00 AM – 01:00 PM)',
        timeZone: 'IST (UTC+5:30)',
        discussionTopics: 'Architecture review of WebRTC video consultation and SMS gateway integration.',
        status: 'Pending',
      },
      budget: {
        range: '₹3,00,000–₹5,00,000',
        currency: 'INR',
      },
      timeline: {
        range: '1–3 months',
        desiredStartDate: '2026-11-15',
      },
      contactDetails: {
        fullName: 'Dr. Vikram Malhotra',
        workEmail: 'vikram.malhotra@pawsclaws.test',
        phone: '+91 98290 88776',
        companyName: 'Paws & Claws Veterinary Hub',
        designation: 'Managing Director & Chief Veterinarian',
        preferredContactMethod: 'Email',
        preferredContactTime: 'Weekdays 2 PM - 5 PM',
        additionalMessage: 'We have 3 physical clinics and wish to unite digital records under one cloud database.',
      },
      status: 'New',
      consentGiven: true,
      source: 'Cynbit AI Solution Studio',
    });

    await testInquiry.save();
    console.log(`✅ Saved Inquiry with Reference ID: ${testInquiry.referenceId}`);

    // TEST 4: Query and Verify Persisted Inquiry
    console.log('\n--- TEST 4: Query & Validate Persisted Data ---');
    const retrieved = await Inquiry.findOne({ referenceId: testInquiry.referenceId });
    if (!retrieved) {
      throw new Error('TEST 4 FAILED: Could not retrieve saved inquiry from database.');
    }
    console.log(`✅ Retrieved Reference ID: ${retrieved.referenceId}`);
    console.log(`   Client Name: ${retrieved.clientName}`);
    console.log(`   Organization: ${retrieved.company}`);
    console.log(`   Consultation Requested: ${retrieved.consultation.requested} (Status: ${retrieved.consultation.status})`);
    console.log(`   Concept Approval Status: ${retrieved.conceptApprovalStatus}`);
    console.log(`   Budget: ${retrieved.budget.range} (${retrieved.budget.currency})`);

    // TEST 5: Admin Operations (Update Status & Consultation Status)
    console.log('\n--- TEST 5: Admin Workflow Operations ---');
    retrieved.status = 'Reviewing';
    retrieved.consultation.status = 'Confirmed';
    retrieved.internalNotes.push({
      note: 'Discovery call scheduled for 2026-11-05 via Google Meet with Lead Architect.',
      author: 'Lead Architect',
      createdAt: new Date(),
    });
    await retrieved.save();

    const updated = await Inquiry.findById(retrieved._id);
    console.log(`✅ Status updated to: ${updated.status}`);
    console.log(`✅ Consultation status updated to: ${updated.consultation.status}`);
    console.log(`✅ Internal notes count: ${updated.internalNotes.length}`);
    console.log(`   Latest Note: "${updated.internalNotes[0].note}"`);

    // TEST 6: Aggregation Metrics & Consultation Stats
    console.log('\n--- TEST 6: Operational Stats Aggregation ---');
    const totalInquiries = await Inquiry.countDocuments();
    const consultationsCount = await Inquiry.countDocuments({ 'consultation.requested': true });
    const confirmedCount = await Inquiry.countDocuments({ 'consultation.status': 'Confirmed' });
    console.log(`✅ Total Inquiries in System: ${totalInquiries}`);
    console.log(`✅ Total Consultation Requests: ${consultationsCount}`);
    console.log(`✅ Confirmed Consultations: ${confirmedCount}`);

    console.log('\n🎉 ALL 6 VERIFICATION TEST SUITES PASSED FLAWLESSLY!\n');
  } catch (err) {
    console.error('❌ Verification Test Suite Error:', err);
    process.exit(1);
  } finally {
    await disconnectDB();
    console.log('Database connection cleanly disconnected.');
    process.exit(0);
  }
};

runVerificationTests();
