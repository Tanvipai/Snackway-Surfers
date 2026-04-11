# CLAUDE.md

This file provides guidance to Claude Code (claude.ai/code) when working with code in this repository.

## Commands

```bash
# Install dependencies
npm install

# Start development server (http://localhost:3000)
npm start

# Run tests in watch mode
npm test

# Run a single test file
npm test -- --testPathPattern=<testFileName>

# Build for production
npm run build

# Eject from Create React App (one-way operation)
npm run eject
```

## Architecture

**Create React App (CRA) 5.0.1** - Standard React single-page application structure with no custom configuration.

### Tech Stack
- **React 19** with functional components and hooks
- **React Router v7** for client-side routing
- **Firebase** for backend services
- **Testing Library** (Jest + React Testing Library) for testing
- **No TypeScript** - pure JavaScript/JSX codebase

### Application Structure
- `src/App.js` - Root component, currently renders only the login page
- `src/pages/` - Page-level components (HomePage, CartPage, EasyGroceriesLogin)
- `src/components/` - Reusable UI components (Navbar, Footer - currently empty stubs)

### Key Features
- **EasyGroceriesLogin** (`src/pages/EasyGroceriesLogin.jsx`) - Main authentication component with:
  - Login/signup forms with flip-card animation
  - LocalStorage-based user management (no real backend)
  - Custom shutter animation on successful login
  - Inline CSS injection for animations and styling

### Notes
- Component files in `src/components/` and some pages in `src/pages/` are empty stubs
- Authentication is mock implementation using localStorage
- No routing is currently configured despite react-router-dom being installed
