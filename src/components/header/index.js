import React from 'react'
import AccountModal from "./Accountmodal";
import { useEffect } from "react";
import { getAllowance, getBalance, getTokenContract } from "../../helpers/getterFunctions";
import { connect } from "react-redux";
import "./../../App.css";

function Header(props) {

  useEffect(() => {
    // console.log("here")
    getTokenContract("usdt")
    // if (props.account && props.account.account) {
    //   console.log("props",props.account)
    //   getAllowance("usdt", props.account.account)
    //   // getBalance("usdt", props.account.account)
    // }
  }, [props.account])
  return (
    <header className="header">
      <AccountModal />
    </header>
  );
}

const mapStateToProps = (state) => {
  return {
    account: state.account,

  };
};

export default connect(mapStateToProps)(Header);

