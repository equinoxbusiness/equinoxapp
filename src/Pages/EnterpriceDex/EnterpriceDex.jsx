import Image from "../../assets/images/crypto.png";

const EnterpriceDex = () => {
  return (
    <div id="enterprice-dex">
      <div className="hero-section">
        <h1>
          What is <br />
          <span>Enterprise DEX</span> ?
        </h1>
        <p>
          With Enterprise DEX, take an informed decision while trading in
          cryptos. Enterprise DEX offers P2P trading in Governance tokens of ORG
          3.0 registered and validated with Equinox's Proof of Business
          framework. Buy, Sell, Stake, Farm cryptos & do a lot more with feature
          rich enterprise grade Decentralised Exchange.
        </p>
      </div>
      <div className="hero-image">
        <img src={Image} alt="" />
      </div>
    </div>
  );
};

export default EnterpriceDex;
