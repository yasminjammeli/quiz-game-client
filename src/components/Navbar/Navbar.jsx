import { useState, useEffect } from "react";
import "./Navbar.css";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import "../../icons";
import user from "../../../public/assets/logo.png";

const Navbar = () => {
  const [userName, setUserName] = useState('');

  useEffect(() => {
    const storedUserName = localStorage.getItem('username');
    setUserName(storedUserName || 'Oluwatobi Olowu');
  }, []);

  return (
    <div className="navbar">
      <div className="logo">Quiz Time</div>
      <div className="search">
        <FontAwesomeIcon
          className="icon"
          icon="magnifying-glass"
          color="#8692A6"
        />
        <input type="search" placeholder="Search.." />
      </div>
      <div className="start-quiz">
        <button>Start Quiz</button>
      </div>
      <div className="user">
        <img src={user} alt="User Profile" />
        <p>{userName}</p>
      </div>
    </div>
  );
};

export default Navbar;
