
/**
 * Main layout component used across all pages.
 * Provides consistent structure with:
 * - Navigation bar at the top
 * - Content area in the middle
 * - Footer at the bottom
 * 
 * All page components are wrapped with this Layout.
 */

import { ReactNode } from "react";
import { NavBar } from "./NavBar";
import { Footer } from "./Footer";

type LayoutProps = {
  children: ReactNode;
};

export const Layout = ({ children }: LayoutProps) => {
  return (
    <div className="min-h-screen flex flex-col">
      <NavBar />
      <main className="flex-grow container mx-auto py-6 px-4">{children}</main>
      <Footer />
    </div>
  );
};
