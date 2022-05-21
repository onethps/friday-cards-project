import {packs, ResponseCardType} from "api/packs";
import {AppRootStateType, AppThunk} from "store/store";
import {RequestStatusType} from "store/reducers/app";


export type CurrentTab = 'my' | 'all'

const initState = {
    cardPacks: [],
    cardPacksTotalCount: 0,
    // количество колод
    minCardsCount: 0,
    maxCardsCount: 50,
    page: 1,
    pageCount: 5,
    togglePacks: "all" as const,
    loading: 'idle' as const
}
type initStateType = {
    cardPacks: ResponseCardType[]
    cardPacksTotalCount: number,
    maxCardsCount: number,
    minCardsCount: number,
    page: number,
    pageCount: number,
    togglePacks? : CurrentTab
    loading?: RequestStatusType

}



export const CardsPackReducer = (state:initStateType = initState, action:cardPackReducerTypes):initStateType => {
    switch (action.type) {
        case 'pack/SET-CARD-PACK':
            return {...state, ...action.payload}
        case "pack/SET-CURRENT-TAB":
            return {...state, togglePacks: action.currentTab}
        case 'pack/SET-PAGE-SETTINGS':
            return {...state, page: action.currentPage, pageCount: action.pageSize}
        case 'pack/SET-LOADING-STATUS':
            return {...state, loading:action.status}
        default:
            return state

    }

}

//actions
export const setCardPacksAC = (
    {
        cardPacks,
        cardPacksTotalCount,
        maxCardsCount,
        minCardsCount,
        page,
        pageCount
    }
        :initStateType) => {
    return {
        type: 'pack/SET-CARD-PACK', payload:{
            cardPacks,
            cardPacksTotalCount,
            maxCardsCount,
            minCardsCount,
            page,
            pageCount,
        }
    } as const
}


export const pageChangingAC = (currentPage:number, pageSize:number) =>
    ({type:'pack/SET-PAGE-SETTINGS', currentPage, pageSize} as const)

export const setCurrentTabAC = (currentTab:CurrentTab) =>
    ({type:'pack/SET-CURRENT-TAB', currentTab} as const)

export const setLoadingPackAC = (status:RequestStatusType) =>
    ({type:'pack/SET-LOADING-STATUS', status} as const)



export const fetchPacks = (min:number,max:number, currentPage:number, pageCount:number, userId:string):AppThunk =>
    async (dispatch, getState: () => AppRootStateType) => {
        dispatch(setLoadingPackAC('loading'))
        try {
            const res  = await packs.getPacks({min:min, max:max, page:currentPage, pageCount:pageCount, user_id:userId})
            dispatch(setCardPacksAC(res.data))
        } catch (e) {
            console.log(e)
        } finally {
            dispatch(setLoadingPackAC('succeeded'))
        }


    }



export const deletePackTC = (packId:string):AppThunk =>
    async (dispatch, getState: () => AppRootStateType) => {
        dispatch(setLoadingPackAC('loading'))
        try {
            await packs.deletePack(packId)
            const {minCardsCount, maxCardsCount, togglePacks, page, pageCount} = getState().cardPacks
            const profileId = getState().profile.id
            // check toggle position, if toggled "my" tab - do fetch with userID, if "all" - fetch '' instead userID
            const currentActionTab = togglePacks === 'my' ? profileId : ''
            dispatch(fetchPacks(minCardsCount, maxCardsCount, page, pageCount, currentActionTab))
        } catch (e) {
            console.log(e)
        }
        finally {
            dispatch(setLoadingPackAC('succeeded'))
        }
    }


    export const addNewPackTC = (packName:string):AppThunk =>
    async (dispatch, getState: () => AppRootStateType) => {
        dispatch(setLoadingPackAC('loading'))
        try {
            await packs.addCardPack(packName)
            const {minCardsCount, maxCardsCount, togglePacks, page, pageCount} = getState().cardPacks
            const profileId = getState().profile.id
            // check toggle position, if toggled "my" tab - do fetch with userID, if "all" - fetch '' instead userID
            const currentActionTab = togglePacks === 'my' ? profileId : ''
            dispatch(fetchPacks(minCardsCount, maxCardsCount, page, pageCount, currentActionTab))
        } catch (e) {
            console.log(e)
        }
        finally {
            dispatch(setLoadingPackAC('succeeded'))
        }
    }


    export const editPackNameTC = (id:string, name:string):AppThunk =>
    async (dispatch, getState: () => AppRootStateType) => {
        dispatch(setLoadingPackAC('loading'))
        try {
            await packs.editPackName(id, name)
            const {minCardsCount, maxCardsCount, togglePacks, page, pageCount} = getState().cardPacks
            const profileId = getState().profile.id
            // check toggle position, if toggled "my" tab - do fetch with userID, if "all" - fetch '' instead userID
            const currentActionTab = togglePacks === 'my' ? profileId : ''
            dispatch(fetchPacks(minCardsCount, maxCardsCount, page, pageCount, currentActionTab))
        } catch (e) {
            console.log(e)
        }
        finally {
            dispatch(setLoadingPackAC('succeeded'))
        }
    }



//types
type cardPackReducerTypes = ReturnType<typeof setCardPacksAC>
    | ReturnType<typeof pageChangingAC>
    | ReturnType<typeof setCurrentTabAC>
    | ReturnType<typeof setLoadingPackAC>