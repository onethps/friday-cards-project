import {ResponseCardType} from "../../n1-main/m3-dal/packs-api";

const initState = {
    cardPacks: [],
}

type initStateType = {
    cardPacks: ResponseCardType[]

}


export const CardsPackReducer = (state:initStateType = initState, action:cardPackReducerTypes):initStateType => {
    switch (action.type) {
        case "cardpack/SET-CARD-PACK":
            return{
                ...state, cardPacks: action.cardPacks}
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