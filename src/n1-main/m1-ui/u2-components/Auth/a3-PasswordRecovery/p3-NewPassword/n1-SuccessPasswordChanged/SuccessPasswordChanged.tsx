import React from 'react';
import l from "../../PasswordRecovery.module.scss";
import {NavLink} from "react-router-dom";
import {PATH} from "../../../../../../../AppRoutes";
import {useSelector} from "react-redux";
import {AppRootStateType} from "../../../../../../m2-bll/store";

const SuccessPasswordChanged = () => {

    const message = useSelector<AppRootStateType, string | undefined>(state => state.forgotPassword.newPasswordStatus)

    return (
        <div className={l.loginBox}>
            <h1>It-incubator</h1>
            <h2>{message}</h2>

            <h4><NavLink to={PATH.LOGIN}>Back to Login</NavLink></h4>
        </div>
    );
};

export default SuccessPasswordChanged;