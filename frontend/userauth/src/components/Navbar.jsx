import React from "react";
import { Link, useNavigate } from "react-router-dom";
function Navbar() {
  const isUserSignedIn = !!localStorage.getItem("token");
  const navigate = useNavigate();
  const handleLogOut = () => {
    localStorage.removeItem("token");
    navigate("/login");
  };
  return (
    <nav
      className=" flex justify-around p-3 border-b border-zinc-800
                   items-center bg-[#1a1a1a] text-zinc-300"
    >
      <Link to="/">
        <h1>Kshitish</h1>
      </Link>
      <ul className=" flex gap-20">
        {isUserSignedIn ? (
          <>
            <Link to="/account">
              <li>Account</li>
            </Link>
            <li>
              <button onClick={handleLogOut}>Logout</button>
            </li>
          </>
        ) : (
          <>
            <Link to="/login">
              <li>Login</li>
            </Link>
            <Link to="/signup">
              <li>SignUp</li>
            </Link>
          </>
        )}
      </ul>
    </nav>
  );
}

export default Navbar;
