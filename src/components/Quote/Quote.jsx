import './Quote.css'
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import {faQuoteLeft } from "@fortawesome/free-solid-svg-icons";
const Quote = () => {
  return (
    <div className="quote " >
        <FontAwesomeIcon icon={faQuoteLeft} color="#00DAF7" fontSize={"25px"} />
        <p>
          Those people who develop the ability to continuously acquire new and
          better forms of knowledge that they can apply to their work and to
          their lives will be the movers and shakers in our society for the
          indefinite future.
        </p>
        <p>- Brian Tracy</p>
        <div className="points">
          <div className="point-1"></div>
          <div className="point-2"></div>
        </div>
      </div>
  )
}

export default Quote
