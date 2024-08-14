import "./Dashboard.css";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import "../../icons";
import { useState } from "react";
import { useNavigate } from "react-router-dom";

const Dashboard = () => {
  const [active, setActive] = useState("dashboard");
  const navigate = useNavigate();

  const handleClick = (name) => {
    setActive(name);
  };

  const handleLogOut = () => {
    navigate("/");
  };

  return (
    <div className="dashboard">
      <div className="dashboard-left">
        <div className="sidebar">
          <div
            className={`side ${active === "dashboard" ? "active" : ""}`}
            onClick={() => handleClick("dashboard")}
          >
            <span className="dots">
              <div className="dot-1"></div>
              <div>
                <div className="dot-2"></div>
                <div className="dot-3"></div>
              </div>
            </span>
            <p className="dash">Dashboard</p>
          </div>
          <div
            className={`side ${active === "support" ? "active" : ""}`}
            onClick={() => handleClick("support")}
          >
            <FontAwesomeIcon icon="fa-solid fa-headphones" />
            <p className="dash">Support</p>
          </div>
          <div
            className={`side ${active === "notification" ? "active" : ""}`}
            onClick={() => handleClick("notification")}
          >
            <FontAwesomeIcon icon="fa-solid fa-bell" />
            <p className="dash">Notification</p>
          </div>
          <button className="log-out" onClick={handleLogOut}>
            <FontAwesomeIcon
              className="fa-rotate-180"
              icon="fa-solid fa-arrow-right-to-bracket"
            />
            <div className="dash">Log Out</div>
          </button>
        </div>
      </div>
    </div>
  );
};

export default Dashboard;
