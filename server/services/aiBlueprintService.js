import axios from 'axios';

/**
 * Deterministic fallback generator that builds structured, professional project blueprints
 * based on Cynbit's 6-stage lifecycle and the visitor's specific inputs.
 */
export const generateDeterministicBlueprint = (category, answers) => {
  const ansMap = answers || {};
  const problem = ansMap.problem || ansMap.businessProcess || ansMap.challenge || 'Process optimization and digital capability expansion';
  const targetUsers = ansMap.targetAudience || ansMap.users || ansMap.stakeholders || 'Internal teams and end customers';
  const keyFeatures = ansMap.features || ansMap.goals || ansMap.objectives || 'Core functional workflows, user management, and automation logic';
  const currentSetup = ansMap.currentSystem || ansMap.toolsInUse || ansMap.infrastructure || 'Manual workflows and fragmented tools';
  const concerns = ansMap.concerns || ansMap.priorities || 'Scalability, reliability, and security';

  let categorySpecifics = {
    overview: `A strategic initiative to architect a high-performance digital solution for "${category}".`,
    solutionDirection: `Engineer a modern, resilient architecture adhering to Cynbit's optimistic engineering standards, eliminating workflow friction.`,
    functionalReqs: [
      `User onboarding, role-based access control, and session management.`,
      `Core transaction and operational workflows tailored to: ${keyFeatures}.`,
      `Automated notification hub and activity auditing.`,
      `Responsive dashboard and administrative reporting console.`
    ],
    techConsiderations: [
      `Frontend: Modern React / Next.js architecture with responsive design.`,
      `Backend: Distributed RESTful / GraphQL API services with Node.js.`,
      `Database: Optimized document or relational schema with indexing.`,
      `Infrastructure: Cloud-native containerized hosting with 99.9% uptime SLA.`
    ],
    integrations: [
      `Secure authentication (OAuth 2.0 / JWT).`,
      `Transactional communication (Email/SMS notifications).`,
      `Analytics and monitoring pipeline (OpenTelemetry / Sentry).`
    ],
    missingInfo: [
      `Expected concurrent user load at launch and projected 12-month peak growth.`,
      `Specific regulatory compliance requirements (e.g., GDPR, SOC2, HIPAA, RBI if Indian fintech).`,
      `Existing database schema or export format if migrating historic records.`,
      `Third-party API credentials, rate limits, or sandbox environment availability.`
    ],
    clarifications: [
      `Are there legacy datasets that require ETL cleanup before migration?`,
      `Do you require real-time synchronization (WebSockets) or polling-based updates?`,
      `What are the security and data residency criteria for cloud deployment?`
    ],
    nextSteps: [
      `Stage 1 (Discovery & Audit): 45-minute technical discovery session with Cynbit senior architects.`,
      `Stage 2 (Strategy & Blueprinting): Finalize data models, API contracts, and milestone timeline.`,
      `Stage 3 (High-Fidelity Design): Interactive wireframes and UI design system preview.`,
      `Stage 4 (Technical Implementation): Sprint zero repository scaffolding and core architecture build.`
    ]
  };

  if (category.toLowerCase().includes('ai') || category.toLowerCase().includes('automat')) {
    categorySpecifics = {
      overview: `Autonomous AI automation and intelligent cognitive orchestration designed to transform: ${problem}.`,
      solutionDirection: `Deploy an autonomous AI agent system combining LLM reasoning, RAG (Retrieval-Augmented Generation), and API tool calling to automate multi-step operations without manual human latency.`,
      functionalReqs: [
        `Intelligent ingestion and parsing of inputs: ${currentSetup}.`,
        `Autonomous agent execution loop with human-in-the-loop review for edge cases.`,
        `Real-time operational dashboard tracking token usage, latency, and success rates.`,
        `Fallback logic and graceful degradation when upstream APIs experience rate limits.`
      ],
      techConsiderations: [
        `LLM Provider: Gemini 1.5 Flash / Pro with function-calling capabilities.`,
        `Vector Database: Pinecone or pgvector for semantic knowledge retrieval.`,
        `Orchestration: LangChain or custom agent state machine for deterministic task execution.`,
        `Security: Prompt injection defense, PII sanitization, and audit logging.`
      ],
      integrations: [
        `LLM API gateways (Gemini / OpenAI).`,
        `Internal CRM, ERP, or communication tools (Slack, WhatsApp, Email).`,
        `Document ingestion pipeline (PDF, OCR, Structured JSON).`
      ],
      missingInfo: [
        `Volume of queries or documents to be processed daily/monthly.`,
        `Acceptable latency threshold for agent decision-making (e.g. sub-second vs. async).`,
        `Level of autonomy permitted before human escalation is mandatory.`,
        `Historical training/reference examples for few-shot prompt tuning.`
      ],
      clarifications: [
        `Will the agent require write access to production database records or read-only staging?`,
        `What is the policy for handling out-of-domain user requests or ambiguous prompts?`
      ],
      nextSteps: [
        `Stage 1 (Discovery & Audit): Process workflow mapping and prompt feasibility audit.`,
        `Stage 2 (Strategy & Blueprinting): Design prompt graphs, tool schemas, and safety rails.`,
        `Stage 3 (Proof of Concept): Rapid prototype validation on a 50-item sample dataset.`,
        `Stage 4 (Production Deployment): Zero-latency pipeline rollout with live telemetry.`
      ]
    };
  } else if (category.toLowerCase().includes('cloud') || category.toLowerCase().includes('infrastructure')) {
    categorySpecifics = {
      overview: `Enterprise-grade cloud infrastructure, modern DevOps automation, and zero-trust security architecture.`,
      solutionDirection: `Architect a scalable, cost-optimized AWS/Azure environment with Infrastructure as Code (Terraform) and automated CI/CD deployment pipelines.`,
      functionalReqs: [
        `Zero-downtime rolling deployments via Docker containers.`,
        `Automated horizontal pod autoscaling based on CPU/memory thresholds.`,
        `Centralized log aggregation, real-time alerting, and telemetry dashboards.`,
        `Automated database replication, backup snapshots, and disaster recovery strategy.`
      ],
      techConsiderations: [
        `Cloud Provider: AWS (ECS Fargate / EKS) or Azure App Services.`,
        `IaC: Terraform modules for repeatable, versioned infrastructure.`,
        `CI/CD: GitHub Actions with automated linting, security scans, and deployment stages.`,
        `Security: TLS 1.3, AWS KMS encryption at rest, VPC peering, and zero-trust IAM.`
      ],
      integrations: [
        `CloudWatch / Datadog for system metrics and alerts.`,
        `Git repository webhooks for automated test and deploy triggers.`,
        `DNS management and CDN caching via Cloudflare / AWS CloudFront.`
      ],
      missingInfo: [
        `Current monthly cloud expenditure and budget target.`,
        `Target availability SLA (99.9% vs. 99.99% multi-region).`,
        `Existing domain and DNS provider configuration.`
      ],
      clarifications: [
        `Is this a greenfield cloud setup or a live zero-downtime database migration?`,
        `Do you have an existing AWS/Azure organization structure or require a fresh setup?`
      ],
      nextSteps: [
        `Stage 1 (Audit): Review current architecture, dependencies, and bottlenecks.`,
        `Stage 2 (Blueprint): Terraform state architecture and network topology map.`,
        `Stage 3 (Staging Rollout): Automated CI/CD sandbox deployment.`,
        `Stage 4 (Production Cutover): Zero-downtime migration and live monitoring.`
      ]
    };
  }

  const problemText = `Identified Core Challenge: ${problem}. Current context indicates friction with: ${currentSetup}.`;

  return {
    projectOverview: categorySpecifics.overview,
    overview: categorySpecifics.overview,
    problemStatement: problemText,
    problem: problemText,
    proposedSolution: categorySpecifics.solutionDirection,
    solution: categorySpecifics.solutionDirection,
    targetAudience: targetUsers,
    intendedUsers: targetUsers,
    functionalRequirements: categorySpecifics.functionalReqs,
    technicalConsiderations: categorySpecifics.techConsiderations,
    potentialIntegrations: categorySpecifics.integrations,
    missingInformation: categorySpecifics.missingInfo,
    clarificationQuestions: categorySpecifics.clarifications,
    suggestedNextSteps: categorySpecifics.nextSteps,
    engineUsed: 'deterministic-fallback',
    generatedAt: new Date().toISOString()
  };
};

