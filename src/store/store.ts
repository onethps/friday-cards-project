import { useDispatch } from 'react-redux';
import { Action, applyMiddleware, combineReducers, createStore } from 'redux';
import thunkMiddleware, { ThunkAction } from 'redux-thunk';

import { app } from 'store/reducers/app';
import { Card } from 'store/reducers/card';
import { ForgotPassword } from 'store/reducers/forgotPassword';
import { login } from 'store/reducers/login';
import { CardsPackReducer } from 'store/reducers/packs';
import { profile } from 'store/reducers/profile';
import { register } from 'store/reducers/register';

const rootReducer = combineReducers({
  app,
  register,
  login,
  profile,
  forgotPassword: ForgotPassword,
  cardPacks: CardsPackReducer,
  card: Card,
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
