import {Input, Pagination, Slider, Table} from 'antd';
import React, {ChangeEvent, useEffect, useState} from 'react';
import Header from "../../Header/Header";
import l from './Pack.module.scss'
import 'antd/dist/antd.css';
import {useAppDispatch} from "../../../../m2-bll/store";
import {packsAPI, ResponseCardType} from "../../../../m3-dal/packs-api";
import {PackColumns} from "./PackData";
import {fetchPacksTC, pageChangingAC, setCurrentTabAC} from "../../../../m2-bll/b1-reducers/packs-reducer";
import {useTypedSelector} from "../../../../../n3-hooks/useTypedSelector";


const Packs = () => {

    const dispatch = useAppDispatch()
    const cardPacks = useTypedSelector<ResponseCardType[]>(state => state.cardPacks.cardPacks
        .map(m => ({...m, updated: new Date(m.updated).toLocaleDateString("ru-RU")})))

    const {cardPacksTotalCount, pageCount, page, togglePacks}  = useTypedSelector(state => state.cardPacks)


    //switching cardPacks
    // const [showPackListToggle, setShowPackListToggle] = useState(false)

    //gets myID from Profile
    const {id} = useTypedSelector(state => state.profile)

    //sets settings on double slider
    const [minMax, setMinMax] = useState<number[]>([0,50])

    // Input search State
    const [searchText, setSearchText] = useState<string>('')


    // isLoading Table of Packs
    const [loader, setLoader] = useState(false)

    useEffect(() => {
        //delay search on 1 second after stop typing in input search
        const delayDebounceFn = setTimeout(() => {
            setLoader(true)
            const getPacks = async () => {
                // if toggled "My" - fetching userID from Profile, if "All" - fetching '' instead id
                const setUserId =  togglePacks === 'my' ? id : ''
                await dispatch(fetchPacksTC(minMax[0], minMax[1], searchText, setUserId))
                //always back on first page, coz on others pages search result not shows
                setLoader(false)
            }
            getPacks()
        }, 1000)

        return () => clearTimeout(delayDebounceFn)
    },[minMax, searchText, pageCount, page, togglePacks])


    // settings of DoubleSlider
    const onChangeMinMaxSliderValue = (sliderValues:number[]) => setMinMax(sliderValues)

    const onSearchInputHandler  = (e: ChangeEvent<HTMLInputElement>) =>setSearchText(e.currentTarget.value)

    // toggl "my" and "all" tabs
    const setAllPacks = () => {
        dispatch(setCurrentTabAC('all'))
    }

    const setMyPacks = () => {
        dispatch(setCurrentTabAC('my'))
    }

    return (
        <div>
            <nav>
                <Header/>
            </nav>

            <div className={l.modalBox}>
                <div className={l.leftSideContainer}>
                    <div className={l.leftSideContentBox}>
                        <h3>Show packs cards</h3>
                        <div className={l.buttonGroup}>
                            <button onClick={setMyPacks}
                                    className={togglePacks === 'my' ? `${l.tabButton} ${l.active}` : `${l.tabButton}`}>My</button>
                            <button onClick={setAllPacks}
                                    className={togglePacks === 'all' ? `${l.tabButton} ${l.active}` : `${l.tabButton}`}>All</button>
                        </div>

                        <h3>Number of cards</h3>
                        <div>
                            <Slider className={l.sliderStyle} onChange={onChangeMinMaxSliderValue} range defaultValue={[minMax[0],minMax[1]]} disabled={false} />
                        </div>
                    </div>
                </div>

                <div className={l.rightSideContainer}>

                    <h2 style={{textAlign:'left'}}>Packs List</h2>
                    <div className={l.searchBlock}>
                        <Input value={searchText} onChange={onSearchInputHandler}
                               placeholder={"Search by Name..."} className={l.inputSearch}/>
                        <button onClick={() => packsAPI.addCardPack()}>Add new pack</button>
                    </div>
                    <div className={l.tableBlock}>
                        <div className={l.tableStyle}>
                            <Table loading={loader}  style={{ minWidth: '900px' }} columns={PackColumns}
                                   className={l.booking_information_table}
                                   dataSource={cardPacks} pagination={false}/>



                        </div>
                        <Pagination onChange={(page, pageSize1) => {
                            dispatch(pageChangingAC(page, pageSize1))}}
                                    current={page}   showSizeChanger pageSizeOptions={[5,10,25]}
                                    pageSize={pageCount} total={cardPacksTotalCount}/>;
                    </div>
                </div>
            </div>
        </div>
    );
};

export default Packs;