import React, { useState, useRef, useEffect } from 'react';
import { Send, Bot, User, ShieldAlert, Sparkles, AlertTriangle, ArrowLeft, RefreshCw, MessageSquare } from 'lucide-react';
import { Message } from '../types';

interface LiveChatProps {
  onBackToHome: () => void;
  initialLawyerInquiry?: string | null;
  onClearLawyerInquiry?: () => void;
}

export default function LiveChat({ onBackToHome, initialLawyerInquiry, onClearLawyerInquiry }: LiveChatProps) {
  const [messages, setMessages] = useState<Message[]>([
    {
      id: 'welcome',
      sender: 'assistant',
      text: `សួស្តីបាទ! ខ្ញុំបាទឈ្មោះ កុសល (Kosal) ជាជំនួយការច្បាប់ AI សម្រាប់ Khmer Law Hub។ តើខ្ញុំអាចជួយលោកអ្នកស្វែងយល់អំពីច្បាប់កម្ពុជា ឬរៀបចំគំរូកិច្ចសន្យាអ្វីខ្លះនៅថ្ងៃនេះ?

Hello! I am Kosal, your AI Legal Assistant. How can I help you understand Cambodian laws or legal documents today?`,
      timestamp: new Date().toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' })
    }
  ]);
  
  const [inputText, setInputText] = useState('');
  const [loading, setLoading] = useState(false);
  const [errorText, setErrorText] = useState<string | null>(null);
  
  const messagesEndRef = useRef<HTMLDivElement>(null);

  // Suggested bilingual quick-prompts
  const suggestions = [
    { text: 'Breach of contract rules?', labelKh: 'វិធានរំលោភកិច្ចសន្យា' },
    { text: 'Cambodia standard working hours?', labelKh: 'ម៉ោងការងារស្តង់ដារកម្ពុជា' },
    { text: 'How is land owned in Cambodia?', labelKh: 'កម្មសិទ្ធិដីធ្លីនៅកម្ពុជា' },
    { text: 'Explain the Residential Lease template', labelKh: 'ពន្យល់ពីគំរូកិច្ចសន្យាជួលផ្ទះ' }
  ];

  // Auto-fill lawyer inquiry pre-draft if directed from Lawyer profile
  useEffect(() => {
    if (initialLawyerInquiry) {
      const text = `Hi Kosal, I would like to consult with lawyer ${initialLawyerInquiry}. Could you help me draft an introductory inquiry explaining that I need help with my legal matters?`;
      setInputText(text);
    }
  }, [initialLawyerInquiry]);

  // Scroll to bottom when messages append
  useEffect(() => {
    messagesEndRef.current?.scrollIntoView({ behavior: 'smooth' });
  }, [messages, loading]);

  const handleSendMessage = async (textToSend: string) => {
    if (!textToSend.trim() || loading) return;

    const userMessage: Message = {
      id: `msg-${Date.now()}`,
      sender: 'user',
      text: textToSend,
      timestamp: new Date().toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' })
    };

    setMessages((prev) => [...prev, userMessage]);
    setInputText('');
    setLoading(true);
    setErrorText(null);

    // If we had a lawyer inquiry preset, clear it now that the prompt is submitted
    if (initialLawyerInquiry && onClearLawyerInquiry) {
      onClearLawyerInquiry();
    }

    try {
      const response = await fetch('/api/chat', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
          message: textToSend,
          history: messages // Pass preceding convo history
        })
      });

      const data = await response.json();

      if (!response.ok) {
        throw new Error(data.error || 'Server returned an error');
      }

      const botMessage: Message = {
        id: `msg-${Date.now() + 1}`,
        sender: 'assistant',
        text: data.text,
        timestamp: new Date().toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' })
      };

      setMessages((prev) => [...prev, botMessage]);
    } catch (err: any) {
      console.error(err);
      setErrorText(err.message || 'Unable to connect to Kosal. Please check your network connection.');
    } finally {
      setLoading(false);
    }
  };

  const handleSuggestionClick = (text: string) => {
    handleSendMessage(text);
  };

  return (
    <div className="flex flex-col h-full bg-[#FAF9F5] text-slate-800 font-sans" id="live-chat-panel">
      {/* Header */}
      <div className="bg-[#0B1B3D] text-white px-4 py-4 flex items-center justify-between shadow-md shrink-0">
        <div className="flex items-center space-x-2">
          <button 
            onClick={onBackToHome}
            className="p-1 hover:bg-slate-800 rounded-full transition-colors"
            id="chat-back-button"
          >
            <ArrowLeft className="w-5 h-5 text-amber-400" />
          </button>
          
          {/* Assistant Avatar & Online State */}
          <div className="relative">
            <div className="w-9 h-9 rounded-full bg-red-600 border border-amber-400 flex items-center justify-center shadow-sm">
              <Bot className="w-5 h-5 text-amber-300" />
            </div>
            <span className="absolute bottom-0 right-0 w-2.5 h-2.5 bg-emerald-500 rounded-full border-2 border-[#0B1B3D] animate-ping"></span>
            <span className="absolute bottom-0 right-0 w-2.5 h-2.5 bg-emerald-500 rounded-full border-2 border-[#0B1B3D]"></span>
          </div>
          
          <div>
            <h1 className="text-xs font-bold leading-none tracking-tight flex items-center">
              Kosal Legal AI
              <Sparkles className="w-3 h-3 text-amber-400 ml-1 fill-amber-400 animate-pulse" />
            </h1>
            <p className="text-[9px] text-amber-300 font-mono mt-0.5">ជំនួយការច្បាប់វៃឆ្លាត</p>
          </div>
        </div>
        
        <span className="bg-emerald-500/20 text-emerald-400 border border-emerald-500/30 text-[8px] px-1.5 py-0.5 rounded font-bold uppercase tracking-wider">
          Online
        </span>
      </div>

      {/* Lawyer Inquiry Banner Alert */}
      {initialLawyerInquiry && (
        <div className="bg-amber-50 border-b border-amber-200 px-3 py-2 text-[10px] text-amber-800 flex items-center justify-between shrink-0">
          <p className="font-semibold">
            Drafting consultation inquiry for <span className="font-bold underline">{initialLawyerInquiry}</span>
          </p>
          <button 
            onClick={onClearLawyerInquiry}
            className="text-amber-600 hover:text-amber-900 font-bold ml-2 underline"
          >
            Cancel
          </button>
        </div>
      )}

      {/* Messages Canvas */}
      <div className="flex-1 overflow-y-auto p-3 space-y-4" id="chat-messages-container">
        {messages.map((msg) => (
          <div 
            key={msg.id} 
            className={`flex ${msg.sender === 'user' ? 'justify-end' : 'justify-start'} animate-fade-in`}
          >
            <div className={`flex items-start space-x-2 max-w-[85%] ${msg.sender === 'user' ? 'flex-row-reverse space-x-reverse' : ''}`}>
              {/* Profile Bubble icon */}
              <div className={`w-7 h-7 rounded-full flex items-center justify-center shrink-0 shadow-sm ${
                msg.sender === 'user' 
                  ? 'bg-[#0B1B3D] text-white' 
                  : 'bg-red-600 text-amber-300'
              }`}>
                {msg.sender === 'user' ? (
                  <User className="w-4 h-4 text-amber-400" />
                ) : (
                  <Bot className="w-4 h-4 text-amber-300" />
                )}
              </div>

              {/* Text Balloon */}
              <div className="space-y-1">
                <div className={`rounded-2xl px-3.5 py-2.5 text-xs shadow-sm text-left whitespace-pre-wrap leading-relaxed ${
                  msg.sender === 'user'
                    ? 'bg-[#0B1B3D] text-white rounded-tr-none'
                    : 'bg-white border border-slate-100 text-slate-800 rounded-tl-none font-sans'
                }`}>
                  {/* Parse basic markdown like bold text if generated */}
                  {msg.text.split('\n').map((line, idx) => {
                    if (line.startsWith('---')) {
                      return <hr key={idx} className="border-t border-slate-200 my-2" />;
                    }
                    return <p key={idx} className="mb-1">{line}</p>;
                  })}
                </div>
                
                {/* Time Stamp label */}
                <p className={`text-[8px] text-slate-400 font-mono ${msg.sender === 'user' ? 'text-right' : 'text-left'}`}>
                  {msg.timestamp}
                </p>
              </div>
            </div>
          </div>
        ))}

        {/* Gemini consult Loading state */}
        {loading && (
          <div className="flex justify-start animate-pulse" id="chat-thinking-indicator">
            <div className="flex items-start space-x-2 max-w-[80%]">
              <div className="w-7 h-7 rounded-full bg-red-600 text-amber-300 flex items-center justify-center shrink-0">
                <Bot className="w-4 h-4" />
              </div>
              <div className="bg-white border border-slate-100 rounded-2xl rounded-tl-none px-4 py-3 shadow-sm text-left">
                <div className="flex items-center space-x-2">
                  <div className="flex space-x-1">
                    <span className="w-1.5 h-1.5 bg-red-600 rounded-full animate-bounce" style={{ animationDelay: '0ms' }}></span>
                    <span className="w-1.5 h-1.5 bg-amber-500 rounded-full animate-bounce" style={{ animationDelay: '150ms' }}></span>
                    <span className="w-1.5 h-1.5 bg-[#0B1B3D] rounded-full animate-bounce" style={{ animationDelay: '300ms' }}></span>
                  </div>
                  <span className="text-[10px] text-slate-400 font-semibold italic">Kosal is consulting legal codes...</span>
                </div>
              </div>
            </div>
          </div>
        )}

        {/* Error notification card */}
        {errorText && (
          <div className="bg-red-50 border border-red-200 rounded-xl p-3.5 space-y-2 text-left" id="chat-error-card">
            <div className="flex items-start space-x-2 text-red-700">
              <AlertTriangle className="w-4 h-4 shrink-0 mt-0.5" />
              <div className="flex-1 text-xs">
                <p className="font-bold">Connection Issue / ឧបសគ្គការតភ្ជាប់</p>
                <p className="text-[11px] opacity-90 mt-0.5">{errorText}</p>
              </div>
            </div>
            
            {errorText.includes("GEMINI_API_KEY") && (
              <div className="bg-red-100/50 rounded-lg p-2.5 text-[10px] text-red-800 space-y-1">
                <p className="font-semibold">🔧 How to set up:</p>
                <p>This full-stack application utilizes safe server-side API proxy routing. To enable Kosal's smart features, please click on the **Settings** (gear icon) in the bottom-left workspace rail, open **Secrets**, and add your **GEMINI_API_KEY**.</p>
              </div>
            )}

            <button 
              onClick={() => handleSendMessage(inputText || 'Hello Kosal')}
              className="bg-red-600 hover:bg-red-700 text-white text-[10px] font-bold px-3 py-1.5 rounded-lg flex items-center space-x-1 shadow-sm transition"
            >
              <RefreshCw className="w-3 h-3" />
              <span>Retry Connection</span>
            </button>
          </div>
        )}

        <div ref={messagesEndRef} />
      </div>

      {/* Input panel area */}
      <div className="bg-white border-t border-slate-200 p-2.5 space-y-2 shrink-0">
        
        {/* Horizontal Suggestion pills (Only shown if history has only welcome msg) */}
        {messages.length === 1 && !loading && (
          <div className="space-y-1">
            <p className="text-[9px] text-slate-400 font-bold uppercase tracking-wider px-1">Suggested topics / ប្រធានបទគំរូ៖</p>
            <div className="flex overflow-x-auto space-x-1.5 pb-1 scrollbar-none" id="chat-suggestion-scroll">
              {suggestions.map((sug, i) => (
                <button
                  key={i}
                  onClick={() => handleSuggestionClick(sug.text)}
                  className="bg-slate-50 hover:bg-slate-100 border border-slate-200 rounded-xl px-3 py-1.5 text-left text-[9px] font-medium shrink-0 transition"
                >
                  <p className="text-slate-700 font-bold leading-tight">{sug.text}</p>
                  <p className="text-red-600 text-[8px] leading-none mt-0.5">{sug.labelKh}</p>
                </button>
              ))}
            </div>
          </div>
        )}

        {/* Text Input Row */}
        <form 
          onSubmit={(e) => {
            e.preventDefault();
            handleSendMessage(inputText);
          }}
          className="flex items-center space-x-2"
        >
          <input
            type="text"
            placeholder="Type your legal query... (សួរសំណួរច្បាប់)"
            value={inputText}
            onChange={(e) => setInputText(e.target.value)}
            disabled={loading}
            className="flex-1 bg-slate-50 border border-slate-200 rounded-xl px-3 py-2.5 text-xs focus:bg-white focus:outline-none focus:ring-1 focus:ring-[#0B1B3D] transition disabled:opacity-50"
            id="chat-text-input"
          />
          <button
            type="submit"
            disabled={!inputText.trim() || loading}
            className="bg-red-600 hover:bg-red-700 text-white rounded-xl p-2.5 shadow-sm transition disabled:opacity-50 shrink-0"
            id="chat-send-submit"
          >
            <Send className="w-4 h-4 text-amber-300" />
          </button>
        </form>
      </div>
    </div>
  );
}
