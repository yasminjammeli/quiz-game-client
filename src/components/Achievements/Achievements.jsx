import './Achievements.css'
import badge_1 from "../../../public/assets/badge_1.png";
import badge_2 from "../../../public/assets/badge_2.png";
import badge_3 from "../../../public/assets/badge_3.png";
const Achievements = () => {
  return (
    <div className="achievements-section">
          <div className="achievements-container">
            <div className="head-achievements">
              <h2>Achievements</h2>
              <div className="slide min-slide">
                <p className="slide-top min-top"></p>
              </div>
            </div>
            <div className="achievements">
              <div className="achievement badge-1">
                <img src={badge_1} alt="" />
                <p>Comeback</p>
              </div>
              <div className="achievement badge-2">
                <img src={badge_2} alt="" />
                <p>Winner</p>
              </div>
              <div className="achievement badge-3">
                <img src={badge_3} alt="" />
                <p>Lucky</p>
              </div>
              <div className="footer">
                <hr />
                <p>View All</p>
              </div>
            </div>
          </div>
        </div>
  )
}

export default Achievements
