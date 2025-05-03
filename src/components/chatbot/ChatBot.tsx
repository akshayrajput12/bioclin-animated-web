import { useState, useRef, useEffect } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { MessageSquare, X, Send, Loader2 } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { generateGeminiResponse } from "@/services/geminiService";
import { ChatMessage } from "./ChatMessage";
import { ChatInput } from "./ChatInput";

// Message type definition
export interface Message {
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
    content: "You can ask me about:\n• Our clinical research services\n• Data analytics capabilities\n• Regulatory affairs support\n• Contact information\n• Office locations",
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

  // Auto-scroll to bottom of messages
  useEffect(() => {
    if (messagesEndRef.current) {
      messagesEndRef.current.scrollIntoView({ behavior: "smooth" });
    }
  }, [messages]);

  // Generate a response using Gemini API
  const generateResponse = async (userMessage: string): Promise<string> => {
    try {
      // Call the Gemini API service
      const response = await generateGeminiResponse(userMessage);

      // If there was an error, use a fallback response
      if (response.error) {
        console.error("Error from Gemini API:", response.error);
        return "I'm sorry, I encountered an error processing your request. Please try again later or contact our support team directly at hr@bioclinpharm.com or call +1 (484) 630-1569.";
      }

      return response.text;
    } catch (error) {
      console.error("Error generating response:", error);
      return "I'm sorry, I encountered an error processing your request. Please try again later or contact our support team directly at hr@bioclinpharm.com or call +1 (484) 630-1569.";
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

  // Handle key press (Enter to send)
  const handleKeyDown = (e: React.KeyboardEvent<HTMLInputElement>) => {
    if (e.key === "Enter" && !e.shiftKey) {
      e.preventDefault();
      if (inputValue.trim() && !isLoading) {
        handleSendMessage();
      }
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
        aria-label={isOpen ? "Close chat" : "Open chat"}
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
                aria-label="Close chat"
              >
                <X className="h-4 w-4" />
              </Button>
            </div>

            {/* Chat messages */}
            <div className="h-80 overflow-y-auto p-4 bg-gray-50/80">
              {messages.map((message) => (
                <ChatMessage key={message.id} message={message} />
              ))}

              {/* Loading indicator */}
              {isLoading && (
                <div className="flex items-center space-x-2 p-2 mb-4">
                  <div className="w-8 h-8 rounded-full bg-primary/10 flex items-center justify-center">
                    <Loader2 className="h-4 w-4 text-primary animate-spin" />
                  </div>
                  <div className="bg-white shadow-sm border border-gray-100 rounded-2xl px-4 py-2">
                    <p className="text-sm text-gray-500">Thinking...</p>
                  </div>
                </div>
              )}

              {/* Invisible element for auto-scrolling */}
              <div ref={messagesEndRef} />
            </div>

            {/* Chat input */}
            <ChatInput
              value={inputValue}
              onChange={(e) => setInputValue(e.target.value)}
              onKeyDown={handleKeyDown}
              onSend={handleSendMessage}
              isLoading={isLoading}
            />
          </motion.div>
        )}
      </AnimatePresence>
    </>
  );
};

export default ChatBot;
