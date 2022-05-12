import {Input, Pagination, Slider, Table} from 'antd';
import React, {useEffect, useState} from 'react';
import Header from "../../Header/Header";
import l from './CardPack.module.scss'
import 'antd/dist/antd.css';
import {useAppDispatch} from "../../../../m2-bll/store";
import {packsAPI, ResponseCardType} from "../../../../m3-dal/packs-api";
import {PackColumns} from "./tablePackData";
import {setCardPacksAC} from "./card-packs-reducer";
import {useTypedSelector} from "../../../../../n3-hooks/useTypedSelector";


const CardPacks = () => {
    const dispatch = useAppDispatch()
    const cardPacks = useTypedSelector<ResponseCardType[]>(state => state.cardPacks.cardPacks
        .map(m => ({...m, updated: new Date(m.updated).toLocaleDateString("ru-RU")})))


    const [currentPage, setCurrentPage] = useState(1)
    const [packsPerPage, setPacksPerPage] = useState(5)
    const [minMax, setMinMax] = useState<number[]>([10,50])
    const [searchText, setSearchText] = useState<string>('')



    const [loader, setLoader] = useState(false)

    useEffect(() => {
        const delayDebounceFn = setTimeout(() => {
            setLoader(true)
            const getCards = async () => {
                const dataQueryParams = {min:minMax[0], max:minMax[1], pageCount: 100, packName: searchText}
                setCurrentPage(1)
                const res = await packsAPI.getCardsList(dataQueryParams)
                dispatch(setCardPacksAC(res.data.cardPacks))
                setLoader(false)
            }
            getCards()
        }, 1000)

        return () => clearTimeout(delayDebounceFn)

    },[minMax, searchText])



    const lastCardPackIndex = currentPage * packsPerPage
    const firstCardPackIndex = lastCardPackIndex - packsPerPage
    const currentCardsPack = cardPacks.slice(firstCardPackIndex, lastCardPackIndex)


    const onChangeMinMaxSliderValue = (sliderValues:number[]) => {
        setMinMax(sliderValues)
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
                            <button className={l.myCardsButton}>My</button>
                            <button className={l.allCardsButton}>All</button>
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
                        <Input value={searchText} onChange={(e) => {setSearchText(e.currentTarget.value)}
                        } placeholder={"Search by Name..."} className={l.inputSearch}/>
                        <button>Add new pack</button>
                    </div>
                    <div className={l.tableBlock}>
                        <div className={l.tableStyle}>
                            <Table style={{ minWidth: '900px' }} columns={PackColumns}
                                   loading={loader}  className={l.booking_information_table}
                                   dataSource={currentCardsPack} pagination={false}/>


                        </div>
                        <Pagination onChange={(page, pageSize1) => {
                            setCurrentPage(page)
                            setPacksPerPage(pageSize1)
                        }}  current={currentPage}   showSizeChanger pageSizeOptions={[5,10,25]}
                                    pageSize={packsPerPage} total={cardPacks.length}/>;
                    </div>
                </div>
            </div>
        </div>
    );
};

export default CardPacks;