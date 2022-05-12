import React from 'react';
import l from './PasswordRecovery.module.scss'
import {useFormik} from "formik";
import {forgotPageValidation} from "../../../../m4-utils/validators/validators";
import {NavLink} from "react-router-dom";
import {useAppDispatch} from "../../../../m2-bll/store";
import CustomInput from "../../../u1-common/c1-CustomInput/CustomInput";
import {forgotPasswordTC} from "../../../../m2-bll/b1-reducers/forgot-password-reducer";
import {PATH} from "../../AppRoutes";
import Preloader from "../../../u1-common/c2-Preloader/Preloader";
import SuccessMessage from "./p1-SuccessMessage/SuccessMessage";
import {useTypedSelector} from "../../../../../n3-hooks/useTypedSelector";

const PasswordRecovery = () => {
    const dispatch = useAppDispatch()

    const forgotError = useTypedSelector(state => state.forgotPassword.error)
    const isLoadingStatus = useTypedSelector(state => state.forgotPassword.isLoading)
    const isSendMessage = useTypedSelector(state => state.forgotPassword.isSendMessage)

    const formik = useFormik({
        initialValues: {
            email: '',
        },
        validate: forgotPageValidation,
        onSubmit: values => {
            dispatch(forgotPasswordTC(values.email))
        },
    })


    if (isSendMessage) {
        return  <SuccessMessage/>
    }

    return (
        <div className={l.loginBox}>
            <h1>It-incubator</h1>

            {isLoadingStatus ? <div style={{marginTop: '40%'}}><Preloader/></div> :

                <div>
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
            }
        </div>
    );
};

export default PasswordRecovery;