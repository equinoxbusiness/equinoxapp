import { Counter } from "../../components";
import Image from "../../assets/images/moon.png";
import { AiOutlineArrowRight } from "react-icons/ai";
import { Link } from "react-router-dom";
import hand from "../../assets/images/hand.png";
import astro from "../../assets/images/astro.png";

const Home2 = () => {
    return (
        <>
            <div className="lunchsec createOrg_page">
                <div className="hand"><img src={hand} className="w-100"/></div>
                <div className="astro"><img src={astro} className="w-100"/></div>
                <div className="container col-md-8">
                    <h4 className="mb-3 fw-300">ORG 3.0 stands for 'Operations and Resources Group' based on semantic Web. These are Web 3.0 project teams and decentralisation arm of today's mainstream organizations.</h4>
                    <p className="font-12">To create org 3.0, make sure you are connected to Binance smart chain testnet network.<br/><br/>
                         To connect your wallet to testnet, follow the instructions given below :<br/><br/>
                          - Open metamask wallet & select networks<br/>
                           - Click on add network ( in mobile ) & custom RPC ( in desktop ).<br/>
                            - Network name : Smart Chain<br/>
                             - Testnet<br/>
                              - New RPC url : https://data-seed-prebsc-1-S1.binance.org:8545/ <br/>
                               - chain id : 97 <br/>
                               - symbol : BNB <br/>
                               - Block explorer : https://testnet.bscscan.com <br/>
                               - You need to have test equinox tokens to create org. To get test equinox you need to send your wallet address in equinox telegram community ( t.me/eqxcommunity ) With, "requesting for test EQX" message. <br/><br/>
                               -NOTE : This application is in demonstration stage and should not be used in live environment.</p>
                               <div className="creat_btn">
                                   <Link to="/org"><button>Create ORG 3.0</button></Link>
                               </div>
                </div>

            </div>
        </>
    );
};

export default Home2;
