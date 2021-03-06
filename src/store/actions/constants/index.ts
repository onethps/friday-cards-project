export enum APP_ACTIONS_CONST {
  SET_APP_STATUS = 'app/SET-APP-STATUS',
  INITIALIZE_APP = 'app/IS-INITIALIZED-APP',
  SET_ERROR = 'app/SET-ERROR'
}

export enum CARD_ACTIONS_CONST {
  SET_CARDS = 'card/SET-CARDS',
  SET_CARD_STATUS = 'card/SET-CARD-STATUS',
  SET_NEW_CARD = 'card/SET-NEW-CARD'
}

export enum PACK_ACTIONS_CONST {
  SET_PACK = 'pack/SET-CARD-PACK',
  SET_PACK_SETTINGS = 'pack/SET-PAGE-SETTINGS',
  SET_LOADING_STATUS = 'pack/SET-LOADING-STATUS',
  SET_FILTERS = 'pack/SET-FILTERS',
}

export enum RECOVER_PASS_ACTIONS_CONST {
  SET_LOADING = 'recover/IS-LOADING',
  IS_SEND_RECOVER_MAIL = 'recover/IS-SEND-RECOVER-MAIL',
  SET_ERROR = 'recover/ERROR-MESSAGE',
  SHOW_RECOVER_STATUS = 'recover/SHOW-RECOVER-STATUS',
}

export enum LOGIN_ACTION_CONST {
  SET_LOGGED_IN = 'login/IS-LOGGED-IN',
  SET_LOADING_STATUS = 'login/SET-LOADING-STATUS',
  SET_ERROR_MESSAGE = 'login/ERROR-MESSAGE',
}

export enum PROFILE_ACTION_CONST {
  SET_PROFILE_INFO = 'profile/SET-PROFILE-INFO',
  SET_LOADING_STATUS = 'profile/SET-LOADING-STATUS',
  SET_MSG_STATUS = 'profile/SET-CHANGE-MESSAGE-STATUS',
}