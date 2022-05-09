import React from 'react';
import l from './Header.module.scss'
import {NavLink} from "react-router-dom";
import profileIcon from '../../../../assets/icons/headerIconsTabs/profileIcon.svg'
import packListIcon from '../../../../assets/icons/headerIconsTabs/packListIcon.svg'
import {PATH} from "../../../../AppRoutes";

const Header = () => {
    return (
        <header className={l.headerBox}>
            <div>
                <h2 className={l.logo}>It Incubator</h2>
            </div>

            <nav className={l.nav}>

                <NavLink to={PATH.PACKS}
                         className={({ isActive }) => (isActive ? l.active : l.inactive)}>
                    <img className={l.iconStyle} src={packListIcon}/>Pack List</NavLink>

                <NavLink to={PATH.PROFILE}
                         className={({ isActive }) => (isActive ? l.active : l.inactive)}>
                    <img src={profileIcon}/>Profile</NavLink>


            </nav>

        </header>
    );
};

export default Header;