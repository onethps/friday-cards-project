import {Input, Pagination, Slider, Table} from 'antd';
import React, {useEffect, useState} from 'react';
import Header from "../../n1-main/m1-ui/u2-components/Header/Header";
import l from './PackList.module.scss'
import 'antd/dist/antd.css';
import {cardsAPI} from "../../n1-main/m3-dal/api";
import {AppRootStateType, useAppDispatch} from "../../n1-main/m2-bll/store";
import {setCardPacksAC} from "../../n1-main/m2-bll/b1-reducers/card-packs-reducer";
import {useSelector} from "react-redux";
import Search from "antd/es/input/Search";
import TableButtonActions from "./TableActions/TableButtonActions";


const PackList = () => {
    const dispatch = useAppDispatch()

    const cardPacks = useSelector<AppRootStateType, any[]>(state => state.cardPacks.cardPacks)

    const [currentPage, setCurrentPage] = useState(1)
    const [packsPerPage, setPacksPerPage] = useState(5)
    const [minMax, setMinMax] = useState<number[]>([0,20])
    const [searchText, setSearchText] = useState<string>('')



    const [loader, setLoader] = useState(false)

    useEffect(() => {

        const delayDebounceFn = setTimeout(() => {
            setLoader(true)
            const getCards = async () => {
                const res = await cardsAPI.getCardsList({min:minMax[0], max:minMax[1], pageCount: 100,
                    packName: searchText
                })
                dispatch(setCardPacksAC(res.data.cardPacks))
                setLoader(false)
            }
            getCards()
        }, 500)

        return () => clearTimeout(delayDebounceFn)

    },[minMax, searchText])




    const lastCardPackIndex = currentPage * packsPerPage
    const firstCardPackIndex = lastCardPackIndex - packsPerPage
    const currentCardsPack = cardPacks.slice(firstCardPackIndex, lastCardPackIndex)


    const onChangeMinMaxSliderValue = (sliderValues:number[]) => {
        setMinMax(sliderValues)
    }


    return (

        <div style={{marginBottom: '200px'}}>
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
                            <Slider className={l.sliderStyle} onChange={onChangeMinMaxSliderValue} range defaultValue={[20,50]} disabled={false} />
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
                            <Table style={{ minWidth: '900px' }} loading={loader}  className={l.booking_information_table} dataSource={currentCardsPack} pagination={false}>
                                <Table.Column title={'Created By'} dataIndex={'user_name'} key={'1'} />
                                <Table.Column title={'Name'} dataIndex={'name'} key={'2'} />
                                <Table.Column title={'CardsCount'} dataIndex={'cardsCount'} key={'4'} />
                                <Table.Column title={'LAST UPDATE'} dataIndex={'updated'} key={'5'} />
                                <Table.Column title={'Actions'} dataIndex={'actions'} render={() => <TableButtonActions/>} key={'6'} />

                            </Table>
                        </div>
                        <Pagination onChange={(page, pageSize1) => {
                            setCurrentPage(page)
                            setPacksPerPage(pageSize1)
                        }}  current={currentPage}   showSizeChanger pageSizeOptions={[5,10,25]} pageSize={packsPerPage} total={cardPacks.length}/>;
                    </div>
                </div>
            </div>
        </div>
    );
};

export default PackList;