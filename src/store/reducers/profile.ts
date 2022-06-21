import { GlobalProfileTypes } from "store/actions/types/types";
import { PROFILE_ACTION_CONST } from "store/actions/constants";

const initialState = {
    id:'',
    email: '',
    name:'',
    avatar:'',
    error: null,
    status: 'idle',
    changeMessageStatus: ''
}

type InitialStateType = typeof initialState

export const profile = (state: InitialStateType = initialState, action:GlobalProfileTypes) => {
    switch (action.type) {
        case PROFILE_ACTION_CONST.SET_PROFILE_INFO:
            return {...state, name: action.name, email: action.email, id: action.id, avatar: action.avatar}
        case PROFILE_ACTION_CONST.SET_LOADING_STATUS:
            return {...state, status: action.status}
        case PROFILE_ACTION_CONST.SET_MSG_STATUS:
            return {...state, changeMessageStatus: action.status}
        default:
            return state
    }

}


