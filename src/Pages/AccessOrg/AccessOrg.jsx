import Image from "../../assets/images/accounting.png";
import { Link } from "react-router-dom";
import { connect } from "react-redux";

const AccessOrg = (props) => {
  const {auth} = props;
  return (
    <div id="access-org">
      <div className="hero-section">
        <div className="create-org-des">
          <Link to={`/org`} className={`button ${auth?.id ? 'disabled-link' : ''}`}>Create ORG 3.0</Link>
          <p>To create org 3.0, make sure you are connected to Binance smart chain testnet network.</p>

          <p>To connect your wallet to testnet, follow the instructions given below :</p>
          <ul className="list">
            <li>- Open metamask wallet & select networks</li>
            <li>- Click on add network ( in mobile ) & custom RPC ( in desktop ).</li>
            <li>- Network name : Smart Chain - Testnet</li>
            <li>- New RPC url : https://data-seed-prebsc-1-S1.binance.org:8545/</li>
            <li>- chain id : 97</li>
            <li>- symbol : BNB</li>
            <li>- Block explorer : https://testnet.bscscan.com</li>
          </ul>


          <p>- You need to have test equinox tokens to create org. To get test equinox you need to send your wallet address in equinox telegram community ( t.me/eqxcommunity )
          With, "requesting for test EQX" message.</p>

          <p>-NOTE : 
          This application is in demonstration stage and should not be used in live environment.</p>
        </div>
        <h1>
          What <span>ORG 3.0 Are</span> ?
        </h1>
        <p>
          ORG 3.0 stands for 'Operations and Resources Group' based on semantic
          Web. These are Blockchain Project teams and decentralisation arm of
          today's mainstream organizations. Any teams and organizations with
          legit and authenticated credentials can register as ORG 3.0, create
          and list their governance tokens and utilize Equinox's Business
          management tools to operate and manage resources contributed by their
          Governance token holders.
        </p>
      </div>
      <div className="hero-image">
        <img src={Image} alt="" />
      </div>
    </div>
  );
};

const mapStateToProps = (state) => {
  return {
    auth: state.auth
  };
};

export default connect(mapStateToProps)(AccessOrg);
