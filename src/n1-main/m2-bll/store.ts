import {Action, applyMiddleware, combineReducers, createStore} from "redux";
import {registerReducer} from "./b1-reducers/register-reducer";
import thunkMiddleware, {ThunkAction} from 'redux-thunk'
import {loginReducer} from "./b1-reducers/login-reducer";
import {profileReducer} from "./b1-reducers/profile-reducer";
import {appReducer} from "./b1-reducers/app-reducer";
import {ForgotPasswordReducer} from "./b1-reducers/forgot-password-reducer";
import {TypedUseSelectorHook, useDispatch, useSelector} from "react-redux";
import {CardsPackReducer} from "../m1-ui/u2-components/Content/f2-CardPacks/card-packs-reducer";
import {CardReducer} from "../m1-ui/u2-components/Content/f3-Card/card-reducer";

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
export const useAppSelector: TypedUseSelectorHook<RootState> = useSelector;

export const store = createStore(rootReducer, applyMiddleware(thunkMiddleware))

// @ts-ignore
window.store = store;