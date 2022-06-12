import { packs, ResponseCardType } from "api/packs";
import { AppRootStateType, AppThunk } from "store/store";
import { RequestStatusType } from "store/reducers/app";


const initState = {
  cardPacks: [],
  cardPacksTotalCount: 0,
  // количество колод
  page: 1,
  pageCount: 5,
  minCardsCount: 0,
  maxCardsCount: 50,
  togglePacks: "all" as const,
  loading: "idle" as const,
}
type initStateType = {
  cardPacks: ResponseCardType[]
  cardPacksTotalCount: number,
  page: number,
  pageCount: number,
  minCardsCount: number,
  maxCardsCount: number,
  loading?: RequestStatusType

}


export const CardsPackReducer = (state: initStateType = initState, action: cardPackReducerTypes): initStateType => {
  switch (action.type) {
    case 'pack/SET-CARD-PACK':
      return {...state, ...action.payload}
    case 'pack/SET-PAGE-SETTINGS':
      return {...state, page: action.currentPage, pageCount: action.pageSize}
    case 'pack/SET-LOADING-STATUS':
      return {...state, loading: action.status}
    case 'pack/SET-FILTERS':
      return {...state, ...action.payload}
    default:
      return state

  }

}

//actions
export const setCardPacksAC = (
  {
    cardPacks,
    cardPacksTotalCount,
    page,
    pageCount
  }
    : initStateType) => {
  return {
    type: 'pack/SET-CARD-PACK', payload: {
      cardPacks,
      cardPacksTotalCount,
      page,
      pageCount,
    }
  } as const
}


export const pageChangingAC = (currentPage: number, pageSize: number) =>
  ({type: 'pack/SET-PAGE-SETTINGS', currentPage, pageSize} as const)

export const setLoadingPackAC = (status: RequestStatusType) =>
  ({type: 'pack/SET-LOADING-STATUS', status} as const)

export const setFilterAC = (filters: any) =>
  ({
    type: 'pack/SET-FILTERS',
    payload: {
      ...filters,
    }
  } as const)


export const fetchPacks = (min: number, max: number, currentPage: number, pageCount: number, userId: string): AppThunk =>
  async (dispatch, getState: () => AppRootStateType) => {
    dispatch(setLoadingPackAC('loading'))
    try {
      const res = await packs.getPacks({min: min, max: max, page: currentPage, pageCount: pageCount, user_id: userId})
      dispatch(setCardPacksAC(res.data))
    } catch (e) {
      console.log(e)
    } finally {
      dispatch(setLoadingPackAC('succeeded'))
    }


  }


export const deletePackTC = (packId: string, category:string): AppThunk =>
  async (dispatch, getState: () => AppRootStateType) => {
    dispatch(setLoadingPackAC('loading'))
    try {
      await packs.deletePack(packId)
      const {minCardsCount, maxCardsCount, page, pageCount} = getState().cardPacks
      const profileId = getState().profile.id
      const fetchCategoryPacks = category === 'my' ? profileId : ''
      dispatch(fetchPacks(+minCardsCount, +maxCardsCount, page, pageCount, fetchCategoryPacks))
    } catch (e) {
      console.log(e)
    } finally {
      dispatch(setLoadingPackAC('succeeded'))
    }
  }


export const addNewPackTC = (packName: string): AppThunk =>
  async (dispatch, getState: () => AppRootStateType) => {
    dispatch(setLoadingPackAC('loading'))
    try {
      await packs.addCardPack(packName)
    } catch (e) {
      console.log(e)
    } finally {
      dispatch(setLoadingPackAC('succeeded'))
    }
  }



export const editPackNameTC = (id: string, name: string, category: string): AppThunk =>
  async (dispatch, getState: () => AppRootStateType) => {
    dispatch(setLoadingPackAC('loading'))
    try {
      await packs.editPackName(id, name)
      const {minCardsCount, maxCardsCount, page, pageCount} = getState().cardPacks
      const profileId = getState().profile.id
      const fetchCategoryPacks = category === 'my' ? profileId : ''
       dispatch(fetchPacks(+minCardsCount, +maxCardsCount, page, pageCount, fetchCategoryPacks))
    } catch (e) {
      console.log(e)
    } finally {
      dispatch(setLoadingPackAC('succeeded'))
    }
  }


//types
type cardPackReducerTypes = ReturnType<typeof setCardPacksAC>
  | ReturnType<typeof pageChangingAC>
  | ReturnType<typeof setLoadingPackAC>
  | ReturnType<typeof setFilterAC>