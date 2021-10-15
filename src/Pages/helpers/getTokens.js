import contracts from "../Config/contracts";
import { getAddress } from "./addressHelper";

let tokens = [
    {
        id:0,
        name:"USDT",
        address: getAddress(contracts.usdt),
    },
    {
        id:1,
        name:"BNB",
        address: getAddress(contracts.bnb),
    },
    {
        id:2,
        name:"ETH",
        address: getAddress(contracts.eth),
    },
    {
        id:3,
        name:"BTC",
        address: getAddress(contracts.btc),
    },
    {
        id:5,
        name:"BUSD",
        address: getAddress(contracts.busd),
    },

]

export default tokens;