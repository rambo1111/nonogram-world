import { BrowserRouter as Router, Routes, Route, useNavigate } from "react-router-dom";
import SolverPage from "./pages/SolverPage";
import ConverterPage from "./pages/ConverterPage";
import GamePage from "./pages/GamePage";
import HomePage from "./pages/HomePage";
import Header from "./components/shared/Header";
import PlayPage from "./pages/PlayPage";

// MainLayout wraps all pages that need the standard header
function MainLayout() {
  const navigate = useNavigate();

  // This function is passed down to children to handle navigation
  const handleNavigate = (path: string) => {
    navigate(path);
  };

  return (
    <div className="bg-pattern min-h-screen text-black relative overflow-hidden p-4 sm:p-8">
      <div className="container mx-auto">
        <Header onNavigate={handleNavigate} />
        <Routes>
          <Route path="/" element={<HomePage onNavigate={handleNavigate} />} />
          <Route path="/solver" element={<SolverPage />} />
          <Route path="/maker" element={<ConverterPage />} />
          <Route path="/game" element={<GamePage />} />
        </Routes>
      </div>
    </div>
  );
}

function App() {
  return (
    <Router>
      <Routes>
        {/* MODIFICATION: The route is now just "/play" without the ":encodedData" param */}
        <Route path="/play" element={
          <div className="bg-pattern min-h-screen text-black relative overflow-hidden p-4 sm:p-8">
            <PlayPage />
          </div>
        } />

        {/* All other main routes go through the MainLayout */}
        <Route path="*" element={<MainLayout />} />
      </Routes>
    </Router>
  );
}

export default App;