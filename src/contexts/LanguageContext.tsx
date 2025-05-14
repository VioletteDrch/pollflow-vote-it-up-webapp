
import React, { createContext, useContext, useState, ReactNode } from "react";

type Language = "en" | "fr";

type TranslationKey = 
  | "homepageTitle" 
  | "homepageTagline" 
  | "homepageSubtitle" 
  | "createButton"
  | "featuresTitle"
  | "feature1Title"
  | "feature1Description"
  | "feature2Title"
  | "feature2Description"
  | "feature3Title"
  | "feature3Description"
  | "ctaTitle"
  | "ctaDescription"
  | "ctaButton"
  | "quoteText"
  | "quoteAuthor";

type Translations = {
  [key in Language]: {
    [key in TranslationKey]: string;
  };
};

const translations: Translations = {
  en: {
    homepageTitle: "Lumières",
    homepageTagline: "\"Sapere aude\" — Dare to know",
    homepageSubtitle: "An enlightened forum for the exchange of ideas and rational discourse",
    createButton: "Commence Your Inquiry",
    featuresTitle: "The Principles of Discourse",
    feature1Title: "Reasoned Discourse",
    feature1Description: "Engage in rational debates informed by facts and evidence.",
    feature2Title: "Philosophical Inquiry",
    feature2Description: "Explore ideas through the lens of Enlightenment principles of critical thinking.",
    feature3Title: "Knowledge Sharing",
    feature3Description: "Contribute to the collective advancement of human understanding.",
    ctaTitle: "Join the Republic of Letters",
    ctaDescription: "Create a discourse and invite others to share their enlightened perspectives.",
    ctaButton: "Begin Now",
    quoteText: "Enlightenment is man's emergence from his self-imposed nonage. Nonage is the inability to use one's own understanding without another's guidance.",
    quoteAuthor: "— Immanuel Kant"
  },
  fr: {
    homepageTitle: "Lumières",
    homepageTagline: "\"Sapere aude\" — Aie le courage de savoir",
    homepageSubtitle: "Un forum éclairé pour l'échange d'idées et le discours rationnel",
    createButton: "Commencer Votre Enquête",
    featuresTitle: "Les Principes du Discours",
    feature1Title: "Discours Raisonné",
    feature1Description: "Engagez-vous dans des débats rationnels étayés par des faits et des preuves.",
    feature2Title: "Recherche Philosophique",
    feature2Description: "Explorez des idées à travers le prisme des principes de la pensée critique des Lumières.",
    feature3Title: "Partage du Savoir",
    feature3Description: "Contribuez à l'avancement collectif de la compréhension humaine.",
    ctaTitle: "Rejoignez la République des Lettres",
    ctaDescription: "Créez un discours et invitez les autres à partager leurs perspectives éclairées.",
    ctaButton: "Commencer Maintenant",
    quoteText: "Les Lumières, c'est la sortie de l'homme hors de l'état de tutelle dont il est lui-même responsable. L'état de tutelle est l'incapacité de se servir de son entendement sans la conduite d'un autre.",
    quoteAuthor: "— Emmanuel Kant"
  }
};

interface LanguageContextType {
  language: Language;
  setLanguage: (lang: Language) => void;
  t: (key: TranslationKey) => string;
}

const LanguageContext = createContext<LanguageContextType | undefined>(undefined);

export const LanguageProvider = ({ children }: { children: ReactNode }) => {
  const [language, setLanguage] = useState<Language>("en");

  const t = (key: TranslationKey) => {
    return translations[language][key];
  };

  return (
    <LanguageContext.Provider value={{ language, setLanguage, t }}>
      {children}
    </LanguageContext.Provider>
  );
};

export const useLanguage = () => {
  const context = useContext(LanguageContext);
  if (context === undefined) {
    throw new Error("useLanguage must be used within a LanguageProvider");
  }
  return context;
};
