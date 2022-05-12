import React, {useState} from 'react';
import s from './NewPassword.module.scss'
import CustomInput from "../../../../u1-common/c1-CustomInput/CustomInput";
import {senNewPasswordTC} from "../../../../../m2-bll/b1-reducers/forgot-password-reducer";
import {useParams} from "react-router-dom";
import {useAppDispatch} from "../../../../../m2-bll/store";
import Preloader from "../../../../u1-common/c2-Preloader/Preloader";
import SuccessPasswordChanged from "./n1-SuccessPasswordChanged/SuccessPasswordChanged";
import {useTypedSelector} from "../../../../../../n3-hooks/useTypedSelector";

const NewPassword = () => {
    const {token} = useParams()
    const dispatch = useAppDispatch()

    const isLoading = useTypedSelector(state => state.forgotPassword.isLoading)
    const newPasswordStatus = useTypedSelector(state => state.forgotPassword.newPasswordStatus)


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