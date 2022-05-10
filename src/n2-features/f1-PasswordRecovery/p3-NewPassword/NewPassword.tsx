import React, {useState} from 'react';
import s from './NewPassword.module.scss'
import CustomInput from "../../../n1-main/m1-ui/u1-common/c1-CustomInput/CustomInput";
import {senNewPasswordTC} from "../../../n1-main/m2-bll/b1-reducers/forgot-password-reducer";
import {useParams} from "react-router-dom";
import {AppRootStateType, useAppDispatch} from "../../../n1-main/m2-bll/store";
import {useSelector} from "react-redux";
import Preloader from "../../../n1-main/m1-ui/u1-common/c2-Preloader/Preloader";
import SuccessPasswordChanged from "./n1-SuccessPasswordChanged/SuccessPasswordChanged";

const NewPassword = () => {
    const {token} = useParams()
    const dispatch = useAppDispatch()

    const isLoading = useSelector<AppRootStateType>(state => state.forgotPassword.isLoading)

    const newPasswordStatus = useSelector<AppRootStateType, string| undefined>(state => state.forgotPassword.newPasswordStatus)


    const [password, setPassword] = useState('')
    const [error, setError] = useState('')


    const onSendNewPasswordHandler = () => {
        if (password.length < 8) {
            setError('Password must be over 8 characters')
            return
        }
        if (token) dispatch(senNewPasswordTC(password,token))
    }

    if (newPasswordStatus) {
        return <SuccessPasswordChanged/>
    }

    return (
        <div className={s.loginBox}>
            <h1>It-incubator</h1>

            {isLoading ? <Preloader/> :
                <div>
                    <h2>Create new password</h2>
                    <CustomInput error={error} value={password} onChange={(e) =>
                        setPassword(e.currentTarget.value)} password label={'Password'} />

                    <h3>Create new password and we will send you further instructions to email</h3>

                    <button onClick={onSendNewPasswordHandler}>Create new password</button>
                </div>

            }

        </div>
    )}


export default NewPassword;