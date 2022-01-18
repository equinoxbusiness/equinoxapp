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
  REMOVE_LIQUIDITY_SUCCESS_RESET,
  ADD_ORG_FORMDATA,
  ADD_PROJECT_FORMDATA,
  LOAD_DETAILS,
  LOAD_CATEGORY,
  LOAD_PROJECT,
  LOAD_ORG,
  ADD_ICO_FORMDATA,
  LOAD_ICOS,
  ADD_PROPOSAL_FORMDATA,
  LOAD_PROPOSALS
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

export function addOrgFormData(payload) {
  return { type: ADD_ORG_FORMDATA, payload};
}

export function addProjectFormData(payload) {
  return { type: ADD_PROJECT_FORMDATA, payload};
}

export function addProposalFormData(payload) {
  return { type: ADD_PROPOSAL_FORMDATA, payload};
}

export function addIcoFormData(payload) {
  return { type: ADD_ICO_FORMDATA, payload};
}

export function loadDetails(payload) {
  return { type: LOAD_DETAILS, payload };
}

export function loadCategory(payload) {
  return { type: LOAD_CATEGORY, payload };
}

export function loadProject(payload) {
  return { type: LOAD_PROJECT, payload };
}

export function loadOrg(payload) {
  return { type: LOAD_ORG, payload };
}

export function loadIcos(payload) {
  return { type: LOAD_ICOS, payload };
}

export function loadProposals(payload) {
  return { type: LOAD_PROPOSALS, payload };
}
