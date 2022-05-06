import React from 'react';
import l from './ForgotPassword.module.scss'
import {useFormik} from "formik";
import {forgotPageValidation} from "../../validators/validators";
import {NavLink} from "react-router-dom";
import {useDispatch, useSelector} from "react-redux";
import {AppRootStateType} from "../../store/store";
import CustomInput from "../../common/CustomInput/CustomInput";
import {forgotPasswordTC} from "../../store/forgot-password-reducer";

const ForgotPassword = () => {
    let dispatch = useDispatch()

    let forgotError = useSelector<AppRootStateType, string>(state => state.forgotPassword.error)

    const formik = useFormik({
        initialValues: {
            email: '',
        },
        validate: forgotPageValidation,
        onSubmit: values => {
            dispatch(forgotPasswordTC(values.email) as any)
        },
    })


    return (
        <div className={l.loginBox}>
            <h1>It-incubator</h1>
            <h2>Forgot your password?</h2>
            <form onSubmit={formik.handleSubmit}>

                <CustomInput
                    label={'Email'} {...formik.getFieldProps('email')}
                    error={formik.touched.email && formik.errors.email ? formik.errors.email : ''}
                />

                <h3>Enter your email address and we will send you further instructions </h3>

                <div className={l.errorBox}>
                    {forgotError && <span>{forgotError}</span>}
                </div>

                <div className={l.loginButtonBox}>
                    <button type='submit'>Send Instructions</button>
                    <h3>Did you remember your password?</h3>
                    <h4><NavLink to={'/login'}>Try logging in</NavLink></h4>
                </div>


            </form>
        </div>
    );
};

export default ForgotPassword;