import {Navigate, Route, Routes} from "react-router-dom";
import {Login} from "./Auth/a2-Login/Login";
import {Register} from "./Auth/a1-Register/Register";
import {Profile} from "./Content/f1-Profile/Profile";
import PasswordRecovery from "./Auth/a3-PasswordRecovery/PasswordRecovery";
import React from "react";
import Packs from "./Content/f2-CardPacks/Packs";
import Card from "./Content/f3-Card/Card";
import NewPassword from "./Auth/a3-PasswordRecovery/p3-NewPassword/NewPassword";

export const PATH = {
    LOGIN: '/login',
    REGISTRATION: '/registration',
    PROFILE: '/profile',
    RECOVERY_PASSWORD: '/forgot_pass',
    PACKS: '/packlist',
    NEW_PASSWORD: '/new_pass/:token',
    // ERROR_404: '/404',
    // TEST: '/test',
    CARDS: '/packlist/cards/:id',
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
            <Route path={PATH.NEW_PASSWORD} element={<NewPassword/>}/>
            <Route path={PATH.PACKS} element={<Packs/>}/>
            <Route path={PATH.CARDS} element={<Card/>}/>



        </Routes>
    )
}