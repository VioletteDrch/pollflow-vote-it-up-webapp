
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Progress } from "@/components/ui/progress";
import { Poll } from "@/types/poll";

type PollResultsProps = {
  poll: Poll;
};

export const PollResults = ({ poll }: PollResultsProps) => {
  if (poll.isTextBased) {
    return (
      <Card className="w-full max-w-2xl mx-auto animate-fade-in">
        <CardHeader>
          <CardTitle className="text-xl font-bold">{poll.question}</CardTitle>
          <p className="text-sm text-muted-foreground">
            Total responses: {poll.answers.length}
          </p>
        </CardHeader>
        <CardContent className="space-y-6">
          {poll.answers.length === 0 ? (
            <p className="text-center py-8 text-muted-foreground">No answers yet</p>
          ) : (
            poll.answers.map((answer) => (
              <div key={answer.id} className="p-4 border rounded-md bg-card/50">
                <p className="text-sm text-muted-foreground mb-1">
                  {new Date(answer.createdAt).toLocaleDateString()}
                </p>
                <p className="whitespace-pre-line">{answer.text}</p>
              </div>
            ))
          )}
        </CardContent>
      </Card>
    );
  }

  // Calculate total votes for multiple choice polls
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
