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

export function accountUpdate(payload) {
  return { type: ACCOUNT_UPDATE, payload };
}

export function web3Loaded(payload) {
  return { type: WEB3_LOADED, payload };
}

export function accountUpdateOnDisconnect() {
  localStorage.removeItem("selected_account");
  return { type: ACCOUNT_UPDATE_ON_DISCONNECT };
}

export function swapSuccess() {
  return { type: SWAP_SUCCESS };
}

export function swapSuccessReset() {
  return { type: SWAP_SUCCESS_RESET };
}

export function addLiquiditySuccess() {
  return { type: ADD_LIQUIDITY_SUCCESS };
}

export function addLiquiditySuccessReset() {
  return { type: ADD_LIQUIDITY_SUCCESS_RESET };
}

export function stakeUnStakeSuccess() {
  return { type: STAKE_UNSTAKE_SUCCESS };
}

export function stakeUnStakeSuccessReset() {
  return { type: STAKE_UNSTAKE_SUCCESS_RESET };
}

export function removeLiquiditySuccess() {
  return { type: REMOVE_LIQUIDITY_SUCCESS };
}

export function removeLiquiditySuccessReset() {
  return { type: REMOVE_LIQUIDITY_SUCCESS_RESET };
}