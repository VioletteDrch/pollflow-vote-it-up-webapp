
import { Link } from "react-router-dom";

export const Footer = () => {
  return (
    <footer className="w-full py-6 px-6 md:px-12 mt-12 border-t">
      <div className="max-w-7xl mx-auto flex flex-col md:flex-row justify-between items-center">
        <div className="mb-4 md:mb-0">
          <p className="text-sm text-muted-foreground">
            © 2025 PollFlow. All rights reserved.
          </p>
        </div>
        <div className="flex gap-6">
          <Link to="/" className="text-sm text-muted-foreground hover:text-foreground">
            Home
          </Link>
          <Link to="/create" className="text-sm text-muted-foreground hover:text-foreground">
            Create Poll
          </Link>
        </div>
      </div>
    </footer>
  );
};
