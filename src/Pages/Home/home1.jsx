import { Counter } from "../../components";
import Image from "../../assets/images/moon.png";
import { AiOutlineArrowRight } from "react-icons/ai";
import { Link } from "react-router-dom";
import axios from "axios";
import Pdf from "../../assets/EQX-Whitepaper-V1.0.pdf";

const Home1 = () => {

    const whitePaper = () => {
        axios.get('../../assets/EQX-Whitepaper-V1.0.pdf', {headers: { 'Content-Type': 'application/pdf'}})
            .then((res)=>res.blob())
            .then((blob)=>{
                const url = window.URL.createObjectURL(
                    new Blob([blob]),
                );
                const link = document.createElement('a');
                link.href = url;
                link.setAttribute(
                    'download',
                    `EQX-Whitepaper-V1.0.pdf`,
                );
              
                // Append to html link element page
                document.body.appendChild(link);
              
                // Start download
                link.click();
              
                // Clean up and remove the link
                link.parentNode.removeChild(link);
            })
    }


    return (
        <>
            <div className="lunchsec">
                <div className="container">
                    <p>POWER UP YOUR DECENTRALIZED ORGANIZATION. IT'S</p>
                    <h1>

                        ORG 3.0 LAUNCHPAD
                        <span className="font-12">BETA VERSION</span>
                    </h1>
                    <h5 className="col-md-10 mx-auto mb-4">GOVERN DAO WITH G TOKEN. MANAGE ASSETS IN DAO MULTISIG WALLET. RAISE FUNDS WITH UNIFIED ICO SWAP.</h5>
                    <div className="col-md-10 mx-auto">
                        <div className="row">
                            <div className="col-md-4">
                                <a href={Pdf} download="EQX-Whitepaper-V1.0.pdf"><button>Whitepaper V1.0</button></a>
                            </div>
                            <div className="col-md-4">
                                <Link to="/access-org"><button>Create ORG 3.0</button></Link>
                            </div>
                            <div className="col-md-4">
                                <button>Know More</button>
                            </div>
                            <div className="col-md-4">
                                <button>Documentation</button>
                            </div>
                            <div className="col-md-4">
                                <button>Support</button>
                            </div>
                            <div className="col-md-4">
                                <button>Playground</button>
                            </div>
                        </div>
                    </div>
                    <p className="font-14">COMING SOON: ENTERPRISE DEX TO LIST G TOKENS. ONCHAIN ERP & PROJECT MANAGEMENT TOOLS</p>
                </div>

            </div>
        </>
    );
};

export default Home1;
