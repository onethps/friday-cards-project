import {Action, applyMiddleware, combineReducers, createStore} from "redux";
import {registerReducer} from "./b1-reducers/register-reducer";
import thunkMiddleware, {ThunkAction} from 'redux-thunk'
import {loginReducer} from "./b1-reducers/login/login-reducer";
import {profileReducer} from "./b1-reducers/profile-reducer";
import {appReducer} from "./b1-reducers/app-reducer";
import {ForgotPasswordReducer} from "./b1-reducers/forgot-password-reducer";
import {TypedUseSelectorHook, useDispatch, useSelector} from "react-redux";
import {CardsPackReducer} from "./b1-reducers/packs-reducer";
import {CardReducer} from "./b1-reducers/card-reducer";

const rootReducer  = combineReducers( {
    app:appReducer,
    register: registerReducer,
    login: loginReducer,
    profile: profileReducer,
    forgotPassword: ForgotPasswordReducer,
    cardPacks: CardsPackReducer,
    card:CardReducer
})

export type AppRootStateType = ReturnType<typeof rootReducer>

export type AppDispatch = typeof store.dispatch;
export type RootState = ReturnType<typeof store.getState>;

export type AppThunk<ReturnType = void> = ThunkAction<
    ReturnType,
    RootState,
    unknown,
    Action<string>
    >;



export const useAppDispatch = () => useDispatch<AppDispatch>();

export const store = createStore(rootReducer, applyMiddleware(thunkMiddleware))

// @ts-ignore
window.store = store;