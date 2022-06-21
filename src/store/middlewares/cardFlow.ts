import { card, cardQueryParams } from "api/card";
import { Dispatch } from "redux";
import { isLoadingCard, setCardsAC, setNewCardAC } from "store/actions/card";
import { AppRootStateType } from "store/store";

export const fetchCardsTC = (data: cardQueryParams) => async (dispatch: Dispatch) => {
  dispatch(isLoadingCard(true))
  try {
    const res = await card.getCard(data)
    dispatch(setCardsAC(res.data))
    dispatch(isLoadingCard(false))
  } catch (e) {
    throw new Error(e as any)
  }
}

export const setNewCardTC = (data: { cardsPack_id: string; question: string; answer: string; _id: string }) => async (dispatch: Dispatch) => {
  dispatch(isLoadingCard(true))
  try {
    const res = await card.setNewCard(data)
    dispatch(setNewCardAC(res.data))
  } catch (e) {
    throw new Error(e as any)
  } finally {
    dispatch(isLoadingCard(false))
    dispatch(fetchCardsTC({cardsPack_id: data.cardsPack_id}) as any)
  }
}

export const deleteCardTC = (cardId: string, cardPackId: string) => async (dispatch: Dispatch) => {
  dispatch(isLoadingCard(true))
  try {
    await card.deleteCard(cardId)
  } catch (e) {
    throw new Error(e as any)
  } finally {
    dispatch(fetchCardsTC({cardsPack_id: cardPackId}) as any)
    dispatch(isLoadingCard(false))
  }
}

export const saveEditCardTC = (data: any, cardPackId: string) => async (dispatch: Dispatch) => {
  dispatch(isLoadingCard(true))
  try {
    await card.editCard(data)
  } catch (e) {
    throw new Error(e as any)
  } finally {
    dispatch(isLoadingCard(false))
    dispatch(fetchCardsTC({cardsPack_id: cardPackId}) as any)
  }
}


export const updateGradeTC = (grade: string, cardId: string) => async (dispatch: Dispatch, getState: () => AppRootStateType) => {
  dispatch(isLoadingCard(true))
  try {
    if (grade) {
      const {cardsTotalCount} = getState().card
      const res = await card.updateGrade(Number(grade), cardId)
      const {cardsPack_id} = res.data.updatedGrade
      dispatch(fetchCardsTC({cardsPack_id, pageCount: cardsTotalCount}) as any)
    }
  } catch (e) {
    throw new Error(e as any)
  }
}