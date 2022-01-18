import React, {useState, useEffect} from 'react';
import { getWeb3 } from '../../../helpers/currentWalletHelper';
import { Link } from 'react-router-dom';
import './OrgStep5.scss';
import bep20Abi from "../../../Config/abis/bep20Abi.json";
import { getMe } from "./../../../services/dashboard";
import { connect } from 'react-redux';

const OrgStep5 = (props) => {
  const [eqxBlance, setEqxBalance] = useState("");
  const eqxAdd = "0x54040960e09fb9f1dd533d4465505ba558693ad6";
  let multiSigAdd = localStorage.getItem(props.walletInfo.wallet);
  
  const checkBalance = async () => {
    console.log('multisig', multiSigAdd)
    let web3 = await getWeb3();
    let eqxContract = new web3.eth.Contract(bep20Abi, eqxAdd);
    let balance = await eqxContract.methods.balanceOf(multiSigAdd).call();
    let decimal = await eqxContract.methods.decimals().call();
    
    setEqxBalance(balance/decimal)

    console.log("balance", eqxBlance);
  }

  return (
    <div className="OrgStep5" data-testid="OrgStep5">
      <div className="container">
        <div className="inner_card ">
          <div className="w-100">
            <div className="row mb-4">
              <div className="col-md-3"></div>
              <div className="col-md-6">
                <p>ORG 3.0 LAUNCHPAD</p>
                <h2 className="mb-3">ORG 3.0 DEPLOYED !</h2>
                <div className="text-center">
                <Link className="photo_cap_btn" to="/dashboard">ACCESS DASHBOARD</Link>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  )
};

const mapStateToProps = (state) => {
  return {
    account: state.account,
  };
};

export default connect(mapStateToProps)(OrgStep5);
