import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import LandingPage from "./components/LandingPage";
import UploadForm from "./components/UploadForm"; 
import "./index.css";

function App() {
  return (
    <Router>
      <Routes>
        <Route path="/" element={<LandingPage />} />
        <Route path="/Upload" element={<UploadForm />} />
      </Routes>
    </Router>
  );
}

export default App;
