// ==========================================
// n8n Webhook Integration Service
// All features included: AI Assistant, Decision, Document, Report, Learning Plan, CV Optimization
// Clear comments + placeholders for your production webhook URLs
// ==========================================

export interface AIMessage {
  role: 'user' | 'assistant' | 'system';
  content: string;
}

export interface AIResponse {
  content: string;
  model: 'gemini' | 'deepseek';
  alternativeContent?: string;
  alternativeModel?: 'gemini' | 'deepseek';
}

// -------------------- 1. AI ASSISTANT -------------------- //
// Gemini + DeepSeek dual AI integration
// Replace the URL below with your AI webhook
const AI_WEBHOOK_URL = 'http://localhost:5678/webhook/23030f54-6f01-4ed3-be3c-e3237f08f5e0/chat'; // <-- Enter your URL here

// -------------------- GENERIC WEBHOOK CALLER -------------------- //
async function callWebhook<T>(endpoint: string, payload: object, baseUrl?: string): Promise<T> {
  const url = baseUrl ? `${baseUrl}/${endpoint}` : endpoint;
  const response = await fetch(url, {
    method: 'POST',
    headers: { 'Content-Type': 'application/json' },
    body: JSON.stringify(payload),
  });

  if (!response.ok) {
    throw new Error(`Webhook error: ${response.statusText}`);
  }

  return response.json();
}

// -------------------- AI CHAT -------------------- //
export async function sendAIMessage(messages: AIMessage[]): Promise<AIResponse> {
  try {
    const response = await callWebhook<{
      primary: { content: string; model: string };
      alternative: { content: string; model: string };
      selectedModel: string;
    }>('ai-chat', { messages }, AI_WEBHOOK_URL);

    return {
      content: response.primary.content,
      model: response.selectedModel as 'gemini' | 'deepseek',
      alternativeContent: response.alternative.content,
      alternativeModel: response.alternative.model as 'gemini' | 'deepseek',
    };
  } catch (error) {
    console.error('AI Chat error:', error);
    return mockAIResponse(messages);
  }
}

// -------------------- 2. DECISION ANALYSIS -------------------- //
// For analyzing pros, cons, risks, benefits
// Replace URL here if you have a specific decision-analysis webhook
const DECISION_WEBHOOK_URL = 'http://localhost:5678/webhook/gemini-webhook'; // <-- Enter your URL here

export async function analyzeDecision(problem: string) {
  try {
    return await callWebhook(DECISION_WEBHOOK_URL, { problem });
  } catch (error) {
    console.error('Decision analysis error:', error);
    return mockDecisionAnalysis(problem);
  }
}

// -------------------- 3. DOCUMENT ANALYSIS -------------------- //
// Analyze document content (summary, key points, sentiment, etc.)
// Replace URL here if you have a specific document-analysis webhook
const DOCUMENT_WEBHOOK_URL = 'http://localhost:5678/webhook/document-analysis'; // <-- Enter your URL here

export async function analyzeDocument(content: string) {
  try {
    return await callWebhook(DOCUMENT_WEBHOOK_URL, { content });
  } catch (error) {
    console.error('Document analysis error:', error);
    return mockDocumentAnalysis(content);
  }
}

// -------------------- 4. REPORT ANALYSIS -------------------- //
// Analyze uploaded report files
// Replace URL here if you have a specific report-analysis webhook
const REPORT_WEBHOOK_URL = 'http://localhost:5678/webhook/report-analysis'; // <-- Enter your URL here

export async function analyzeReport(fileData: string, fileName: string) {
  try {
    return await callWebhook(REPORT_WEBHOOK_URL, { fileData, fileName });
  } catch (error) {
    console.error('Report analysis error:', error);
    return mockReportAnalysis();
  }
}

// -------------------- 5. LEARNING PLAN -------------------- //
// Generate roadmap for learning any skill
// Replace URL here if you have a specific learning-plan webhook
const LEARNING_WEBHOOK_URL = 'http://localhost:5678/webhook/learning-plan'; // <-- Enter your URL here

