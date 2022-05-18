import React, {useEffect, useState} from 'react';
import {useAppDispatch} from "../../../../m2-bll/store";
import {Navigate} from "react-router-dom";
import {useFormik} from "formik";
import l from './Profile.module.scss';
import onLoadAvatarIcon from '../../../../../assets/icons/onLoadAvatar.svg'
import {changeMessageStatusAC, changeProfileInfoTC, logoutTC} from "../../../../m2-bll/b1-reducers/profile-reducer";
import Header from '../../Header/Header';
import {profileValidate} from "../../../../m4-utils/validators/validators";
import CustomInput from '../../../u1-common/c1-CustomInput/CustomInput';
import {PATH} from "../../AppRoutes";
import Preloader from "../../../u1-common/c2-Preloader/Preloader";
import {useTypedSelector} from "../../../../../n3-hooks/useTypedSelector";
import Modal from "../../../../../n2-features/f3-modal/Modal";
import DialogModalContainer from "../../../u1-common/DialogModalContainer/DialogModalContainer";


export const Profile = () => {
    const dispatch = useAppDispatch()

    let isLoggedIn = useTypedSelector(state => state.login.isLoggedIn)
    let profileName = useTypedSelector(state => state.profile.name)
    let profileEmail = useTypedSelector(state => state.profile.email)
    let loadingStatus = useTypedSelector(state => state.profile.status)
    let changeMessageStatus = useTypedSelector(state => state.profile.changeMessageStatus)
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

    useEffect(() => {
        setTimeout(() => {
            dispatch(changeMessageStatusAC(''))
        }, 2000)
    }, [changeMessageStatus])



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


            {loadingStatus === 'loading' ? <div style={{marginTop: '45%'}}><Preloader/></div> : < form onSubmit={formik.handleSubmit}>
                <CustomInput
                    label={'Name'} {...formik.getFieldProps('name')}
                    error={formik.touched.name && formik.errors.name ? formik.errors.name : ''}/>
                <CustomInput label={'Email'} {...formik.getFieldProps('email')}
                             error={formik.touched.email && formik.errors.email ? formik.errors.email : ''}/>
                <div style={{height: '50px'}}>
                    <h3 style={{color: 'green'}}>{changeMessageStatus}</h3>
                </div>
                <div className={l.buttonBlock}>
                    <a onClick={onLogoutHandler}  className={l.backToLoginLink}>Log Out</a>
                    <button className={l.submitButton} type="submit">Save</button>
                </div>
            </form>
            }

        </div>
    </>
}