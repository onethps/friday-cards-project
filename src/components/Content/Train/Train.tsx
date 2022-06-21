import React, { useEffect, useState } from 'react';
import { Navigate, useParams } from "react-router-dom";
import { useAppDispatch } from "store/store";
import { useTypedSelector } from "hooks/useTypedSelector";
import { ResponseCardContent } from "types";
import Header from "components/Header/Header";
import s from 'components/Content/Train/Train.module.scss'
import TrainContent from "components/Content/Train/TrainContent";
import { PATH } from "components/AppRoutes";
import { fetchCardsTC } from "store/middlewares/cardFlow";

const Train = () => {
  const dispatch = useAppDispatch();
  const {id} = useParams()

  const [mount, setMount] = useState(false)
  const cardItems = useTypedSelector(state => state.card.cards)
  const loading = useTypedSelector(state => state.card.loading)
  const isLoggedIn = useTypedSelector(state => state.login.isLoggedIn)

  const currentCard = useTypedSelector(state =>
    state.packs.cardPacks.find(f => f._id === id && f),
  );

  const [randomResult, setRandomResult] = useState<ResponseCardContent | null>(null)

  useEffect(() => {
    if (!mount) {
      dispatch(fetchCardsTC({
        cardsPack_id: id,
        pageCount: currentCard?.cardsCount
      }))
      setMount(true)
    }

    if (cardItems.length > 0) {
      setRandomResult(getCard(cardItems))
    }

  }, [mount, cardItems])

  const getCard = (cards: any[]) => {
    const sum = cards.reduce((acc, card) => acc + (6 - card.grade) * (6 - card.grade), 0);
    const rand = Math.random() * sum;
    const res = cards.reduce((acc: { sum: number, id: number }, card, i) => {
        const newSum = acc.sum + (6 - card.grade) * (6 - card.grade);
        return {sum: newSum, id: newSum < rand ? i : acc.id}
      }
      , {sum: 0, id: -1});

    return cards[res.id + 1];
  }

  if (loading) {
    return <div>loading</div>
  }

  if (!isLoggedIn) {
    return <Navigate to={PATH.LOGIN}/>;
  }


  return (
    <>
      <nav>
        <Header/>
      </nav>
      <div className={s.root}>
        {randomResult ?
          <TrainContent currentCard={currentCard} randomResult={randomResult}/>
          :
          <div>no cards in pack</div>

        }
      </div>
    </>
  );
};

export default Train;