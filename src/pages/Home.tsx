
import { Link } from "react-router-dom";
import { Button } from "@/components/ui/button";
import { Layout } from "@/components/Layout";
import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from "@/components/ui/card";
import { BookOpen, Scroll, GraduationCap } from "lucide-react";
import { useLanguage } from "@/contexts/LanguageContext";

const features = [
  {
    icon: <BookOpen className="h-8 w-8 text-primary" />,
    titleKey: "feature1Title",
    descriptionKey: "feature1Description"
  },
  {
    icon: <Scroll className="h-8 w-8 text-primary" />,
    titleKey: "feature2Title",
    descriptionKey: "feature2Description"
  },
  {
    icon: <GraduationCap className="h-8 w-8 text-primary" />,
    titleKey: "feature3Title",
    descriptionKey: "feature3Description"
  }
];

const Home = () => {
  const { t } = useLanguage();
  
  return (
    <Layout>
      <div className="max-w-6xl mx-auto">
        {/* Hero Section */}
        <section className="my-16 md:my-24 text-center animate-fade-in">
          <h1 className="text-4xl md:text-6xl font-serif font-bold mb-6 lumieres-title">
            {t("homepageTitle")}
          </h1>
          <p className="text-xl md:text-2xl font-serif italic mb-4 max-w-3xl mx-auto text-primary-800">
            {t("homepageTagline")}
          </p>
          <p className="text-lg mb-8 max-w-2xl mx-auto text-primary-700">
            {t("homepageSubtitle")}
          </p>
          <Link to="/create">
            <Button size="lg" className="lumieres-button-primary">
              {t("createButton")}
            </Button>
          </Link>
        </section>

        {/* Features */}
        <section className="my-24">
          <h2 className="text-3xl font-serif font-bold mb-12 text-center">{t("featuresTitle")}</h2>
          <div className="grid md:grid-cols-3 gap-8 animate-slide-up">
            {features.map((feature, index) => (
              <Card key={index} className="lumieres-card card-hover">
                <CardHeader>
                  <div className="mb-4">{feature.icon}</div>
                  <CardTitle className="font-serif">{t(feature.titleKey as any)}</CardTitle>
                </CardHeader>
                <CardContent>
                  <CardDescription className="text-base">{t(feature.descriptionKey as any)}</CardDescription>
                </CardContent>
              </Card>
            ))}
          </div>
        </section>

        {/* Call to Action */}
        <section className="my-24 text-center">
          <Card className="lumieres-card-alt">
            <CardHeader>
              <CardTitle className="text-2xl font-serif">{t("ctaTitle")}</CardTitle>
              <CardDescription className="text-lg">{t("ctaDescription")}</CardDescription>
            </CardHeader>
            <CardFooter className="flex justify-center">
              <Link to="/create">
                <Button className="lumieres-button-primary">{t("ctaButton")}</Button>
              </Link>
            </CardFooter>
          </Card>
        </section>
        
        {/* Quote Section */}
        <section className="my-24 text-center max-w-4xl mx-auto">
          <div className="enlightenment-quote mx-auto text-left">
            <p className="text-xl font-serif mb-2">
              {t("quoteText")}
            </p>
            <p className="text-right text-primary-600">{t("quoteAuthor")}</p>
          </div>
        </section>
      </div>
    </Layout>
  );
};

export default Home;
