import React, { FC } from 'react';

import { Navigate, Route, Routes } from 'react-router-dom';

import { Login } from 'components/Auth/Login/Login';
import NewPassword from 'components/Auth/PasswordRecovery/NewPassword/NewPassword';
import PasswordRecovery from 'components/Auth/PasswordRecovery/PasswordRecovery';
import { Register } from 'components/Auth/Register/Register';
import Card from 'components/Content/Card/Card';
import Packs from 'components/Content/Packs/Packs';
import { Profile } from 'components/Content/Profile/Profile';
import Train from "components/Content/Train";

export const PATH = {
  LOGIN: '/login',
  REGISTRATION: '/registration',
  PROFILE: '/profile',
  RECOVERY_PASSWORD: '/forgot_pass',
  PACKS: '/packlist/:category',
  NEW_PASSWORD: '/new_pass/:token',
  // ERROR_404: '/404',
  // TEST: '/test',
  CARDS: '/packlist/cards/:id',
  TRAIN: '/packlist/train/:id'
};

export const AppRoutes: FC = () => (
  <Routes>
    <Route path="/" element={<Navigate to={PATH.LOGIN} />} />
    <Route path={PATH.LOGIN} element={<Login />} />
    <Route path={PATH.REGISTRATION} element={<Register />} />
    <Route path={PATH.PROFILE} element={<Profile />} />
    <Route path={PATH.RECOVERY_PASSWORD} element={<PasswordRecovery />} />
    <Route path={PATH.NEW_PASSWORD} element={<NewPassword />} />
    <Route path={PATH.PACKS} element={<Packs />} />
    <Route path={PATH.CARDS} element={<Card />} />
    <Route path={PATH.TRAIN} element={<Train />} />
  </Routes>
);
