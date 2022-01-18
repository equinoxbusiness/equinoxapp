import React, { useState, useEffect, useCallback } from "react";
import Web3 from "web3";
import { connect } from "react-redux";
import { accountUpdate } from "../../redux/actions";
import { Button } from "reactstrap";
import Web3Modal from "web3modal";
import WalletConnectProvider from "@walletconnect/web3-provider";
import detectEthereumProvider from "@metamask/detect-provider";
import GeneralModal from "./wrongNetworkModal";
import { NetworkError } from "../modals";

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

const AccountModal = (props) => {
  const [currentAccount, setCurrentAccount] = useState(null);
  const [wrongNetwork, setWrongNetwork] = useState(false);
  const [onBtnClass, setOnBtnClass] = useState(
    "inline-block chain font-11 shadow-md"
  );
  const [offBtnClass, setOffBtnClass] = useState(
    "inline-block chain-disabled font-11"
  );
  const [isChecked, setIsChecked] = useState(false);
  let web3Modal = null;
  let web3 = null;
  let provider = null;

  // to initilize the web3Modal

  const init = async () => {
    const providerOptions = {
      walletconnect: {
        package: WalletConnectProvider,
        options: {
          infuraId: "0301b3bec4314d8e8b5aa8de6f153f27",
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
    async function update() {
      if (window.sessionStorage.getItem("selected_account") != null) {
        setCurrentAccount(window.sessionStorage.getItem("selected_account"));
        if (provider) {
          web3 = await initWeb3(provider);
          props.dispatch(
            accountUpdate({
              account: window.sessionStorage.getItem("selected_account"),
            })
          );
        }
      }
    }
    let interval = setInterval(() => {
      update();
    }, 5000)

  }, [window.sessionStorage.getItem("selected_Account"), web3, provider]);
  // action on connect wallet button

  useEffect(() => {
    async function update() {
      if (window.sessionStorage.getItem("selected_account") != null) {
        setCurrentAccount(window.sessionStorage.getItem("selected_account"));
        if (provider) {
          web3 = await initWeb3(provider);
          props.dispatch(
            accountUpdate({
              account: window.sessionStorage.getItem("selected_account"),
            })
          );
        }
      }
    }

    update();
  }, [window.sessionStorage.getItem("selected_Account"), web3, provider]);
  // action on connect wallet button

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

  //  disconnect wallet

  const onDisconnect = useCallback(async () => {
    if (!web3) {
      window.sessionStorage.removeItem("selected_account");
    }
    if (web3) {
      // setIsChecked(!isChecked);
      const chainId = await web3.eth.net.getId();
      props.dispatch(
        accountUpdate({
          account: null,
        })
      );
    }
    window.sessionStorage.removeItem("selected_account");
    window.sessionStorage.removeItem("Provider");
    await setCurrentAccount(null);
    if (web3Modal) await web3Modal.clearCachedProvider();
    web3Modal = null;
    if (web3 && web3.currentProvider && web3.currentProvider.close) {
      await web3.currentProvider.disconnect();
    }
    if ("caches" in window) {
      caches.keys().then((names) => {
        // Delete all the cache files
        names.forEach((name) => {
          caches.delete(name);
        });
      });
      if (!wrongNetwork) window.location.reload(true);
    }
  }, [currentAccount]);

  useEffect(() => {
    console.log("provider", provider);
    if (provider) {
      provider.on("chainChanged", async (_chainId) => {
        const chainId = parseInt(_chainId, 16);

        if (chainId.toString() !== process.env.REACT_APP_CHAIN_ID) {
          if (currentAccount) console.log("Wrong Network first");
          setWrongNetwork(true);
          props.dispatch(
            accountUpdate({
              account: null,
            })
          );
          onDisconnect();
        } else {
          setWrongNetwork(false);
          props.dispatch(
            accountUpdate({
              account: currentAccount,
            })
          );
        }
      });
    }
  }, [onDisconnect]);

  // function to detect account change

  useEffect(() => {
    if (provider) {
      provider.on("accountsChanged", async function (accounts) {
        const id = await provider.request({ method: "eth_chainId" });
        const chainId = parseInt(id, 16);
        console.log("Account changed", accounts[0]);
        if (
          chainId.toString() == process.env.REACT_APP_CHAIN_ID &&
          currentAccount
        ) {
          setCurrentAccount(accounts[0]);
          console.log("Account changed", accounts[0]);
          window.sessionStorage.removeItem("selected_account");
          window.sessionStorage.setItem("selected_account", accounts[0]);
          props.dispatch(
            accountUpdate({
              account: accounts[0],
            })
          );
        } else if (chainId.toString() != process.env.REACT_APP_CHAIN_ID) {
          console.log("Wrong Network");
          setWrongNetwork(true);
          props.dispatch(
            accountUpdate({
              account: null,
            })
          );
          window.sessionStorage.removeItem("selected_account");
          setCurrentAccount(null);
          await onDisconnect();
        }
      });
    }
  }, [currentAccount, provider, window.sessionStorage.getItem("selected_account")]);

  // function to detect network change

  useEffect(() => {
    async function updateAccount() {
      if (provider) {
        window.sessionStorage.setItem("selected_account", currentAccount);

        props.dispatch(
          accountUpdate({
            account: currentAccount,
          })
        );
      }
    }
    if (currentAccount) {
      updateAccount();
    }
  }, [currentAccount, provider]);
  const [offChk, setOffChk] = useState(true);
  const [onChk, setOnChk] = useState(false);

  async function offChain() {
    setOffBtnClass("inline-block chain-disabled font-11");
    setOnBtnClass("inline-block chain font-11 shadow-md");
    if (currentAccount) await onDisconnect();
    setOffChk(false);
    setOnChk(true);
  }

  async function onChain() {
    if (!currentAccount) await onConnect();
    setOnBtnClass("inline-block chain-disabled font-11");
    setOffBtnClass("inline-block chain font-11 shadow-md");
    setOffChk(true);
    setOnChk(false);
  }
  return (
    <>
      {props.mobile ? (
        <div className="button-switch ml-30 mobile">
          <input
            type="checkbox"
            id="switch-blue-mobile"
            className="switch"
            checked={
              window.sessionStorage.getItem("selected_account") !== null
                ? true
                : false
            }
            onChange={() => {
              window.sessionStorage.getItem("selected_account")
                ? onDisconnect()
                : onConnect();
            }}
          />
          <label htmlFor="switch-blue-mobile" className="lbl-off">
            Off&nbsp;Wallet
          </label>
          <label htmlFor="switch-blue-mobile" className="lbl-on">
            On&nbsp;Wallet
          </label>
        </div>
      ) : (
        <div className="button-switch desktop">
          <label className="switch">
            <input
              type="checkbox"
              id="switch-blue"
              className="switch-input"
              checked={
                window.sessionStorage.getItem("selected_account") !== null
                  ? true
                  : false
              }
              // defaultChecked
              onChange={() => {
                window.sessionStorage.getItem("selected_account")
                  ? onDisconnect()
                  : onConnect();
              }}
            />
            <span className="switch-label" data-on="ONCHAIN" data-off="OFFCHAIN"></span>
            <span className="switch-handle"></span>
          </label>
        </div>
      )}
      <NetworkError open={wrongNetwork} setOpen={setWrongNetwork} />
    </>
  );
};

const mapStateToProps = (state) => {
  return {
    account: state.account,
  };
};

export default connect(mapStateToProps)(AccountModal);
