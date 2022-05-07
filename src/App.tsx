import React, {useEffect} from 'react';
import './App.scss';
import {useSelector} from "react-redux";
import {AppRootStateType, useAppDispatch} from "./n1-main/m2-bll/store";
import Preloader from "./n1-main/m1-ui/u1-common/c2-Preloader/Preloader";
import {AppRoutes} from "./AppRoutes";
import {initializeAppTC} from "./n1-main/m2-bll/b1-reducers/app-reducer";

const App = () => {

    const dispatch = useAppDispatch();

    let AppLoadingStatus = useSelector<AppRootStateType, string>((state) => state.app.status)

    useEffect(() => {
        dispatch(initializeAppTC())
    }, [])

    if (AppLoadingStatus === 'loading') {
        return (
            <div className='preloaderPosition'>
                <Preloader/>
            </div>
        )
    }

    return (
        <div className='App'>
            <AppRoutes/>
        </div>
    );
}

export default App;
