import {ResponseCardType} from "../../m3-dal/api";
import {Dispatch} from "redux";

const initState = {
    cardPacks: [],
}

type initStateType = {
    cardPacks: Array<ResponseCardType>

}


export const CardsPackReducer = (state:initStateType = initState, action:cardPackReducerTypes):initStateType => {
    switch (action.type) {
        case "cardpack/SET-CARD-PACK":
            return{
                ...state, cardPacks: action.cardPacks.map
                (m => ({...m, updated: new Date(m.updated).toLocaleDateString("ru-RU")}))
            }
        default:
            return state

    }

}




export const setCardPacksAC = (cardPacks:ResponseCardType[]) => {
    return {
        type: 'cardpack/SET-CARD-PACK', cardPacks
    } as const
}



type cardPackReducerTypes = ReturnType<typeof setCardPacksAC>