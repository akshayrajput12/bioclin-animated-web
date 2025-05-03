import { Send } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";

interface ChatInputProps {
  value: string;
  onChange: (e: React.ChangeEvent<HTMLInputElement>) => void;
  onKeyDown: (e: React.KeyboardEvent<HTMLInputElement>) => void;
  onSend: () => void;
  isLoading: boolean;
}

export const ChatInput = ({ 
  value, 
  onChange, 
  onKeyDown, 
  onSend, 
  isLoading 
}: ChatInputProps) => {
  return (
    <div className="p-4 border-t border-gray-100 bg-white">
      <div className="flex items-center space-x-2">
        <Input
          value={value}
          onChange={onChange}
          onKeyDown={onKeyDown}
          placeholder="Type your message..."
          className="flex-1 rounded-full border-gray-200 focus:border-primary focus:ring-1 focus:ring-primary"
          disabled={isLoading}
          aria-label="Chat message input"
        />
        <Button
          onClick={onSend}
          disabled={!value.trim() || isLoading}
          size="icon"
          className="rounded-full bg-primary text-white hover:bg-primary/90 transition-all duration-200"
          aria-label="Send message"
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
  );
};
