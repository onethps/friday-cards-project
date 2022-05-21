import React from 'react';
import l from "components/Auth/PasswordRecovery/PasswordRecovery.module.scss";
import sendMsgImg from 'assets/icons/send-message.svg'
import {useTypedSelector} from "hooks/useTypedSelector";

const SuccessMessage = () => {

    const email =  useTypedSelector(state => state.forgotPassword.email)


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