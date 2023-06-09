import "./App.css";
import { BrowserRouter, Routes, Route } from "react-router-dom";
import Navigation from "./modules/navigation/Navigation.module";
import "bootstrap/dist/css/bootstrap.min.css";
function App() {
  return (
    <BrowserRouter>
      <div className="App">
        <Routes>
          <Route path="*" element={<Navigation />}></Route>
        </Routes>
      </div>
    </BrowserRouter>
  );
}

export default App;
