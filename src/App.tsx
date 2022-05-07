import React, {useEffect} from 'react';
import './App.scss';
import {useDispatch, useSelector} from "react-redux";
import {initializeAppTC} from "./n1-main/m2-bll/b1-reducers/app-reducer";
import {AppRootStateType} from "./n1-main/m2-bll/store";
import Preloader from "./n1-main/m1-ui/u1-common/c2-Preloader/Preloader";
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
