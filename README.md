
# PollFlow - Interactive Poll Creation App

## Introduction
PollFlow is a web application that allows users to create, share, and participate in polls. Users can create both standard multiple-choice polls and text-based opinion polls.

## Technologies Used
This project uses several modern web technologies:
- **React**: A JavaScript library for building user interfaces
- **TypeScript**: A typed superset of JavaScript that adds static types
- **Tailwind CSS**: A utility-first CSS framework
- **Shadcn UI**: A collection of reusable UI components
- **React Router**: For navigation between pages
- **localStorage**: For temporary data storage (will be replaced with backend)

## Project Structure
- `/src`: Main source code folder
  - `/components`: Reusable UI components
  - `/pages`: Application pages/routes
  - `/types`: TypeScript type definitions
  - `/services`: Data services (current and future API integration)
  - `/hooks`: Custom React hooks
  - `/lib`: Utility functions and helpers

## Getting Started

### Prerequisites
- Node.js (v16 or higher)
- npm or yarn

### Installation
1. Clone the repository
```bash
git clone <repository-url>
cd pollflow
```

2. Install dependencies
```bash
npm install
# or
yarn install
```

3. Start the development server
```bash
npm run dev
# or
yarn dev
```

4. Open http://localhost:5173 in your browser

## Integrating with a Backend
For developers looking to connect this app to a backend:

1. The `src/services` directory contains service files that currently use localStorage
2. Replace the localStorage operations in `pollService.ts` with API calls
3. Maintain the same function interfaces for seamless integration
4. Common API integration points:
   - Poll creation (`createPoll` in `pollService.ts`)
   - Poll fetching (`getPolls` and `getPollById` in `pollService.ts`)
   - Vote submission (`votePoll` in `pollService.ts`)
   - Text answer submission (`submitPollAnswer` in `pollService.ts`)

## Learning Resources
- [React Documentation](https://react.dev/)
- [TypeScript Documentation](https://www.typescriptlang.org/docs/)
- [Tailwind CSS Documentation](https://tailwindcss.com/docs)
- [React Router Documentation](https://reactrouter.com/en/main)
