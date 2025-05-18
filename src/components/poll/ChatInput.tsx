
import { useRef } from "react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Send } from "lucide-react";

type ChatInputProps = {
  inputValue: string;
  setInputValue: (value: string) => void;
  handleSendMessage: () => void;
  isTyping: boolean;
  messageCount: number;
  isGeneratingSummary: boolean;
  onFinishChat: () => void;
};

export const ChatInput = ({
  inputValue,
  setInputValue,
  handleSendMessage,
  isTyping,
  messageCount,
  isGeneratingSummary,
  onFinishChat,
}: ChatInputProps) => {
  const inputRef = useRef<HTMLInputElement>(null);
  
  const handleKeyDown = (e: React.KeyboardEvent) => {
    if (e.key === "Enter" && !e.shiftKey) {
      e.preventDefault();
      handleSendMessage();
    }
  };
  
  return (
    <div className="flex w-full space-x-2">
      <Input
        ref={inputRef}
        placeholder="Type your message..."
        value={inputValue}
        onChange={(e) => setInputValue(e.target.value)}
        onKeyDown={handleKeyDown}
        className="flex-1"
        disabled={isTyping}
      />
      <Button 
        size="icon" 
        onClick={handleSendMessage} 
        disabled={!inputValue.trim() || isTyping}
      >
        <Send className="h-4 w-4" />
      </Button>
      <Button 
        variant="outline" 
        onClick={onFinishChat} 
        disabled={messageCount < 3 || isTyping || isGeneratingSummary}
        className="whitespace-nowrap"
      >
        {isGeneratingSummary ? "Generating..." : "Finish Discussion"}
      </Button>
    </div>
  );
};
