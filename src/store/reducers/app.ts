import { GlobalAppTypes } from "store/actions/types/types";
import { APP_ACTIONS_CONST } from "store/actions/constants";


const initialState = {
  isInitializedApp: false,
  status: 'loading',
  error: null,
};

type InitialStateType = {
  isInitializedApp: boolean;
  status: string;
  error: string | null;
};

export const app = (
  state: InitialStateType = initialState,
  action: GlobalAppTypes,
): InitialStateType => {
  switch (action.type) {
    case APP_ACTIONS_CONST.INITIALIZE_APP:
      return {...state, isInitializedApp: action.isInitialized};
    case APP_ACTIONS_CONST.SET_APP_STATUS:
      return {...state, status: action.status};
    case APP_ACTIONS_CONST.SET_ERROR:
      return {...state, error: action.error};
    default:
      return state;
  }
};


