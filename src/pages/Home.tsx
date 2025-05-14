
import { Link } from "react-router-dom";
import { Button } from "@/components/ui/button";
import { Layout } from "@/components/Layout";
import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from "@/components/ui/card";
import { BookOpen, MessageSquare, Users } from "lucide-react";

const features = [
  {
    icon: <BookOpen className="h-8 w-8 text-gold-500" />,
    title: "Informed Discussion",
    description: "Access contextual information and resources to form thoughtful opinions."
  },
  {
    icon: <MessageSquare className="h-8 w-8 text-gold-500" />,
    title: "Articulate Viewpoints",
    description: "Our AI helps you refine and articulate your perspectives on complex topics."
  },
  {
    icon: <Users className="h-8 w-8 text-gold-500" />,
    title: "Collective Wisdom",
    description: "See how your ideas contribute to a broader community of thought and discourse."
  }
];

const Home = () => {
  return (
    <Layout>
      <div className="max-w-6xl mx-auto">
        {/* Hero Section */}
        <section className="my-16 md:my-24 text-center animate-fade-in">
          <h1 className="text-4xl md:text-6xl font-serif font-bold mb-6 text-gradient">
            Gora
          </h1>
          <p className="text-xl md:text-2xl font-serif italic mb-4 max-w-3xl mx-auto text-slate-600">
            A modern agora for thoughtful discourse and deliberation
          </p>
          <p className="text-lg mb-8 max-w-2xl mx-auto text-slate-500">
            Share your considered opinions and engage with others in meaningful dialogue
          </p>
          <Link to="/create">
            <Button size="lg" className="gora-button-accent">
              Create Your First Poll
            </Button>
          </Link>
        </section>

        {/* Features */}
        <section className="my-24">
          <h2 className="text-3xl font-serif font-bold mb-12 text-center">Why Choose Gora?</h2>
          <div className="grid md:grid-cols-3 gap-8 animate-slide-up">
            {features.map((feature, index) => (
              <Card key={index} className="gora-card card-hover">
                <CardHeader>
                  <div className="mb-4">{feature.icon}</div>
                  <CardTitle className="font-serif">{feature.title}</CardTitle>
                </CardHeader>
                <CardContent>
                  <CardDescription className="text-base">{feature.description}</CardDescription>
                </CardContent>
              </Card>
            ))}
          </div>
        </section>

        {/* Call to Action */}
        <section className="my-24 text-center">
          <Card className="gora-card border-slate-200 bg-slate-50">
            <CardHeader>
              <CardTitle className="text-2xl font-serif">Ready to Join the Discourse?</CardTitle>
              <CardDescription className="text-lg">Create your first poll and gather thoughtful perspectives.</CardDescription>
            </CardHeader>
            <CardFooter className="flex justify-center">
              <Link to="/create">
                <Button className="gora-button-primary">Begin Now</Button>
              </Link>
            </CardFooter>
          </Card>
        </section>
        
        {/* Quote Section */}
        <section className="my-24 text-center max-w-4xl mx-auto">
          <div className="quote-block mx-auto text-left">
            <p className="text-xl font-serif mb-2">
              "The affairs of the city should be discussed in the agora by all citizens, for when people cease taking an interest in public matters, democracy is at risk."
            </p>
            <p className="text-right text-slate-500">— Inspired by Pericles</p>
          </div>
        </section>
      </div>
    </Layout>
  );
};

export default Home;
