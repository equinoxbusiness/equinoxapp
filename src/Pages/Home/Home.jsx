import { Counter } from "../../components";
import Image from "../../assets/images/moon.png";
import { AiOutlineArrowRight } from "react-icons/ai";
import { Link } from "react-router-dom";

const Home = () => {
  return (
    <>
      <div id="hero-section">
        <div className="hero-content ">
          <img src={Image} alt="" className="hero-bg" />
          <Counter />
          <h3>to go</h3>
          <h1>
            get ready <span>to deploy</span> <br /> your org 3.0
          </h1>
          <p>
            Equinox Business is bringing for the first time Enterprise DEX
            focused more on community's investment protection through wielding
            powers by holding governance tokens, built-in distribution system of
            Salaries, Dividends and paying bills through Cryptos and managing
            the entire project as a Business Enterprise using onchain project
            management and ERP modules.
          </p>
          <div className="cta">
            <a
              href="https://app.equinox.business/static/media/Equinox-Whitepaper-V1.0.4a6ef25e.pdf"
              className="btn btn-bg"
              target="_blank"
            >
              whitepaper v 1.0 <AiOutlineArrowRight />
            </a>
            <Link to="/buy-eqx" className="btn btn-cr">
              crowdsale
            </Link>
          </div>
        </div>
        <div className="hero-image">
          <img src={Image} alt="" />
        </div>
      </div>
    </>
  );
};

export default Home;
