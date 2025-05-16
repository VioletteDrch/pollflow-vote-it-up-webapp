
/**
 * Page component for viewing a specific poll.
 * Allows users to:
 * - Vote on polls
 * - View poll results
 * - Share polls
 * - Submit text answers for text-based polls
 * 
 * Uses the poll ID from URL params to fetch poll data.
 * BACKEND INTEGRATION: Replace getPollById with API call to fetch poll data.
 * Vote submission and text answers should connect to your backend.
 */

import { useState, useEffect } from "react";
import { useParams, useNavigate } from "react-router-dom";
import { Layout } from "@/components/Layout";
import { PollVoting } from "@/components/poll/PollVoting";
import { PollResults } from "@/components/poll/PollResults";
import { PollShare } from "@/components/poll/PollShare";
import { Poll } from "@/types/poll";
import { getPollById, isLocalBackend } from "@/services/pollService";
import { Button } from "@/components/ui/button";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { toast } from "sonner";

const PollView = () => {
  const { id } = useParams<{ id: string }>();
  const navigate = useNavigate();
  const [poll, setPoll] = useState<Poll | null>(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);
  const [hasVoted, setHasVoted] = useState(false);
  const [activeTab, setActiveTab] = useState("vote");
  
  useEffect(() => {
    if (!id) {
      toast.error("No poll ID provided");
      navigate("/not-found");
      return;
    }
    
    const fetchPoll = async () => {
      try {
        console.log(`Fetching poll with ID: ${id}`);
        setLoading(true);
        setError(null);
        
        const foundPoll = await getPollById(id);
        
        if (foundPoll) {
          console.log(`Poll found:`, foundPoll);
          setPoll(foundPoll);
        } else {
          console.error(`Poll with ID ${id} not found`);
          setError(`Poll with ID ${id} not found`);
          toast.error(`Poll with ID ${id} not found`);
          
          // If in local environment, provide more detailed error
          if (isLocalBackend()) {
            toast.error("Backend API returned null for this poll ID. Check your backend server.");
          }
        }
      } catch (error) {
        console.error("Error fetching poll:", error);
        const errorMessage = error instanceof Error ? error.message : 'Unknown error';
        setError(`Error loading poll: ${errorMessage}`);
        
        if (isLocalBackend()) {
          toast.error(`Backend API error: ${errorMessage}. Check your backend server.`);
        } else {
          toast.error("Error loading poll. Please try again.");
        }
      } finally {
        setLoading(false);
      }
    };
    
    fetchPoll();
  }, [id, navigate]);
  
  const handleVote = (updatedPoll: Poll) => {
    setPoll(updatedPoll);
    setHasVoted(true);
    setActiveTab("results");
  };
  
  if (loading) {
    return (
      <Layout>
        <div className="flex items-center justify-center min-h-[50vh]">
          <p className="text-xl">Loading poll...</p>
        </div>
      </Layout>
    );
  }
  
  if (error || !poll) {
    return (
      <Layout>
        <div className="flex items-center justify-center min-h-[50vh] flex-col">
          <p className="text-xl mb-4">{error || "Poll not found"}</p>
          <div className="flex gap-4">
            <Button onClick={() => navigate("/create")}>Create New Poll</Button>
            <Button variant="outline" onClick={() => navigate("/")}>Go to Home</Button>
          </div>
        </div>
      </Layout>
    );
  }
  
  return (
    <Layout>
      <div className="max-w-4xl mx-auto">
        <h1 className="text-3xl font-bold mb-8 text-center text-gradient">Poll</h1>
        
        <Tabs value={activeTab} onValueChange={setActiveTab} className="w-full">
          <TabsList className="w-full mb-6">
            <TabsTrigger value="vote" className="w-1/2">
              {poll.isTextBased ? "Answer" : "Vote"}
            </TabsTrigger>
            <TabsTrigger value="results" className="w-1/2">Results</TabsTrigger>
          </TabsList>
          
          <TabsContent value="vote" className="animate-fade-in">
            {!hasVoted ? (
              <PollVoting poll={poll} onVote={handleVote} />
            ) : (
              <div className="text-center py-8">
                <p className="text-lg mb-4">
                  {poll.isTextBased 
                    ? "You've already submitted your answer to this poll." 
                    : "You've already voted on this poll."}
                </p>
                <Button onClick={() => setActiveTab("results")}>
                  View Results
                </Button>
              </div>
            )}
          </TabsContent>
          
          <TabsContent value="results" className="animate-fade-in">
            <PollResults poll={poll} />
          </TabsContent>
        </Tabs>
        
        <PollShare pollId={poll.id} />
      </div>
    </Layout>
  );
};

export default PollView;
