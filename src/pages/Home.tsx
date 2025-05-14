
import { Link } from "react-router-dom";
import { Button } from "@/components/ui/button";
import { Layout } from "@/components/Layout";
import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from "@/components/ui/card";

const features = [
  {
    title: "Easy Poll Creation",
    description: "Create beautiful polls in seconds with our intuitive interface."
  },
  {
    title: "Real-time Results",
    description: "Watch as votes come in and see results update instantly."
  },
  {
    title: "Share Anywhere",
    description: "Generate shareable links to collect responses from anyone."
  }
];

const Home = () => {
  return (
    <Layout>
      <div className="max-w-6xl mx-auto">
        {/* Hero Section */}
        <section className="my-12 md:my-20 text-center animate-fade-in">
          <h1 className="text-4xl md:text-6xl font-bold mb-4 text-gradient">
            Create Polls with Ease
          </h1>
          <p className="text-xl md:text-2xl mb-8 max-w-3xl mx-auto text-muted-foreground">
            Get instant feedback from your audience with beautiful, interactive polls.
          </p>
          <Link to="/create">
            <Button size="lg" className="bg-gradient-to-r from-purple-500 to-purple-700 hover:from-purple-600 hover:to-purple-800">
              Create Your First Poll
            </Button>
          </Link>
        </section>

        {/* Features */}
        <section className="my-16">
          <h2 className="text-2xl font-bold mb-8 text-center">Why Choose PollFlow?</h2>
          <div className="grid md:grid-cols-3 gap-6 animate-slide-up">
            {features.map((feature, index) => (
              <Card key={index} className="card-hover">
                <CardHeader>
                  <CardTitle>{feature.title}</CardTitle>
                </CardHeader>
                <CardContent>
                  <CardDescription>{feature.description}</CardDescription>
                </CardContent>
              </Card>
            ))}
          </div>
        </section>

        {/* Call to Action */}
        <section className="my-20 text-center">
          <Card className="bg-gradient-to-r from-purple-500/10 to-purple-700/10 border border-purple-200">
            <CardHeader>
              <CardTitle className="text-2xl font-bold">Ready to Get Started?</CardTitle>
              <CardDescription>Create your first poll in under a minute.</CardDescription>
            </CardHeader>
            <CardFooter className="flex justify-center">
              <Link to="/create">
                <Button>Create Poll Now</Button>
              </Link>
            </CardFooter>
          </Card>
        </section>
      </div>
    </Layout>
  );
};

export default Home;
