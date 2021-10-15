import { getWeb3 } from "./currentWalletHelper"
import { getAddress } from "./addressHelper";
import contracts from "../Config/contracts";
import { getCrowdsaleContract, getEquivalentToken, getTokenContract } from './getterFunctions'
import BigNumber from 'bignumber.js';

export const buyToken = async (tokenAmount, referrer, tokenName, account) => {
    let web3 = await getWeb3()
    let contract = await getCrowdsaleContract();
    let value = 0;
    // console.log("token type is --------->", contracts[tokenName].type);

    // big Number
    if (contracts[tokenName].type == 2) {
        value = await getEquivalentToken(tokenAmount, tokenName);
    }
    value = new BigNumber(value).multipliedBy(new BigNumber(10).exponentiatedBy(new BigNumber(18)));
    console.log("value--------->", referrer, tokenAmount, contracts[tokenName].type)
    tokenAmount = await web3.utils.toWei(tokenAmount.toString())
    let res = await contract.methods.buyTokens(referrer, tokenAmount, contracts[tokenName].type).send({ from: account, value: value })
    console.log("token buy--------->", res)
    return res;
}

export const approveTokens = async (tokenName, account) => {
    let token = await getTokenContract(tokenName);
    let crowdsaleAddress = await getAddress(contracts.crowdsale);
    let tokenAmount = "10000000000000000000000000000000000000000";
    let res = await token.methods.approve(crowdsaleAddress, tokenAmount).send({ from: account })
    return res;
}

