
import { Link } from "react-router-dom";
import { Button } from "@/components/ui/button";

export const NavBar = () => {
  return (
    <nav className="w-full py-4 px-6 md:px-12 flex items-center justify-between border-b">
      <Link to="/" className="flex items-center space-x-2">
        <span className="text-xl font-bold text-gradient">PollFlow</span>
      </Link>
      <div className="flex items-center gap-4">
        <Link to="/create">
          <Button className="bg-gradient-to-r from-purple-500 to-purple-700 hover:from-purple-600 hover:to-purple-800">
            Create Poll
          </Button>
        </Link>
      </div>
    </nav>
  );
};
