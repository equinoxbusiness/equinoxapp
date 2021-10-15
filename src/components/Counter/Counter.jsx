import { useState, useEffect } from "react";
import moment from "moment";

const Counter = () => {
  let date = moment().add(100, "days").format("YYYY-MM-DD");
  const calculateTimeLeft = () => {
    // let year = new Date().getFullYear();
    // {year}-{month}-{days}
    const difference = +new Date(date) - +new Date();
    // const difference = +new Date(`${year}-12-25`) - +new Date();
    let timeLeft = {};

    if (difference > 0) {
      timeLeft = {
        nights: Math.floor(difference / (1000 * 60 * 60 * 24)),
        hours: Math.floor((difference / (1000 * 60 * 60)) % 24),
        minutes: Math.floor((difference / 1000 / 60) % 60),
        seconds: Math.floor((difference / 1000) % 60),
      };
    }

    return timeLeft;
  };

  const [timeLeft, setTimeLeft] = useState(calculateTimeLeft());

  useEffect(() => {
    setTimeout(() => {
      setTimeLeft(calculateTimeLeft());
    }, 1000);
  });
  return (
    <div className="counter">
      <div className="counter-block">
        <h2>
          <span className="span">{timeLeft.nights}</span>
          <span className="counter-name">nights</span>
        </h2>
      </div>
      <div className="counter-block">
        <h2>
          <span className="span">{timeLeft.hours}</span>
          <span className="counter-name">hours</span>
        </h2>
      </div>
      <div className="counter-block">
        <h2>
          <span className="span">{timeLeft.minutes}</span>
          <span className="counter-name">minutes</span>
        </h2>
      </div>
      <div className="counter-block">
        <h2>
          <span className="span">{timeLeft.seconds}</span>
          <span className="counter-name">seconds</span>
        </h2>
      </div>
    </div>
  );
};

export default Counter;
