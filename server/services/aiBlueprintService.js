import axios from 'axios';

/**
 * Extracts and normalizes input data from either flat or nested discovery payload.
 */
const extractDiscoveryContext = (category = '', answers = {}) => {
  const ans = answers || {};
  const biz = ans.businessInfo || {};
  const prob = ans.problemDetails || {};
  const sol = ans.solutionRequirements || {};

  const companyName = biz.companyName || ans.companyName || ans.company || ans.clientName || 'The Enterprise';
  const industry = biz.industry || ans.industry || 'Technology & Digital Business';
  const businessDescription = biz.description || ans.businessDescription || ans.briefDescription || '';
  const targetUsers = biz.targetAudience || ans.targetAudience || ans.intendedUsers || ans.users || 'End Customers and Administrative Staff';
  const businessStage = biz.businessStage || ans.businessStage || ans.productState || 'Growing Business';

  const problem = prob.coreProblem || ans.problem || ans.challenge || ans.businessProcess || 'Manual workflows, fragmented tools, and operational latency';
  const difficulties = prob.difficulties || ans.difficulties || ans.painPoints || '';
  const currentWorkflow = prob.currentWorkflow || ans.currentWorkflow || ans.currentSystem || ans.toolsInUse || 'Spreadsheets, manual handoffs, and disconnected SaaS tools';
  const existingTools = prob.existingTools || ans.existingTools || ans.toolsInUse || 'Spreadsheets, email, messaging';
  const improvementsWanted = prob.improvementsWanted || ans.improvementsWanted || ans.goals || 'Automate key processes, deliver a responsive customer interface, and scale reliably';

  const desiredSolutions = sol.desiredSolutions || ans.desiredSolutions || (category ? [category] : ['Web Application', 'AI Automation']);
  const keyFeatures = sol.keyFeatures || ans.features || ans.keyFeatures || 'User authentication, core operational workflow, automated notifications, executive reporting dashboard';
  const outcomes = sol.outcomes || ans.outcomes || ans.goals || 'Higher operational efficiency, superior user experience, and measurable business growth';

  // Determine appropriate UI archetype based on industry, solutions and text
  const combinedText = `${category} ${industry} ${businessDescription} ${problem} ${JSON.stringify(desiredSolutions)}`.toLowerCase();
  
  let suggestedArchetype = 'saas_dashboard';
  let suggestedScreens = [
    { id: 'dashboard', name: 'Executive Dashboard', description: 'Real-time performance metrics, operational alerts, and workflow activity.' },
    { id: 'operations', name: 'Operations & Workflows', description: 'Core functional management interface for daily business operations.' },
    { id: 'records', name: 'Records & Profiles', description: 'Centralized customer/entity profiles with historical activity audits.' },
    { id: 'analytics', name: 'Analytics & Reports', description: 'Business intelligence charts, KPI trends, and automated exportable reports.' }
  ];

  if (combinedText.includes('pet') || combinedText.includes('veterinary') || combinedText.includes('animal')) {
    suggestedArchetype = 'pet_care';
    suggestedScreens = [
      { id: 'pet_dashboard', name: 'Pet Parent Dashboard', description: 'Upcoming appointments, pet health stats, and vaccination alerts.' },
      { id: 'pet_profile', name: 'Pet Digital Profile', description: 'Complete medical records, dietary notes, and microchip identification.' },
      { id: 'booking', name: 'Veterinary Booking', description: 'Live slot selection, clinic consultation triage, and telemedicine.' },
      { id: 'marketplace', name: 'Services & Care Directory', description: 'Grooming, daycare, boarding reservations, and verified service providers.' }
    ];
  } else if (combinedText.includes('store') || combinedText.includes('e-commerce') || combinedText.includes('ecommerce') || combinedText.includes('shop') || combinedText.includes('retail')) {
    suggestedArchetype = 'ecommerce';
    suggestedScreens = [
      { id: 'storefront', name: 'Storefront Homepage', description: 'Hero collections, curated product catalogs, and seasonal spotlights.' },
      { id: 'catalog', name: 'Product Catalog & Filters', description: 'Dynamic faceted search, real-time inventory counts, and instant checkout.' },
      { id: 'product_detail', name: 'Product Detail & Reviews', description: 'High-res image gallery, variant selection, verified reviews, and specifications.' },
      { id: 'customer_portal', name: 'Customer Account & Orders', description: 'Order tracking timeline, digital invoices, and saved preferences.' }
    ];
  } else if (combinedText.includes('agent') || combinedText.includes('autonomous') || combinedText.includes('rag') || combinedText.includes('llm') || combinedText.includes('bot')) {
    suggestedArchetype = 'ai_agent_studio';
    suggestedScreens = [
      { id: 'agent_console', name: 'Autonomous Agent Console', description: 'Live agent execution status, real-time token telemetry, and run throughput.' },
      { id: 'workflow_builder', name: 'Workflow & Tool Pipeline', description: 'Visual node graph connecting LLM prompts, vector indices, and external API tool calls.' },
      { id: 'knowledge_base', name: 'Semantic Knowledge Base', description: 'Document vectorization hub, index embeddings, and similarity search testing.' },
      { id: 'execution_logs', name: 'Audit & Telemetry Logs', description: 'Trace execution latency, human-in-the-loop escalation, and safety filters.' }
    ];
  } else if (combinedText.includes('property') || combinedText.includes('tenant') || combinedText.includes('real estate') || combinedText.includes('rent')) {
    suggestedArchetype = 'proptech';
    suggestedScreens = [
      { id: 'property_hub', name: 'Property Operations Hub', description: 'Occupancy rates, cash flow summaries, and overdue payment alerts.' },
      { id: 'unit_management', name: 'Units & Floor Plans', description: 'Digital inventory of rental units, leasing status, and tenant assignments.' },
      { id: 'rent_ledger', name: 'Rent Ledger & Invoicing', description: 'Automated rent reminders, digital payment receipts, and bank reconciliation.' },
      { id: 'maintenance_portal', name: 'Tenant Maintenance Portal', description: 'Ticket creation, work order dispatch, and photo-verified resolutions.' }
    ];
  } else if (combinedText.includes('health') || combinedText.includes('clinic') || combinedText.includes('medical') || combinedText.includes('doctor') || combinedText.includes('patient')) {
    suggestedArchetype = 'healthcare';
    suggestedScreens = [
      { id: 'clinic_dashboard', name: 'Clinical Operations Desk', description: 'Today appointments queue, patient triage, and emergency alerts.' },
      { id: 'ehr_records', name: 'Electronic Health Records', description: 'HIPAA-conscious medical history, lab results, and prescription generation.' },
      { id: 'appointment_scheduler', name: 'Intelligent Scheduling', description: 'Doctor availability calendar, automated SMS confirmations, and cancellation backfills.' },
      { id: 'telehealth', name: 'Telehealth Consultation', description: 'Secure WebRTC video room with real-time vitals and doctor notes.' }
    ];
  } else if (combinedText.includes('mobile') || combinedText.includes('ios') || combinedText.includes('android')) {
    suggestedArchetype = 'mobile_app';
    suggestedScreens = [
      { id: 'mobile_home', name: 'Mobile Home Feed', description: 'Touch-optimized personalized feed with quick actions and notification hub.' },
      { id: 'mobile_explore', name: 'Explore & Search', description: 'Instant filter search with geolocation and category carousels.' },
      { id: 'mobile_action', name: 'Core Action & Booking', description: 'Streamlined checkout/submission flow with native Apple Pay / UPI integration.' },
      { id: 'mobile_profile', name: 'Profile & Settings', description: 'Biometric security, offline cached records, and preference settings.' }
    ];
  }

  return {
    companyName,
    industry,
    businessDescription,
    targetUsers,
    businessStage,
    problem,
    difficulties,
    currentWorkflow,
    existingTools,
    improvementsWanted,
    desiredSolutions,
    keyFeatures,
    outcomes,
    suggestedArchetype,
    suggestedScreens
  };
};

