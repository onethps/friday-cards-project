export type {
  forgotPageValidationType,
  FormikErrorProfileType,
  FormikErrorRegisterType,
  FormikErrorType,
  loginValues,
  profileType,
  registerValueType,
} from './formikValadationTypes';


export type GetCardsResponse = {
  cards: ResponseCardContent[]
  cardsTotalCount: number
  maxGrade: number
  minGrade: number
  page: number
  pageCount: number
  packUserId: string
}


export type ResponseCardContent = {
  _id?: string
  answer: string
  question: string
  cardsPack_id: string
  grade?: number
  shots?: number
  user_id?: string
  created?: string
  updated?: string

}