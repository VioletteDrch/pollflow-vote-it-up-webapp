/**
 * Navigation bar component displayed at the top of every page.
 * Features:
 * - App logo/name with link to home page
 * - Language selection dropdown
 * - Create poll button
 * 
 * BACKEND INTEGRATION: Add authentication-related UI elements here
 * (login/signup buttons, user profile, etc.)
 */

import { Link } from "react-router-dom";
import { Button } from "@/components/ui/button";
import { Globe } from "lucide-react";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";
import { useState } from "react";

export const NavBar = () => {
  const [currentLanguage, setCurrentLanguage] = useState("English");

  const languages = [
    { name: "English", code: "en" },
    { name: "Français", code: "fr" },
    { name: "Español", code: "es" },
    { name: "Deutsch", code: "de" },
  ];

  return (
    <nav className="w-full py-4 px-6 md:px-12 flex items-center justify-between border-b">
      <Link to="/" className="flex items-center space-x-2">
        <span className="text-xl font-bold text-gradient">PollFlow</span>
      </Link>
      <div className="flex items-center gap-4">
        <DropdownMenu>
          <DropdownMenuTrigger asChild>
            <Button variant="outline" size="icon">
              <Globe className="h-4 w-4" />
            </Button>
          </DropdownMenuTrigger>
          <DropdownMenuContent align="end">
            {languages.map((language) => (
              <DropdownMenuItem
                key={language.code}
                onClick={() => setCurrentLanguage(language.name)}
                className={currentLanguage === language.name ? "bg-secondary" : ""}
              >
                {language.name}
              </DropdownMenuItem>
            ))}
          </DropdownMenuContent>
        </DropdownMenu>
        <Link to="/create">
          <Button className="bg-gradient-to-r from-purple-500 to-purple-700 hover:from-purple-600 hover:to-purple-800">
            Create Poll
          </Button>
        </Link>
      </div>
    </nav>
  );
};
