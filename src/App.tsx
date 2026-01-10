import "./App.css";
import { BrowserRouter as Router, Route, Routes } from "react-router-dom";
import Home from "./pages/Home";
import Settings from "./pages/Settings";
import Statistics from "./pages/Statistics";
import Pomodoro from "./pages/Pomodoro";
import Layout from "./components/layout/PageLayout/Layout";

export default function App() {
  return (
    <Router>
      <Layout>
        <Routes>
          <Route path="/" element={<Home />} />
          <Route path="/settings" element={<Settings />} />
          <Route path="/statistics" element={<Statistics />} />
          <Route path="/pomodoro/:taskId" element={<Pomodoro />} />
        </Routes>
      </Layout>
    </Router>
  );
}
