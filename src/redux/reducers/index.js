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
  ADD_PROPOSAL_FORMDATA,
  LOAD_DETAILS,
  LOAD_CATEGORY,
  LOAD_PROJECT,
  LOAD_ORG,
  ADD_ICO_FORMDATA,
  LOAD_ICOS,
  LOAD_PROPOSALS
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
  removeLiquiditySuccess: false,
  org: null,
  orgFormdata: null,
  projectFormdata: null,
  auth: true,
  category: [],
  project: null,
  icoFormdata: null, 
  ico: null,
  proposalFormdata: null,
  proposals: null
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
    case ADD_ORG_FORMDATA:
      return {
        ...state,
        orgFormdata: {
          ...state.orgFormdata,
          ...action.payload
        }
      }
    case ADD_PROJECT_FORMDATA:
      return {
        ...state,
        projectFormdata: {
          ...state.projectFormdata,
          ...action.payload
        }
      }
    case ADD_PROPOSAL_FORMDATA:
        return {
          ...state,
          proposalFormdata: {
            ...state.proposalFormdata,
            ...action.payload
          }
        }
    case ADD_ICO_FORMDATA:
      return {
        ...state,
        icoFormdata: {
          ...state.icoFormdata,
          ...action.payload
        }
      }
    case LOAD_DETAILS: {
      return {
        ...state,
        auth: action.payload
      }
    }
    case LOAD_CATEGORY: {
      return {
        ...state,
        category: action.payload
      }
    }
    case LOAD_PROJECT: {
      return {
        ...state,
        project: action.payload
      }
    }
    case LOAD_ORG: {
      return {
        ...state,
        org: action.payload
      }
    }
    case LOAD_ICOS: {
      return {
        ...state,
        ico: action.payload
      }
    }
    case LOAD_PROPOSALS: {
      return {
        ...state,
        proposals: action.payload
      }
    }
    default: {
      return state;
    }
  }
}

export default rootReducer;
