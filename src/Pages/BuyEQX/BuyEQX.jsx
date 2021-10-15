import { useRef, useState } from "react";
import { FiSettings } from "react-icons/fi";
import { AiOutlineDown } from "react-icons/ai";
import { GrClose } from "react-icons/gr";
import { data } from "../../assets/data";
import Image from "../../assets/images/equinox_logo.png";
import React, { useEffect, useCallback } from "react";
import { Container, Row } from "reactstrap";
import { FcDocument } from "react-icons/fc";
import {
  Card,
  Button,
  CardHeader,
  CardFooter,
  CardBody,
  CardTitle,
  CardText,
  Col,
  InputGroup,
  InputGroupAddon,
} from "reactstrap";

import { Icon, Input } from "semantic-ui-react";
import Dropdown from "react-dropdown";
import "react-dropdown/style.css";
import {
  checkIfApproved,
  getTokenBalance,
  getEquivalentToken,
  getCurrId,
  generateRefLink,
  getCurrPrice,
  getEQXBalance,
  getCorrespondingEQX,
} from "./../helpers/getterFunctions";
import { connect } from "react-redux";
import { approveTokens, buyToken } from "./../helpers/setterFunctions";
import { ToastContainer, toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import { convertToInternationalCurrencySystem } from "./../helpers/numberFormatter";

import SwiperCore, { Autoplay, Navigation } from "swiper";
import { Swiper, SwiperSlide } from "swiper/react";
import "swiper/swiper-bundle.css";

// import Swiper core and required modules

const options = ["USDT", "BNB", "BTC", "ETH", "BUSD"];

SwiperCore.use([Autoplay, Navigation]);

const BuyEQX = (props) => {
  const [dialogueBox1, setDialogueBox1] = useState(false);
  const [dialogueBox2, setDialogueBox2] = useState(false);
  const [query, setQuery] = useState("USDT");
  const referInput = useRef(null);

  const [inputAmount, setInputAmount] = useState("");
  const [outputAmount, setOutputAmount] = useState("");
  const [isDisabled, setIsDisabled] = useState(false);
  const [buttonName, setButtonName] = useState("BUY EQX");
  const [currTokenBal, setCurTokenBal] = useState("");
  const [refLink, setRefLink] = useState("");
  const [ref, setRef] = useState("10000");
  const [transactionOnGoing, setTransactionOnGoing] = useState(false);
  const [copySuccess, setCopySuccess] = useState("");
  const [price, setPrice] = useState("");
  const [eqxBalance, setEqxBalance] = useState("");

  useEffect(() => {
    (async () => {
      try {
        // await reset()
        await getBalance();
      }

      catch (e) {
        console.log(e);
      }
    })();

    // getCorrespondingEQX("100","eth")
  }, [query]);

  useEffect(() => {
    (async () => {
      try {
        // await reset()
        await getBalance();
      }

      catch (e) {
        console.log(e);
      }
    })();
  }, [props.account]);

  useEffect(() => {
    (async () => {
      try {
        const queryParams = new URLSearchParams(window.location.search);
        const id = queryParams.get("id");
        let currId = await getCurrId();
        let price = await getCurrPrice();
        setPrice(price);
        console.log("id----------->", id);
        if (Number(currId) >= Number(id) && Number(id) > 10000) {
          console.log("here I am");
          localStorage.setItem("ref", id);
          setRef(id);
        }
      }
      catch (e) {
        console.log(e);
      }
    })();
  }, [props.account]);

  useEffect(() => {
    (async () => {
      try {
        if (props.account && props.account.account) {
          let link = await generateRefLink(`${window.location.origin.toString()}/buy-eqx/?id=`, props.account.account);
          console.log("ref------>", link);
          setRefLink(link);
        }
      }
      catch (e) {
        console.log(e);
      }
    })();
  }, [props.account]);

  useEffect(() => {
    (async () => {
      try {
        if (!query) return;
        if (query === "BNB") setButtonName("BUY EQX");
        else {
          let res = await checkAllowance();
          console.log("res--------->", res);
          if (res === true) setButtonName("BUY EQX");
          else setButtonName("APPROVE");
        }
      } catch (e) {
        console.log(e);
      }
    })();
  }, [query, props.account, inputAmount, transactionOnGoing]);

  const handleOutputChange = useCallback(
    async (e) => {
      try {
        e.preventDefault();
        e.persist();
        setOutputAmount(e.target.value);
        console.log("heeeee--------");
        if (query) {
          let _input = await getCorrespondingEQX(
            e.target.value,
            query.toLowerCase()
          );
          setInputAmount(_input);
        }
      }
      catch (e) {
        console.log(e);
      }
    },
    [query]
  );

  // useEffect(() => {
  //   reset()
  // }, [query])

  const handleSelect = useCallback(
    async (e) => {
      e.preventDefault();
      e.persist();
      try {
        // console.log("selected value is -----", e);
        // setValue(e);

        setQuery(e.target.value);
        console.log("value is ------", e.target.value);
        // await reset()
        if (inputAmount) {
          console.log("false-----");

          let _outputAmount = await getEquivalentToken(
            inputAmount,
            e.target.value.toLowerCase()
          );
          setOutputAmount(_outputAmount);
          await getBalance();
          await checkAllowance();
        } else {
          console.log("true...");
        }
      } catch (e) {
        console.log(e);
      }
    },
    [props.account, inputAmount]
  );

  const getBalance = async () => {
    try {
      console.log("output dropdown", typeof query);
      let res;
      let eqxBal;
      if (query) {
        if (props.account && props.account.account) {
          res = await getTokenBalance(
            query.toLowerCase(),
            props.account.account
          );
          eqxBal = await getTokenBalance("eqx", props.account.account);
        }
        setCurTokenBal(res);
        setEqxBalance(eqxBal);
        console.log("res", res);
      }
    } catch (e) {
      console.log(e);
    }
  };

  const checkAllowance = async () => {
    try {
      if (query == "BNB") return;
      if (props.account && props.account.account && query && outputAmount) {
        let res = await checkIfApproved(
          outputAmount,
          query.toLowerCase(),
          props.account.account
        );
        return res;
      }
    } catch (e) {
      console.log(e);
    }
  };

  const approveToken = async () => {
    try {
      if (props.account && props.account.account && query && inputAmount) {
        setTransactionOnGoing(true);
        setIsDisabled(true);
        let res = await approveTokens(
          query.toLowerCase(),
          props.account.account
        );

        setIsDisabled(false);
        if (res.status == true) {
          toast.success("Transaction successful");
        } else {
          toast.error("Transaction Failed");
        }
        setTransactionOnGoing(false);
      }
    } catch (e) {
      console.log(e);
    }
  };

  const purchaseToken = async () => {
    try {
      if (props.account && props.account.account && query && inputAmount) {
        setTransactionOnGoing(true);
        setIsDisabled(true);
        let _ref;
        if (ref == "") {
          _ref = 10000;
          setRef(_ref);
        } else _ref = ref;
        console.log("buy--", _ref);
        let res = await buyToken(
          inputAmount,
          _ref,
          query.toLowerCase(),
          props.account.account
        );

        setIsDisabled(false);
        if (res.status == true) {
          toast.success("Transaction successful");
        } else {
          toast.error("Transaction Failed");
        }
        await getBalance();
        setTransactionOnGoing(false);
      }
    } catch (e) {
      console.log(e);
    }
  };

  function copyToClipboard(e) {
    if (!refLink) return;
    var textField = document.createElement("textarea");
    textField.innerText = refLink;
    document.body.appendChild(textField);
    textField.select();
    document.execCommand("copy");
    textField.remove();

    setCopySuccess("Copied!");
    toast.success("Referral Link Copied");
    console.log("refferal link is copied------->", refLink);
  }

  // async function reset() {
  //   setInputAmount(null);
  //   setOutputAmount(null);
  // }

  // const handleDropdown = (item) => {
  //   // setDropdown(item);
  //   // setDialogueBox1(false);
  // };

  return (
    <>
      <div id="buy-eqx">
        <div className="card-container">
          <div className="card">
            <div className="card-header">
              <h2>Buy EQX</h2>
            </div>
            <form className="card-details">
              <h3>Buy EQX Token In An Instant</h3>
              {console.log("eqxBalance", eqxBalance)}
              <h5>1 EQX = $ {price ? price : 0}</h5>
              <div className="card-inputs">
                <div className="card-input">
                  <span className="balance">
                    Balance :{" "}
                    {eqxBalance
                      ? convertToInternationalCurrencySystem(eqxBalance)
                      : 0}
                  </span>
                  <label htmlFor="exq">
                    <img src={Image} alt="" /> EQX
                  </label>
                  <input
                    type="number"
                    dir="rtl"
                    id="exq"
                    placeholder="0.00"
                    onChange={async (e) => {
                      if (query) {
                        setInputAmount(e.target.value);
                        let output = await getEquivalentToken(
                          e.target.value,
                          query.toLowerCase()
                        );
                        setOutputAmount(output);
                      }
                    }}
                    value={inputAmount ? inputAmount : ""}
                  />
                </div>
                <div className="card-input">
                  <span className="balance">
                    Balance : $
                    {currTokenBal && currTokenBal
                      ? convertToInternationalCurrencySystem(currTokenBal)
                      : 0}
                  </span>
                  <label htmlFor="BNB" className="hover-cursor">
                    <img src={Image} alt="" />
                    <select
                      name="query"
                      id="query"
                      onChange={async (e) => {
                        await handleSelect(e);
                        // console.log("selected--", e.target.value)
                      }}
                      value={query}
                    >
                      <option value="USDT">USDT</option>
                      <option value="BNB">BNB</option>
                      <option value="BTC">BTC</option>
                      <option value="ETH">ETH</option>
                      <option value="BUSD">BUSD</option>
                    </select>
                  </label>

                  <input
                    type="number"
                    dir="rtl"
                    id="cvc"
                    placeholder="0.00"
                    value={outputAmount && outputAmount ? outputAmount : ""}
                    onChange={async (e) => {
                      await handleOutputChange(e);
                    }}
                  />
                </div>
                <div className="card-input">
                  <input
                    type="text"
                    id="referBy"
                    placeholder="Referred By"
                    className="refered"
                    value={ref ? ref : 10000}
                    readOnly
                  />
                </div>
                <div className="card-input-btn">
                  <button
                    type="button"
                    onClick={() => {
                      buttonName == "APPROVE"
                        ? approveToken()
                        : purchaseToken();
                    }}
                  >
                    {props.account ? buttonName : "You are off chain"}
                  </button>
                </div>
              </div>
            </form>
          </div>
          <div className="refer">
            <form>
              <input
                ref={referInput}
                readOnly
                value={refLink}
                onChange={(e) => setRef(e.target.value)}
              />
              {/* {document.queryCommandSupported("copy") && ( */}
              <button type="button" onClick={(e) => copyToClipboard(e)}>
                Copy
              </button>
              {/* )} */}
            </form>
            <p>
              <b>Note:</b> Buy only at app.equinox.business and always ensure
              you are interacting with right contract address.
            </p>
          </div>
          <div className="space-60"></div>
          <hr />
          <div className="space-60"></div>
        </div>
        <div className="card-image">
          <Swiper spaceBetween={30} navigation={true} className="mySwiper">
            <SwiperSlide>
              <div className="swiper_items custom">
                <div className="slider-content">
                  <h3>
                    <span>Equinox Token Info:</span>Equinox with a symbol EQX is
                    a fixed supply BEP20 standard digital token.
                  </h3>
                  <h3>
                    <span>Contract Address:</span>
                    <a
                      href="https://bscscan.com/token/0xe1dba43428cc6ab2672061ee3385af09f1c85781"
                      target="_blank"
                    >
                      0xe1dba43428cc6ab2672061ee3385af09f1c85781
                    </a>
                  </h3>
                  <h3>
                    <span>Total Supply:</span> 100 Million
                  </h3>
                  <h3>
                    <span>Launch Date:</span> 19 June 2021
                  </h3>
                  <h3>
                    <span>Use cases:</span>
                    <ol className="slider-lists">
                      <li>
                        Hold certain number of EQX to register ORG 3.0 and use
                        Equinox's Ecosystem
                      </li>
                      <li>Dividend distribution to EQX holders</li>
                      <li>
                        Transaction fee in EQX for Equinox's Blockchain proposed
                        to be launched in Version 2.0
                      </li>
                    </ol>
                  </h3>
                  <h3>
                    <span>Proposed supply for Crowdsale:</span> 15 Million Only
                  </h3>
                  <h3>
                    <span>Crypto assets allowed for contribution:</span> BTC,
                    ETH, BNB, BUSD, USDT
                  </h3>
                  <h3 className="icon-flex">
                    <FcDocument />
                    <span>Document: </span>
                    <a href="https://equinox.business/eqx-limited-pre-sale-is-scheduled-between-6-28th-september/">
                      How to buy and Add Asset as EQX
                    </a>
                  </h3>
                </div>
              </div>
            </SwiperSlide>
            <SwiperSlide>
              <div className="swiper_items">
                <div className="video_frame">
                  <iframe
                    className="iframe-video"
                    src="https://www.youtube.com/embed/XsKKhb8xKec"
                    title="YouTube video player"
                    frameBorder="0"
                    allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture"
                    allowFullScreen
                  ></iframe>
                </div>
              </div>
            </SwiperSlide>
          </Swiper>
        </div>
        {dialogueBox1 ? (
          <div className="dialogue-box-1">
            <div className="card">
              
              <div className="card-scroll">
                {data.map((item, index) => {
                  return (
                    <div
                      className="card-item"
                      key={index}
                    // onClick={() => handleDropdown(item)}
                    >
                      <img src={Image} alt="" /> <span>{item}</span>
                    </div>
                  );
                })}
              </div>
              <button className="dialogue-btn">
                <h4>Manage Token List</h4>
              </button>
            </div>
          </div>
        ) : (
          ""
        )}

        {dialogueBox2 ? (
          <div className="dialogue-box-1">
            <div className="card">
              <div className="card-header">
                <h4>Connect To A Wallet</h4>
                <GrClose
                  className="close"
                  onClick={() => setDialogueBox2(false)}
                />
              </div>
              <div className="term">
                <p>
                  By connecting a wallet, you agree to Uniswap Lab’s{" "}
                  <a href="/">Terms of Service</a> and acknowledge that you have
                  read and understand the{" "}
                  <a href="/">Uniswap protocol disclaimer</a>.
                </p>
              </div>
              <div className="connect">
                <button className="connect-block">
                  <h4>WalletConnect</h4> <img src={Image} alt="" />
                </button>
                <button className="connect-block">
                  <h4>WalletConnect</h4> <img src={Image} alt="" />
                </button>
                <button className="connect-block">
                  <h4>WalletConnect</h4> <img src={Image} alt="" />
                </button>
                <button className="connect-block">
                  <h4>WalletConnect</h4> <img src={Image} alt="" />
                </button>
                <button className="connect-block">
                  <h4>WalletConnect</h4> <img src={Image} alt="" />
                </button>
                <button className="connect-block">
                  <h4>WalletConnect</h4> <img src={Image} alt="" />
                </button>
              </div>
            </div>
          </div>
        ) : (
          ""
        )}
      </div>
      <ToastContainer />
    </>
  );
};

const mapStateToProps = (state) => {
  return {
    account: state.account,
  };
};

export default connect(mapStateToProps)(BuyEQX);
