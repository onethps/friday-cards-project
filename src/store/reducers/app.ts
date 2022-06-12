import { AxiosError } from 'axios';
import { Dispatch } from 'redux';

import { auth, ResponseError } from 'api/auth';
import { isLoggedInAC } from 'store/reducers/login';
import { setProfileInfo } from 'store/reducers/profile';
import { AppThunk } from 'store/store';

const initialState = {
  isInitializedApp: false,
  status: 'idle',
  error: null,
};

type InitialStateType = {
  isInitializedApp: boolean;
  status: string;
  error: string | null;
};

export const app = (
  state: InitialStateType = initialState,
  action: appReducerTypes,
): InitialStateType => {
  switch (action.type) {
    case 'app/SET-APP-STATUS':
      return { ...state, status: action.status };
    case 'app/IS-INITIALIZED-APP':
      return { ...state, isInitializedApp: action.isInitialized };
    case 'app/SET-ERROR':
      return { ...state, error: action.error };
    default:
      return state;
  }
};

// actions

export const setAppStatus = (status: RequestStatusType) =>
  ({ type: 'app/SET-APP-STATUS', status } as const);
export const isInitializedApp = (isInitialized: boolean) =>
  ({ type: 'app/IS-INITIALIZED-APP', isInitialized } as const);

export const setAppErrorAC = (error: string) =>
  ({ type: 'app/SET-ERROR', error } as const);

// thunk
export const initializeAppTC = () => (dispatch: Dispatch<appReducerTypes>) => {
  auth
    .authMe()
    .then(resolve => {
      dispatch(setAppStatus('idle'));
      dispatch(isInitializedApp(true));
      dispatch(isLoggedInAC(true));
      const { email, name, _id } = resolve.data;
      dispatch(setProfileInfo(email, name, _id));
    })
    .catch((error: AxiosError<ResponseError>) => {
      dispatch(
        setAppErrorAC(error.response?.data ? error.response.data.error : error.message),
      );
    })
    .finally(() => {
      dispatch(setAppStatus('succeeded'));
    });
};

// types
export type RequestStatusType = 'idle' | 'loading' | 'succeeded' | 'failed';

export type appReducerTypes =
  | ReturnType<typeof setAppStatus>
  | ReturnType<typeof setAppErrorAC>
  | ReturnType<typeof isInitializedApp>
  | any;

// type ThunkType = ThunkAction<void, AppRootStateType, Dispatch<appReducerTypes>, appReducerTypes>
