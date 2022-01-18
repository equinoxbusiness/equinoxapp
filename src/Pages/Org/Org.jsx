import React, {useState, useEffect} from 'react';
import {
  getTokenBalance,
  getTokenContract
} from "./../../helpers/getterFunctions";
import { connect } from "react-redux";
import StepWizard from "react-step-wizard";
import OrgStep1 from './OrgStep1/OrgStep1';
import OrgStep2 from './OrgStep2/OrgStep2';
import OrgStep3 from './OrgStep3/OrgStep3';
import OrgStep4 from './OrgStep4/OrgStep4';
import OrgStep5 from './OrgStep5/OrgStep5';
import { getWeb3 } from '../../helpers/currentWalletHelper';
import bep20Abi from "../../Config/abis/bep20Abi.json";
import { getMe } from '../../services/dashboard';
import { Redirect } from 'react-router-dom';

const Org = (props) => {
  const [wallet, setWallet] = useState('');
  const [eqxBalance, setEqxBalance] = useState(0);
  const {auth} = props;
    
  const getBalance = async () => {
    try {
      if (props.account && props.account.account) {
          let web3 = await getWeb3();
          let contract = await new web3.eth.Contract(bep20Abi, "0x54040960e09fb9f1dd533d4465505ba558693ad6"); // this is test eqx address fetch this address from pages/Config/contracts.js
          const decimal = await contract.methods.decimals().call();
          await contract.methods.balanceOf(props.account.account).call()
            .then((balance)=>{
              balance = (balance/10**decimal);
              setEqxBalance(balance)
            });
          
      }

    } catch (error) {
      console.log("error", error)
    }
  };

  useEffect(() => {
    if(props.account && props.account.account){
      setWallet(props.account.account)
      getBalance()
    }
    const account = sessionStorage.getItem('selected_account');
    if (account) {
        getMe(account);
    }
  }, [props.account?.account])

  if (auth?.id) {
    return <Redirect to="/dashboard" />
  } else {
    return(
      <div className="Org" data-testid="Org">
        <StepWizard>
          <OrgStep1 walletInfo={{wallet: wallet, eqxBln:eqxBalance}}/>
          <OrgStep2 />
          <OrgStep3 />
          <OrgStep4 walletInfo={{wallet: wallet, eqxBln:eqxBalance}}/>
          <OrgStep5 walletInfo={{wallet: wallet, eqxBln:eqxBalance}}/>
        </StepWizard>
      </div>
    )
  }
}
const mapStateToProps = (state) => {
  return {
    account: state.account,
    auth: state.auth
  };
};
export default connect(mapStateToProps)(Org);
