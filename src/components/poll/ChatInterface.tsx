import { useState, useRef, useEffect } from "react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Card, CardContent, CardFooter, CardHeader, CardTitle } from "@/components/ui/card";
import { ScrollArea } from "@/components/ui/scroll-area";
import { Send, MessageCircle } from "lucide-react";
import { chatRespond, generateSummary } from "@/services/chatService";
import { Message } from "@/types/chat";
import { generateId } from "@/services/utils/idUtils";
import { toast } from "@/hooks/use-toast";

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
  
  const messagesEndRef = useRef<HTMLDivElement>(null);
  const inputRef = useRef<HTMLInputElement>(null);
  
  const scrollToBottom = () => {
    messagesEndRef.current?.scrollIntoView({ behavior: "smooth" });
  };
  
  useEffect(() => {
    scrollToBottom();
  }, [messages]);
  
  const handleSendMessage = async () => {
    if (!inputValue.trim()) return;
    
    // Add user message
    const userMessage: Message = {
      id: generateId(),
      content: inputValue,
      sender: "user",
      timestamp: new Date(),
    };
    
    setMessages(prev => [...prev, userMessage]);
    setInputValue("");
    setIsTyping(true);
    
    // Get AI response from service
    try {
      const response = await chatRespond(question, inputValue);
      
      // Add AI message
      const aiMessage: Message = {
        id: generateId(),
        content: response,
        sender: "ai",
        timestamp: new Date(),
      };
      
      setMessages(prev => [...prev, aiMessage]);
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
      
      setMessages(prev => [...prev, errorMessage]);
    } finally {
      setIsTyping(false);
      inputRef.current?.focus();
    }
  };
  
  const handleKeyDown = (e: React.KeyboardEvent) => {
    if (e.key === "Enter" && !e.shiftKey) {
      e.preventDefault();
      handleSendMessage();
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
      
      {summary ? (
        <CardContent className="p-6 space-y-4">
          <div className="bg-secondary p-4 rounded-lg">
            <h3 className="text-sm font-medium mb-2">Summary of your opinion:</h3>
            <p className="text-base">{summary}</p>
          </div>
          
          <p className="text-sm text-muted-foreground">
            Is this summary accurate? If yes, click "Submit" to share this opinion. If not, click "Continue Discussing" to provide more details.
          </p>
        </CardContent>
      ) : (
        <CardContent className="p-0">
          <ScrollArea className="h-[400px] px-4">
            <div className="space-y-4 pt-4 pb-4">
              {messages.map((message) => (
                <div 
                  key={message.id}
                  className={`flex ${message.sender === "user" ? "justify-end" : "justify-start"}`}
                >
                  <div 
                    className={`max-w-[80%] rounded-lg p-3 ${
                      message.sender === "user" 
                        ? "bg-primary text-primary-foreground" 
                        : "bg-secondary"
                    }`}
                  >
                    <p className="text-sm md:text-base whitespace-pre-wrap break-words">{message.content}</p>
                  </div>
                </div>
              ))}
              
              {isTyping && (
                <div className="flex justify-start">
                  <div className="max-w-[80%] rounded-lg p-3 bg-secondary">
                    <div className="flex space-x-2">
                      <div className="w-2 h-2 rounded-full bg-gray-400 animate-pulse"></div>
                      <div className="w-2 h-2 rounded-full bg-gray-400 animate-pulse delay-75"></div>
                      <div className="w-2 h-2 rounded-full bg-gray-400 animate-pulse delay-150"></div>
                    </div>
                  </div>
                </div>
              )}
              <div ref={messagesEndRef} />
            </div>
          </ScrollArea>
        </CardContent>
      )}
      
      <CardFooter className="border-t p-4">
        {summary ? (
          <div className="flex w-full space-x-2">
            <Button 
              variant="outline" 
              className="flex-1" 
              onClick={handleRejectSummary}
            >
              Continue Discussing
            </Button>
            <Button 
              className="flex-1" 
              onClick={handleAcceptSummary}
            >
              Submit Opinion
            </Button>
          </div>
        ) : (
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
              onClick={handleFinishChat} 
              disabled={messages.length < 3 || isTyping || isGeneratingSummary}
              className="whitespace-nowrap"
            >
              {isGeneratingSummary ? "Generating..." : "Finish Discussion"}
            </Button>
          </div>
        )}
      </CardFooter>
    </Card>
  );
};
