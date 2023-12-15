import { Routes, Route } from "react-router-dom";
import "./App.css";

import Home from "./pages/Home.jsx";
import Login from "./pages/Login.jsx";
import SignUp from "./pages/SignUp.jsx";
import Account from "./pages/Account.jsx";
import Navbar from "./components/Navbar";

function App() {
  const isUserSignedIn = !!localStorage.getItem("token");
  return (
    <>
      <div>
        <Navbar />
        <Routes>
          <Route path="/" element={<Home />} />
          <Route path="/login" element={<Login />} />
          <Route path="/signup" element={<SignUp />} />
          {isUserSignedIn && <Route path="/account" element={<Account />} />}
        </Routes>
      </div>
    </>
  );
}

export default App;
