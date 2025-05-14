
import { useState } from "react";
import { useNavigate } from "react-router-dom";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardFooter, CardHeader, CardTitle } from "@/components/ui/card";
import { RadioGroup, RadioGroupItem } from "@/components/ui/radio-group";
import { Label } from "@/components/ui/label";
import { Poll } from "@/types/poll";
import { votePoll } from "@/services/pollService";
import { toast } from "sonner";

type PollVotingProps = {
  poll: Poll;
  onVote: (updatedPoll: Poll) => void;
};

export const PollVoting = ({ poll, onVote }: PollVotingProps) => {
  const [selectedOption, setSelectedOption] = useState<string | null>(null);
  const [isVoting, setIsVoting] = useState(false);
  
  const handleVote = () => {
    if (!selectedOption) {
      toast.error("Please select an option");
      return;
    }
    
    setIsVoting(true);
    try {
      const updatedPoll = votePoll(poll.id, selectedOption);
      if (updatedPoll) {
        toast.success("Vote submitted!");
        onVote(updatedPoll);
      } else {
        toast.error("Error submitting vote");
      }
    } catch (error) {
      toast.error("Error submitting vote");
      console.error(error);
    } finally {
      setIsVoting(false);
    }
  };
  
  return (
    <Card className="w-full max-w-2xl mx-auto animate-fade-in">
      <CardHeader>
        <CardTitle className="text-xl font-bold">{poll.question}</CardTitle>
      </CardHeader>
      <CardContent className="space-y-6">
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
      </CardContent>
      <CardFooter>
        <Button 
          className="w-full bg-primary" 
          onClick={handleVote}
          disabled={isVoting || !selectedOption}
        >
          {isVoting ? "Submitting..." : "Submit Vote"}
        </Button>
      </CardFooter>
    </Card>
  );
};
