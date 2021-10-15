import {
  ACCOUNT_UPDATE,
  WEB3_LOADED,
  ACCOUNT_UPDATE_ON_DISCONNECT,
  SWAP_SUCCESS,
  SWAP_SUCCESS_RESET,
  ADD_LIQUIDITY_SUCCESS,
  ADD_LIQUIDITY_SUCCESS_RESET,
  STAKE_UNSTAKE_SUCCESS,
  STAKE_UNSTAKE_SUCCESS_RESET,
  REMOVE_LIQUIDITY_SUCCESS,
  REMOVE_LIQUIDITY_SUCCESS_RESET
} from "../constants/action-types";

const initialState = {
  account: null,
  web3: null,
  blockchainClient: null,
  myData: {},
  ixfiStat: [],
  loading: true,
  tokensBalance: [],
  swapSuccess: false,
  addLiquiditySuccess: false,
  stakeUnStakeSuccess: false,
  removeLiquiditySuccess: false
};

function rootReducer(state = initialState, action) {
  switch (action.type) {
    case ACCOUNT_UPDATE:
      return Object.assign({}, state, {
        account: action.payload,
      });
    case WEB3_LOADED:
      return Object.assign({}, state, {
        web3: action.payload,
      });
    case ACCOUNT_UPDATE_ON_DISCONNECT:
      return Object.assign({}, state, {
        account: null,
      });
    case SWAP_SUCCESS:
      return {
        ...state,
        swapSuccess: true,
      };
    case SWAP_SUCCESS_RESET:
      return {
        ...state,
        swapSuccess: false,
      };
    case ADD_LIQUIDITY_SUCCESS:
      return {
        ...state,
        addLiquiditySuccess: true,
      };
    case ADD_LIQUIDITY_SUCCESS_RESET:
      return {
        ...state,
        addLiquiditySuccess: false,
      };
    case STAKE_UNSTAKE_SUCCESS:
      return {
        ...state,
        stakeUnStakeSuccess: true,
      };
    case STAKE_UNSTAKE_SUCCESS_RESET:
      return {
        ...state,
        stakeUnStakeSuccess: false,
      };
    case REMOVE_LIQUIDITY_SUCCESS:
      return {
        ...state,
        removeLiquiditySuccess: true,
      };
    case REMOVE_LIQUIDITY_SUCCESS_RESET:
      return {
        ...state,
        removeLiquiditySuccess: false,
      };
    default: {
      return state;
    }
  }
}

export default rootReducer;
