import bep20Abi from './../Config/abis/bep20Abi.json';
import crowdsaleAbi from './../Config/abis/crowdsaleAbi.json'
import { getAddress } from './addressHelper';
import { getAccount, getUserBalance, getWeb3 } from './currentWalletHelper';
import contracts from './../Config/contracts'


export const getCrowdsaleContract = async () => {
    try {
        let web3 = await getWeb3();
        console.log("here", web3);
        let crowdsale = await new web3.eth.Contract(crowdsaleAbi, await getAddress(contracts.crowdsale));
        console.log("crowdsale", crowdsale)
        return crowdsale;
    }
    catch (e) {
        console.log(e)
    }

}

export const getTokenContract = async (tokenName) => {
    try {
        let web3 = await getWeb3();
        let token = await new web3.eth.Contract(bep20Abi, await getAddress(contracts[tokenName]));
        console.log("token", token)
        return token;
    }
    catch (e) {
        console.log(e)
    }

}
export const getAllowance = async (tokenName, account) => {
    try {
        let web3 = await getWeb3();
        let token = await getTokenContract(tokenName);
        let crowdsaleAddress = await getAddress(contracts.crowdsale)
        let allowance = await token.methods.allowance(account, crowdsaleAddress).call()
        console.log("allowance", await web3.utils.fromWei(allowance.toString(), "ether"));
        return await web3.utils.fromWei(allowance.toString(), "ether")
    }
    catch (e) {
        console.log(e)
    }

}

export const getTokenBalance = async (tokenName, account) => {
    try {

        let web3 = await getWeb3();
        let token = await getTokenContract(tokenName);
        let balance
        if (tokenName == "bnb") {
            balance = await getUserBalance();
        }
        else
            balance = await token.methods.balanceOf(account).call()
        console.log("balance", await web3.utils.fromWei(balance.toString(), "ether"));
        return await web3.utils.fromWei(balance.toString(), "ether")
    }
    catch (e) {
        console.log(e)
    }

}

export const getEquivalentToken = async (tokenToPurchase, tokenName) => {
    try {
        let web3 = await getWeb3();
        let contract = await getCrowdsaleContract()
        tokenToPurchase = await web3.utils.toWei(tokenToPurchase.toString())
        console.log("token to purchase", tokenToPurchase)
        let amount = await contract.methods.amountNeedsToBePaid(tokenToPurchase, contracts[tokenName].type).call();
        console.log("amount1", amount.toString())
        console.log("amount", await web3.utils.fromWei(amount, "ether"));
        return (await web3.utils.fromWei(amount, "ether")).toString();
    }
    catch (e) {
        console.log(e)
    }

}

export const checkIfApproved = async (inputAmount, tokenName, account) => {
    try {
        let allowance = await getAllowance(tokenName, account);
        console.log("allowances", inputAmount, allowance)
        if (Number(allowance) < Number(inputAmount)) {
            console.log("false")
            return false;
        }

        else {
            console.log("true")
            return true;
        }
    }
    catch (e) {
        console.log(e)
    }

}

export const isUserHaveId = async (account) => {
    try {
        let web3 = await getWeb3();
        let contract = await getCrowdsaleContract()
        let id = await contract.methods.usersId(account).call();
        // console.log("id-------->", id)
        return id.toString();
    }
    catch (e) {
        console.log(e)
    }
}

export const generateRefLink = async (account) => {
    let link;
    let id = await isUserHaveId(account);
    if (Number(id) < 10000) {
        return ""
    }
    link = process.env.REACT_APP_URL + "?id=" + id;
    return link
    // console.log("ref-link", link,process.env.REACT_APP_URL)
}

export const getCorrespondingEQX = async(amount,tokenName)=>{
    try {
        let web3 = await getWeb3();
        let contract = await getCrowdsaleContract()
        amount = await web3.utils.toWei(amount.toString())
        
        let receivingEQX = await contract.methods.getCorrespondingTokens(amount,contracts[tokenName].type).call();
        console.log("receivingEQX-------->", receivingEQX)
        return (await web3.utils.fromWei(receivingEQX, "ether")).toString();
    
    }
    catch (e) {
        console.log(e)
    }
}

export const getCurrId = async () => {
    try {
        let web3 = await getWeb3();
        let contract = await getCrowdsaleContract()
        let id = await contract.methods.currId().call();
        console.log("currid-------->", id)
        return id.toString();
    }
    catch (e) {
        console.log(e)
    }
}

export const getCurrPrice = async () => {
    let contract = await getCrowdsaleContract()
    let price = await contract.methods.price().call();
    console.log("price-------->", price / 1e8)
    return (price / 1e8).toString();
}

