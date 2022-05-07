import React, {useEffect} from 'react';
import './App.css';
import {useDispatch, useSelector} from "react-redux";
import {initializeAppTC} from "./store/app-reducer";
import {AppRootStateType} from "./store/store";
import Preloader from "./common/preloader/Preloader";
import {AppRoutes} from "./AppRoutes";


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
            <AppRoutes/>
        </div>
    );
}

export default App;
