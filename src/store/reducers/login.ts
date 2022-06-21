import { GlobalLoginTypes, RequestStatusType } from "store/actions/types/types";
import { LOGIN_ACTION_CONST } from "store/actions/constants";

export interface loginState {
  isLoggedIn: boolean;
  loadingStatus: RequestStatusType;
  error: string | null;
}

const initialState: loginState = {
  isLoggedIn: false,
  loadingStatus: 'idle',
  error: null,
};

export const login = (
  state: loginState = initialState,
  action: GlobalLoginTypes,
): loginState => {
  switch (action.type) {
    case LOGIN_ACTION_CONST.SET_LOGGED_IN:
      return { ...state, isLoggedIn: action.isLoggedIn };
    case LOGIN_ACTION_CONST.SET_LOADING_STATUS:
      return { ...state, loadingStatus: action.status };
    case LOGIN_ACTION_CONST.SET_ERROR_MESSAGE:
      return { ...state, error: action.message };
    default:
      return state;
  }
};



