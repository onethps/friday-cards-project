import React, { FC } from 'react';

import { Navigate, Route, Routes } from 'react-router-dom';

import { Register } from 'components/Auth/Register/Register';
import { Login } from 'components/Auth/Login/Login';
import NewPassword from 'components/Auth/PasswordRecovery/NewPassword/NewPassword';
import PasswordRecovery from 'components/Auth/PasswordRecovery/PasswordRecovery';
import { Profile } from 'components/Content/f1-Profile/Profile';
import Packs from 'components/Content/f2-Packs/Packs';
import Card from 'components/Content/f3-Card/Card';

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
  </Routes>
);
