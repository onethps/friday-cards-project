import React from 'react';
import l from "../PasswordRecovery.module.scss";
import sendMsgImg from '../../../assets/icons/send-message.svg'
import {useSelector} from "react-redux";
import {AppRootStateType} from "../../../n1-main/m2-bll/store";

const SuccessMessage = () => {

    const email =  useSelector<AppRootStateType, string | undefined>(state => state.forgotPassword.email)


    return (
        <div className={l.loginBox}>
            <h1>It-incubator</h1>
            <img src={sendMsgImg}/>
            <h2>Check Email</h2>
            <h3 style={{textAlign: 'center'}}>We’ve sent an Email with instructions to {email}</h3>
        </div>
    );
};

export default SuccessMessage;