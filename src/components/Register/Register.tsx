import React, {useState} from 'react';
import {Navigate} from 'react-router-dom';
import l from "./Register.module.scss";
import {useDispatch, useSelector} from "react-redux";
import {useFormik} from "formik";
import {AppDispatch, AppRootStateType} from "../../store/store";
import {registerTC} from "../../store/register-reducer";
import Preloader from "../../common/preloader/Preloader";
import showPasswordIcon from "../../common/icons/eye.svg";
import {RegisterValidate} from "../../validators/validators";
import CustomInput from "../../common/CustomInput/CustomInput";






export const Register = () => {

    const dispatch : AppDispatch = useDispatch();

    let errorMessage = useSelector<AppRootStateType, string>(state => state.register.errorMessage)
    let successRegistrationStatus = useSelector<AppRootStateType, boolean>(state => state.register.isRegistered)
    let isFetchingLoader = useSelector<AppRootStateType, boolean>(state => state.register.isFetchingLoader)

    const formik = useFormik( {
        initialValues:  {
            email: '',
            password: '',
            confirmPassword: '',
        },
        validate: RegisterValidate,
        onSubmit: values => {
            dispatch(registerTC(values.email, values.password) as any)
        }
    })


    const[showPassword, setShowPassword] = useState<boolean>(false)
    const[showConfirmPassword, setShowConfirmPassword] = useState<boolean>(false)



    const onShowPassword = () => {
        setShowPassword(!showPassword)
    }

    const onShowConfirmPassword = () => {
        setShowConfirmPassword(!showConfirmPassword)
    }

    if (successRegistrationStatus) {
        return <Navigate to={'/login'}/>
    }

    return (
        <div className={l.loginBox}>
            <h1>It-incubator</h1>
            <h2>Sign Up</h2>

            <form onSubmit={formik.handleSubmit}>

                <CustomInput
                    label={'Email'} {...formik.getFieldProps('email')}
                    error={formik.touched.email && formik.errors.email ? formik.errors.email : ''}
                />

                <CustomInput
                    password
                    label={'Password'} {...formik.getFieldProps('password')}
                    error={formik.touched.password && formik.errors.password ? formik.errors.password : ''}
                />

                <CustomInput
                    password
                    label={'Confirm Password'} {...formik.getFieldProps('confirmPassword')}
                    error={formik.touched.confirmPassword && formik.errors.confirmPassword ? formik.errors.confirmPassword : ''}
                />



                {isFetchingLoader ? <Preloader/> :
                    <div className={l.buttonBlock}>
                        <a href={'/login'}  className={l.backToLoginLink}>Login</a>
                        <button className={l.submitButton} type="submit">Register</button>
                    </div> }

                {errorMessage && <div className={l.errorMessage}>{errorMessage}</div>}

            </form>
        </div>
    )
}