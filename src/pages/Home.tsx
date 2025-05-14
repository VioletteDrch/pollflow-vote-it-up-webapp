
import { Link } from "react-router-dom";
import { Button } from "@/components/ui/button";
import { Layout } from "@/components/Layout";
import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from "@/components/ui/card";
import { BookOpen, Scroll, GraduationCap } from "lucide-react";

const features = [
  {
    icon: <BookOpen className="h-8 w-8 text-primary" />,
    title: "Reasoned Discourse",
    description: "Engage in rational debates informed by facts and evidence."
  },
  {
    icon: <Scroll className="h-8 w-8 text-primary" />,
    title: "Philosophical Inquiry",
    description: "Explore ideas through the lens of Enlightenment principles of critical thinking."
  },
  {
    icon: <GraduationCap className="h-8 w-8 text-primary" />,
    title: "Knowledge Sharing",
    description: "Contribute to the collective advancement of human understanding."
  }
];

const Home = () => {
  return (
    <Layout>
      <div className="max-w-6xl mx-auto">
        {/* Hero Section */}
        <section className="my-16 md:my-24 text-center animate-fade-in">
          <h1 className="text-4xl md:text-6xl font-serif font-bold mb-6 lumieres-title">
            Lumières
          </h1>
          <p className="text-xl md:text-2xl font-serif italic mb-4 max-w-3xl mx-auto text-primary-800">
            "Sapere aude" — Dare to know
          </p>
          <p className="text-lg mb-8 max-w-2xl mx-auto text-primary-700">
            An enlightened forum for the exchange of ideas and rational discourse
          </p>
          <Link to="/create">
            <Button size="lg" className="lumieres-button-primary">
              Commence Your Inquiry
            </Button>
          </Link>
        </section>

        {/* Features */}
        <section className="my-24">
          <h2 className="text-3xl font-serif font-bold mb-12 text-center">The Principles of Discourse</h2>
          <div className="grid md:grid-cols-3 gap-8 animate-slide-up">
            {features.map((feature, index) => (
              <Card key={index} className="lumieres-card card-hover">
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
          <Card className="lumieres-card-alt">
            <CardHeader>
              <CardTitle className="text-2xl font-serif">Join the Republic of Letters</CardTitle>
              <CardDescription className="text-lg">Create a discourse and invite others to share their enlightened perspectives.</CardDescription>
            </CardHeader>
            <CardFooter className="flex justify-center">
              <Link to="/create">
                <Button className="lumieres-button-primary">Begin Now</Button>
              </Link>
            </CardFooter>
          </Card>
        </section>
        
        {/* Quote Section */}
        <section className="my-24 text-center max-w-4xl mx-auto">
          <div className="enlightenment-quote mx-auto text-left">
            <p className="text-xl font-serif mb-2">
              "Enlightenment is man's emergence from his self-imposed nonage. Nonage is the inability to use one's own understanding without another's guidance."
            </p>
            <p className="text-right text-primary-600">— Immanuel Kant</p>
          </div>
        </section>
      </div>
    </Layout>
  );
};

export default Home;
