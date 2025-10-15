# Nonogram World 🎨

Welcome to Nonogram World, an all-in-one web application for playing, creating, and solving Nonogram (also known as Picross or Griddlers) puzzles. This project allows you to convert any image into a puzzle, tackle randomly generated challenges, or get help from an automatic solver.

**[Live Site](https://nonogram-world.onrender.com)**

---

## 🚀 Key Features

Nonogram World is built with a rich set of features to provide a complete and engaging experience:

* **🧩 Play Puzzles (`/game`)**: Enjoy a clean and responsive grid for solving Nonogram puzzles. Choose from three difficulty levels—Guided, Explorer, or Architect—which adjust the number of hints provided. The game provides feedback on your solution and celebrates your success.

* **🖼️ Create from Image (`/maker`)**: This is the core feature of the application. Upload any image, and our creator tool will instantly convert it into a playable Nonogram puzzle. You have full control over the puzzle's dimensions and the black-and-white threshold to fine-tune the result.

* **🧠 Automatic Solver (`/solver`)**: Stuck on a tricky puzzle? The Solver page allows you to input custom row and column clues for any Nonogram. With a single click, a powerful solving algorithm will attempt to find the unique solution, handling puzzles up to 30x30 in size.

* **🔗 Share Puzzles via URL (`/play`)**: Every puzzle you generate from an image can be shared with a unique, compressed URL. The puzzle data, including the original image, is compressed using `pako` (zlib) and encoded into the link. Anyone with the link can play your custom puzzle and reveal the hidden image upon solving it.

---

## 🎨 Design System & UI Style

Nonogram World features a distinctive **"Neobrutalist"** aesthetic characterized by:

* **High-Contrast Components**: Bold, solid shadows (`shadow-neo`) and thick borders on interactive elements and containers.
* **Vibrant Color Palette**: A playful and energetic color scheme with primary (yellow), secondary (pink), and accent (cyan) variants for buttons and headers.
* **Tactile & Animated UI**: Buttons have satisfying animations on hover and click, giving the interface a responsive, physical feel.

---

## 🛠️ Technology Stack

This project leverages a modern, efficient, and type-safe tech stack:

* **Frontend**: [React](https://reactjs.org/) & [TypeScript](https://www.typescriptlang.org/)
* **Build Tool**: [Vite](https://vitejs.dev/)
* **Routing**: [React Router](https://reactrouter.com/)
* **Styling**: [Tailwind CSS](https://tailwindcss.com/) with a custom theme and animations.
* **Icons**: [Lucide React](https://lucide.dev/) for clean and consistent iconography.
* **URL Compression**: [Pako](https://github.com/nodeca/pako) for high-speed zlib compression to enable the puzzle sharing feature.

---

## 📂 Project Architecture

The codebase is organized for clarity, scalability, and maintainability:

* `src/pages/`: Contains the top-level components for each main route (e.g., `HomePage.tsx`, `ConverterPage.tsx`).
* `src/components/`: Divided into `features` (components specific to one page, like `ImageUploader`) and `shared` (reusable components like `NeoButton` and `Card`).
* `src/hooks/`: Houses the complex state management and business logic for major features (`useNonogramSolver.ts`, `useNonogramGame.ts`), keeping page components clean.
* `src/lib/`: Contains the core algorithms and utility functions, such as the solver logic (`nonogram.ts`), puzzle generation (`puzzleGenerator.ts`), and URL encoding (`urlEncoder.ts`).

---

## ⚙️ Getting Started

To get a local copy up and running, follow these simple steps.

### Prerequisites

You need to have [Node.js](https://nodejs.org/) (version 18.x or higher recommended) and [npm](https://www.npmjs.com/) installed on your machine.

### Installation & Running Locally

1.  **Clone the repository:**
    ```sh
    git clone https://github.com/rambo1111/nonogram-world.git
    cd nonogram-world
    ```

2.  **Install NPM packages:**
    ```sh
    npm install
    ```

3.  **Start the development server:**
    ```sh
    npm run dev
    ```
    Your application should now be running on `http://localhost:5173/`.

---

## 🚢 Deployment

This application is configured for easy deployment on **Render** as a **Static Site**.

* **Build Command**: `npm install && npm run build`
* **Publish Directory**: `dist`
* **Rewrite Rule**: Add a rewrite rule for client-side routing:
    * **Source**: `/*`
    * **Destination**: `/index.html`
    * **Type**: Rewrite

This ensures that all routes created with React Router function correctly after deployment.
