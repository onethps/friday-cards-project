export type loginValues = {
  email: string;
  password: string;
  rememberMe: boolean;
};

export type registerValueType = {
  email: string;
  password: string;
  confirmPassword?: string;
};

export type FormikErrorType = {
  email?: string;
  password?: string;
  rememberMe?: boolean;
};

export type FormikErrorRegisterType = {
  email?: string;
  password?: string;
  confirmPassword?: string;
};

export type profileType = {
  email: string;
  name: string;
};

export type FormikErrorProfileType = {
  email?: string;
  name?: string;
};

export type forgotPageValidationType = {
  email: string;
};
