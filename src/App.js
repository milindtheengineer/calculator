import "./index.css";
import Navbar from "./Navbar";
import Home from "./Home";
import About from "./About";
import NotFound from "./NotFound";
import { BrowserRouter as Router, Route, Routes } from "react-router-dom";
import { Analytics } from "@vercel/analytics/react";

function App() {
  return (
    <Router>
      <div className="App">
        <Navbar />
        <div className="content">
          <Routes>
            <Route path="/" element={<Home />} />
            <Route path="/about" element={<About />} />
            {/* Define other routes here */}
            <Route path="*" element={<NotFound />} />
          </Routes>
        </div>
        <Analytics />
      </div>
    </Router>
  );
}

export default App;
