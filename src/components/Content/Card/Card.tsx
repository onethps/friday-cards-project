import React, { ReactElement, useEffect, useState } from 'react';

import { Input, Pagination, Table } from 'antd';
import { useNavigate, useParams } from 'react-router-dom';

import backButton from 'assets/icons/back-button-img.svg';
import { PATH } from 'components/AppRoutes';
import style from 'components/Content/Card/Card.module.scss';
import { CardColumns } from 'components/Content/Card/data';
import Header from 'components/Header/Header';
import { useTypedSelector } from 'hooks/useTypedSelector';
import { fetchCardsTC, isLoading } from 'store/reducers/card';
import { useAppDispatch } from 'store/store';

const Card = (): ReactElement => {
  const dispatch = useAppDispatch();

  // gets card it from url
  const { id } = useParams();
  const navigate = useNavigate();

  // map method to convert grinvich to CIS date
  const Cards = useTypedSelector(state => state.card.cards).map(m => ({
    ...m,
    updated: new Date(m.updated).toLocaleDateString('ru-RU'),
  }));

  /// find current card name and show in title
  const currentCard = useTypedSelector(state =>
    state.cardPacks.cardPacks.find(f => f._id === id && f),
  );

  const { loading } = useTypedSelector(state => state.card);

  // currrent page = 100 units (hardcoded)
  const [currentPage, setCurrentPage] = useState(1);

  // how cards will be shows on one page
  const [packsPerPage, setPacksPerPage] = useState(10);

  // back to all cardpacks list
  const onHandleBackButton = (): void => {
    navigate(PATH.PACKS);
  };

  const [searchByQuestion, setSearchByQuestion] = useState('');
  const [searchByAnswer, setSearchByAnswer] = useState('');

  useEffect(() => {
    // delay search on 1 second after stop typing in input search
    dispatch(isLoading(true));
    const dataObj = {
      // gets id from currentCard useParams
      cardsPack_id: id,
      // gets from object total cards in current cardPack
      pageCount: currentCard!.cardsCount,
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

  // gets pagination of all cards
  const lastCardPackIndex = currentPage * packsPerPage;
  const firstCardPackIndex = lastCardPackIndex - packsPerPage;
  const currentCardsPack = Cards.slice(firstCardPackIndex, lastCardPackIndex);

  return (
    <div>
      <nav>
        <Header />
      </nav>
      <div className={style.settingsContainer}>
        <div className={style.container}>
          <div className={style.headerBox}>
            <img onClick={onHandleBackButton} src={backButton} />
            <h1>{currentCard!.name}</h1>
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
            <Table
              loading={loading}
              style={{ minWidth: '900px' }}
              pagination={false}
              columns={CardColumns}
              dataSource={currentCardsPack}
            />
          </div>
          <Pagination
            style={{ margin: '50px 0' }}
            onChange={(page, pageSize1) => {
              setCurrentPage(page);
              setPacksPerPage(pageSize1);
            }}
            pageSize={packsPerPage}
            current={currentPage}
            total={Cards.length}
          />
        </div>
      </div>
    </div>
  );
};

export default Card;
