import {Button, Input, Pagination, Slider, Space, Table, Typography} from 'antd';
import React, {useEffect, useState} from 'react';
import Header from "../../n1-main/m1-ui/u2-components/Header/Header";
import l from './PackList.module.scss'
import 'antd/dist/antd.css';
import {cardsAPI} from "../../n1-main/m3-dal/api";
import {AppRootStateType, useAppDispatch} from "../../n1-main/m2-bll/store";
import {setCardPacksAC} from "../../n1-main/m2-bll/b1-reducers/card-packs-reducer";
import {useSelector} from "react-redux";
import Search from "antd/es/input/Search";
import Preloader from "../../n1-main/m1-ui/u1-common/c2-Preloader/Preloader";


const PackList = () => {
    const dispatch = useAppDispatch()

    const cardPacks = useSelector<AppRootStateType, any[]>(state => state.cardPacks.cardPacks)

    const [currentPage, setCurrentPage] = useState(1)
    const [packsPerPage, setPacksPerPage] = useState(5)
    let [minMax, setMinMax] = useState<number[]>([0,20])

    const [loader, setLoader] = useState(true)

    useEffect(() => {

        const getCards = async () => {
            const res = await cardsAPI.getCardsList(currentPage, 100, minMax)
            dispatch(setCardPacksAC(res.data.cardPacks))
            setLoader(false)
        }

        getCards()
    },[minMax])



    const lastCardPackIndex = currentPage * packsPerPage
    const firstCardPackIndex = lastCardPackIndex - packsPerPage
    const currentCardsPack = cardPacks.slice(firstCardPackIndex, lastCardPackIndex)



    const columns = [
        {
            title: 'Created By',
            dataIndex: 'user_name',
            key: 'user_name',
            render:(user_name:string,) => (
                <div style={{ textAlign:'center', width:'200px'}}>
                    <Typography.Text style={{ fontSize: '16px' }}>
                        {user_name}
                    </Typography.Text>
                </div>
            )
        },
        {
            title: 'LAST UPDATE',
            dataIndex: 'updated',
            key: 'updated',
            render:(updated:string) => (
                <div style={{ textAlign:'center', width:'150px'}}>
                    <Typography.Text style={{ fontSize: '16px' }}>
                        {updated}
                    </Typography.Text>
                </div>
            )
        },
        {
            title: 'CARDS COUNT',
            dataIndex: 'cardsCount',
            key: '1',
            render:(cardsCount:string) => (
                <div style={{ textAlign:'center', width:'50px'}}>
                    <Typography.Text style={{ fontSize: '16px' }}>
                        {cardsCount}
                    </Typography.Text>
                </div>
            )
        },
        {
            title: 'Name',
            dataIndex: 'name',
            key: '2',
            render:(name:string) => (
                <div style={{ textAlign:'center', width:'150px'}}>
                    <Typography.Text style={{fontSize: '15px' }}>
                        {name}
                    </Typography.Text>
                </div>
            )
        },
        {
            title: 'Actions',
            dataIndex: 'actions',
            key: '3',
            render:  () =>  (  <Space size="middle">
                <Button style={{background:'red', color:'white'}} >Delete </Button>
                <Button type={"primary"} >Edit</Button>
                <Button type={"primary"}>Learn</Button>
            </Space>)
        },
    ]

    const onChangeMinMaxSliderValue = (sliderValues:number[]) => {
        setMinMax(sliderValues)
    }
    return (

        <div style={{marginBottom: '200px'}}>
            <nav>
                <Header/>
            </nav>

            {/*WHITE BACKOGIUD*/}
            <div className={l.modalBox}>
                {/*WHITE BACKOGIUD*/}

                <div className={l.leftSideContainer}>
                    <div className={l.leftSideContentBox}>
                        <h3>Show packs cards</h3>
                        <div className={l.buttonGroup}>
                            <button className={l.myCardsButton}>My</button>
                            <button className={l.allCardsButton}>All</button>
                        </div>

                        <h3>Number of cards</h3>
                        <div>
                            <Slider className={l.sliderStyle} onAfterChange={onChangeMinMaxSliderValue} range defaultValue={[20,50]} disabled={false} />
                        </div>
                    </div>
                </div>

                <div className={l.rightSideContainer}>

                    <h2 style={{textAlign:'left'}}>Packs List</h2>
                    <div className={l.searchBlock}>
                        <Input placeholder={"Search"} className={l.inputSearch}/>
                        <button>Add new pack</button>
                    </div>

                    {loader ? <div style={{width:'500px', height:'700px'}}><Preloader/></div> :
                        <div className={l.tableBlock}>
                            <div className={l.tableStyle}>
                                <Table  className={l.booking_information_table} size={"large"} dataSource={currentCardsPack} columns={columns} pagination={false}/>
                            <Table.Column/>
                            </div>
                            <Pagination onChange={(page, pageSize1) => {
                                setCurrentPage(page)
                                setPacksPerPage(pageSize1)
                            }}  current={currentPage}   showSizeChanger pageSizeOptions={[5,10,25]} pageSize={packsPerPage} total={cardPacks.length}/>;
                        </div>}
                </div>

            </div>
        </div>
    );
};

export default PackList;