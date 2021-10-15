import Image from "../../assets/images/accounting.png";

const AccessOrg = () => {
  return (
    <div id="access-org">
      <div className="hero-section">
        <h1>
          What is <br />
          <span>ACCESS ORG 3.0</span> ?
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

export default AccessOrg;
