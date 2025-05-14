
import { Link } from "react-router-dom";
import { Button } from "@/components/ui/button";

export const NavBar = () => {
  return (
    <nav className="w-full py-6 px-6 md:px-12 flex items-center justify-between border-b border-slate-200 bg-white">
      <Link to="/" className="flex items-center space-x-2">
        <span className="text-2xl font-serif font-bold text-gradient">Gora</span>
      </Link>
      <div className="flex items-center gap-4">
        <Link to="/create">
          <Button className="gora-button-primary">
            Create Poll
          </Button>
        </Link>
      </div>
    </nav>
  );
};
