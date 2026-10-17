'use client';

import { useState } from 'react';
import { MessageCircle, X, Send, Bot, Loader2 } from 'lucide-react';

interface Message {
  role: 'user' | 'model';
  parts: { text: string }[];
}

export default function ChatBot() {
  const [isOpen, setIsOpen] = useState(false);
  const [input, setInput] = useState('');
  const [messages, setMessages] = useState<Message[]>([
    {
      role: 'model',
      parts: [{ text: 'Hello! Welcome to RentNest. How can I help you today?' }],
    },
  ]);
  const [loading, setLoading] = useState(false);

  const sendMessage = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!input.trim() || loading) return;

    const userMessage: Message = { role: 'user', parts: [{ text: input }] };
    const updatedMessages = [...messages, userMessage];

    setMessages(updatedMessages);
    setInput('');
    setLoading(true);

    try {
      
      const res = await fetch('https://prisma-project-tau-dun.vercel.app/api/chat', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ messages: updatedMessages }),
      });

      const contentType = res.headers.get('content-type');
      if (!contentType || !contentType.includes('application/json')) {
        const text = await res.text();
        console.error('Non-JSON Response from backend:', text);
        throw new Error('Server returned an invalid response (not JSON).');
      }

      const data = await res.json();
      if (data.reply) {
        setMessages((prev) => [
          ...prev,
          { role: 'model', parts: [{ text: data.reply }] },
        ]);
      } else {
        throw new Error(data.message || 'Failed to generate response');
      }
    } catch (err) {
      console.error('Failed to send message:', err);
      setMessages((prev) => [
        ...prev,
        { role: 'model', parts: [{ text: 'Sorry, something went wrong. Please try again later.' }] },
      ]);
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="fixed bottom-6 right-6 z-50">
      {/* Toggle Button */}
      {!isOpen && (
        <button
          onClick={() => setIsOpen(true)}
          className="flex items-center gap-2 rounded-full bg-rose-600 p-4 text-white shadow-xl hover:bg-rose-500 transition cursor-pointer"
        >
          <MessageCircle size={24} />
        </button>
      )}

      {/* Chat Window */}
      {isOpen && (
        <div className="flex h-[480px] w-[350px] sm:w-[380px] flex-col rounded-3xl border border-slate-200 dark:border-gray-800 bg-white dark:bg-gray-900 shadow-2xl transition-all">
          
          {/* Header */}
          <div className="flex items-center justify-between border-b border-slate-100 dark:border-gray-800 p-4 bg-rose-600 text-white rounded-t-3xl">
            <div className="flex items-center gap-2">
              <Bot size={20} />
              <span className="font-bold text-sm">RentNest Assistant</span>
            </div>
            <button onClick={() => setIsOpen(false)} className="hover:opacity-80 cursor-pointer">
              <X size={20} />
            </button>
          </div>

          {/* Messages List */}
          <div className="flex-1 overflow-y-auto p-4 space-y-3 text-xs">
            {messages.map((msg, idx) => (
              <div
                key={idx}
                className={`flex gap-2 ${
                  msg.role === 'user' ? 'justify-end' : 'justify-start'
                }`}
              >
                {msg.role === 'model' && (
                  <div className="h-6 w-6 rounded-full bg-rose-100 dark:bg-rose-950/60 flex items-center justify-center text-rose-600 dark:text-rose-400 shrink-0">
                    <Bot size={14} />
                  </div>
                )}
                <div
                  className={`max-w-[75%] rounded-2xl p-3 leading-relaxed ${
                    msg.role === 'user'
                      ? 'bg-rose-600 text-white'
                      : 'bg-slate-100 dark:bg-gray-800 text-slate-800 dark:text-gray-200'
                  }`}
                >
                  {msg.parts[0].text}
                </div>
              </div>
            ))}
            {loading && (
              <div className="flex items-center gap-2 text-slate-400">
                <Loader2 size={16} className="animate-spin" />
                <span>Thinking...</span>
              </div>
            )}
          </div>

          {/* Input Box */}
          <form onSubmit={sendMessage} className="p-3 border-t border-slate-100 dark:border-gray-800 flex items-center gap-2">
            <input
              type="text"
              placeholder="Ask anything about properties..."
              value={input}
              onChange={(e) => setInput(e.target.value)}
              className="flex-1 bg-slate-50 dark:bg-gray-800 border border-slate-200 dark:border-gray-700 rounded-xl px-3 py-2 text-xs text-slate-900 dark:text-white focus:outline-none focus:ring-1 focus:ring-rose-500"
            />
            <button
              type="submit"
              disabled={loading}
              className="bg-rose-600 hover:bg-rose-500 text-white p-2 rounded-xl transition disabled:opacity-50 cursor-pointer"
            >
              <Send size={14} />
            </button>
          </form>

        </div>
      )}
    </div>
  );
}