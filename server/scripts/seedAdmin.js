import dotenv from 'dotenv';
dotenv.config();

import crypto from 'crypto';
import { connectDB } from '../config/db.js';
import User from '../models/User.js';
import Inquiry from '../models/Inquiry.js';

export const seedDatabase = async () => {
  try {
    const adminEmail = process.env.ADMIN_EMAIL || 'admin@cynbit.in';
    let adminPassword = process.env.ADMIN_PASSWORD;

    const existingAdmin = await User.findOne({ email: adminEmail.toLowerCase() });

    if (!existingAdmin) {
      if (!adminPassword || adminPassword.trim() === '') {
        adminPassword = crypto.randomBytes(8).toString('hex') + '!A1';
        console.log(`⚠️ [SECURITY] No ADMIN_PASSWORD provided in environment.`);
        console.log(`🔑 Generated one-time secure admin password: ${adminPassword}`);
        console.log(`💡 Set ADMIN_EMAIL and ADMIN_PASSWORD in your server/.env file for persistent credentials.`);
      }

      console.log(`Seeding initial administrator account (${adminEmail})...`);
      const newAdmin = new User({
        name: 'Assessment Administrator',
        email: adminEmail.toLowerCase(),
        password: adminPassword,
        role: 'superadmin',
      });
      await newAdmin.save();
      console.log(`✅ Administrator account initialized securely for: ${adminEmail}`);
    } else {
      if (adminPassword && adminPassword.trim() !== '') {
        existingAdmin.password = adminPassword;
        await existingAdmin.save();
        console.log(`✅ Administrator password updated from environment for: ${adminEmail}`);
      } else {
        console.log(`Administrator account (${adminEmail}) verified in database.`);
      }
    }

    // Seed or synchronize evaluator demo account in the active database instance
    const evaluatorEmail = (process.env.EVALUATOR_EMAIL || 'evaluator@cynbit.test').toLowerCase();
    let evaluatorPassword = process.env.EVALUATOR_PASSWORD;

    let existingEvaluator = await User.findOne({ email: evaluatorEmail });
    if (!existingEvaluator) {
      if (!evaluatorPassword || evaluatorPassword.trim() === '') {
        evaluatorPassword = crypto.randomBytes(8).toString('hex') + '!E1';
        console.log(`\n=======================================================`);
        console.log(`🔐 Evaluator Demo Account Initialized (Active Database)`);
        console.log(`   Email:    ${evaluatorEmail}`);
        console.log(`   Password: ${evaluatorPassword}`);
        console.log(`   Role:     evaluator (Restricted assessment access)`);
        console.log(`=======================================================\n`);
      }
      const newEvaluator = new User({
        name: 'Technical Assessment Evaluator',
        email: evaluatorEmail,
        password: evaluatorPassword,
        role: 'evaluator',
      });
      await newEvaluator.save();
    } else {
      if (evaluatorPassword && evaluatorPassword.trim() !== '') {
        existingEvaluator.password = evaluatorPassword;
        existingEvaluator.role = 'evaluator';
        await existingEvaluator.save();
        console.log(`✅ Evaluator password updated from environment for: ${evaluatorEmail}`);
      } else {
        console.log(`Evaluator account (${evaluatorEmail}) verified in active database.`);
      }
    }

    // Seed realistic sample inquiries if database is empty (clearly labeled as demonstration data)
    const count = await Inquiry.countDocuments();
    if (count === 0) {
      console.log('Seeding initial demonstration inquiries (clearly marked as synthetic test leads)...');
      const sampleInquiries = [
        {
          referenceId: 'CYN-2026-849102',
          clientName: 'Rahul Mehra [Demo Lead]',
          email: 'rahul.mehra.demo@finscale.test',
          phone: '+91 98201 44210',
          company: 'FinScale Payments (Synthetic Demo)',
          projectCategory: 'Automate a business process using AI',
          discoveryAnswers: {
            businessProcess: 'Merchant KYC and document fraud verification',
            currentSystem: 'Manual compliance team reviewing PDF scans and bank statements',
            toolsInUse: 'Zendesk, Google Sheets, internal Postgres DB',
            goals: 'Reduce verification turnaround time from 24 hours to under 2 minutes with 99.8% precision',
          },
          generatedBlueprint: {
            overview: 'Autonomous KYC verification & document intelligence pipeline for fintech operations.',
            problem: 'Manual compliance document verification causing 24-hour onboarding friction and high labor overhead.',
            solution: 'Deploy a multi-modal AI agent pipeline utilizing OCR, table extraction, and cross-reference fraud checks with bank statement verification.',
            intendedUsers: 'Compliance Officers, Risk Managers, and Onboarding Merchants.',
            functionalRequirements: [
              'Automated PDF & ID document parsing with table layout awareness.',
              'Cross-validation against national business registry and tax IDs.',
              'Confidence score engine with automated flagging of suspicious anomalies.',
              'Real-time admin audit trail for regulatory compliance.'
            ],
            technicalConsiderations: [
              'Gemini 1.5 Flash Vision for multi-modal document understanding.',
              'Node.js microservices deployed on AWS ECS with zero-trust KMS encryption.',
              'PostgreSQL with encrypted JSONB fields for audit immutability.'
            ],
            potentialIntegrations: ['DigiLocker API', 'Sandbox Banking APIs', 'Internal Risk Engine'],
            missingInformation: ['Daily document volume spikes', 'Specific fallback protocol for low-resolution camera scans'],
            clarificationQuestions: ['Are there specific KYC guidelines dictated by your payment gateway partner?'],
            suggestedNextSteps: ['Stage 1: Sample dataset audit', 'Stage 2: OCR accuracy benchmark', 'Stage 3: Sandbox integration'],
            engineUsed: 'deterministic-fallback (synthetic demo)',
            generatedAt: new Date(Date.now() - 3600000 * 24).toISOString(),
          },
          status: 'Reviewing',
          consentGiven: true,
          internalNotes: [
            {
              note: '[SYNTHETIC TEST NOTE] Sample workflow test note for assessment evaluation. Not a real staff review.',
              author: 'Synthetic Evaluator',
              createdAt: new Date(Date.now() - 3600000 * 18),
            },
          ],
        },
        {
          referenceId: 'CYN-2026-419082',
          clientName: 'Priya Sharma [Demo Lead]',
          email: 'priya.sharma.demo@aurahealth.test',
          phone: '+91 97112 39180',
          company: 'AuraHealth Clinics (Synthetic Demo)',
          projectCategory: 'Build a new website or web application',
          discoveryAnswers: {
            problem: 'Patients struggle to book appointments and consult specialist doctors across 12 branch clinics.',
            targetAudience: 'Patients aged 25-60 and attending clinicians',
            features: 'Interactive doctor scheduler, WhatsApp confirmations, and patient portal',
            currentSystem: 'Outdated WordPress site with broken calendar plugin',
          },
          generatedBlueprint: {
            overview: 'Unified clinical appointment and patient management web ecosystem.',
            problem: 'Fragmented clinic scheduling leading to 35% missed appointments and phone queue bottlenecks.',
            solution: 'High-performance React/Next.js multi-location booking portal with automated WhatsApp reminder triggers.',
            intendedUsers: 'Clinic Patients, Receptionists, and Medical Specialists.',
            functionalRequirements: [
              'Real-time doctor calendar availability across 12 physical branches.',
              'Instant booking confirmation with WhatsApp & SMS notifications.',
              'Patient portal for downloading medical invoices and test reports.',
              'Administrative branch-wise performance and occupancy dashboard.'
            ],
            technicalConsiderations: [
              'Next.js 14 with Server-Side Rendering for maximum local SEO performance in Jaipur/Delhi.',
              'MongoDB Atlas multi-tenant schema with optimistic locking for booking slots.',
              'Twilio / WhatsApp Business Cloud API integration.'
            ],
            potentialIntegrations: ['WhatsApp Cloud API', 'Razorpay Payment Gateway', 'Practo EMR'],
            missingInformation: ['Do doctors manage their own schedules or is this centrally managed by receptionist staff?'],
            clarificationQuestions: ['Should payment be required upfront or allowed pay-at-clinic?'],
            suggestedNextSteps: ['Stage 1: Wireframe approval', 'Stage 2: Booking flow prototype', 'Stage 3: Beta launch in 2 clinics'],
            engineUsed: 'deterministic-fallback (synthetic demo)',
            generatedAt: new Date(Date.now() - 3600000 * 48).toISOString(),
          },
          status: 'Qualified',
          consentGiven: true,
          internalNotes: [
            {
              note: '[SYNTHETIC TEST NOTE] Sample workflow test note for assessment evaluation. Not a real staff review.',
              author: 'Synthetic Evaluator',
              createdAt: new Date(Date.now() - 3600000 * 20),
            },
          ],
        },
        {
          referenceId: 'CYN-2026-102947',
          clientName: 'Vikram Singhania [Demo Lead]',
          email: 'vikram.singhania.demo@singhaniagroup.test',
          phone: '+91 98100 11223',
          company: 'Singhania Logistics (Synthetic Demo)',
          projectCategory: 'Improve or modernize an existing software system',
          discoveryAnswers: {
            problem: 'Legacy PHP monolith crashing during peak inventory updates across 4 distribution hubs.',
            currentSystem: 'PHP 7.1 monolith on single dedicated server',
            concerns: 'Data corruption during peak truck dispatch hours',
          },
          generatedBlueprint: {
            overview: 'Monolith to cloud-native microservices modernization for logistics distribution.',
            problem: 'Legacy ERP architecture incapable of handling concurrent warehouse dispatch requests.',
            solution: 'Strangler fig migration pattern decomposing monolithic dispatch routines into event-driven Node.js microservices.',
            intendedUsers: 'Warehouse Managers, Fleet Drivers, Dispatch Coordinators.',
            functionalRequirements: [
              'Event-driven queue architecture for dispatch state transitions.',
              'Real-time barcode inventory scanner interface.',
              'Automated sync with accounting software.'
            ],
            technicalConsiderations: [
              'Dockerized microservices deployed on AWS ECS.',
              'Redis message broker for asynchronous dispatch queuing.',
              'PostgreSQL with read replicas for analytical queries.'
            ],
            potentialIntegrations: ['GPS Fleet Telematics', 'SAP / Tally ERP', 'E-Way Bill Portal'],
            missingInformation: ['Database size and current transaction per second (TPS) peak.'],
            clarificationQuestions: ['Can we implement a temporary write-buffer during peak dispatch windows?'],
            suggestedNextSteps: ['Stage 1: Codebase audit & dependency map', 'Stage 2: Schema decoupling plan'],
            engineUsed: 'deterministic-fallback',
            generatedAt: new Date(Date.now() - 3600000 * 72).toISOString(),
          },
          status: 'New',
          consentGiven: true,
          internalNotes: [],
        },
      ];

      await Inquiry.insertMany(sampleInquiries);
      console.log('✅ Seeded 3 initial realistic demonstration inquiries.');
    }
  } catch (err) {
    console.error('Database seeding error:', err);
  }
};

// If run directly via CLI
if (process.argv[1]?.endsWith('seedAdmin.js')) {
  (async () => {
    await connectDB();
    await seedDatabase();
    process.exit(0);
  })();
}
