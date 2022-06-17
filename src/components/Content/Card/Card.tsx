import React, { ReactElement, useEffect, useState } from 'react';
import { useNavigate, useParams } from 'react-router-dom';

import backButton from 'assets/icons/back-button-img.svg';
import { PATH } from 'components/AppRoutes';
import style from 'components/Content/Card/Card.module.scss';
import Header from 'components/Header/Header';
import { useTypedSelector } from 'hooks/useTypedSelector';
import { fetchCardsTC, isLoading, setNewCardTC } from 'store/reducers/card';
import { useAppDispatch } from 'store/store';
import ModalContainer from "common/ModalContainer/ModalContainer";
import CustomInput from "common/CustomInput/CustomInput";
import { Input, Pagination, Table } from "antd";
import { ResponseCardContent } from "types";
import ButtonActions from "components/Content/Card/ButtonActions/ButtonActions";

const Card = (): ReactElement => {
  const dispatch = useAppDispatch();

  const {id} = useParams();
  const navigate = useNavigate();

  const Cards = useTypedSelector(state => state.card.cards).map(m => ({
    ...m, updated: new Date(m.updated!).toLocaleDateString('ru-RU'),
  }));


  const currentCard = useTypedSelector(state =>
    state.cardPacks.cardPacks.find(f => f._id === id && f),
  );

  const currentCardId = useTypedSelector(state => state.card.packUserId)
  const profileId = useTypedSelector(state => state.profile.id)

  const totalCount = useTypedSelector(state => state.card.cardsTotalCount)
  const {loading} = useTypedSelector(state => state.card);

  const [currentPage, setCurrentPage] = useState(1);


  const onHandleBackButton = (): void => {
    navigate(PATH.PACKS);
  };

  const [searchByQuestion, setSearchByQuestion] = useState('');
  const [searchByAnswer, setSearchByAnswer] = useState('');

  useEffect(() => {
    dispatch(isLoading(true));
    const dataObj = {
      cardsPack_id: id,
      pageCount: currentCard?.cardsCount,
      cardQuestion: searchByQuestion || '',
      cardAnswer: searchByAnswer || '',
    };
    const delayDebounceFn = setTimeout(() => {
      const findSearchResults = () => {
        if (searchByQuestion) {
          dispatch(fetchCardsTC(dataObj));
        }
        if (searchByAnswer) {
          dispatch(fetchCardsTC(dataObj));
        }
        // first loading and if no any results - show all cards
        if (!searchByAnswer && !searchByQuestion) {
          dispatch(fetchCardsTC(dataObj));
        }
      };
      findSearchResults();
    }, 1000);
    // stopping loader
    dispatch(isLoading(false));
    return () => clearTimeout(delayDebounceFn);
  }, [searchByQuestion, searchByAnswer]);


  const [showModal, setShowModal] = useState(false)
  const [question, setQuestion] = useState('')
  const [answer, setAnswer] = useState('')

  const setNewCard = () => {
    dispatch(setNewCardTC({question, answer, cardsPack_id: id!, _id:''}))
    setShowModal(false)
  }


  return (
    <div>
      <nav>
        <Header/>
      </nav>

      <ModalContainer
        title={"Card Info"}
        active={showModal}
        setActive={setShowModal}>
        <CustomInput
          label={'Question'} value={question}
          onChange={(e) => setQuestion(e.currentTarget.value)}/>
        <CustomInput
          label={'Answer'} value={answer}
          onChange={(e) => setAnswer(e.currentTarget.value)}/>

        <div className={style.modalStyle}>
          <button className={style.buttonCancel}>Cancel</button>
          <button onClick={setNewCard} className={style.buttonSubmit}>Save</button>
        </div>
      </ModalContainer>

      <div className={style.settingsContainer}>
        <div className={style.container}>
          <div className={style.headerBox}>
            <div className={style.textAndName}>
              <img onClick={onHandleBackButton} src={backButton}/>
              <h1>{currentCard?.name}</h1>

            </div>
            {currentCardId === profileId &&
                <button onClick={() => setShowModal(true)}>Add new Card</button>}
          </div>

          <div className={style.inputBlock}>
            <Input
              placeholder="Search by Question..."
              value={searchByQuestion}
              onChange={e => setSearchByQuestion(e.currentTarget.value)}
            />
            <Input
              placeholder="Search by Answer..."
              value={searchByAnswer}
              onChange={e => setSearchByAnswer(e.currentTarget.value)}
            />
          </div>
          <div className={style.tableStyle}>
            {/*<Table*/}
            {/*  rowKey={record => record.cardsPack_id + Math.random()}*/}
            {/*  loading={loading}*/}
            {/*  style={{minWidth: '900px'}}*/}
            {/*  pagination={false}*/}
            {/*  columns={CardColumns}*/}
            {/*  dataSource={Cards}*/}
            {/*/>*/}
            <Table
              rowKey={record => record.cardsPack_id + Math.random()}
              dataSource={Cards}
              loading={loading}
              style={{minWidth: '900px'}}
              pagination={false}
            >
              <Table.Column key="_id" title="Question" dataIndex="question" />
              <Table.Column key="_id" title="Answer" dataIndex="answer" />
              <Table.Column key="_id" title="Last Updated" dataIndex="updated" />
              <Table.Column key="_id" title="Grade" dataIndex="grade" />

               {currentCardId === profileId &&
                   <Table.Column key="_id" title="Actions" dataIndex="actions"
                             render={(value: string, record: ResponseCardContent) =>
                               <ButtonActions key={record._id} record={record}/>}
              />}

            </Table>
          </div>
          <Pagination
            style={{margin: '50px 0'}}
            onChange={(page, pageSize1) => {
              setCurrentPage(page);
            }}
            current={currentPage}
            total={totalCount}
          />
        </div>
      </div>
    </div>
  );
};

export default Card;
