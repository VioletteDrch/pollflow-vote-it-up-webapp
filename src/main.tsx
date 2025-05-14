
/**
 * Main entry point for the application.
 * Renders the root App component into the DOM.
 * This file is the starting point of the React application.
 */

import { createRoot } from 'react-dom/client'
import App from './App.tsx'
import './index.css'

createRoot(document.getElementById("root")!).render(<App />);
