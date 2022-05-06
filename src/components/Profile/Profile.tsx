import React, {memo} from 'react';
import {useDispatch, useSelector} from "react-redux";
import {AppRootStateType} from "../../store/store";
import {Navigate} from "react-router-dom";
import {useFormik} from "formik";
import l from './Profile.module.scss';
import onLoadAvatarIcon from '../../common/icons/onLoadAvatar.svg'
import {changeProfileInfoTC, logoutTC} from "../../store/profile-reducer";
import Header from '../Header/Header';
import {profileValidate} from "../../validators/validators";
import CustomInput from '../../common/CustomInput/CustomInput';


export const Profile = memo(() => {
    const dispatch = useDispatch()

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
            dispatch(changeProfileInfoTC(values.name) as any)
        }
    })

    const onLogoutHandler = () => {
        dispatch(logoutTC() as any)
    }


    if (!isLoggedIn) {
        return <Navigate to={'/'}/>
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
})