/**
 * Generate AI Blueprint using Gemini API if configured, with automatic fallback
 */
export const generateAIBlueprint = async (category, answers) => {
  const apiKey = process.env.GEMINI_API_KEY;

  if (!apiKey || apiKey.trim() === '') {
    console.log('Gemini API key not configured. Using intelligent deterministic blueprint engine.');
    return generateDeterministicBlueprint(category, answers);
  }

  try {
    const prompt = `
You are a Principal Software Architect at Cynbit Technologies, an elite AI automation and software engineering firm in Jaipur, India.
A prospective client has completed our Smart Project Discovery questionnaire.
Analyze their inputs and generate a structured, highly professional Project Blueprint in JSON format.

Client Category: ${category}
Discovery Questionnaire Answers:
${JSON.stringify(answers, null, 2)}

Requirements for the Blueprint:
1. Ground the blueprint strictly in the client's actual answers.
2. Clearly distinguish confirmed requirements from AI recommendations.
3. Identify missing information, ambiguities, and potential technical risks.
4. Do NOT promise exact pricing, guaranteed delivery dates, or guaranteed commercial results.
5. Provide realistic next steps matching Cynbit's 6-stage lifecycle (Discovery, Blueprint, Design, Implementation, QA, Deployment).

Return ONLY valid JSON matching this exact schema:
{
  "overview": "Concise executive overview of the project",
  "problem": "Summary of the business/technical problem being solved",
  "solution": "Proposed architectural solution and direction",
  "intendedUsers": "Target personas and stakeholders",
  "functionalRequirements": ["List of 3-5 confirmed or required core features"],
  "technicalConsiderations": ["List of 3-5 recommended tech stack, cloud, or security elements"],
  "potentialIntegrations": ["List of 2-4 key third-party APIs or systems to connect"],
  "missingInformation": ["List of 3-4 pieces of critical information still needed from the client"],
  "clarificationQuestions": ["List of 2-3 specific technical questions for discovery call"],
  "suggestedNextSteps": ["List of 3-4 structured next actions leading to sprint kick-off"]
}
`;

    const response = await axios.post(
      `https://generativelanguage.googleapis.com/v1beta/models/gemini-1.5-flash:generateContent?key=${apiKey}`,
      {
        contents: [
          {
            parts: [{ text: prompt }]
          }
        ],
        generationConfig: {
          temperature: 0.2,
          responseMimeType: "application/json"
        }
      },
      { timeout: 15000 }
    );

    const candidates = response.data?.candidates;
    if (candidates && candidates.length > 0) {
      const text = candidates[0].content?.parts[0]?.text;
      const parsed = JSON.parse(text);
      return {
        ...parsed,
        engineUsed: 'gemini-1.5-flash',
        generatedAt: new Date().toISOString()
      };
    }

    throw new Error('No candidate content returned from Gemini API');
  } catch (err) {
    console.warn('⚠️ Gemini AI Blueprint generation error:', err.message, '- Falling back to deterministic engine.');
    const fallback = generateDeterministicBlueprint(category, answers);
    fallback.engineUsed = 'deterministic-fallback (API offline)';
    return fallback;
  }
};
