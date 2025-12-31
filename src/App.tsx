import "./App.css";
import { BrowserRouter as Router, Route, Routes } from "react-router-dom";
import Home from "./pages/Home";
import Settings from "./pages/Settings";
import Navbar from "./components/layout/Navbar";
import Footer from "./components/layout/Footer";
import Statistics from "./pages/Statistics";
import Pomodoro from "./pages/Pomodoro";

export default function App() {
  return (
    <Router>
      <Navbar />

      <Routes>
        <Route path="/" element={<Home />} />
        <Route path="/settings" element={<Settings />} />
        <Route path="/statistics" element={<Statistics />} />
        <Route path="/pomodoro/:taskId" element={<Pomodoro />} />
      </Routes>

      <Footer />
    </Router>
  );
}