/**
 * Deterministic fallback generator that builds structured, professional project blueprints
 * matching Cynbit's 6-stage lifecycle and grounded in the visitor's specific inputs.
 */
export const generateDeterministicBlueprint = (category, answers, refinementNotes = '') => {
  const ctx = extractDiscoveryContext(category, answers);

  const overview = `Cynbit Architectural Blueprint for ${ctx.companyName} (${ctx.industry}): Architecting a resilient, scalable digital solution designed to resolve operational friction in ${ctx.problem.toLowerCase()}.`;

  const solution = `Design and deploy a bespoke ${Array.isArray(ctx.desiredSolutions) ? ctx.desiredSolutions.join(', ') : category} platform engineered to eliminate ${ctx.difficulties || 'manual bottlenecks'} by implementing automated business logic, secure user management, and seamless integrations.`;

  const functionalModules = [
    {
      name: 'Authentication & Role-Based Access Governance',
      description: 'Zero-trust user session management, enterprise SSO/OAuth, multi-role permissions (Admin, Operator, Customer), and security auditing.',
      priority: 'Core'
    },
    {
      name: 'Primary Operations & Workflow Engine',
      description: `Bespoke functional logic addressing: ${ctx.keyFeatures}. Automated status transitions, task assignments, and validation pipelines.`,
      priority: 'Core'
    },
    {
      name: 'Integrated Communication & Notification Hub',
      description: 'Multi-channel event-driven alerts via Email, WhatsApp, and SMS for critical lifecycle triggers, status updates, and customer reminders.',
      priority: 'High'
    },
    {
      name: 'Operational Analytics & Administrative Command Console',
      description: `Executive dashboards displaying real-time KPIs, audit trails, and automated reporting aligned with target outcome: ${ctx.outcomes}.`,
      priority: 'High'
    },
    {
      name: 'Data Ingestion & Legacy System Sync',
      description: `Connectors to migrate or synchronize existing records from: ${ctx.existingTools} into the new high-performance data architecture.`,
      priority: 'Phase 2'
    }
  ];

  const userWorkflows = [
    {
      title: 'Customer / End-User Onboarding & Service Request',
      steps: [
        'User registers or logs in via secure multi-factor authentication.',
        `User navigates intuitive interface to initiate request or explore offerings (${ctx.suggestedScreens[0].name}).`,
        'System validates input parameters in real-time, displays live confirmation, and issues tracking reference ID.',
        'Automated notification is dispatched to both user and internal handling team.'
      ]
    },
    {
      title: 'Internal Operational Processing & Task Resolution',
      steps: [
        `Operator views centralized queue in ${ctx.suggestedScreens[1].name}.`,
        'System applies automated business rules and highlights anomalies or missing documents.',
        'Operator approves or updates status; system propagates changes across all synchronized views.',
        'Analytical events are logged to the audit pipeline for real-time reporting.'
      ]
    }
  ];

  const techArchitecture = {
    frontend: ['React 18 / Next.js with Server-Side Rendering', 'Tailwind CSS Design System', 'Vite / Optimized Bundler', 'Lucide Vector Icons'],
    backend: ['Node.js with Express / Fastify Microservices', 'RESTful & WebSocket Event Architecture', 'Zod Runtime Schema Validation', 'JWT / Bcrypt Security'],
    database: ['MongoDB Atlas (Document Store) / PostgreSQL with Prisma', 'Redis In-Memory Caching for Sub-Millisecond Queries'],
    cloudAndDevops: ['Containerized Docker Deployment (AWS ECS / Fargate)', 'GitHub Actions Automated CI/CD Pipelines', 'Cloudflare CDN Edge Caching & DDoS Shield'],
    aiAndAutomation: ctx.desiredSolutions.some(s => s.toLowerCase().includes('ai') || s.toLowerCase().includes('agent'))
      ? ['Google Gemini 3.5 Flash Lite API for cognitive extraction and reasoning', 'LangChain orchestration pipeline', 'Vector Database (pgvector / Pinecone) for RAG context']
      : ['Event-driven background task queue (BullMQ / RabbitMQ)', 'Automated webhook dispatchers']
  };

  const thirdPartyIntegrations = [
    'Secure Payment Gateway (Stripe / Razorpay for INR transactions)',
    'Transactional Messaging (SendGrid / AWS SES for Email, Twilio / WhatsApp Business API)',
    'Real-time Monitoring & Observability (Sentry / OpenTelemetry / CloudWatch)'
  ];

  const securityAndAuth = [
    'Zero-trust role-based access control (RBAC) enforcing least-privilege principles.',
    'Strict cryptographic data encryption at rest (AES-256) and in transit (TLS 1.3).',
    'Rate-limiting, sanitization middleware, and CORS whitelisting against DDoS and injection exploits.',
    'Comprehensive audit trails logging all critical transactional modifications.'
  ];

  const scalabilityAndExpansion = [
    'Stateless microservice tier supporting horizontal auto-scaling during traffic spikes.',
    'Read-replica database provisioning to handle high concurrent search and reporting queries.',
    'Modular domain decoupling allowing individual services to evolve independently without monolith fragility.'
  ];

  const risksAndDependencies = [
    'Data consistency during migration from existing tools (' + ctx.existingTools + ').',
    'Third-party API rate limits and uptime SLAs for external integrations.',
    'Client availability for sprint review cycles and acceptance sign-off.'
  ];

  const assumptionsAndMissingInfo = [
    'Specific concurrent user volume expected at launch and peak 12-month projections.',
    'Regulatory compliance mandates applicable to this domain (e.g. GDPR, DPDP Act 2023 for India, HIPAA if health data).',
    'Existing database schema or export file format for historical data ingestion.'
  ];

  const implementationPhases = [
    {
      phase: 'Phase 1',
      title: 'Discovery, UX Architecture & System Contracts',
      durationEstimate: '1–2 Weeks',
      deliverables: ['Detailed API contracts & schema specifications', 'Interactive Figma prototype & design system', 'Sprint 0 infrastructure setup']
    },
    {
      phase: 'Phase 2',
      title: 'Core Backend Engine & Database Scaffolding',
      durationEstimate: '3–4 Weeks',
      deliverables: ['Authentication & authorization endpoints', 'Core operational workflows & data models', 'Automated unit test coverage > 85%']
    },
    {
      phase: 'Phase 3',
      title: 'Frontend Portal & Integration Ecosystem',
      durationEstimate: '2–3 Weeks',
      deliverables: ['Responsive web / mobile user interfaces', 'Third-party API integrations (Payment, WhatsApp, Email)', 'Admin analytics console']
    },
    {
      phase: 'Phase 4',
      title: 'Security Auditing, Load Testing & Production Launch',
      durationEstimate: '1–2 Weeks',
      deliverables: ['Vulnerability & penetration test sign-off', 'Stress testing under 2x projected peak traffic', 'Production DNS cutover & zero-downtime deployment']
    }
  ];

  const clarificationQuestions = [
    'Do you have existing user or customer data that needs to be scrubbed and migrated at launch?',
    'What is your target go-live date, and are there external marketing deadlines tied to the launch?',
    'Are there specific branding guidelines, typography, or design benchmarks you want our designers to follow?'
  ];

  const suggestedNextSteps = [
    'Schedule a 45-minute Technical Architecture Discovery Session with Cynbit Senior Engineering.',
    'Finalize the preliminary scope of work and milestone deliverables based on this blueprint.',
    'Sign Mutual Non-Disclosure Agreement (NDA) and issue Sprint Zero kickoff repository.',
    'Review interactive visual prototype and approve core UX layout.'
  ];

  return {
    // Executive and Problem Framing
    projectOverview: overview,
    overview: overview,
    currentChallenges: ctx.difficulties || 'Managing business operations through fragmented spreadsheets and manual tools without centralized visibility.',
    coreProblem: ctx.problem,
    problemStatement: ctx.problem,
    problem: ctx.problem,
    proposedSolution: solution,
    solution: solution,

    // Audience & Functional Specifications
    targetAudience: ctx.targetUsers,
    intendedUsers: ctx.targetUsers,
    functionalRequirements: functionalModules.map(m => `${m.name}: ${m.description}`),
    functionalModules,
    userWorkflows,

    // Architecture & Technical Considerations
    techArchitecture,
    technicalConsiderations: [
      `Frontend: ${techArchitecture.frontend.join(', ')}`,
      `Backend: ${techArchitecture.backend.join(', ')}`,
      `Database: ${techArchitecture.database.join(', ')}`,
      `Cloud: ${techArchitecture.cloudAndDevops.join(', ')}`
    ],
    thirdPartyIntegrations,
    potentialIntegrations: thirdPartyIntegrations,
    aiAndAutomationOpportunities: techArchitecture.aiAndAutomation,
    securityAndAuth,
    scalabilityAndExpansion,

    // Risks, Missing Info & Questions
    risksAndDependencies,
    assumptionsAndMissingInfo,
    missingInformation: assumptionsAndMissingInfo,
    clarificationQuestions,

    // Delivery Roadmap
    implementationPhases,
    suggestedNextSteps,

    // Visual Concept Mapping
    suggestedArchetype: ctx.suggestedArchetype,
    suggestedScreens: ctx.suggestedScreens,
    archetype: ctx.suggestedArchetype,

    engineUsed: refinementNotes ? 'deterministic-fallback (refined)' : 'deterministic-fallback',
    source: 'deterministic_fallback',
    generatedAt: new Date().toISOString()
  };
};

