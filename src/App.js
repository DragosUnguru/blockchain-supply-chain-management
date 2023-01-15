import './App.css';
import { BrowserRouter, Routes, Route, Navigate } from "react-router-dom";
import SignIn from "./pages/SignIn";
import SignUp from "./pages/SignUp";
import Home from "./pages/Home";

function App() {
  const email = localStorage.getItem("email");
  return (
    <div className="App">
      <BrowserRouter>
        <Routes>
          <Route exact path="/" element={<SignIn />} />
          <Route path="/signup" element={<SignUp />} />
          <Route
            path="/home"
            element={email ? <Home /> : <Navigate to="/" />}
          />
        </Routes>
      </BrowserRouter>
    </div>
  );
}

export default App;
