
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Progress } from "@/components/ui/progress";
import { Poll } from "@/types/poll";

type PollResultsProps = {
  poll: Poll;
};

export const PollResults = ({ poll }: PollResultsProps) => {
  // Calculate total votes
  const totalVotes = poll.options.reduce((sum, option) => sum + option.votes, 0);
  
  // Get percentage for each option
  const getPercentage = (votes: number): number => {
    if (totalVotes === 0) return 0;
    return Math.round((votes / totalVotes) * 100);
  };
  
  return (
    <Card className="w-full max-w-2xl mx-auto animate-fade-in">
      <CardHeader>
        <CardTitle className="text-xl font-bold">{poll.question}</CardTitle>
        <p className="text-sm text-muted-foreground">
          Total votes: {totalVotes}
        </p>
      </CardHeader>
      <CardContent className="space-y-6">
        {poll.options.map((option) => {
          const percentage = getPercentage(option.votes);
          
          return (
            <div key={option.id} className="space-y-2">
              <div className="flex justify-between items-center">
                <span className="font-medium">{option.text}</span>
                <span className="text-sm">
                  {option.votes} votes ({percentage}%)
                </span>
              </div>
              <Progress 
                value={percentage} 
                className="h-2"
              />
            </div>
          );
        })}
      </CardContent>
    </Card>
  );
};
