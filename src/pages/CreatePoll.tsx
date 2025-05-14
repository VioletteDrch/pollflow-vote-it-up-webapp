
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
