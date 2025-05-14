
import { useState } from "react";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardFooter, CardHeader, CardTitle } from "@/components/ui/card";
import { RadioGroup, RadioGroupItem } from "@/components/ui/radio-group";
import { Label } from "@/components/ui/label";
import { Poll } from "@/types/poll";
import { votePoll, submitPollAnswer } from "@/services/pollService";
import { toast } from "sonner";
import { Textarea } from "@/components/ui/textarea";

type PollVotingProps = {
  poll: Poll;
  onVote: (updatedPoll: Poll) => void;
};

export const PollVoting = ({ poll, onVote }: PollVotingProps) => {
  const [selectedOption, setSelectedOption] = useState<string | null>(null);
  const [textAnswer, setTextAnswer] = useState("");
  const [isSubmitting, setIsSubmitting] = useState(false);
  
  const handleVote = () => {
    if (!poll.isTextBased && !selectedOption) {
      toast.error("Please select an option");
      return;
    }
    
    if (poll.isTextBased && !textAnswer.trim()) {
      toast.error("Please enter your answer");
      return;
    }
    
    setIsSubmitting(true);
    try {
      if (poll.isTextBased) {
        const updatedPoll = submitPollAnswer(poll.id, textAnswer);
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
