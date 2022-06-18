import React, { FC } from 'react';

import { Navigate, Route, Routes } from 'react-router-dom';

import { Login } from 'components/Auth/Login/Login';
import NewPassword from 'components/Auth/PasswordRecovery/NewPassword/NewPassword';
import PasswordRecovery from 'components/Auth/PasswordRecovery/PasswordRecovery';
import { Register } from 'components/Auth/Register/Register';
import Card from 'components/Content/Card/Card';
import Packs from 'components/Content/Packs/Packs';
import { EditProfile } from 'components/Content/Profile/EditProfile/EditProfile';
import Train from "components/Content/Train/Train";
import Profile from "components/Content/Profile/Profile";

export const PATH = {
  LOGIN: '/login',
  REGISTRATION: '/registration',
  PROFILE: '/profile',
  USER_PROFILE: '/profile/:id',
  RECOVERY_PASSWORD: '/forgot_pass',
  PACKS: '/packlist/:category',
  NEW_PASSWORD: '/new_pass/:token',
  CARDS: '/packlist/cards/:id',
  TRAIN: '/packlist/train/:id'
};

export const AppRoutes: FC = () => {
  return (
    <>
      <Routes>
        <Route path="/" element={<Navigate to={PATH.LOGIN}/>}/>
        <Route path={PATH.REGISTRATION} element={<Register/>}/>
        <Route path={PATH.RECOVERY_PASSWORD} element={<PasswordRecovery/>}/>
        <Route path={PATH.NEW_PASSWORD} element={<NewPassword/>}/>
        <Route path={PATH.PACKS} element={<Packs/>}/>
        <Route path={PATH.CARDS} element={<Card/>}/>
        <Route path={PATH.TRAIN} element={<Train/>}/>
        <Route path={PATH.PROFILE} element={<Profile/>}/>
        <Route path={PATH.USER_PROFILE} element={<EditProfile/>}/>
        <Route path={PATH.LOGIN} element={<Login/>}/>
        <Route path={'*'} element={<div>Error 404</div>}/>
      </Routes>

    </>



  )
};
