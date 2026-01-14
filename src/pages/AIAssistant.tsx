import React, { useState, useRef, useEffect } from 'react';
import {
  Send,
  Bot,
  User,
  Sparkles,
  Copy,
  Check,
  Mic,
  MicOff,
} from 'lucide-react';
import { DashboardLayout } from '@/components/layout/DashboardLayout';
import { PageHeader } from '@/components/ui/PageHeader';
import { cn } from '@/lib/utils';
import { toast } from 'sonner';

interface Message {
  id: string;
  role: 'user' | 'assistant';
  content: string;
  timestamp: Date;
}

const SUGGESTED_PROMPTS = [
  'Explain the concept of microservices architecture',
  'Create a project plan for a mobile app',
  'What are the best practices for API design?',
  'Help me optimize my React application performance',
];

// 🔗 n8n Webhook URL
const N8N_WEBHOOK_URL =
  'http://localhost:5678/webhook/122eb549-8506-4c2f-ac63-94aa081c0956/chat';

// 🔁 Call n8n instead of OpenAI
async function fetchAIResponse(message: string) {
  const res = await fetch(N8N_WEBHOOK_URL, {
    method: 'POST',
    headers: { 'Content-Type': 'application/json' },
    body: JSON.stringify({ message }),
  });

  if (!res.ok) throw new Error('n8n error');

  const data = await res.json();
  return data.reply || data.response || 'No response from AI';
}

export default function AIAssistant() {
  const [messages, setMessages] = useState<Message[]>([]);
  const [input, setInput] = useState('');
  const [isLoading, setIsLoading] = useState(false);
  const [copiedId, setCopiedId] = useState<string | null>(null);
  const [isListening, setIsListening] = useState(false);
  const messagesEndRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    messagesEndRef.current?.scrollIntoView({ behavior: 'smooth' });
  }, [messages]);

  const handleSend = async () => {
    if (!input.trim() || isLoading) return;

    const userMsg: Message = {
      id: Date.now().toString(),
      role: 'user',
      content: input.trim(),
      timestamp: new Date(),
    };

    setMessages((p) => [...p, userMsg]);
    setInput('');
    setIsLoading(true);

    try {
      const aiReply = await fetchAIResponse(userMsg.content);

      const aiMsg: Message = {
        id: (Date.now() + 1).toString(),
        role: 'assistant',
        content: aiReply,
        timestamp: new Date(),
      };

      setMessages((p) => [...p, aiMsg]);
    } catch {
      toast.error('AI response failed');
    } finally {
      setIsLoading(false);
    }
  };

  const handleCopy = async (text: string, id: string) => {
    await navigator.clipboard.writeText(text);
    setCopiedId(id);
    toast.success('Copied');
    setTimeout(() => setCopiedId(null), 1500);
  };

  const handleVoiceInput = () => {
    if (!('webkitSpeechRecognition' in window)) {
      toast.error('Voice not supported');
      return;
    }

    setIsListening(true);
    const SpeechRecognition =
      (window as any).webkitSpeechRecognition;
    const recognition = new SpeechRecognition();

    recognition.lang = 'en-US';
    recognition.onresult = (e: any) => {
      setInput(e.results[0][0].transcript);
      setIsListening(false);
    };
    recognition.onerror = () => setIsListening(false);
    recognition.start();
  };

  return (
    <DashboardLayout>
      <div className="h-[calc(100vh-8rem)] flex flex-col">
        <PageHeader
          title="AI Personal Assistant"
          description="Powered by n8n Automation"
          badge="AI"
        />

        <div className="flex-1 glass-card flex flex-col overflow-hidden">
          <div className="flex-1 overflow-y-auto p-6 space-y-6">
            {messages.length === 0 ? (
              <div className="h-full flex flex-col items-center justify-center text-center">
                <Sparkles className="w-12 h-12 text-primary mb-4" />
                <h3 className="text-xl font-semibold">
                  How can I help you today?
                </h3>
                <div className="grid sm:grid-cols-2 gap-3 mt-6">
                  {SUGGESTED_PROMPTS.map((p) => (
                    <button
                      key={p}
                      onClick={() => setInput(p)}
                      className="p-4 border rounded-lg text-left hover:bg-muted"
                    >
                      {p}
                    </button>
                  ))}
                </div>
              </div>
            ) : (
              messages.map((m) => (
                <div
                  key={m.id}
                  className={cn(
                    'flex gap-4',
                    m.role === 'user' && 'flex-row-reverse'
                  )}
                >
                  <div className="w-10 h-10 flex items-center justify-center rounded-lg bg-muted">
                    {m.role === 'user' ? <User /> : <Bot />}
                  </div>
                  <div className="max-w-2xl">
                    <div
                      className={cn(
                        'p-4 rounded-xl',
                        m.role === 'user'
                          ? 'bg-primary text-white'
                          : 'bg-muted'
                      )}
                    >
                      {m.content}
                    </div>
                    {m.role === 'assistant' && (
                      <button
                        onClick={() => handleCopy(m.content, m.id)}
                        className="mt-1 text-xs text-muted-foreground flex gap-1 items-center"
                      >
                        {copiedId === m.id ? <Check size={14} /> : <Copy size={14} />}
                        Copy
                      </button>
                    )}
                  </div>
                </div>
              ))
            )}
            {isLoading && <p className="text-muted-foreground">Thinking...</p>}
            <div ref={messagesEndRef} />
          </div>

          {/* Input */}
          <div className="border-t p-4 flex gap-3">
            <button onClick={handleVoiceInput}>
              {isListening ? <MicOff /> : <Mic />}
            </button>
            <textarea
              value={input}
              onChange={(e) => setInput(e.target.value)}
              onKeyDown={(e) => {
                if (e.key === 'Enter' && !e.shiftKey) {
                  e.preventDefault();
                  handleSend();
                }
              }}
              className="flex-1 input-field"
              placeholder="Type your message..."
            />
            <button
              onClick={handleSend}
              disabled={isLoading}
              className="btn-primary"
            >
              <Send />
            </button>
          </div>
        </div>
      </div>
    </DashboardLayout>
  );
}
