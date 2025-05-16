
/**
 * 404 Not Found page displayed when a user navigates to a non-existent route.
 * Provides a link back to the home page.
 * Uses the Layout component for consistent site structure.
 */

import { Link } from "react-router-dom";
import { Button } from "@/components/ui/button";
import { Layout } from "@/components/Layout";
import { useEffect } from "react";
import { toast } from "sonner";

const NotFound = () => {
  useEffect(() => {
    toast.error("Page not found. You've been redirected to the 404 page.");
  }, []);

  return (
    <Layout>
      <div className="flex flex-col items-center justify-center min-h-[60vh]">
        <h1 className="text-4xl font-bold mb-4">404</h1>
        <p className="text-xl text-muted-foreground mb-8">
          Oops! The page you're looking for doesn't exist.
        </p>
        <p className="text-muted-foreground mb-8 max-w-md text-center">
          There might have been an error with the poll creation or navigation. 
          Please try creating a poll again.
        </p>
        <div className="flex gap-4">
          <Link to="/">
            <Button>Back to Home</Button>
          </Link>
          <Link to="/create">
            <Button variant="outline">Create New Poll</Button>
          </Link>
        </div>
      </div>
    </Layout>
  );
};

export default NotFound;
