import React, {useState} from 'react';
import {Navigate} from 'react-router-dom';
import l from "./Register.module.scss";
import {useFormik} from "formik";
import {useAppDispatch} from "../../../../m2-bll/store";
import {registerTC} from "../../../../m2-bll/b1-reducers/register-reducer";
import Preloader from "../../../u1-common/c2-Preloader/Preloader";
import {RegisterValidate} from "../../../../m4-utils/validators/validators";
import CustomInput from "../../../u1-common/c1-CustomInput/CustomInput";
import {useTypedSelector} from "../../../../../n3-hooks/useTypedSelector";


export const Register = () => {

    const dispatch = useAppDispatch();

    const {errorMessage, isRegistered, isFetchingLoader} = useTypedSelector(state => state.register)

    const formik = useFormik( {
        initialValues:  {
            email: '',
            password: '',
            confirmPassword: '',
        },
        validate: RegisterValidate,
        onSubmit: values => {
            dispatch(registerTC(values.email, values.password))
        }
    })

    if (isRegistered) {
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