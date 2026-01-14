// n8nService.ts - Gemini-only AI Assistant Integration
// Replace the webhook URL below with your actual Gemini webhook URL

export interface AIMessage {
  role: 'user' | 'assistant' | 'system';
  content: string;
}

export interface AIResponse {
  content: string;
  model: 'gemini';
  alternativeContent?: string;
  alternativeModel?: 'gemini';
}

// === 🔹 Set your Gemini webhook URL here ===
const GEMINI_WEBHOOK_URL = 'http://localhost:5678/webhook/23030f54-6f01-4ed3-be3c-e3237f08f5e0/chat';
// If you deploy to production, replace localhost with the public URL

// Generic webhook caller
async function callWebhook<T>(url: string, payload: object): Promise<T> {
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

// === 🔹 AI Chat using Gemini webhook only ===
export async function sendAIMessage(messages: AIMessage[]): Promise<AIResponse> {
  if (!GEMINI_WEBHOOK_URL) {
    // If webhook not configured, return mock response
    return mockAIResponse(messages);
  }

  try {
    const response = await callWebhook<{
      content: string;
      model: string;
    }>(GEMINI_WEBHOOK_URL, { messages });

    return {
      content: response.content,
      model: 'gemini',
    };
  } catch (error) {
    console.error('AI Chat error:', error);
    return mockAIResponse(messages);
  }
}

// === 🔹 Decision Analysis Feature (Optional, keeps your original feature) ===
export async function analyzeDecision(problem: string) {
  // Replace with a separate webhook if needed
  return mockDecisionAnalysis(problem);
}

// === 🔹 Document Analysis Feature ===
export async function analyzeDocument(content: string) {
  return mockDocumentAnalysis(content);
}

// === 🔹 Report Analysis Feature ===
export async function analyzeReport(fileData: string, fileName: string) {
  return mockReportAnalysis();
}

// === 🔹 Learning Plan Generation Feature ===
export async function generateLearningPlan(skill: string) {
  return mockLearningPlan(skill);
}

// === 🔹 CV Optimization Feature ===
export async function optimizeCV(cvData: object) {
  return mockCVOptimization();
}

// ================== Mock Data ==================
function mockAIResponse(messages: AIMessage[]): AIResponse {
  const lastMessage = messages[messages.length - 1]?.content || '';
  return {
    content: `Simulated response to: "${lastMessage.slice(0, 50)}..."`,
    model: 'gemini',
  };
}

function mockDecisionAnalysis(problem: string) {
  return {
    pros: ['Increased efficiency', 'Better UX'],
    cons: ['Initial investment', 'Learning curve'],
    risks: ['Dependency on tech'],
    benefits: ['Scalable', 'Maintainable'],
    recommendation: `Based on "${problem.slice(0, 30)}...", proceeding is recommended.`,
    confidence: 85,
  };
}

function mockDocumentAnalysis(content: string) {
  const wordCount = content.split(/\s+/).length || 500;
  return {
    summary: 'Document summary placeholder.',
    keyPoints: ['Point 1', 'Point 2', 'Point 3'],
    actionItems: ['Action 1', 'Action 2'],
    sentiment: 'neutral' as const,
    wordCount,
    readingTime: `${Math.ceil(wordCount / 200)} min`,
  };
}

function mockReportAnalysis() {
  return {
    overview: 'Report overview placeholder.',
    highlights: [{ title: 'Revenue', value: '$1000', trend: 'up', change: '+5%' }],
    insights: ['Insight 1', 'Insight 2'],
    recommendations: ['Recommendation 1'],
    risks: ['Risk 1'],
  };
}

function mockLearningPlan(skill: string) {
  return {
    skill,
    level: 'beginner' as const,
    estimatedTime: '3 months',
    roadmap: [
      { id: '1', title: 'Basics', description: 'Learn fundamentals', duration: '2 weeks', resources: [], completed: false },
    ],
    tips: ['Practice daily', 'Document progress'],
  };
}

function mockCVOptimization() {
  return {
    optimizedSummary: 'Optimized summary placeholder.',
    skillSuggestions: ['Skill 1', 'Skill 2'],
    improvementTips: ['Tip 1', 'Tip 2'],
    atsScore: 75,
  };
}
