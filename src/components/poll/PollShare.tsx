
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Copy, Share2 } from "lucide-react";
import { toast } from "sonner";

type PollShareProps = {
  pollId: string;
};

export const PollShare = ({ pollId }: PollShareProps) => {
  const pollUrl = `${window.location.origin}/poll/${pollId}`;

  const copyToClipboard = async () => {
    try {
      await navigator.clipboard.writeText(pollUrl);
      toast.success("Poll link copied to clipboard!");
    } catch (err) {
      toast.error("Failed to copy link");
    }
  };

  return (
    <Card className="w-full max-w-2xl mx-auto mt-6 animate-fade-in">
      <CardHeader>
        <CardTitle className="text-lg font-bold flex items-center">
          <Share2 className="h-5 w-5 mr-2" />
          Share this poll
        </CardTitle>
      </CardHeader>
      <CardContent>
        <div className="flex space-x-2">
          <Input value={pollUrl} readOnly className="flex-1" />
          <Button onClick={copyToClipboard} variant="outline">
            <Copy className="h-4 w-4 mr-2" />
            Copy
          </Button>
        </div>
      </CardContent>
    </Card>
  );
};
