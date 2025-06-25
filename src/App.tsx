import { useEffect} from "react";
import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import "bootstrap/dist/css/bootstrap.min.css";
import "./App.css";
import "./css/fontawesome.min.css";

import Welcome from "./components/Welcome.tsx";
import Schools from "./components/Schools.tsx";
import Students from "./components/Students.tsx";

function App() {
  
  useEffect(() => {
    document.title = "Titulo App"
  }, [])

  return (
    <Router>
      <Routes>
        <Route path="/" element={<Welcome/>}/>
        <Route path="/schools" element={<Schools/>}/>
        <Route path="/students" element={<Students/>}/>
      </Routes>
    </Router>
  );
}

export default App;
