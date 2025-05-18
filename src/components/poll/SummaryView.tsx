
import { Button } from "@/components/ui/button";

type SummaryViewProps = {
  summary: string;
  onAccept: () => void;
  onReject: () => void;
};

export const SummaryView = ({ summary, onAccept, onReject }: SummaryViewProps) => {
  return (
    <div className="space-y-4">
      <div className="bg-secondary p-4 rounded-lg">
        <h3 className="text-sm font-medium mb-2">Summary of your opinion:</h3>
        <p className="text-base">{summary}</p>
      </div>
      
      <p className="text-sm text-muted-foreground">
        Is this summary accurate? If yes, click "Submit" to share this opinion. If not, click "Continue Discussing" to provide more details.
      </p>
      
      <div className="flex w-full space-x-2">
        <Button 
          variant="outline" 
          className="flex-1" 
          onClick={onReject}
        >
          Continue Discussing
        </Button>
        <Button 
          className="flex-1" 
          onClick={onAccept}
        >
          Submit Opinion
        </Button>
      </div>
    </div>
  );
};
