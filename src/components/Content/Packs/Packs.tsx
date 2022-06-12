import React, { ReactElement, useEffect, useState } from 'react';
import Header from 'components/Header/Header';
import l from 'components/Content/Packs/Pack.module.scss';
import 'antd/dist/antd.min.css';
import { useTypedSelector } from 'hooks/useTypedSelector';
import { fetchPacks, setFilterAC } from 'store/reducers/packs';
import { useAppDispatch } from 'store/store';
import { useNavigate, useParams } from 'react-router-dom';
import TableContent from "components/Content/Packs/TableContent/TableContent";
import Settings from "components/Content/Packs/Settings/Settings";
import qs from 'qs';


const Packs = (): ReactElement => {

  const dispatch = useAppDispatch();
  const navigate = useNavigate()

  const {category} = useParams()


  const myId = useTypedSelector(state => state.profile.id);
  const page = useTypedSelector(state => state.cardPacks.page);
  const pageCount = useTypedSelector(state => state.cardPacks.pageCount);
  const minCardsCount = useTypedSelector(state => state.cardPacks.minCardsCount)
  const maxCardsCount = useTypedSelector(state => state.cardPacks.maxCardsCount)


  const [isSearch, setIsSearch] = useState(false)
  const [isMounted, setIsMounted] = useState(false)

  const [minMaxSlider, setMinMaxSlider] = useState([minCardsCount, maxCardsCount])


  useEffect(() => {
    if (isMounted) {
      const queryString = qs.stringify({
        minCardsCount,
        maxCardsCount,
        page
      })
      navigate(`?${queryString}`)
    }
    setIsMounted(true)

  }, [page, minMaxSlider])


  useEffect(() => {
    if (window.location.search) {
      const params = qs.parse(window.location.search.substring(1))
      dispatch(
        setFilterAC({
          ...params,
        })
      )
      setIsSearch(true)
    }

  }, [])

  const getPacks = async (): Promise<void> => {
    await dispatch(
      fetchPacks(
        minMaxSlider[0],
        minMaxSlider[1],
        page,
        pageCount,
        category === 'my' ? myId : '',
      ),
    );
  };


  useEffect(() => {
    if (!isSearch) {
      const delayDebounceFn = setTimeout(() => {
        return getPacks();
      }, 1000);
      return () => clearTimeout(delayDebounceFn);
    }

    setIsSearch(false)
  }, [minCardsCount, maxCardsCount, page, category, minMaxSlider]);

  return (
    <>
      <nav>
        <Header/>
      </nav>

      <div className={l.settingsContainer}>
        <Settings minMaxSlider={minMaxSlider} setMinMaxSlider={setMinMaxSlider}/>
        <TableContent/>
      </div>
    </>
  );
};

export default Packs;
