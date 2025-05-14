
import { Link } from "react-router-dom";

export const Footer = () => {
  return (
    <footer className="w-full py-8 px-6 md:px-12 mt-12 border-t border-slate-200 bg-slate-50">
      <div className="max-w-7xl mx-auto flex flex-col md:flex-row justify-between items-center">
        <div className="mb-4 md:mb-0">
          <p className="text-sm text-slate-500">
            © 2025 Gora. All rights reserved.
          </p>
        </div>
        <div className="flex gap-6">
          <Link to="/" className="text-sm text-slate-500 hover:text-slate-800">
            Home
          </Link>
          <Link to="/create" className="text-sm text-slate-500 hover:text-slate-800">
            Create Poll
          </Link>
        </div>
      </div>
    </footer>
  );
};
