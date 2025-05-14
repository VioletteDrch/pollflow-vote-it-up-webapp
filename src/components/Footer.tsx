
import { Link } from "react-router-dom";

export const Footer = () => {
  return (
    <footer className="w-full py-8 px-6 md:px-12 mt-12 border-t border-primary-200 bg-primary-50">
      <div className="max-w-7xl mx-auto flex flex-col md:flex-row justify-between items-center">
        <div className="mb-4 md:mb-0">
          <p className="text-sm text-primary-600">
            © 2025 Lumières. All rights reserved.
          </p>
        </div>
        <div className="flex gap-6">
          <Link to="/" className="text-sm text-primary-600 hover:text-primary-800">
            Home
          </Link>
          <Link to="/create" className="text-sm text-primary-600 hover:text-primary-800">
            Create Discourse
          </Link>
        </div>
      </div>
    </footer>
  );
};
