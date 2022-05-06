

export type loginValues = {
    email:string
    password: string
    rememberMe: boolean
}

type registerValueType = {
    email:string,
    password:string,
    confirmPassword?: string
}

type FormikErrorType = {
    email?: string
    password?: string
    rememberMe?: boolean
}

type FormikErrorRegisterType = {
    email?: string
    password?: string
    confirmPassword?: string
}

type profileType = {
    email:string,
    name:string,
}


type FormikErrorProfileType = {
    email?:string,
    name?:string,
}


export const loginValidation = (values:loginValues) => {
    const errors: FormikErrorType = {};
    if (!values.email) {
        errors.email = 'Required';
    }
    if (!/^[A-Z0-9._%+-]+@[A-Z0-9.-]+\.[A-Z]{2,4}$/i.test(values.email)) {
        errors.email = 'Invalid email address';
    }
    if (!values.password) {
        errors.password = 'Required password';
    }

    return errors;
}

export const RegisterValidate = (values:registerValueType) => {
    const errors: FormikErrorRegisterType = {};

    if (!values.email) {
        errors.email = 'Required email';
    }
    if (!/^[A-Z0-9._%+-]+@[A-Z0-9.-]+\.[A-Z]{2,}$/i.test(values.email)) {
        errors.email = 'Invalid email address';
    }
    if (!values.password) {
        errors.password = 'Required password';
    }
    if (values.password.length < 8) {
        errors.password = 'Passwords must be at least 7 characters'
    }
    if(!values.confirmPassword) {
        errors.confirmPassword = 'Required confirm password';
    }
    if (values.confirmPassword !== values.password) {
        errors.confirmPassword = 'Passwords are not same';
    }

    return errors;
}


export const profileValidate = (values:profileType) => {
    const errors: FormikErrorProfileType = {};

    if (!values.email) {
        errors.email = 'Required email';
    }
    if (
        !/^[A-Z0-9._%+-]+@[A-Z0-9.-]+\.[A-Z]{2,}$/i.test(values.email)
    ) {
        errors.email = 'Invalid email address';
    }
    if (!values.name) {
        errors.name = 'Required name';
    }

    return errors;
}


type forgotPageValidationType = {
    email:string
}


export const forgotPageValidation = (values:forgotPageValidationType) => {
    const errors: FormikErrorProfileType = {};

    if (!values.email) {
        errors.email = 'Required email';
    }
    if (
        !/^[A-Z0-9._%+-]+@[A-Z0-9.-]+\.[A-Z]{2,}$/i.test(values.email)
    ) {
        errors.email = 'Invalid email address';
    }

    return errors;
}


