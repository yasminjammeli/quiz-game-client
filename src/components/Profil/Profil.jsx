import './Profil.css'
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import {faFlag,faClock,faCircleCheck,
} from "@fortawesome/free-solid-svg-icons";
import user from "../../../public/assets/logo.png";
const Profil = () => {
  return (
    <div className="heads">
          <img src={user} alt="User" />
          <div className="content">
            <div className="head">
              <h2>Oluwatobi Olowu</h2>
              <p>Bonus booster 24lv</p>
            </div>
            <div className="slide">
              <p className="slide-top slides"></p>
            </div>
            <div className="stats">
              <div className="stat">
                <div className="icon">
                  <FontAwesomeIcon icon={faFlag} />
                </div>
                <div className="number">
                  <h3>27</h3>
                  <p>Quiz Passed</p>
                </div>
              </div>
              <div className="stat">
                <div className="icon">
                  <FontAwesomeIcon icon={faClock} />
                </div>
                <div className="number">
                  <h3>27min</h3>
                  <p>Fastest Time</p>
                </div>
              </div>
              <div className="stat">
                <div className="icon">
                  <FontAwesomeIcon icon={faCircleCheck} />
                </div>
                <div className="number">
                  <h3>200</h3>
                  <p>Correct Answers</p>
                </div>
              </div>
            </div>
          </div>
        </div>
  )
}

export default Profil
