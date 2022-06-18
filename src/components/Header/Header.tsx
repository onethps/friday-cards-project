import React, { ReactElement } from 'react';

import { Link, NavLink, useLocation, useParams } from 'react-router-dom';

import packListIcon from 'assets/icons/headerIconsTabs/packListIcon.svg';
import profileIcon from 'assets/icons/headerIconsTabs/profileIcon.svg';
import { PATH } from 'components/AppRoutes';
import l from 'components/Header/Header.module.scss';

const Header = (): ReactElement => {

  const location = useLocation()
  const activeTabStyle = location.pathname.includes('packlist') ? l.active : l.inactive

  return(
    <header className={l.headerBox}>
      <div>
        <h2 className={l.logo}><Link to={'/packlist/all'}>It Incubator</Link></h2>
      </div>

      <nav className={l.nav}>
        <NavLink
          to={'/packlist/' + 'all'}
          className={activeTabStyle}
        >
          <img className={l.iconStyle} src={packListIcon}/>
          Pack List
        </NavLink>

        <NavLink
          to={PATH.PROFILE}
          className={({isActive}) => (isActive ? l.active : l.inactive)}
        >
          <img src={profileIcon}/>
          Profile
        </NavLink>
      </nav>
    </header>
  )
};

export default Header;
