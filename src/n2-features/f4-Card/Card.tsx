import React, {useEffect, useState} from 'react';
import {useNavigate, useParams} from "react-router-dom";
import s from './Card.module.scss'
import {Input, Pagination, Table} from "antd";
import {CardColumns} from "./tableCardData";
import {AppRootStateType, useAppDispatch} from "../../n1-main/m2-bll/store";
import {fetchCardsTC, ResponseCardContent} from "./card-reducer";
import {useSelector} from "react-redux";
import {PATH} from "../../AppRoutes";
import backButton from "../../assets/icons/back-button-img.svg"
import Header from "../../n1-main/m1-ui/u2-components/Header/Header";

const Card = () => {

    const Cards = useSelector<AppRootStateType, ResponseCardContent[]>(state => state.card.cardPacks
        .map(m => ({...m, updated: new Date(m.updated).toLocaleDateString("ru-RU")})))

    const isLoading = useSelector<AppRootStateType, boolean>(state => state.card.loading)

    const [currentPage, setCurrentPage] = useState(1)
    const [packsPerPage, setPacksPerPage] = useState(5)

    const dispatch = useAppDispatch()
    const {id} = useParams()
    const navigate = useNavigate();

    const onHandleBackButton = () => {
        navigate(PATH.PACKS)
    }

    useEffect(() => {
        if (id !== undefined) {
            dispatch(fetchCardsTC({cardsPack_id:id, pageCount:100}))
        }

    }, [])

    const lastCardPackIndex = currentPage * packsPerPage
    const firstCardPackIndex = lastCardPackIndex - packsPerPage
    const currentCardsPack = Cards.slice(firstCardPackIndex, lastCardPackIndex)


    return (

        <div>
            <nav>
                <Header/>
            </nav>


            <div className={s.modalBox}>
            <div className={s.container}>
                <div className={s.headerBox}>
                    <img onClick={onHandleBackButton} src={backButton}/>
                    <h1>Pack Name</h1>
                </div>

                <div className={s.inputBlock}>
                    <Input placeholder={'Search by Question...'}/>
                    <Input placeholder={'Search by Answer...'}/>
                </div>
                <div className={s.tableStyle}>
                    <Table loading={isLoading} pagination={false} columns={CardColumns} dataSource={currentCardsPack} style={{ minWidth: '900px' }}/>
                </div>
                <Pagination style={{margin:'50px 0'}}
                            onChange={(page, pageSize1) => {
                                setCurrentPage(page)
                                setPacksPerPage(pageSize1)}}
                            pageSize={packsPerPage} current={currentPage} total={Cards.length}/>
            </div>
        </div>

        </div>

    );
};

export default Card;