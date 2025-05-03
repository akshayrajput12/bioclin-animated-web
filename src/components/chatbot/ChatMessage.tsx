import { MessageSquare } from "lucide-react";
import { Message } from "./ChatBot";

interface ChatMessageProps {
  message: Message;
}

export const ChatMessage = ({ message }: ChatMessageProps) => {
  return (
    <div
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
  );
};
