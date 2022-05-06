import React, {memo, useEffect} from 'react';
import {Navigate, Route, Routes} from 'react-router-dom';
import './App.css';
import {Login} from './components/Login/Login';
import {Profile} from './components/Profile/Profile';
import {Register} from './components/Register/Register';
import {useDispatch, useSelector} from "react-redux";
import {initializeAppTC} from "./store/app-reducer";
import {AppRootStateType} from "./store/store";
import PackList from "./components/PackLisst/PackList";
import ForgotPassword from "./features/forgot-password/ForgotPassword";
import Preloader from "./common/preloader/Preloader";
import {authAPI} from "./api/api";


const App = () => {

    let loadingStatus = useSelector<AppRootStateType, string>((state) => state.app.status)

    const dispatch = useDispatch();

    useEffect(() => {
        dispatch(initializeAppTC() as any)
    }, [])



    if (loadingStatus === 'loading') {
        return (
            <div className='preloaderPosition'>
                <Preloader/>
            </div>
        )
    }

    return (
        <div className='App'>
            <Routes>
                <Route path='/register' element={<Register/>}/>
                <Route path='/profile' element={<Profile/>}/>
                <Route path={'/login'} element={<Login/>}/>
                <Route path={'/packlist'} element={<PackList/>}/>
                <Route path={'/forgot'} element={<ForgotPassword/>}/>
                <Route path={'/'} element={<Navigate to={'/login'}/>}/>
            </Routes>
        </div>
    );
}

export default App;
