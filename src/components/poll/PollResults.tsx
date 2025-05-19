
/**
 * Component for displaying poll results.
 * Shows different UI based on poll type:
 * - For multiple choice: displays options with vote counts and percentages
 * - For text-based: displays list of text answers
 * 
 * Takes a poll object as a prop and visualizes its current state.
 */

import { useState } from "react";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { ScrollArea } from "@/components/ui/scroll-area";
import { Poll } from "@/types/poll";
import { Button } from "@/components/ui/button";
import { BarChart2 } from "lucide-react";
import { toast } from "sonner";
import { analyzeOpinions } from "@/services/chatService";

type PollResultsProps = {
  poll: Poll;
};

export const PollResults = ({ poll }: PollResultsProps) => {
  const [isAnalyzing, setIsAnalyzing] = useState(false);
  const [analysis, setAnalysis] = useState<string | null>(null);
  
  const handleAnalyzeOpinions = async () => {
    if (!poll.isTextBased || poll.answers.length === 0) {
      toast.error("No text responses to analyze");
      return;
    }
    
    setIsAnalyzing(true);
    setAnalysis(null);
    
    try {
      const result = await analyzeOpinions(poll.id, poll.question, poll.answers);
      setAnalysis(result);
      toast.success("Analysis complete!");
    } catch (error) {
      console.error("Error analyzing opinions:", error);
      toast.error("Failed to analyze opinions. Please try again.");
    } finally {
      setIsAnalyzing(false);
    }
  };
  
  if (poll.isTextBased) {
    if (!poll.answers || poll.answers.length === 0) {
      return (
        <Card className="w-full max-w-2xl mx-auto">
          <CardHeader>
            <CardTitle className="text-xl font-bold">{poll.question}</CardTitle>
          </CardHeader>
          <CardContent>
            <p className="text-center py-6 text-muted-foreground">
              No responses have been submitted yet.
            </p>
          </CardContent>
        </Card>
      );
    }
    
    return (
      <Card className="w-full max-w-2xl mx-auto">
        <CardHeader>
          <CardTitle className="text-xl font-bold">{poll.question}</CardTitle>
          <p className="text-muted-foreground mt-2">
            {poll.answers.length} {poll.answers.length === 1 ? "response" : "responses"} submitted
          </p>
        </CardHeader>
        <CardContent>
          {analysis && (
            <div className="mb-6 p-4 bg-muted/50 border rounded-lg">
              <h3 className="text-sm font-medium mb-2">AI Opinion Analysis:</h3>
              <p className="text-sm">{analysis}</p>
            </div>
          )}
          
          <div className="flex justify-end mb-4">
            <Button 
              onClick={handleAnalyzeOpinions}
              disabled={isAnalyzing || poll.answers.length === 0}
              className="gap-2"
            >
              <BarChart2 className="h-4 w-4" />
              {isAnalyzing ? "Analyzing..." : "Analyze Opinions"}
            </Button>
          </div>
          
          <ScrollArea className="h-[400px]">
            <div className="space-y-6">
              {poll.answers.map((answer) => (
                <div key={answer.id} className="border rounded-lg p-4">
                  <p className="text-base">{answer.text}</p>
                  <p className="text-xs text-muted-foreground mt-2">
                    Submitted {new Date(answer.createdAt).toLocaleDateString()}
                  </p>
                </div>
              ))}
            </div>
          </ScrollArea>
        </CardContent>
      </Card>
    );
  }

  // For regular polls with options
  const totalVotes = poll.options.reduce((sum, option) => sum + option.votes, 0);
  
  return (
    <Card className="w-full max-w-2xl mx-auto">
      <CardHeader>
        <CardTitle className="text-xl font-bold">{poll.question}</CardTitle>
        <p className="text-muted-foreground mt-2">
          {totalVotes} {totalVotes === 1 ? "vote" : "votes"} cast
        </p>
      </CardHeader>
      <CardContent>
        <div className="space-y-4">
          {poll.options.map((option) => {
            const percentage = totalVotes > 0 ? Math.round((option.votes / totalVotes) * 100) : 0;
            
            return (
              <div key={option.id} className="space-y-2">
                <div className="flex justify-between">
                  <span>{option.text}</span>
                  <span className="font-medium">{percentage}%</span>
                </div>
                <div className="h-2 bg-secondary rounded-full">
                  <div 
                    className="h-full bg-primary rounded-full"
                    style={{ width: `${percentage}%` }}
                  ></div>
                </div>
                <p className="text-xs text-muted-foreground">
                  {option.votes} {option.votes === 1 ? "vote" : "votes"}
                </p>
              </div>
            );
          })}
        </div>
      </CardContent>
    </Card>
  );
};
