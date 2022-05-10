import React from 'react';
import l from './PasswordRecovery.module.scss'
import {useFormik} from "formik";
import {forgotPageValidation} from "../../n1-main/m4-utils/validators/validators";
import {NavLink} from "react-router-dom";
import {useDispatch, useSelector} from "react-redux";
import {AppRootStateType, useAppDispatch} from "../../n1-main/m2-bll/store";
import CustomInput from "../../n1-main/m1-ui/u1-common/c1-CustomInput/CustomInput";
import {forgotPasswordTC} from "../../n1-main/m2-bll/b1-reducers/forgot-password-reducer";
import {PATH} from "../../AppRoutes";

const PasswordRecovery = () => {
    const dispatch = useAppDispatch()

    let forgotError = useSelector<AppRootStateType, string>(state => state.forgotPassword.error)

    const formik = useFormik({
        initialValues: {
            email: '',
        },
        validate: forgotPageValidation,
        onSubmit: values => {
            dispatch(forgotPasswordTC(values.email))
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
                    <h4><NavLink to={PATH.LOGIN}>Try logging in</NavLink></h4>
                </div>


            </form>
        </div>
    );
};

export default PasswordRecovery;