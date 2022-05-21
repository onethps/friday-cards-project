import React, { FC, ReactElement } from 'react';

import { NavLink } from 'react-router-dom';

import packListIcon from 'assets/icons/headerIconsTabs/packListIcon.svg';
import profileIcon from 'assets/icons/headerIconsTabs/profileIcon.svg';
import { PATH } from 'components/AppRoutes';

import l from 'components/Header/Header.module.scss';

const Header = (): ReactElement => (
  <header className={l.headerBox}>
    <div>
      <h2 className={l.logo}>It Incubator</h2>
    </div>

    <nav className={l.nav}>
      <NavLink
        to={PATH.PACKS}
        className={({ isActive }) => (isActive ? l.active : l.inactive)}
      >
        <img className={l.iconStyle} src={packListIcon} />
        Pack List
      </NavLink>

      <NavLink
        to={PATH.PROFILE}
        className={({ isActive }) => (isActive ? l.active : l.inactive)}
      >
        <img src={profileIcon} />
        Profile
      </NavLink>
    </nav>
  </header>
);

export default Header;
