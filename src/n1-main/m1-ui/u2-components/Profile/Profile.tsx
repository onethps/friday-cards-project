import React, {useEffect} from 'react';
import {useSelector} from "react-redux";
import {AppRootStateType, useAppDispatch} from "../../../m2-bll/store";
import {Navigate} from "react-router-dom";
import {useFormik} from "formik";
import l from './Profile.module.scss';
import onLoadAvatarIcon from '../../../../assets/icons/onLoadAvatar.svg'
import {changeProfileInfoTC, logoutTC} from "../../../m2-bll/b1-reducers/profile-reducer";
import Header from '../Header/Header';
import {profileValidate} from "../../../m4-utils/validators/validators";
import CustomInput from '../../u1-common/c1-CustomInput/CustomInput';
import {authAPI} from "../../../m3-dal/auth-api";
import {PATH} from "../../../../AppRoutes";


export const Profile = () => {
    const dispatch = useAppDispatch()

    let isLoggedIn = useSelector<AppRootStateType, boolean>(state => state.login.isLoggedIn)
    let profileName = useSelector<AppRootStateType, string>(state => state.profile.name)
    let profileEmail = useSelector<AppRootStateType, string>(state => state.profile.email)

    //takes name from email
    let getEmailName = profileName!.includes('@') ? profileName!.split('@')[0] : profileName

    const formik = useFormik( {
        initialValues:  {
            email: profileEmail,
            name:getEmailName,
        },
        validate: profileValidate,
        onSubmit: values => {
            dispatch(changeProfileInfoTC(values.name))
        }
    })

    const onLogoutHandler = () => {
        dispatch(logoutTC())
    }


    if (!isLoggedIn) {
        return <Navigate to={PATH.LOGIN}/>
    }

    return <>
        <Header/>
          <div className={l.loginBox}>
            <h2> Personal information</h2>
            <div className={l.avatarBlock}>
                <img className={l.avatar}
                     src={'https://i.pinimg.com/originals/ff/a0/9a/ffa09aec412db3f54deadf1b3781de2a.png'}/>
                <img className={l.loadAvatar} alt={'loadAvatarIcon'} src={onLoadAvatarIcon} />
            </div>

            <form onSubmit={formik.handleSubmit}>

                <CustomInput
                    label={'Name'} {...formik.getFieldProps('name')}
                    error={formik.touched.name && formik.errors.name ? formik.errors.name : ''}/>

                <CustomInput label={'Email'} {...formik.getFieldProps('email')}
                             error={formik.touched.email && formik.errors.email ? formik.errors.email : ''}/>

                <div className={l.buttonBlock}>
                    <a onClick={onLogoutHandler}  className={l.backToLoginLink}>Log Out</a>
                    <button className={l.submitButton} type="submit">Save</button>
                </div>


            </form>


        </div>
    </>
}