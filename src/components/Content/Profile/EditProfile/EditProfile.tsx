import React, { ChangeEvent, FC, useEffect, useRef, useState } from 'react';

import { useFormik } from 'formik';
import { Navigate } from 'react-router-dom';

import onLoadAvatarIcon from 'assets/icons/onLoadAvatar.svg';
import CustomInput from 'common/CustomInput/CustomInput';
import Preloader from 'common/Preloader/Preloader';
import { PATH } from 'components/AppRoutes';
import Header from 'components/Header/Header';

import s from 'components/Content/Profile/EditProfile/EditProfile.module.scss';

import { useAppDispatch } from 'store/store';
import { profileValidate } from 'utils/validators/validators';
import { useTypedSelector } from 'hooks/useTypedSelector';
import { logoutTC } from "store/middlewares/auth";
import { changeProfileInfoTC } from "store/middlewares/changeProfile";
import { changeMessageStatusAC } from "store/actions/profile";


const DEBOUNCE_DELAY = 2000;
const FIRST_INDEX = 0;

export const EditProfile: FC = () => {
  const dispatch = useAppDispatch();

  const isLoggedIn = useTypedSelector(state => state.login.isLoggedIn);
  const profileName = useTypedSelector(state => state.profile.name);
  const profileEmail = useTypedSelector(state => state.profile.email);
  const loadingStatus = useTypedSelector(state => state.profile.status);
  const changeMessageStatus = useTypedSelector(state => state.profile.changeMessageStatus,);
  const avatar = useTypedSelector(state => state.profile.avatar);

  const inRef = useRef<HTMLInputElement>(null)
  const [file64, setFile64] = useState<string | ArrayBuffer | null>();


  useEffect(() => {
    const delayDebounceFn = setTimeout(() => {
      dispatch(changeMessageStatusAC(''));
    }, DEBOUNCE_DELAY);
    return () => clearTimeout(delayDebounceFn)
  }, [changeMessageStatus]);

  useEffect(() => {
    if (file64) {
      dispatch(changeProfileInfoTC(profileName, file64))
    }
  }, [file64])


  const upload = (e: ChangeEvent<HTMLInputElement>) => {
    const reader = new FileReader();
    const newFile = e.target.files && e.target.files[0] as any;
    reader.readAsDataURL(newFile);
    reader.onloadend = () => {
      setFile64(reader.result);
    }
  }


  const getEmailName = profileName!.includes('@')
    ? profileName!.split('@')[FIRST_INDEX]
    : profileName;

  const formik = useFormik({
    initialValues: {
      email: profileEmail,
      name: getEmailName,
    },
    validate: profileValidate,
    onSubmit: values => {
      dispatch(changeProfileInfoTC(values.name, ''));
    },
  });

  const onLogoutHandler = (): void => {
    dispatch(logoutTC());
  };

  if (!isLoggedIn) {
    return <Navigate to={PATH.LOGIN}/>;
  }

  return (
    <>
      <Header/>

      <div className={s.loginBox}>
        <h2> Personal information</h2>
        <div className={s.avatarBlock}>
          <img
            className={s.avatar}
            src={avatar ? avatar : "https://i.pinimg.com/originals/ff/a0/9a/ffa09aec412db3f54deadf1b3781de2a.png"}
          />
          <img onClick={() => inRef && inRef.current && inRef.current.click()}
               className={s.loadAvatar} alt="loadAvatarIcon" src={onLoadAvatarIcon}/>
          <input ref={inRef} type={'file'} style={{display: 'none'}} onChange={upload}/>
        </div>

        {loadingStatus === 'loading' ? (
          <div style={{marginTop: '45%'}}>
            <Preloader/>
          </div>
        ) : (
          <form onSubmit={formik.handleSubmit}>
            <CustomInput
              label="Name"
              {...formik.getFieldProps('name')}
              error={formik.touched.name && formik.errors.name ? formik.errors.name : ''}
            />
            <CustomInput
              label="Email"
              {...formik.getFieldProps('email')}
              error={
                formik.touched.email && formik.errors.email ? formik.errors.email : ''
              }
            />
            <div style={{height: '50px'}}>
              <h3 style={{color: 'green'}}>{changeMessageStatus}</h3>
            </div>
            <div className={s.buttonBlock}>
              <a onClick={onLogoutHandler} className={s.backToLoginLink}>
                Log Out
              </a>
              <button className={s.submitButton} type="submit">
                Save
              </button>
            </div>
          </form>
        )}
      </div>
    </>
  );
}