export async function generateLearningPlan(skill: string) {
  try {
    return await callWebhook(LEARNING_WEBHOOK_URL, { skill });
  } catch (error) {
    console.error('Learning plan error:', error);
    return mockLearningPlan(skill);
  }
}

// -------------------- 6. CV OPTIMIZATION -------------------- //
// Optimize CV (skills, ATS score, tips)
// Replace URL here if you have a specific cv-optimize webhook
const CV_WEBHOOK_URL = 'http://localhost:5678/webhook/cv-optimize'; // <-- Enter your URL here

export async function optimizeCV(cvData: object) {
  try {
    return await callWebhook(CV_WEBHOOK_URL, { cvData });
  } catch (error) {
    console.error('CV optimization error:', error);
    return mockCVOptimization();
  }
}

// =================== MOCK RESPONSES =================== //
// When your webhook is not ready yet, these allow UI to work
function mockAIResponse(messages: AIMessage[]): AIResponse {
  const lastMessage = messages[messages.length - 1]?.content || '';
  return {
    content: `Simulated response to: "${lastMessage.slice(0, 50)}..."`,
    model: 'gemini',
    alternativeContent: `Alternative response from DeepSeek (simulated)`,
    alternativeModel: 'deepseek',
  };
}

function mockDecisionAnalysis(problem: string) {
  return {
    pros: ['Increased efficiency', 'Cost savings', 'Better UX', 'Competitive advantage'],
    cons: ['Initial investment', 'Learning curve', 'Integration challenges'],
    risks: ['Tech may become outdated', 'Third-party dependency'],
    benefits: ['Scalable solution', 'Faster development', 'Better maintainability'],
    recommendation: `Proceeding is recommended for "${problem.slice(0, 30)}..."`,
    confidence: 85,
  };
}

function mockDocumentAnalysis(content: string) {
  const wordCount = content.split(/\s+/).length || 1247;
  return {
    summary: 'Document analysis simulated.',
    keyPoints: ['Code reviews', 'Automated tests', 'CI/CD pipelines', 'Documentation'],
    actionItems: ['Automated testing', 'Code review', 'CI/CD setup', 'Team retrospectives'],
    sentiment: 'positive' as const,
    wordCount,
    readingTime: `${Math.ceil(wordCount / 200)} min`,
  };
}

function mockReportAnalysis() {
  return {
    overview: 'Report analysis simulated.',
    highlights: [
      { title: 'Revenue', value: '$2.4M', trend: 'up', change: '+23%' },
      { title: 'Users', value: '145K', trend: 'up', change: '+18%' },
    ],
    insights: ['Mobile traffic up', 'Enterprise growth', 'CLV improved'],
    recommendations: ['Invest mobile', 'Expand sales', 'Advanced analytics'],
    risks: ['Competition', 'Single provider dependency'],
  };
}

function mockLearningPlan(skill: string) {
  return {
    skill,
    level: 'beginner' as const,
    estimatedTime: '3-4 months',
    roadmap: [
      { id: '1', title: 'Basics', description: 'Learn fundamentals', duration: '2-3 weeks', resources: ['Docs', 'Tutorials'], completed: false },
      { id: '2', title: 'Practice', description: 'Small projects', duration: '3-4 weeks', resources: ['Code Challenges'], completed: false },
      { id: '3', title: 'Intermediate', description: 'Advanced patterns', duration: '4-5 weeks', resources: ['Books', 'Courses'], completed: false },
      { id: '4', title: 'Projects', description: 'Real apps', duration: '4-6 weeks', resources: ['Open Source', 'Portfolio'], completed: false },
    ],
    tips: ['1-2 hrs daily', 'Build while learning', 'Join communities', 'Document journey', 'Review regularly'],
  };
}

function mockCVOptimization() {
  return {
    optimizedSummary: 'Simulated CV optimization.',
    skillSuggestions: ['TypeScript', 'Cloud Architecture', 'System Design'],
    improvementTips: ['Quantifiable achievements', 'Action verbs', 'Relevant keywords'],
    atsScore: 75,
  };
}
