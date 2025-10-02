import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import Registro from "./components/Registro";
import UploadForm from "./components/UploadForm"; 
import "./index.css";

function App() {
  return (
    <Router>
      <Routes>
        <Route path="/" element={<Registro />} />
        <Route path="/Upload" element={<UploadForm />} />
      </Routes>
    </Router>
  );
}

export default App;
