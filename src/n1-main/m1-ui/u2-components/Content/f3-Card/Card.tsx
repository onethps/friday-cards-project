import React, {useEffect, useState} from 'react';
import {useNavigate, useParams} from "react-router-dom";
import s from './Card.module.scss'
import {Input, Pagination, Table} from "antd";
import {CardColumns} from "./tableCardData";
import {AppRootStateType, useAppDispatch} from "../../../../m2-bll/store";
import {fetchCardsTC, ResponseCardContent} from "./card-reducer";
import {useSelector} from "react-redux";
import {PATH} from "../../AppRoutes";
import backButton from "../../../../../assets/icons/back-button-img.svg"
import Header from "../../Header/Header";
import {useTypedSelector} from "../../../../../n3-hooks/useTypedSelector";

const Card = () => {

    const dispatch = useAppDispatch()
    const {id} = useParams()
    const navigate = useNavigate();

    const Cards = useTypedSelector<ResponseCardContent[]>(state => state.card.cardPacks
        .map(m => ({...m, updated: new Date(m.updated).toLocaleDateString("ru-RU")})))

    const currentCardName = useTypedSelector(state => state.cardPacks.cardPacks
        .filter(f => f._id === id && f.name))




    const isLoading = useSelector<AppRootStateType, boolean>(state => state.card.loading)

    const [currentPage, setCurrentPage] = useState(1)
    const [packsPerPage, setPacksPerPage] = useState(5)



    const onHandleBackButton = () => {
        navigate(PATH.PACKS)
    }

    useEffect(() => {
        if (id) {
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
                        <h1>{currentCardName[0].name}</h1>
                    </div>

                    <div className={s.inputBlock}>
                        <Input placeholder={'Search by Question...'}/>
                        <Input placeholder={'Search by Answer...'}/>
                    </div>
                    <div className={s.tableStyle}>
                        <Table style={{ minWidth: '900px' }} loading={isLoading} pagination={false} columns={CardColumns} dataSource={currentCardsPack} />
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