# MERN Stack Enterprise Blog Engine

## Overview
This repository contains a high-performance, full-stack blog application engineered with the MERN (MongoDB, Express, React, Node.js) stack. The platform is designed as an enterprise-grade content delivery system, featuring sophisticated UI animations, high-speed fuzzy search, and a secure backend architecture.

## Technical Stack
* **Frontend**: React.js with Framer Motion for physics-based animations and Lucide React for iconography.
* **Search Engine**: Integrated Fuse.js for optimized, client-side fuzzy search capabilities.
* **Backend**: Node.js and Express utilizing Mongoose for schema validation and Express-Validator for API security.
* **Database**: MongoDB for persistent data storage and comment management.
* **Styling**: Tailwind CSS with a custom Glassmorphic design system.

## Prerequisites
Ensure the following environment requirements are met before installation:
* Node.js (v18.0.0 or higher)
* npm (v8.0.0 or higher)
* MongoDB (Local service or Atlas URI)

## Installation and Configuration

### 1. Repository Setup
```bash
git clone <repository-url>
cd mern-blog-master
```
### 2. Backend Environment Setup
Install dependencies in the root directory:

```bash
npm install
```

Create a .env file in the root directory and configure the following:

Code snippet
```bash
PORT=8000
MONGO_URI=mongodb://localhost:27017/mernblog
```

### 3. Frontend Client Setup
Navigate to the client directory and install dependencies:

```bash
cd client
npm install
```

### 4. Dependency Verification
Ensure the following packages are installed in the client directory to support premium features:

```bash
npm install framer-motion lucide-react fuse.js
```

## Running the Application

The project utilizes concurrently to execute both the server and client environments simultaneously. From the root directory, run:

```bash
npm run dev
``` 

* Client Access: http://localhost:3000
* API Endpoint: http://localhost:8000/api

## Key Functionalities
* Search Optimization: Instant filtering of articles across titles and body content using the Fuse.js fuzzy matching algorithm.

* Editorial Article View: High-fidelity article pages with dynamic reading progress indicators and responsive layouts.

* Secure Commenting System: Sanitized input handling for user comments with real-time state updates.

* Defensive Rendering: Component-level safety checks to prevent application failure during asynchronous data fetching or 404 responses.

* Scroll Restoration: Automated navigation control to ensure a consistent user experience during history stack transitions.

## Project Structure

```text
├── client/                 # React frontend application
│   ├── src/
│   │   ├── components/     # UI components (Navbar, Articles, Forms)
│   │   ├── pages/          # View-level components (Home, Article, List)
│   │   └── App.js          # Core routing and layout logic
├── server.js               # Express server and Mongoose schema
├── .env                    # Environment credentials (excluded)
├── .gitignore              # Version control exclusion rules
└── package.json            # Root configuration and scripts
```

## Security and Compliance
* CORS Management: Frontend-to-backend communication is managed via a proxy configuration in client/package.json.

* Credential Protection: Sensitive connection strings are managed via environment variables and excluded from version control.

* Data Integrity: All database interactions are governed by Mongoose models to ensure consistent data structures.
