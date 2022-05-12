import {TypedUseSelectorHook, useSelector} from "react-redux";
import {AppRootStateType} from "../n1-main/m2-bll/store";

export const useTypedSelector: TypedUseSelectorHook<AppRootStateType> = useSelector