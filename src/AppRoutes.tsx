import {Navigate, Route, Routes} from "react-router-dom";
import {Login} from "./n1-main/m1-ui/u2-components/Login/Login";
import {Register} from "./n1-main/m1-ui/u2-components/Register/Register";
import {Profile} from "./n1-main/m1-ui/u2-components/Profile/Profile";
import PasswordRecovery from "./n2-features/f1-PasswordRecovery/PasswordRecovery";
import React from "react";
import PackList from "./n1-main/m1-ui/u2-components/PackLisst/PackList";

export const PATH = {
    LOGIN: '/login',
    REGISTRATION: '/registration',
    PROFILE: '/profile',
    RECOVERY_PASSWORD: '/forgot_pass',
    PACKS: '/packlist',
    NEW_PASSWORD: '/new_pass',
    // ERROR_404: '/404',
    // TEST: '/test',
    // CARDS: '/cards',
    // TRAIN: '/train'
}

export const AppRoutes = () => {
    return (
        <Routes>
            <Route path={'/'} element={<Navigate to={PATH.LOGIN}/>}/>
            <Route path={PATH.LOGIN} element={<Login/>}/>
            <Route path={PATH.REGISTRATION} element={<Register/>}/>
            <Route path={PATH.PROFILE} element={<Profile/>}/>
            <Route path={PATH.RECOVERY_PASSWORD} element={<PasswordRecovery/>}/>
            <Route path={PATH.PACKS} element={<PackList/>}/>

        </Routes>
    )
}