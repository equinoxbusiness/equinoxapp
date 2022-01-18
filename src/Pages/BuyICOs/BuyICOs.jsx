import { useRef, useState } from "react";
import { FiSettings } from "react-icons/fi";
import { AiOutlineDown } from "react-icons/ai";
import { GrClose } from "react-icons/gr";
import { data } from "../../assets/data";

import ImgBNB from "../../assets/images/bnb.svg";
import ImgBTC from "../../assets/images/btc.svg";
import ImgBUSD from "../../assets/images/busd.svg";
import ImgETH from "../../assets/images/eth.svg";
import ImgUSDT from "../../assets/images/usdt.svg";
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
} from "./../../helpers/getterFunctions";
import { connect } from "react-redux";
import { approveTokens, buyToken } from "./../../helpers/setterFunctions";
import { ToastContainer, toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import { convertToInternationalCurrencySystem } from "./../../helpers/numberFormatter";

import SwiperCore, { Autoplay, Navigation } from "swiper";
import { Swiper, SwiperSlide } from "swiper/react";
import "swiper/swiper-bundle.css";
import Web3 from "web3";
import Web3Modal from "web3modal";
import WalletConnectProvider from "@walletconnect/web3-provider";
import detectEthereumProvider from "@metamask/detect-provider";
import { accountUpdate } from "../../redux/actions";
import { getIcos } from '../../services/dashboard';
import { getWeb3 } from "../../helpers/currentWalletHelper";
import Ico from "../../Config/abis/EquinoxIco.json";

// import Swiper core and required modules

const options = ["USDT", "BNB", "BTC", "ETH", "BUSD"];

SwiperCore.use([Autoplay, Navigation]);

function initWeb3(provider) {
  const web3 = new Web3(provider);

  web3.eth.extend({
    methods: [
      {
        name: "chainId",
        call: "eth_chainId",
        outputFormatter: web3.utils.hexToNumber,
      },
    ],
  });

  return web3;
}

const BuyICOs = (props) => {

  const {ico} = props;
  useEffect(()=>{
    getIcos();
  }, []);

  useEffect(()=>{
    if (ico && ico.length && ico[0].ico_address) setIcotoken(ico[0].ico_address);
  }, [ico])

  const [dialogueBox1, setDialogueBox1] = useState(false);
  const [dialogueBox2, setDialogueBox2] = useState(false);
  const [query, setQuery] = useState("USDT");
  const [icotoken, setIcotoken] = useState("");
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
  const [wrongNetwork, setWrongNetwork] = useState(false);
  const [currentAccount, setCurrentAccount] = useState(null);

  let web3Modal = null;
  let web3 = null;
  let provider = null;

  // to initilize the web3Modal

  const init = async () => {
    const providerOptions = {
      walletconnect: {
        package: WalletConnectProvider,
        options: {
          infuraId: "c3f6ce1953e4470191a8d12b8ba92672",
          rpcUrl: process.env.REACT_APP_RPC_URL,
        },
      },
    };

    web3Modal = new Web3Modal({
      network: process.env.REACT_APP_NETWORK,
      cacheProvider: false,
      providerOptions: providerOptions,
    });
    provider = await detectEthereumProvider();
  };

  init();

  useEffect(() => {
    (async () => {
      try {
        // await reset()
        await getBalance();
      } catch (e) {
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
      } catch (e) {
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
      } catch (e) {
        console.log(e);
      }
    })();
  }, [props.account?.account]);

  useEffect(() => {
    (async () => {
      try {
        if (props.account && props.account.account) {
          let link = await generateRefLink(
            `${window.location.origin.toString()}/buy-eqx/?id=`,
            props.account.account
          );
          console.log("ref------>", link);
          setRefLink(link);
        }
      } catch (e) {
        console.log(e);
      }
    })();
  }, [props.account?.account]);

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
      } catch (e) {
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

  const getEquivalentAmount = (q, t) => {
    const index = ico.findIndex(i=>i.ico_address === t);
    return (q/ico[index].offer_price).toFixed(3);
  }

  const handleSelectIco = useCallback(
    async (e) => {
      e.preventDefault();
      e.persist();
      try {
        // console.log("selected value is -----", e);
        // setValue(e);

        setIcotoken(e.target.value);
        console.log("value is ------", e.target.value);
        // await reset()
        if (inputAmount) {
          console.log("false-----");

          let _outputAmount = await getEquivalentAmount(
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
      if (props.account && props.account.account && icotoken && inputAmount) {
        setTransactionOnGoing(true);
        setIsDisabled(true);
        const web3 = await getWeb3();
        const contract = await new web3.eth.Contract(Ico.abi, icotoken);
        const finalAmount = await web3.utils.toWei(outputAmount.toString(), 'ether');
        contract.methods.buyTokens(props.account.account).send({from: props.account.account, value: finalAmount})
          .on('error', function (error) {
            setIsDisabled(false);
            toast.error("Transaction Failed");
            setTransactionOnGoing(false);
          })
          .then(async function (receipt) {
            setIsDisabled(false);
            toast.success("Transaction successful");
            setTransactionOnGoing(false);
          });
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

  const onConnect = async () => {
    //Detect Provider
    try {
      // setIsChecked(!isChecked);
      provider = await web3Modal.connect();
      if (provider.open) {
        await provider.open();
        web3 = await initWeb3(provider);
        web3.eth.getAccounts(console.log);
      }
      window.sessionStorage.setItem("Provider", provider);
      if (!provider) {
        console.log("no provider found");
      } else {
        web3 = new Web3(provider);
        await ConnectWallet();
      }
      const chainId = await web3.eth.net.getId();

      if (chainId.toString() !== process.env.REACT_APP_CHAIN_ID) {
        setWrongNetwork(true);
      }
    } catch (error) {
      console.log(error);
    }
  };

  // connect wallet

  const ConnectWallet = async () => {
    if ("caches" in window) {
      caches.keys().then((names) => {
        // Delete all the cache files
        names.forEach((name) => {
          caches.delete(name);
        });
      });
    }
    try {
      const chainId = await web3.eth.net.getId();
      if (chainId.toString() !== process.env.REACT_APP_CHAIN_ID) {
        console.log("Wrong network");
        setWrongNetwork(true);
        props.dispatch(
          accountUpdate({
            account: null,
          })
        );
      } else {
        // Get list of accounts of the connected wallet
        setWrongNetwork(false);
        const accounts = await web3.eth.getAccounts();

        // MetaMask does not give you all accounts, only the selected account
        window.sessionStorage.setItem("selected_account", accounts[0]);
        const chainId = await web3.eth.net.getId();
        props.dispatch(
          accountUpdate({
            account: accounts[0],
          })
        );
        setCurrentAccount(accounts[0]);
        console.log("connected Account", accounts[0]);
      }
    } catch (error) {
      if (error.message) {
        console.log("error", error.message);
      }
    }
  };

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
              <h2>Buy ICOs</h2>
            </div>
            <form className="card-details">
              <h3>Buy ICOs Token In An Instant</h3>
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
                  <label htmlFor="ICO" className="hover-cursor">
                    <img src={Image} alt="" />
                    <select
                      name="icotoken"
                      id="icotoken"
                      onChange={async (e) => {
                        await handleSelectIco(e);
                        console.log("selected--", e.target.value)
                      }}
                      value={icotoken}
                    >
                       {ico && ico.length && ico.map(i=>{
                        return <option value={i.ico_address}>{i.token_name}</option>
                       })}
                    </select>
                  </label>
                  <input
                    type="number"
                    dir="ltr"
                    id="exq"
                    placeholder="0"
                    onChange={async (e) => {
                      if (icotoken) {
                        setInputAmount(e.target.value);
                        let output = await getEquivalentAmount(
                          e.target.value,
                          icotoken
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
                    <img src={ImgBNB} alt="" />
                    <select
                      name="query"
                      id="query"
                      onChange={async (e) => {
                        await handleSelect(e);
                        console.log("selected--", e.target.value)
                      }}
                      value={query}
                    >
                      {/*<option value="USDT">USDT</option>*/}
                      <option value="BNB">BNB</option>
                      {/*<option value="BTC">BTC</option>
                      <option value="ETH">ETH</option>
                    <option value="BUSD">BUSD</option>*/}
                    </select>
                  </label>

                  <input
                    type="number"
                    dir="ltr"
                    id="cvc"
                    placeholder="0.00"
                    value={outputAmount && outputAmount ? outputAmount : ""}
                    disabled={true}
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
                      props.account ? approveToken()
                        : onConnect();
                    }}
                  >
                    {props.account ? buttonName : "Connect wallet"}
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
                value={refLink?refLink:"Need to buy EQX First"}
                // onChange={(e) => setRef(e.target.value)}
              />
              {/* {document.queryCommandSupported("copy") && ( */}
              <button type="button" onClick={(e) => refLink?copyToClipboard(e):""}>
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
        {dialogueBox1 && (
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
        )}

        {dialogueBox2 && (
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
        )}
      </div>
      <ToastContainer />
    </>
  );
};

const mapStateToProps = (state) => {
  return {
    account: state.account,
    ico: state.ico
  };
};

export default connect(mapStateToProps)(BuyICOs);
