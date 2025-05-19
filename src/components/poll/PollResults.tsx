
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
import { BarChart2, FileText } from "lucide-react";
import { toast } from "sonner";
import { analyzeOpinions } from "@/services/chatService";
import { generateAnalysisPDF, downloadBlob } from "@/utils/pdfUtils";

type PollResultsProps = {
  poll: Poll;
};

export const PollResults = ({ poll }: PollResultsProps) => {
  const [isAnalyzing, setIsAnalyzing] = useState(false);
  const [analysis, setAnalysis] = useState<string | null>(null);
  const [isExporting, setIsExporting] = useState(false);
  
  const handleAnalyzeOpinions = async () => {
    if (!poll.isTextBased || poll.answers.length === 0) {
      toast.error("No text responses to analyze");
      return;
    }
    
    setIsAnalyzing(true);
    setAnalysis(null);
    
    try {
      const result = await analyzeOpinions(poll.id);
      setAnalysis(result);
      toast.success("Analysis complete!");
    } catch (error) {
      console.error("Error analyzing opinions:", error);
      toast.error("Failed to analyze opinions. Please try again.");
    } finally {
      setIsAnalyzing(false);
    }
  };
  
  const handleExportAnalysis = async () => {
    if (!analysis) {
      toast.error("No analysis available to export");
      return;
    }
    
    try {
      setIsExporting(true);
      
      // Generate the PDF
      const pdfBlob = generateAnalysisPDF(poll.question, analysis);
      
      // Create a sanitized filename (replace spaces and special characters)
      const sanitizedQuestion = poll.question
        .substring(0, 30)
        .replace(/[^a-z0-9]/gi, '_')
        .toLowerCase();
      
      // Download the PDF
      downloadBlob(pdfBlob, `poll-analysis-${sanitizedQuestion}-${poll.id}.pdf`);
      
      toast.success("Analysis exported as PDF");
    } catch (error) {
      console.error("Error exporting analysis:", error);
      toast.error("Failed to export analysis. Please try again.");
    } finally {
      setIsExporting(false);
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
              <div className="flex justify-between items-center mb-2">
                <h3 className="text-sm font-medium">AI Opinion Analysis:</h3>
                <Button 
                  onClick={handleExportAnalysis}
                  disabled={isExporting}
                  size="sm"
                  variant="outline"
                  className="gap-2"
                >
                  <FileText className="h-4 w-4" />
                  {isExporting ? "Exporting..." : "Export PDF"}
                </Button>
              </div>
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
