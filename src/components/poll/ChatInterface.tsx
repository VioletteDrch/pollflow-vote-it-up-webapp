import { useState } from "react";
import { Card, CardContent, CardFooter, CardHeader, CardTitle } from "@/components/ui/card";
import { MessageCircle } from "lucide-react";
import { chatRespond, generateSummary } from "@/services/chatService";
import { Message } from "@/types/chat";
import { generateId } from "@/services/utils/idUtils";
import { toast } from "@/hooks/use-toast";
import { MessageList } from "./MessageList";
import { ChatInput } from "./ChatInput";
import { SummaryView } from "./SummaryView";

type ChatInterfaceProps = {
  question: string;
  onSummaryComplete: (summary: string) => void;
};

export const ChatInterface = ({ question, onSummaryComplete }: ChatInterfaceProps) => {
  const [messages, setMessages] = useState<Message[]>([
    {
      id: generateId(),
      content: `Hi! I'm here to discuss the question: "${question}". What are your thoughts on this topic?`,
      sender: "ai",
      timestamp: new Date(),
    },
  ]);
  
  const [inputValue, setInputValue] = useState("");
  const [isTyping, setIsTyping] = useState(false);
  const [summary, setSummary] = useState<string | null>(null);
  const [isGeneratingSummary, setIsGeneratingSummary] = useState(false);
  
  const handleSendMessage = async () => {
    if (!inputValue.trim()) return;
    
    // Create user message
    const userMessage: Message = {
      id: generateId(),
      content: inputValue,
      sender: "user",
      timestamp: new Date(),
    };
    
    setInputValue("");
    setIsTyping(true);
    
    // Get AI response from service using current messages (without the new user message)
    try {
      const response = await chatRespond(question, inputValue, messages);
      
      // Add AI message
      const aiMessage: Message = {
        id: generateId(),
        content: response,
        sender: "ai",
        timestamp: new Date(),
      };
      
      // Add both user and AI messages together
      setMessages(prev => [...prev, userMessage, aiMessage]);
    } catch (error) {
      console.error("Error getting AI response:", error);
      toast({
        title: "Error",
        description: "Failed to get response. Please try again.",
        variant: "destructive"
      });
      
      // Add error message
      const errorMessage: Message = {
        id: generateId(),
        content: "Sorry, I'm having trouble responding. Please try again.",
        sender: "ai",
        timestamp: new Date(),
      };
      
      // Add both user message and error message
      setMessages(prev => [...prev, userMessage, errorMessage]);
    } finally {
      setIsTyping(false);
    }
  };
  
  const handleFinishChat = async () => {
    setIsGeneratingSummary(true);
    
    try {
      const generatedSummary = await generateSummary(question, messages);
      setSummary(generatedSummary);
    } catch (error) {
      console.error("Error generating summary:", error);
      toast({
        title: "Error",
        description: "Failed to generate summary. Please try again.",
        variant: "destructive"
      });
    } finally {
      setIsGeneratingSummary(false);
    }
  };
  
  const handleAcceptSummary = () => {
    if (summary) {
      onSummaryComplete(summary);
    }
  };
  
  const handleRejectSummary = () => {
    setSummary(null);
    
    // Add AI message asking for more input
    const aiMessage: Message = {
      id: generateId(),
      content: "I see. Let's continue our discussion so I can better understand your perspective.",
      sender: "ai",
      timestamp: new Date(),
    };
    
    setMessages(prev => [...prev, aiMessage]);
  };
  
  return (
    <Card className="w-full max-w-2xl mx-auto">
      <CardHeader>
        <CardTitle className="flex items-center gap-2">
          <MessageCircle className="h-5 w-5" />
          <span>Discussion on: {question}</span>
        </CardTitle>
      </CardHeader>
      
      <CardContent className={summary ? "p-6 space-y-4" : "p-0"}>
        {summary ? (
          <SummaryView 
            summary={summary} 
            onAccept={handleAcceptSummary} 
            onReject={handleRejectSummary} 
          />
        ) : (
          <MessageList messages={messages} isTyping={isTyping} />
        )}
      </CardContent>
      
      <CardFooter className="border-t p-4">
        {!summary && (
          <ChatInput 
            inputValue={inputValue}
            setInputValue={setInputValue}
            handleSendMessage={handleSendMessage}
            isTyping={isTyping}
            messageCount={messages.length}
            isGeneratingSummary={isGeneratingSummary}
            onFinishChat={handleFinishChat}
          />
        )}
      </CardFooter>
    </Card>
  );
};
