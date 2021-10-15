
import Web3 from "web3"

export const getUserBalance = async () => {
    try {
        const web3 = await getWeb3();
        const accountAddress = await getAccount()
        let balance = await web3.eth.getBalance(accountAddress)
        // balance = new BigNumber(balance).div(new BigNumber(10).exponentiatedBy(18))
        return balance
    }
    catch (err) {
        console.log("error", err)
        return 0;
    }
}

export const getWeb3 = async () => {
    try {
        const web3 = new Web3(Web3.givenProvider);
        return web3;
    }
    catch (err) {
        console.log("error", err)
    }
}

export const getAccount = async () => {
    try {
        const web3 = await getWeb3()
        const accountAddress = await web3.eth.getAccounts()
        return accountAddress[0]
    }
    catch (err) {
        console.log("error", err)
    }
}