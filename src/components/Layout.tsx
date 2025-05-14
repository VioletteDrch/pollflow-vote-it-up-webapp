
import { ReactNode } from "react";
import { NavBar } from "./NavBar";
import { Footer } from "./Footer";
import { LanguageToggle } from "./LanguageToggle";

type LayoutProps = {
  children: ReactNode;
};

export const Layout = ({ children }: LayoutProps) => {
  return (
    <div className="min-h-screen flex flex-col">
      <div className="fixed top-2 right-2 z-50">
        <LanguageToggle />
      </div>
      <NavBar />
      <main className="flex-grow container mx-auto py-6 px-4">{children}</main>
      <Footer />
    </div>
  );
};
