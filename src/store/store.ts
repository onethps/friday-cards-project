import { useDispatch } from 'react-redux';
import { Action, applyMiddleware, combineReducers, createStore } from 'redux';
import thunkMiddleware, { ThunkAction } from 'redux-thunk';

import { app } from 'store/reducers/app';
import { card } from 'store/reducers/card';
import { recoverPassword } from 'store/reducers/recoverPassword';
import { login } from 'store/reducers/login';
import { packs } from 'store/reducers/packs';
import { profile } from 'store/reducers/profile';
import { register } from 'store/reducers/register';

const rootReducer = combineReducers({
  app,
  register,
  login,
  profile,
  recoverPassword,
  packs,
  card,
});

export type AppRootStateType = ReturnType<typeof rootReducer>;

export type AppDispatch = typeof store.dispatch;

export type RootState = ReturnType<typeof store.getState>;

export type AppThunk<ReturnType = void> = ThunkAction<
  ReturnType,
  RootState,
  unknown,
  Action<string>
>;

export const useAppDispatch = () => useDispatch<AppDispatch>();

export const store = createStore(rootReducer, applyMiddleware(thunkMiddleware));

// @ts-ignore
window.store = store;
