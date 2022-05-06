import React from 'react';
import {Navigate, NavLink} from 'react-router-dom';
import l from "./Login.module.scss";
import {useDispatch, useSelector} from "react-redux";
import {useFormik} from "formik";
import {AppDispatch, AppRootStateType} from "../../store/store";
import {loginTC} from "../../store/login-reducer";
import Preloader from "../../common/preloader/Preloader";
import {loginValidation} from "../../validators/validators";
import CustomInput from "../../common/CustomInput/CustomInput";
import {RequestStatusType} from "../../store/app-reducer";

export const Login = () => {

    const isLoggedIn = useSelector<AppRootStateType, boolean>(state => state.login.isLoggedIn)
    const errorMessage = useSelector<AppRootStateType, string | null>(state => state.login.error)
    const loadingStatus = useSelector<AppRootStateType, RequestStatusType>(state => state.login.loadingStatus)

    const dispatch = useDispatch();

    const formik = useFormik({
        initialValues: {
            // email: '',
            // password: '',
            email: 'onethps@gmail.com',
            password: 'dwqdqw24142',
            rememberMe: false
        },
        validate: loginValidation,
        onSubmit: loginData => {
            dispatch(loginTC(loginData) as any)
            formik.resetForm()
        },
    })

    if (isLoggedIn) {
        return <Navigate to='/profile'/>
    }

    return (
        <div className={l.loginBox}>
            <h1>It-incubator</h1>
            <h2>Sign In</h2>
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



                <div className={l.forgotPassword}>
                    <NavLink to={'/forgot'} >Forgot Password</NavLink>
                </div>

                <div className={l.rememberBox}>
                    <input type={'checkbox'}
                           {...formik.getFieldProps('rememberMe')}
                    />
                    <label>Remember Me</label>
                </div>


                {loadingStatus === 'loading' ? <div className={l.preloaderBox}> <Preloader/></div> :
                    <div className={l.loginButtonBox}>
                        <div className={l.errorBox}>
                            {errorMessage && <div className={l.errorMessage}>{errorMessage}</div>}
                        </div>
                        <button type='submit'>Login</button>

                        <h3>Don’t have an account?</h3>
                        <h4><NavLink to={'/register'}>Sign Up</NavLink></h4>
                    </div>
                }
            </form>
        </div>
    )
}