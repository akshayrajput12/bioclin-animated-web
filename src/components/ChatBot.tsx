import { useState, useRef, useEffect } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { MessageSquare, X, Send, Loader2 } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { generateGeminiResponse } from "@/services/geminiService";

// Message type definition
interface Message {
  id: string;
  content: string;
  sender: "user" | "bot";
  timestamp: Date;
}

// Initial greeting messages
const initialMessages: Message[] = [
  {
    id: "welcome-1",
    content: "Hello! I'm BioClinPharm's virtual assistant.",
    sender: "bot",
    timestamp: new Date(),
  },
  {
    id: "welcome-2",
    content: "How can I help you today?",
    sender: "bot",
    timestamp: new Date(Date.now() + 100),
  },
  {
    id: "options",
    content: "1️⃣ Customer Support\n2️⃣ General Inquiries\n3️⃣ Services Information",
    sender: "bot",
    timestamp: new Date(Date.now() + 200),
  },
];

const ChatBot = () => {
  const [isOpen, setIsOpen] = useState(false);
  const [messages, setMessages] = useState<Message[]>(initialMessages);
  const [inputValue, setInputValue] = useState("");
  const [isLoading, setIsLoading] = useState(false);
  const messagesEndRef = useRef<HTMLDivElement>(null);
  const inputRef = useRef<HTMLInputElement>(null);

  // Auto-scroll to bottom of messages
  useEffect(() => {
    if (messagesEndRef.current) {
      messagesEndRef.current.scrollIntoView({ behavior: "smooth" });
    }
  }, [messages]);

  // Focus input when chat opens
  useEffect(() => {
    if (isOpen && inputRef.current) {
      setTimeout(() => {
        inputRef.current?.focus();
      }, 300);
    }
  }, [isOpen]);

  // Generate a response using Gemini API
  const generateResponse = async (userMessage: string): Promise<string> => {
    try {
      // Call the Gemini API service
      const response = await generateGeminiResponse(userMessage);

      // If there was an error, use a fallback response
      if (response.error) {
        console.error("Error from Gemini API:", response.error);
        return "I'm sorry, I encountered an error processing your request. Please try again later or contact our support team directly at hr@bioclinpharm.com.";
      }

      return response.text;
    } catch (error) {
      console.error("Error generating response:", error);
      return "I'm sorry, I encountered an error processing your request. Please try again later or contact our support team directly.";
    }
  };

  // Handle sending a message
  const handleSendMessage = async () => {
    if (!inputValue.trim()) return;

    // Add user message
    const userMessage: Message = {
      id: `user-${Date.now()}`,
      content: inputValue,
      sender: "user",
      timestamp: new Date(),
    };

    setMessages((prev) => [...prev, userMessage]);
    setInputValue("");
    setIsLoading(true);

    // Generate bot response
    const botResponse = await generateResponse(inputValue);

    // Add bot message
    const botMessage: Message = {
      id: `bot-${Date.now()}`,
      content: botResponse,
      sender: "bot",
      timestamp: new Date(),
    };

    setMessages((prev) => [...prev, botMessage]);
    setIsLoading(false);
  };

  // Handle input submission
  const handleKeyDown = (e: React.KeyboardEvent) => {
    if (e.key === "Enter" && !e.shiftKey) {
      e.preventDefault();
      handleSendMessage();
    }
  };

  return (
    <>
      {/* Chat toggle button */}
      <motion.button
        className="fixed bottom-6 left-6 z-50 flex h-14 w-14 items-center justify-center rounded-full bg-gradient-to-br from-primary to-secondary text-white shadow-lg hover:shadow-xl transition-all duration-300"
        style={{
          boxShadow: isOpen
            ? "0 4px 12px rgba(var(--primary-rgb), 0.3)"
            : "0 4px 20px rgba(var(--primary-rgb), 0.5)"
        }}
        whileHover={{ scale: 1.05 }}
        whileTap={{ scale: 0.95 }}
        onClick={() => setIsOpen(!isOpen)}
      >
        {isOpen ? (
          <X className="h-6 w-6" />
        ) : (
          <>
            <span className="absolute flex h-14 w-14">
              <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-primary/40 opacity-30"></span>
            </span>
            <MessageSquare className="h-6 w-6" />
          </>
        )}
      </motion.button>

      {/* Chat window */}
      <AnimatePresence>
        {isOpen && (
          <motion.div
            className="fixed bottom-24 left-6 z-50 w-80 sm:w-96 rounded-2xl bg-white shadow-2xl overflow-hidden border border-gray-100"
            initial={{ opacity: 0, y: 20, scale: 0.95 }}
            animate={{ opacity: 1, y: 0, scale: 1 }}
            exit={{ opacity: 0, y: 20, scale: 0.95 }}
            transition={{ duration: 0.3, ease: "easeOut" }}
          >
            {/* Chat header with gradient background */}
            <div
              className="p-4 text-white flex items-center justify-between"
              style={{
                background: "linear-gradient(135deg, hsl(var(--primary)) 0%, hsl(var(--secondary)) 100%)",
              }}
            >
              <div className="flex items-center space-x-3">
                <div className="w-10 h-10 rounded-full bg-white/20 flex items-center justify-center backdrop-blur-sm">
                  <MessageSquare className="h-5 w-5" />
                </div>
                <div>
                  <h3 className="font-semibold text-lg">BioClinPharm Assistant</h3>
                  <p className="text-xs opacity-90">How can we help you today?</p>
                </div>
              </div>
              <Button
                variant="ghost"
                size="icon"
                className="text-white hover:bg-white/20 rounded-full"
                onClick={() => setIsOpen(false)}
              >
                <X className="h-4 w-4" />
              </Button>
            </div>

            {/* Chat messages with elegant styling */}
            <div className="h-80 overflow-y-auto p-4 bg-gray-50/80">
              {messages.map((message) => (
                <div
                  key={message.id}
                  className={`mb-4 flex ${
                    message.sender === "user" ? "justify-end" : "justify-start"
                  }`}
                >
                  {message.sender === "bot" && (
                    <div className="w-8 h-8 rounded-full bg-primary/10 flex items-center justify-center mr-2 mt-1">
                      <MessageSquare className="h-4 w-4 text-primary" />
                    </div>
                  )}
                  <div
                    className={`max-w-[75%] rounded-2xl px-4 py-3 ${
                      message.sender === "user"
                        ? "bg-gradient-to-br from-primary to-primary/90 text-white"
                        : "bg-white shadow-sm border border-gray-100"
                    }`}
                    style={{
                      borderTopLeftRadius: message.sender === "bot" ? "0" : undefined,
                      borderTopRightRadius: message.sender === "user" ? "0" : undefined,
                    }}
                  >
                    <p className="text-sm whitespace-pre-line leading-relaxed">{message.content}</p>
                    <p className="text-xs mt-1 opacity-70 text-right">
                      {message.timestamp.toLocaleTimeString([], {
                        hour: "2-digit",
                        minute: "2-digit",
                      })}
                    </p>
                  </div>
                </div>
              ))}
              {isLoading && (
                <div className="mb-4 flex justify-start">
                  <div className="w-8 h-8 rounded-full bg-primary/10 flex items-center justify-center mr-2 mt-1">
                    <MessageSquare className="h-4 w-4 text-primary" />
                  </div>
                  <div className="max-w-[75%] rounded-2xl px-4 py-3 bg-white shadow-sm border border-gray-100" style={{ borderTopLeftRadius: 0 }}>
                    <div className="flex items-center space-x-2">
                      <div className="flex space-x-1">
                        <span className="w-2 h-2 rounded-full bg-primary/60 animate-bounce" style={{ animationDelay: "0ms" }}></span>
                        <span className="w-2 h-2 rounded-full bg-primary/60 animate-bounce" style={{ animationDelay: "150ms" }}></span>
                        <span className="w-2 h-2 rounded-full bg-primary/60 animate-bounce" style={{ animationDelay: "300ms" }}></span>
                      </div>
                    </div>
                  </div>
                </div>
              )}
              <div ref={messagesEndRef} />
            </div>

            {/* Chat input with elegant styling */}
            <div className="p-4 border-t border-gray-100 bg-white">
              <div className="flex items-center space-x-2">
                <Input
                  ref={inputRef}
                  value={inputValue}
                  onChange={(e) => setInputValue(e.target.value)}
                  onKeyDown={handleKeyDown}
                  placeholder="Type your message..."
                  className="flex-1 rounded-full border-gray-200 focus:border-primary focus:ring-1 focus:ring-primary"
                  disabled={isLoading}
                />
                <Button
                  onClick={handleSendMessage}
                  disabled={!inputValue.trim() || isLoading}
                  size="icon"
                  className="rounded-full bg-primary text-white hover:bg-primary/90 transition-all duration-200"
                >
                  <Send className="h-4 w-4" />
                </Button>
              </div>
              <div className="mt-2 text-center">
                <p className="text-xs text-gray-400">
                  Powered by BioClinPharm AI
                </p>
              </div>
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </>
  );
};

export default ChatBot;
