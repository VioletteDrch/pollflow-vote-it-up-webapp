
import { Link } from "react-router-dom";
import { Button } from "@/components/ui/button";

export const NavBar = () => {
  return (
    <nav className="w-full py-6 px-6 md:px-12 flex items-center justify-between border-b border-primary-200 bg-background">
      <Link to="/" className="flex items-center space-x-2">
        <span className="text-2xl font-serif font-bold lumieres-title">Lumières</span>
      </Link>
      <div className="flex items-center gap-4">
        <Link to="/create">
          <Button className="lumieres-button-primary">
            Create Discourse
          </Button>
        </Link>
      </div>
    </nav>
  );
};