/**
 * Generate AI Blueprint using Google Gemini API with fallback
 */
export const generateAIBlueprint = async (category, answers, refinementNotes = '') => {
  const apiKey = process.env.GEMINI_API_KEY;

  if (!apiKey || apiKey.trim() === '') {
    console.log('ℹ️ Gemini API key not configured. Using intelligent deterministic blueprint engine.');
    return generateDeterministicBlueprint(category, answers, refinementNotes);
  }

  const ctx = extractDiscoveryContext(category, answers);

  const prompt = `
You are a Principal Software Architect at Cynbit Technologies, an elite software engineering and AI automation firm in Jaipur, India.
A prospective client has submitted their business discovery details.
Analyze their inputs, reason deeply about their business operations, and generate a structured, comprehensive, highly professional Project Blueprint in valid JSON format.

Client Company: ${ctx.companyName}
Industry: ${ctx.industry}
Business Stage: ${ctx.businessStage}
Business Description: ${ctx.businessDescription}
Target Customers / Users: ${ctx.targetUsers}
Core Problem: ${ctx.problem}
Current Bottlenecks & Difficulties: ${ctx.difficulties}
Current Workflow & Existing Tools: ${ctx.currentWorkflow}
Improvements Wanted / Goals: ${ctx.improvementsWanted}
Desired Solutions: ${JSON.stringify(ctx.desiredSolutions)}
Key Features: ${ctx.keyFeatures}
Desired Outcomes: ${ctx.outcomes}
${refinementNotes ? `\nCLIENT REFINEMENT REQUEST:\nThe client reviewed a previous version and requested these specific modifications: "${refinementNotes}". Update the blueprint to address these requests directly while keeping confirmed context.` : ''}

CRITICAL RULES:
1. Ground the blueprint strictly in the client's actual answers. Do NOT invent company facts or commit to unconfirmed integrations.
2. Clearly distinguish confirmed requirements from AI recommendations.
3. Identify missing information, ambiguities, and potential technical risks.
4. Do NOT promise exact pricing, guaranteed delivery dates, or guaranteed commercial results.
5. Do NOT recommend AI where a simpler software solution is more appropriate.
6. Provide non-technical explanations for the business owner AND specific technical specifications for Cynbit's engineering team.
7. Return ONLY valid, parseable JSON matching the schema below.

JSON SCHEMA:
{
  "overview": "Executive overview of the recommended solution tailored to this specific company",
  "currentChallenges": "Summary of current operational friction and bottlenecks",
  "coreProblem": "The central business/technical problem being addressed",
  "solution": "Clear architectural recommendation explaining what Cynbit will build",
  "intendedUsers": "Target user personas and their primary responsibilities",
  "functionalModules": [
    {
      "name": "Module Name (e.g. Smart Order Management)",
      "description": "Specific functional capability and user value",
      "priority": "Core"
    }
  ],
  "userWorkflows": [
    {
      "title": "Workflow Name (e.g. End-to-End Service Booking)",
      "steps": ["Step 1...", "Step 2...", "Step 3...", "Step 4..."]
    }
  ],
  "techArchitecture": {
    "frontend": ["Specific frontend technologies"],
    "backend": ["Specific backend technologies"],
    "database": ["Specific database technologies and indexing considerations"],
    "cloudAndDevops": ["Specific cloud, containerization, and CI/CD tools"],
    "aiAndAutomation": ["Specific AI models, automations, or background workers"]
  },
  "thirdPartyIntegrations": ["2-4 critical third-party APIs with specific purpose"],
  "securityAndAuth": ["3-4 concrete security, authentication, and compliance measures"],
  "scalabilityAndExpansion": ["2-3 future expansion and high-traffic considerations"],
  "risksAndDependencies": ["2-3 technical dependencies or external risks"],
  "assumptionsAndMissingInfo": ["3-4 critical pieces of information still needed from the client"],
  "clarificationQuestions": ["2-3 specific technical questions for discovery call"],
  "implementationPhases": [
    {
      "phase": "Phase 1",
      "title": "Phase title",
      "durationEstimate": "e.g. 2-3 Weeks",
      "deliverables": ["Deliverable 1", "Deliverable 2"]
    }
  ],
  "suggestedNextSteps": ["3-4 structured next actions leading to kickoff"],
  "suggestedArchetype": "One of: 'ecommerce' | 'saas_dashboard' | 'ai_agent_studio' | 'mobile_app' | 'healthcare' | 'pet_care' | 'proptech' | 'webapp'",
  "suggestedScreens": [
    { "id": "screen_id", "name": "Screen Title", "description": "Short description of what is rendered on this screen" }
  ]
}
`;

  const primaryModel = process.env.GEMINI_MODEL?.trim() || 'gemini-3.5-flash-lite';
  const candidateModels = Array.from(new Set([
    primaryModel,
    'gemini-3.1-flash-lite',
  ])).filter(Boolean);

  let lastError = null;

  for (const model of candidateModels) {
    try {
      const response = await axios.post(
        `https://generativelanguage.googleapis.com/v1beta/models/${model}:generateContent`,
        {
          contents: [{ parts: [{ text: prompt }] }],
          generationConfig: {
            temperature: 0.2,
            responseMimeType: 'application/json'
          }
        },
        {
          headers: {
            'Content-Type': 'application/json',
            'x-goog-api-key': apiKey,
          },
          timeout: 25000
        }
      );

      const candidates = response.data?.candidates;
      if (candidates && candidates.length > 0) {
        const text = candidates[0].content?.parts[0]?.text;
        const parsed = JSON.parse(text);

        // Normalize both legacy and modern keys
        return {
          ...parsed,
          projectOverview: parsed.overview || parsed.projectOverview,
          problemStatement: parsed.coreProblem || parsed.problem || parsed.problemStatement,
          problem: parsed.coreProblem || parsed.problem || parsed.problemStatement,
          proposedSolution: parsed.solution || parsed.proposedSolution,
          targetAudience: parsed.intendedUsers || parsed.targetAudience,
          functionalRequirements: parsed.functionalModules ? parsed.functionalModules.map(m => `${m.name}: ${m.description}`) : (parsed.functionalRequirements || []),
          technicalConsiderations: parsed.techArchitecture ? [
            `Frontend: ${parsed.techArchitecture.frontend?.join(', ') || 'React / Next.js'}`,
            `Backend: ${parsed.techArchitecture.backend?.join(', ') || 'Node.js'}`,
            `Database: ${parsed.techArchitecture.database?.join(', ') || 'PostgreSQL / MongoDB'}`,
            `Cloud: ${parsed.techArchitecture.cloudAndDevops?.join(', ') || 'AWS / Docker'}`
          ] : (parsed.technicalConsiderations || []),
          potentialIntegrations: parsed.thirdPartyIntegrations || parsed.potentialIntegrations || [],
          missingInformation: parsed.assumptionsAndMissingInfo || parsed.missingInformation || [],
          archetype: parsed.suggestedArchetype || ctx.suggestedArchetype,
          suggestedArchetype: parsed.suggestedArchetype || ctx.suggestedArchetype,
          suggestedScreens: parsed.suggestedScreens || ctx.suggestedScreens,
          engineUsed: `gemini-api (${model})`,
          modelUsed: model,
          source: 'gemini_api',
          generatedAt: new Date().toISOString()
        };
      }
    } catch (err) {
      const status = err.response?.status;
      const apiErrMsg = err.response?.data?.error?.message || err.message;
      lastError = `${status ? `HTTP ${status}: ` : ''}${apiErrMsg}`;
      console.warn(`⚠️ Gemini model [${model}] unavailable (${lastError}). Trying next candidate...`);
    }
  }

  console.warn('⚠️ All Gemini model attempts failed or API unavailable. Falling back to deterministic architectural engine.', lastError ? `Last error: ${lastError}` : '');
  const fallback = generateDeterministicBlueprint(category, answers, refinementNotes);
  fallback.engineUsed = 'deterministic-fallback (Gemini unavailable)';
  fallback.source = 'deterministic_fallback';
  fallback.lastError = lastError;
  return fallback;
};
