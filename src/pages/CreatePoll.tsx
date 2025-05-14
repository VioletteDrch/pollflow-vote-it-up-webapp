
/**
 * Poll creation page that allows users to create new polls.
 * Renders the PollCreationForm component within the Layout.
 * 
 * The actual poll creation logic is in the PollCreationForm component.
 * BACKEND INTEGRATION: Form submission in PollCreationForm will need to 
 * connect to your backend API.
 */

import { Layout } from "@/components/Layout";
import { PollCreationForm } from "@/components/poll/PollCreationForm";

const CreatePoll = () => {
  return (
    <Layout>
      <div className="max-w-4xl mx-auto">
        <h1 className="text-3xl font-bold mb-8 text-center text-gradient">Create a New Poll</h1>
        <PollCreationForm />
      </div>
    </Layout>
  );
};

export default CreatePoll;
