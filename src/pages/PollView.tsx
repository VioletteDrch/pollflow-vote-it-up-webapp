
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
import { getPollById } from "@/services/pollService";
import { Button } from "@/components/ui/button";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { toast } from "sonner";

// This helps us detect if we're running in Lovable preview environment
const isLovablePreview = () => {
  return window.location.hostname.includes('lovableproject.com') || 
         window.location.hostname.includes('lovable.app');
};

const PollView = () => {
  const { id } = useParams<{ id: string }>();
  const navigate = useNavigate();
  const [poll, setPoll] = useState<Poll | null>(null);
  const [loading, setLoading] = useState(true);
  const [hasVoted, setHasVoted] = useState(false);
  const [activeTab, setActiveTab] = useState("vote");
  
  useEffect(() => {
    if (!id) {
      navigate("/");
      return;
    }
    
    const fetchPoll = async () => {
      try {
        const foundPoll = await getPollById(id);
        if (foundPoll) {
          setPoll(foundPoll);
        } else {
          // Handle the case where poll is not found
          if (isLovablePreview()) {
            // In Lovable preview, simulate a demo poll with the requested ID
            console.log("Creating demo poll for Lovable preview with ID:", id);
            const demoPoll: Poll = {
              id: id,
              question: "Demo Poll Question (Lovable Preview)",
              createdAt: new Date().toISOString(),
              isTextBased: Math.random() > 0.5, // Randomly pick poll type
              options: [
                { id: "opt1", text: "Option 1", votes: Math.floor(Math.random() * 10) },
                { id: "opt2", text: "Option 2", votes: Math.floor(Math.random() * 10) },
                { id: "opt3", text: "Option 3", votes: Math.floor(Math.random() * 10) }
              ],
              answers: [
                { id: "ans1", text: "This is a sample text response", createdAt: new Date().toISOString() },
                { id: "ans2", text: "Another example of a text response", createdAt: new Date().toISOString() }
              ]
            };
            setPoll(demoPoll);
            toast.info("Using demo data in preview mode");
          } else {
            navigate("/not-found");
          }
        }
      } catch (error) {
        console.error("Error fetching poll:", error);
        
        // In Lovable preview, provide a fallback for easier testing
        if (isLovablePreview()) {
          console.log("Using fallback demo poll for Lovable preview");
          const demoPoll: Poll = {
            id: id || "demo-id",
            question: "Demo Poll Question (Error Fallback)",
            createdAt: new Date().toISOString(),
            isTextBased: true,
            options: [
              { id: "opt1", text: "Option 1", votes: 3 },
              { id: "opt2", text: "Option 2", votes: 7 }
            ],
            answers: [
              { id: "ans1", text: "This is a sample text response", createdAt: new Date().toISOString() }
            ]
          };
          setPoll(demoPoll);
          toast.info("Using demo data in preview mode");
        } else {
          navigate("/not-found");
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
  
  if (!poll) {
    return (
      <Layout>
        <div className="flex items-center justify-center min-h-[50vh]">
          <p className="text-xl">Poll not found</p>
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
