import { useState, useEffect, useRef } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import {
  X,
  Send,
  Bot,
  Sparkles,
  RotateCcw,
  AlertCircle,
  User,
  Zap
} from 'lucide-react';
import { sendMessageToAI } from '../services/chatApi';

const STARTER_PROMPTS = [
  "How much does a basic landing page cost at CloudNexis?",
  "What are the cancellation and refund policies?",
  "Tell me about your portfolio projects",
  "How do I contact your team?"
];

const INITIAL_MESSAGE = {
  id: 'init-1',
  role: 'assistant',
  content: "Hello! 👋 I'm CloudNexis AI, your intelligent guide to our cloud solutions, digital transformation, and engineering services. How can I help you today?",
  timestamp: new Date()
};

function formatMessageContent(content) {
  if (typeof content !== 'string') return content;
  const parts = content.split(/(\*\*.*?\*\*)/g);
  return parts.map((part, i) => {
    if (part.startsWith('**') && part.endsWith('**')) {
      return (
        <strong key={i} className="font-semibold text-white">
          {part.slice(2, -2)}
        </strong>
      );
    }
    return part;
  });
}

export default function AIChatbot() {
  const [isOpen, setIsOpen] = useState(false);
  const [messages, setMessages] = useState([INITIAL_MESSAGE]);
  const [inputText, setInputText] = useState('');
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState(null);
  const [hasInteracted, setHasInteracted] = useState(false);

  const messagesEndRef = useRef(null);
  const chatBodyRef = useRef(null);
  const inputRef = useRef(null);
  const chatPanelRef = useRef(null);
  const failedMessageRef = useRef(null);

  // Auto-scroll to latest message safely within the chat body
  const scrollToBottom = (behavior = 'smooth') => {
    if (chatBodyRef.current) {
      if (behavior === 'smooth') {
        chatBodyRef.current.scrollTo({
          top: chatBodyRef.current.scrollHeight,
          behavior: 'smooth'
        });
      } else {
        chatBodyRef.current.scrollTop = chatBodyRef.current.scrollHeight;
      }
    }
  };

  useEffect(() => {
    if (isOpen) {
      scrollToBottom('instant');
      // Focus input when opened
      const timer = setTimeout(() => {
        inputRef.current?.focus();
      }, 250);
      return () => clearTimeout(timer);
    }
  }, [isOpen]);

  useEffect(() => {
    scrollToBottom('smooth');
  }, [messages, isLoading, error]);

  // Isolate chat body scrolling so the outer page / Lenis never scrolls
  useEffect(() => {
    const chatBody = chatBodyRef.current;
    if (!chatBody || !isOpen) return;

    const handleWheel = (e) => {
      e.stopPropagation();
      const { scrollTop, scrollHeight, clientHeight } = chatBody;
      const atTop = scrollTop <= 0 && e.deltaY < 0;
      const atBottom = scrollTop + clientHeight >= scrollHeight - 1 && e.deltaY > 0;

      if (atTop || atBottom) {
        e.preventDefault();
      }
    };

    chatBody.addEventListener('wheel', handleWheel, { passive: false });
    return () => chatBody.removeEventListener('wheel', handleWheel);
  }, [isOpen]);

  // Handle ESC key to close
  useEffect(() => {
    const handleKeyDown = (e) => {
      if (e.key === 'Escape' && isOpen) {
        setIsOpen(false);
      }
    };
    window.addEventListener('keydown', handleKeyDown);
    return () => window.removeEventListener('keydown', handleKeyDown);
  }, [isOpen]);

  // Send message handler (supports clean retry of exact failed message)
  const handleSend = async (textToSend, isRetry = false) => {
    const messageContent = (textToSend || inputText).trim();
    if (!messageContent || isLoading) return;

    setError(null);
    setHasInteracted(true);
    setInputText('');

    if (!isRetry) {
      const userMsgId = 'user-' + Date.now();
      const userMsg = {
        id: userMsgId,
        role: 'user',
        content: messageContent,
        timestamp: new Date()
      };
      setMessages((prev) => [...prev, userMsg]);
    }

    setIsLoading(true);

    try {
      const replyText = await sendMessageToAI(messageContent);
      failedMessageRef.current = null;
      const aiMsg = {
        id: 'ai-' + Date.now(),
        role: 'assistant',
        content: replyText,
        timestamp: new Date()
      };
      setMessages((prev) => [...prev, aiMsg]);
    } catch (err) {
      failedMessageRef.current = messageContent;
      setError(err.message || 'Something went wrong. Please try again.');
    } finally {
      setIsLoading(false);
    }
  };

  const handleKeyDownInput = (e) => {
    if (e.key === 'Enter' && !e.shiftKey) {
      e.preventDefault();
      handleSend();
    }
  };

  const handleClearChat = () => {
    setMessages([
      {
        id: 'init-' + Date.now(),
        role: 'assistant',
        content: "Chat refreshed. How can I assist you with CloudNexis services?",
        timestamp: new Date()
      }
    ]);
    setError(null);
    setHasInteracted(false);
  };

  // Helper to format timestamps
  const formatTime = (date) => {
    try {
      return new Intl.DateTimeFormat('en-US', {
        hour: 'numeric',
        minute: 'numeric',
        hour12: true
      }).format(date);
    } catch {
      return '';
    }
  };

  return (
    <>
      {/* Floating Trigger Button */}
      {/* On desktop: bottom-8 right-8 */}
      {/* On mobile: bottom-28 right-4 (cleanly elevated above MobileNav) */}
      <div className="fixed bottom-28 right-4 md:bottom-8 md:right-8 z-50 pointer-events-auto">
        <motion.div
          initial={{ scale: 0, opacity: 0 }}
          animate={{ scale: 1, opacity: 1 }}
          transition={{ type: 'spring', stiffness: 260, damping: 20 }}
          className="relative group"
        >
          {/* Ambient Glow Aura */}
          <div className="absolute -inset-1 rounded-full bg-gradient-to-r from-blue-600 via-cyan-500 to-indigo-600 opacity-60 blur-md group-hover:opacity-100 group-hover:blur-lg transition-all duration-500 animate-pulse pointer-events-none" />

          {/* Trigger Button */}
          <button
            onClick={() => setIsOpen(!isOpen)}
            aria-label={isOpen ? "Close CloudNexis AI Chatbot" : "Open CloudNexis AI Chatbot"}
            aria-expanded={isOpen}
            className={`relative flex items-center justify-center w-14 h-14 md:w-16 md:h-16 rounded-full bg-[#0a0f1d] border ${
              isOpen ? 'border-blue-400 text-blue-400' : 'border-blue-500/40 text-white'
            } shadow-[0_0_25px_rgba(59,130,246,0.3)] hover:shadow-[0_0_35px_rgba(59,130,246,0.6)] hover:border-blue-400 transition-all duration-300 active:scale-95 cursor-pointer`}
          >
            {/* Animated Ring Indicator */}
            <span className="absolute inset-0 rounded-full border border-blue-400/30 animate-ping opacity-30 pointer-events-none" />

            <AnimatePresence mode="wait">
              {isOpen ? (
                <motion.div
                  key="close-icon"
                  initial={{ rotate: -90, opacity: 0 }}
                  animate={{ rotate: 0, opacity: 1 }}
                  exit={{ rotate: 90, opacity: 0 }}
                  transition={{ duration: 0.2 }}
                >
                  <X size={26} className="text-blue-300" />
                </motion.div>
              ) : (
                <motion.div
                  key="bot-icon"
                  initial={{ scale: 0.6, opacity: 0 }}
                  animate={{ scale: 1, opacity: 1 }}
                  exit={{ scale: 0.6, opacity: 0 }}
                  transition={{ duration: 0.2 }}
                  className="relative flex items-center justify-center"
                >
                  <Bot size={28} className="text-blue-400 group-hover:text-blue-300 transition-colors" />
                  <Sparkles size={14} className="absolute -top-1 -right-1 text-cyan-300 animate-pulse" />
                </motion.div>
              )}
            </AnimatePresence>

            {/* Online Status Dot */}
            <span className="absolute top-1 right-1 flex h-3 w-3">
              <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-emerald-400 opacity-75" />
              <span className="relative inline-flex rounded-full h-3 w-3 bg-emerald-500 border-2 border-[#0a0f1d]" />
            </span>
          </button>

          {/* Desktop Hover Tooltip */}
          {!isOpen && (
            <div className="hidden md:block absolute right-full mr-3 top-1/2 -translate-y-1/2 opacity-0 group-hover:opacity-100 transition-opacity duration-200 pointer-events-none whitespace-nowrap">
              <div className="bg-[#0b1329]/90 backdrop-blur-md text-xs text-white px-3 py-1.5 rounded-lg border border-blue-500/20 shadow-xl flex items-center gap-1.5">
                <Zap size={12} className="text-cyan-400" />
                <span>Chat with <strong>CloudNexis AI</strong></span>
              </div>
            </div>
          )}
        </motion.div>
      </div>

      {/* Chatbot Window Panel */}
      <AnimatePresence>
        {isOpen && (
          <motion.aside
            ref={chatPanelRef}
            role="dialog"
            aria-label="CloudNexis AI Chat Window"
            aria-modal="false"
            data-lenis-prevent="true"
            onWheel={(e) => e.stopPropagation()}
            onTouchMove={(e) => e.stopPropagation()}
            initial={{ opacity: 0, y: 30, scale: 0.95 }}
            animate={{ opacity: 1, y: 0, scale: 1 }}
            exit={{ opacity: 0, y: 20, scale: 0.95 }}
            transition={{ type: 'spring', stiffness: 300, damping: 25 }}
            style={{
              height: 'min(520px, calc(100vh - 7.5rem))',
              maxHeight: 'calc(100vh - 7rem)',
              overscrollBehavior: 'contain',
            }}
            className="fixed z-[60] flex flex-col overflow-hidden overscroll-contain
              /* Mobile viewport */
              inset-x-3 bottom-24 sm:inset-auto sm:top-auto sm:right-8 sm:bottom-20 sm:w-[400px]
              bg-[#0a0f1d]/95 backdrop-blur-2xl border border-blue-500/25 rounded-2xl sm:rounded-3xl
              shadow-[0_15px_60px_rgba(0,0,0,0.8),0_0_40px_rgba(59,130,246,0.18)]"
          >
            {/* Ambient Background Gradient Mesh */}
            <div className="absolute inset-0 bg-gradient-to-b from-blue-600/10 via-transparent to-indigo-600/10 pointer-events-none" />
            <div className="absolute -top-24 -right-24 w-48 h-48 bg-blue-500/15 rounded-full blur-3xl pointer-events-none" />
            <div className="absolute -bottom-24 -left-24 w-48 h-48 bg-cyan-500/10 rounded-full blur-3xl pointer-events-none" />

            {/* Header */}
            <header className="relative z-10 flex-shrink-0 flex items-center justify-between px-4 py-3.5 border-b border-white/10 bg-white/[0.02]">
              <div className="flex items-center gap-3">
                {/* Bot Avatar */}
                <div className="relative flex items-center justify-center w-10 h-10 rounded-xl bg-gradient-to-br from-blue-500/20 to-indigo-500/20 border border-blue-500/30 text-blue-400 shadow-[0_0_15px_rgba(59,130,246,0.25)]">
                  <Bot size={22} className="text-cyan-300" />
                  <span className="absolute bottom-0 right-0 w-2.5 h-2.5 bg-emerald-500 border-2 border-[#0a0f1d] rounded-full" />
                </div>

                {/* Title & Status */}
                <div>
                  <div className="flex items-center gap-1.5">
                    <h2 className="text-sm font-bold text-white tracking-wide">
                      CloudNexis AI
                    </h2>
                    <span className="px-1.5 py-0.5 text-[9px] font-semibold uppercase tracking-wider text-cyan-300 bg-blue-500/20 border border-blue-400/30 rounded-full">
                      Assistant
                    </span>
                  </div>
                  <p className="text-[11px] text-gray-400 flex items-center gap-1">
                    <span className="inline-block w-1.5 h-1.5 rounded-full bg-emerald-400 animate-pulse" />
                    Online & Ready
                  </p>
                </div>
              </div>

              {/* Header Action Controls */}
              <div className="flex items-center gap-1">
                <button
                  onClick={handleClearChat}
                  title="Reset conversation"
                  aria-label="Reset conversation"
                  className="p-1.5 text-gray-400 hover:text-white hover:bg-white/10 rounded-lg transition-colors cursor-pointer"
                >
                  <RotateCcw size={16} />
                </button>

                <button
                  onClick={() => setIsOpen(false)}
                  title="Minimize chat"
                  aria-label="Minimize chat"
                  className="p-1.5 text-gray-400 hover:text-white hover:bg-white/10 rounded-lg transition-colors cursor-pointer"
                >
                  <X size={18} />
                </button>
              </div>
            </header>

            {/* Chat Messages Body */}
            <div
              ref={chatBodyRef}
              data-lenis-prevent="true"
              style={{ overscrollBehavior: 'contain' }}
              className="relative z-10 flex-1 min-h-0 overflow-y-auto overscroll-contain px-4 py-4 space-y-4 text-sm scrollbar-thin scrollbar-thumb-white/10 hover:scrollbar-thumb-white/20"
            >
              {messages.map((msg) => {
                const isUser = msg.role === 'user';
                return (
                  <div
                    key={msg.id}
                    className={`flex items-end gap-2.5 ${isUser ? 'justify-end' : 'justify-start'}`}
                  >
                    {!isUser && (
                      <div className="flex-shrink-0 w-7 h-7 rounded-lg bg-blue-500/20 border border-blue-500/30 flex items-center justify-center text-cyan-300 text-xs shadow-sm mb-1">
                        <Bot size={14} />
                      </div>
                    )}

                    <div
                      className={`relative max-w-[82%] px-4 py-2.5 rounded-2xl transition-all ${
                        isUser
                          ? 'bg-gradient-to-r from-blue-600 to-indigo-600 text-white rounded-br-xs shadow-[0_4px_15px_rgba(37,99,235,0.25)] border border-blue-400/20'
                          : 'bg-white/[0.06] backdrop-blur-md text-gray-100 rounded-bl-xs border border-white/10 shadow-sm'
                      }`}
                    >
                      <div className="leading-relaxed whitespace-pre-wrap break-words text-[13px] md:text-sm">
                        {formatMessageContent(msg.content)}
                      </div>

                      {msg.timestamp && (
                        <div
                          className={`text-[9px] mt-1 flex ${
                            isUser ? 'justify-end text-blue-200/70' : 'justify-start text-gray-400'
                          }`}
                        >
                          {formatTime(msg.timestamp)}
                        </div>
                      )}
                    </div>

                    {isUser && (
                      <div className="flex-shrink-0 w-7 h-7 rounded-lg bg-gradient-to-br from-indigo-500 to-purple-600 flex items-center justify-center text-white text-xs shadow-sm mb-1">
                        <User size={14} />
                      </div>
                    )}
                  </div>
                );
              })}

              {/* Animated Typing Indicator */}
              {isLoading && (
                <div className="flex items-end gap-2.5 justify-start">
                  <div className="flex-shrink-0 w-7 h-7 rounded-lg bg-blue-500/20 border border-blue-500/30 flex items-center justify-center text-cyan-300 text-xs shadow-sm mb-1">
                    <Bot size={14} />
                  </div>
                  <div className="bg-white/[0.06] backdrop-blur-md border border-white/10 rounded-2xl rounded-bl-xs px-4 py-3 text-gray-300 shadow-sm">
                    <div className="flex items-center gap-1.5">
                      <span className="text-xs text-gray-400 mr-1 font-medium">CloudNexis AI is thinking</span>
                      <span className="w-1.5 h-1.5 bg-cyan-400 rounded-full animate-bounce [animation-delay:-0.3s]" />
                      <span className="w-1.5 h-1.5 bg-blue-400 rounded-full animate-bounce [animation-delay:-0.15s]" />
                      <span className="w-1.5 h-1.5 bg-indigo-400 rounded-full animate-bounce" />
                    </div>
                  </div>
                </div>
              )}

              {/* Error Message Box with Retry */}
              {error && (
                <motion.div
                  initial={{ opacity: 0, y: 10 }}
                  animate={{ opacity: 1, y: 0 }}
                  className="bg-red-500/10 border border-red-500/30 rounded-xl p-3 text-xs text-red-200 flex items-start gap-2.5"
                >
                  <AlertCircle size={16} className="text-red-400 flex-shrink-0 mt-0.5" />
                  <div className="flex-1">
                    <p className="font-semibold text-red-300">Response Error</p>
                    <p className="text-red-200/80 mt-0.5">{error}</p>
                    <button
                      onClick={() => {
                        const textToRetry =
                          failedMessageRef.current ||
                          [...messages].reverse().find((m) => m.role === 'user')?.content;
                        if (textToRetry) {
                          handleSend(textToRetry, true);
                        }
                      }}
                      className="mt-2 inline-flex items-center gap-1 text-[11px] font-semibold text-cyan-300 hover:text-cyan-200 underline cursor-pointer"
                    >
                      <RotateCcw size={12} /> Retry last message
                    </button>
                  </div>
                </motion.div>
              )}

              {/* Starter Suggestion Chips (shown initially before conversation starts) */}
              {!hasInteracted && messages.length === 1 && !isLoading && (
                <div className="pt-2">
                  <p className="text-[11px] font-medium text-gray-400 uppercase tracking-wider mb-2 flex items-center gap-1">
                    <Sparkles size={12} className="text-cyan-400" />
                    Suggested Prompts:
                  </p>
                  <div className="flex flex-col gap-1.5">
                    {STARTER_PROMPTS.map((prompt) => (
                      <button
                        key={prompt}
                        onClick={() => handleSend(prompt)}
                        className="text-left text-xs bg-white/[0.03] hover:bg-blue-500/15 border border-white/10 hover:border-blue-500/40 text-gray-300 hover:text-white px-3 py-2 rounded-xl transition-all duration-200 active:scale-[0.98] cursor-pointer"
                      >
                        {prompt}
                      </button>
                    ))}
                  </div>
                </div>
              )}

              <div ref={messagesEndRef} />
            </div>

            {/* Input Form Footer */}
            <footer className="relative z-10 flex-shrink-0 p-3 border-t border-white/10 bg-white/[0.02]">
              <form
                onSubmit={(e) => {
                  e.preventDefault();
                  handleSend();
                }}
                className="flex items-center gap-2"
              >
                <div className="relative flex-1">
                  <input
                    ref={inputRef}
                    type="text"
                    value={inputText}
                    onChange={(e) => setInputText(e.target.value)}
                    onKeyDown={handleKeyDownInput}
                    placeholder={isLoading ? "Waiting for response..." : "Ask CloudNexis AI anything..."}
                    disabled={isLoading}
                    aria-label="Your message for CloudNexis AI"
                    className="w-full bg-white/[0.05] border border-white/15 focus:border-blue-400/60 focus:ring-2 focus:ring-blue-500/20 text-white placeholder-gray-500 text-xs sm:text-sm rounded-xl px-3.5 py-2.5 outline-none transition-all duration-200 disabled:opacity-50"
                  />
                </div>

                <button
                  type="submit"
                  disabled={!inputText.trim() || isLoading}
                  aria-label="Send message"
                  className="flex items-center justify-center w-10 h-10 rounded-xl bg-gradient-to-r from-blue-600 to-indigo-600 hover:from-blue-500 hover:to-indigo-500 text-white shadow-md shadow-blue-600/30 disabled:opacity-40 disabled:cursor-not-allowed disabled:hover:from-blue-600 disabled:hover:to-indigo-600 transition-all duration-200 active:scale-95 cursor-pointer flex-shrink-0"
                >
                  <Send size={16} />
                </button>
              </form>

              <div className="mt-1.5 flex items-center justify-between text-[10px] text-gray-500 px-1">
                <span>Press <strong>Enter</strong> to send</span>
                <span className="flex items-center gap-1">
                  Powered by <strong>CloudNexis</strong>
                </span>
              </div>
            </footer>
          </motion.aside>
        )}
      </AnimatePresence>
    </>
  );
}
