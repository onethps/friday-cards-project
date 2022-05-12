import React from 'react';
import l from "../../PasswordRecovery.module.scss";
import {NavLink} from "react-router-dom";
import {PATH} from "../../../../AppRoutes";
import {useTypedSelector} from "../../../../../../../n3-hooks/useTypedSelector";

const SuccessPasswordChanged = () => {

    const message = useTypedSelector(state => state.forgotPassword.newPasswordStatus)

    return (
        <div className={l.loginBox}>
            <h1>It-incubator</h1>
            <h2>{message}</h2>

            <h4><NavLink to={PATH.LOGIN}>Back to Login</NavLink></h4>
        </div>
    );
};

export default SuccessPasswordChanged;