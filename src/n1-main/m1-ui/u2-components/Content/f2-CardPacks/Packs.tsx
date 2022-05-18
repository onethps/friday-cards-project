import {Input, Pagination, Slider, Table} from 'antd';
import React, {ChangeEvent, useEffect, useState} from 'react';
import Header from "../../Header/Header";
import l from './Pack.module.scss'
import 'antd/dist/antd.css';
import {useAppDispatch} from "../../../../m2-bll/store";
import {packsAPI, ResponseCardType} from "../../../../m3-dal/packs-api";
import {PackColumns} from "./PackData";
import {fetchPacks, setCardPacksAC, setCurrentTabAC} from "../../../../m2-bll/b1-reducers/packs-reducer";
import {useTypedSelector} from "../../../../../n3-hooks/useTypedSelector";


const Packs = () => {
    const dispatch = useAppDispatch()
    const cardPacks = useTypedSelector<ResponseCardType[]>(state => state.cardPacks.cardPacks
        .map(m => ({...m, updated: new Date(m.updated).toLocaleDateString("ru-RU")})))

    const {cardPacksTotalCount, togglePacks, loading}  = useTypedSelector(state => state.cardPacks)

    //gets myID from Profile
    const {id} = useTypedSelector(state => state.profile)

    //sets settings on double slider
    const [minMax, setMinMax] = useState<number[]>([0,50])

    // Input search State
    const [searchText, setSearchText] = useState<string>('')


    const [currentPage, setCurrentPage] = useState(1)
    const [pageCount, setPageCount] = useState(5)


    useEffect(  () => {
        const switchTab = togglePacks === "my" ? id : ''
        dispatch(fetchPacks(minMax[0], minMax[1], currentPage, pageCount, switchTab))
    }, [togglePacks, currentPage, pageCount])




    // settings of DoubleSlider
    const onChangeMinMaxSliderValue = (sliderValues:number[]) => setMinMax(sliderValues)

    const onSearchInputHandler  = (e: ChangeEvent<HTMLInputElement>) =>setSearchText(e.currentTarget.value)

    // toggl "my" and "all" tabs
    const setAllPacks = () => {
        dispatch(setCurrentTabAC('all'))
        // dispatch(fetchPacksTC(minCardsCount, maxCardsCount, ''))
    }

    const setMyPacks = () => {
        dispatch(setCurrentTabAC('my'))
        // dispatch(fetchMyPacks(id))
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
                            <Table loading={loading === 'loading'}  style={{ minWidth: '900px' }} columns={PackColumns}
                                   className={l.booking_information_table}
                                   dataSource={cardPacks} pagination={false}/>



                        </div>
                        <Pagination onChange={(page, pageSize1) => {
                            setCurrentPage(page)
                            setPageCount(pageSize1)
                        }}
                                    current={currentPage}   showSizeChanger pageSizeOptions={[5,10,25]}
                                    pageSize={pageCount} total={cardPacksTotalCount}/>;
                    </div>
                </div>
            </div>
        </div>
    );
};

export default Packs;