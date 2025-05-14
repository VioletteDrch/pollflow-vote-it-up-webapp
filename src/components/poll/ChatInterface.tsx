
import { useState, useRef, useEffect } from "react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Card, CardContent, CardFooter, CardHeader, CardTitle } from "@/components/ui/card";
import { Avatar } from "@/components/ui/avatar";
import { ScrollArea } from "@/components/ui/scroll-area";
import { Send, MessageCircle } from "lucide-react";

type Message = {
  id: string;
  content: string;
  sender: "user" | "ai";
  timestamp: Date;
};

type ChatInterfaceProps = {
  question: string;
  onSummaryComplete: (summary: string) => void;
};

const generateId = () => Math.random().toString(36).substring(2, 15);

// Simulated AI responses - to be replaced with actual AI integration
const simulateAIResponse = async (message: string, question: string): Promise<string> => {
  // This is a placeholder that would be replaced with actual AI call
  const responses = [
    `That's an interesting perspective on "${question}". Can you elaborate more?`,
    `I understand your point. Have you considered other aspects of this issue?`,
    `Thanks for sharing. Would you like me to provide more information about this topic?`,
    `That's a valid view. Is there anything specific you'd like to know about this question?`
  ];
  
  await new Promise(resolve => setTimeout(resolve, 1000)); // Simulate network delay
  return responses[Math.floor(Math.random() * responses.length)];
};

// Simulated summary generation - to be replaced with actual AI summary
const generateSummary = async (messages: Message[], question: string): Promise<string> => {
  await new Promise(resolve => setTimeout(resolve, 1500)); // Simulate processing
  const userMessages = messages.filter(m => m.sender === "user").map(m => m.content).join(" ");
  return `Based on our conversation about "${question}", your main points appear to be: ${userMessages.substring(0, 100)}... Is this summary accurate?`;
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
    
    // Simulate AI response
    try {
      const response = await simulateAIResponse(inputValue, question);
      
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
      const generatedSummary = await generateSummary(messages, question);
      setSummary(generatedSummary);
    } catch (error) {
      console.error("Error generating summary:", error);
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
