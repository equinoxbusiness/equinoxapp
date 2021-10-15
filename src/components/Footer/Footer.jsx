import { AiFillTwitterCircle } from "react-icons/ai";
import { FaTelegram, FaReddit, FaGithub } from "react-icons/fa";
import { AiFillMediumSquare } from "react-icons/ai";

const Footer = () => {
  const year = new Date().getFullYear();
  return (
    <div id="footer">
      <div className="copyright">
        <h3>COPYRIGHT © {year} EQUINOXAPP BUSINESS</h3>
      </div>
      <div className="social">
        <ul>
          <li>
            <a href="https://twitter.com/eqxforbusiness">
              <AiFillTwitterCircle />
            </a>
          </li>
          <li>
            <a href="https://t.me/equinoxforbusiness">
              <FaTelegram />
            </a>
          </li>
          <li>
            <a href="https://medium.com/@eqxforbusiness">
              <AiFillMediumSquare />
            </a>
          </li>
          <li>
            <a href="https://www.reddit.com/user/equinoxbusiness/">
              <FaReddit />
            </a>
          </li>
          <li>
            <a href="https://github.com/equinoxbusiness">
              <FaGithub />
            </a>
          </li>
        </ul>
      </div>
    </div>
  );
};

export default Footer;
