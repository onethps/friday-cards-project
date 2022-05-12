import React from 'react';
import {Navigate, NavLink} from 'react-router-dom';
import l from "./Login.module.scss";
import {useFormik} from "formik";
import {useAppDispatch} from "../../../../m2-bll/store";
import {loginTC} from "../../../../m2-bll/b1-reducers/login-reducer";
import Preloader from "../../../u1-common/c2-Preloader/Preloader";
import {loginValidation} from "../../../../m4-utils/validators/validators";
import CustomInput from "../../../u1-common/c1-CustomInput/CustomInput";
import {RequestStatusType} from "../../../../m2-bll/b1-reducers/app-reducer";
import {PATH} from "../../AppRoutes";
import {useTypedSelector} from "../../../../../n3-hooks/useTypedSelector";

export const Login = () => {

    const isLoggedIn = useTypedSelector(state => state.login.isLoggedIn)
    const errorMessage = useTypedSelector(state => state.login.error)
    const loadingStatus = useTypedSelector<RequestStatusType>(state => state.login.loadingStatus)

    const dispatch = useAppDispatch();

    const formik = useFormik({
        initialValues: {
            email: '',
            password: '',
            // email: 'onethps@gmail.com',
            // password: 'dwqdwqdqw214124',
            rememberMe: false
        },
        validate: loginValidation,
        onSubmit: loginData => {
            dispatch(loginTC(loginData))
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
                    <NavLink to={PATH.RECOVERY_PASSWORD} >Forgot Password</NavLink>
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
                        <h4><NavLink to={PATH.REGISTRATION}>Sign Up</NavLink></h4>
                    </div>
                }
            </form>
        </div>
    )
}