
import { useState } from "react";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardFooter, CardHeader, CardTitle } from "@/components/ui/card";
import { RadioGroup, RadioGroupItem } from "@/components/ui/radio-group";
import { Label } from "@/components/ui/label";
import { Poll } from "@/types/poll";
import { votePoll, submitPollAnswer } from "@/services/pollService";
import { toast } from "sonner";
import { Textarea } from "@/components/ui/textarea";
import { ChatInterface } from "./ChatInterface";

type PollVotingProps = {
  poll: Poll;
  onVote: (updatedPoll: Poll) => void;
};

export const PollVoting = ({ poll, onVote }: PollVotingProps) => {
  const [selectedOption, setSelectedOption] = useState<string | null>(null);
  const [textAnswer, setTextAnswer] = useState("");
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [chatMode, setChatMode] = useState(poll.isTextBased);
  const [finalSummary, setFinalSummary] = useState<string | null>(null);
  
  const handleVote = () => {
    if (!poll.isTextBased && !selectedOption) {
      toast.error("Please select an option");
      return;
    }
    
    if (poll.isTextBased && !textAnswer.trim() && !finalSummary) {
      toast.error("Please enter your answer");
      return;
    }
    
    setIsSubmitting(true);
    try {
      if (poll.isTextBased) {
        const answerToSubmit = finalSummary || textAnswer;
        const updatedPoll = submitPollAnswer(poll.id, answerToSubmit);
        if (updatedPoll) {
          toast.success("Answer submitted!");
          onVote(updatedPoll);
        } else {
          toast.error("Error submitting answer");
        }
      } else {
        const updatedPoll = votePoll(poll.id, selectedOption!);
        if (updatedPoll) {
          toast.success("Vote submitted!");
          onVote(updatedPoll);
        } else {
          toast.error("Error submitting vote");
        }
      }
    } catch (error) {
      toast.error("Error submitting response");
      console.error(error);
    } finally {
      setIsSubmitting(false);
    }
  };
  
  const handleSummaryComplete = (summary: string) => {
    setFinalSummary(summary);
    setChatMode(false);
  };
  
  // For text-based polls, show either chat interface or summary review
  if (poll.isTextBased) {
    if (chatMode) {
      return <ChatInterface question={poll.question} onSummaryComplete={handleSummaryComplete} />;
    }
    
    if (finalSummary) {
      return (
        <Card className="w-full max-w-2xl mx-auto animate-fade-in">
          <CardHeader>
            <CardTitle className="text-xl font-bold">{poll.question}</CardTitle>
          </CardHeader>
          <CardContent className="space-y-6">
            <div className="bg-secondary p-4 rounded-lg">
              <h3 className="text-sm font-medium mb-2">Your opinion summary:</h3>
              <p className="text-base">{finalSummary}</p>
            </div>
          </CardContent>
          <CardFooter className="flex flex-col space-y-4 sm:flex-row sm:space-y-0 sm:space-x-4">
            <Button 
              variant="outline" 
              onClick={() => {
                setChatMode(true);
                setFinalSummary(null);
              }}
            >
              Edit Opinion
            </Button>
            <Button 
              className="w-full sm:w-auto" 
              onClick={handleVote}
              disabled={isSubmitting}
            >
              {isSubmitting ? "Submitting..." : "Submit Opinion"}
            </Button>
          </CardFooter>
        </Card>
      );
    }
  }
  
  // Fall back to the original interface for non-text polls or direct text entry
  return (
    <Card className="w-full max-w-2xl mx-auto animate-fade-in">
      <CardHeader>
        <CardTitle className="text-xl font-bold">{poll.question}</CardTitle>
      </CardHeader>
      <CardContent className="space-y-6">
        {poll.isTextBased ? (
          <div className="space-y-2">
            <Label htmlFor="text-answer">Your answer</Label>
            <Textarea 
              id="text-answer"
              placeholder="Type your answer here..."
              value={textAnswer}
              onChange={(e) => setTextAnswer(e.target.value)}
              className="min-h-[150px]"
            />
            <div className="pt-2">
              <Button
                variant="outline"
                onClick={() => setChatMode(true)}
                className="w-full"
              >
                Use Discussion Assistant
              </Button>
            </div>
          </div>
        ) : (
          <RadioGroup onValueChange={setSelectedOption} value={selectedOption || ""}>
            {poll.options.map((option) => (
              <div className="flex items-center space-x-2" key={option.id}>
                <RadioGroupItem value={option.id} id={option.id} />
                <Label htmlFor={option.id} className="text-base font-normal">
                  {option.text}
                </Label>
              </div>
            ))}
          </RadioGroup>
        )}
      </CardContent>
      <CardFooter>
        <Button 
          className="w-full bg-primary" 
          onClick={handleVote}
          disabled={isSubmitting || (!poll.isTextBased && !selectedOption) || (poll.isTextBased && !textAnswer.trim())}
        >
          {isSubmitting ? "Submitting..." : "Submit"}
        </Button>
      </CardFooter>
    </Card>
  );
};
