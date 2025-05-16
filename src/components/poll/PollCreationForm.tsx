
/**
 * Form component for creating new polls.
 * Features:
 * - Question input field
 * - Toggle for text-based vs. multiple choice polls
 * - Dynamic option fields for multiple choice polls
 * - Form validation and submission
 * 
 * BACKEND INTEGRATION: Form submission should connect to your backend API.
 * The createPoll function in pollService.ts needs to be updated.
 */

import { useState } from "react";
import { useNavigate } from "react-router-dom";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Card, CardContent, CardFooter, CardHeader, CardTitle } from "@/components/ui/card";
import { Label } from "@/components/ui/label";
import { Plus, Trash2 } from "lucide-react";
import { createPoll } from "@/services/pollService";
import { toast } from "sonner";
import { Switch } from "@/components/ui/switch";

export const PollCreationForm = () => {
  const navigate = useNavigate();
  const [question, setQuestion] = useState("");
  const [options, setOptions] = useState<string[]>(["", ""]);
  const [isTextBased, setIsTextBased] = useState(false);
  const [isSubmitting, setIsSubmitting] = useState(false);
  
  const addOption = () => {
    setOptions([...options, ""]);
  };
  
  const removeOption = (index: number) => {
    if (options.length <= 2) {
      toast.error("A poll requires at least 2 options");
      return;
    }
    const newOptions = [...options];
    newOptions.splice(index, 1);
    setOptions(newOptions);
  };
  
  const updateOption = (index: number, value: string) => {
    const newOptions = [...options];
    newOptions[index] = value;
    setOptions(newOptions);
  };
  
  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    
    if (!question.trim()) {
      toast.error("Please enter a question");
      return;
    }
    
    if (!isTextBased) {
      const validOptions = options.filter(opt => opt.trim() !== "");
      if (validOptions.length < 2) {
        toast.error("Please add at least 2 options");
        return;
      }
    }
    
    try {
      setIsSubmitting(true);
      const newPoll = await createPoll(question, isTextBased ? [] : options.filter(opt => opt.trim() !== ""), isTextBased);
      toast.success("Poll created successfully!");
      navigate(`/poll/${newPoll.id}`);
    } catch (error) {
      toast.error("Error creating poll");
      console.error(error);
    } finally {
      setIsSubmitting(false);
    }
  };
  
  return (
    <Card className="w-full max-w-2xl mx-auto animate-fade-in">
      <form onSubmit={handleSubmit}>
        <CardHeader>
          <CardTitle className="text-xl font-bold">Create a New Poll</CardTitle>
        </CardHeader>
        <CardContent className="space-y-6">
          <div className="space-y-2">
            <Label htmlFor="question">Question</Label>
            <Input
              id="question"
              placeholder="What's your question?"
              value={question}
              onChange={(e) => setQuestion(e.target.value)}
            />
          </div>
          
          <div className="flex items-center space-x-2">
            <Switch
              id="text-based"
              checked={isTextBased}
              onCheckedChange={setIsTextBased}
            />
            <Label htmlFor="text-based">Enable text-based answers</Label>
          </div>
          
          {!isTextBased && (
            <div className="space-y-4">
              <Label>Options</Label>
              {options.map((option, index) => (
                <div key={index} className="flex gap-2 items-center">
                  <Input
                    placeholder={`Option ${index + 1}`}
                    value={option}
                    onChange={(e) => updateOption(index, e.target.value)}
                  />
                  <Button
                    type="button"
                    variant="outline"
                    size="icon"
                    onClick={() => removeOption(index)}
                  >
                    <Trash2 className="h-4 w-4" />
                  </Button>
                </div>
              ))}
              
              <Button
                type="button"
                variant="outline"
                className="w-full mt-2"
                onClick={addOption}
              >
                <Plus className="h-4 w-4 mr-2" />
                Add Option
              </Button>
            </div>
          )}
        </CardContent>
        <CardFooter>
          <Button 
            className="w-full bg-primary" 
            type="submit"
            disabled={isSubmitting}
          >
            {isSubmitting ? "Creating Poll..." : "Create Poll"}
          </Button>
        </CardFooter>
      </form>
    </Card>
  );
};
