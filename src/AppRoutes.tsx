import {Navigate, Route, Routes} from "react-router-dom";
import {Login} from "./components/Login/Login";
import {Register} from "./components/Register/Register";
import {Profile} from "./components/Profile/Profile";
import ForgotPassword from "./features/forgot-password/ForgotPassword";
import React from "react";
import PackList from "./components/PackLisst/PackList";

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
            <Route path={PATH.RECOVERY_PASSWORD} element={<ForgotPassword/>}/>
            <Route path={PATH.PACKS} element={<PackList/>}/>

        </Routes>
    )
}