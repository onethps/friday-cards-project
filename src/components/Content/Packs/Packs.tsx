import React, { ReactElement, useEffect, useState } from 'react';
import Header from 'components/Header/Header';
import l from 'components/Content/Packs/Pack.module.scss';
import 'antd/dist/antd.min.css';
import { useTypedSelector } from 'hooks/useTypedSelector';
import { fetchPacksTC, setFilterAC } from 'store/reducers/packs';
import { useAppDispatch } from 'store/store';
import { useNavigate, useParams } from 'react-router-dom';
import TableContent from "components/Content/Packs/TableContent/TableContent";
import Settings from "components/Content/Packs/Settings/Settings";
import qs from 'qs';


const Packs = (): ReactElement => {

  const dispatch = useAppDispatch();
  const navigate = useNavigate()
  const {category} = useParams()


  const page = useTypedSelector(state => state.cardPacks.page);
  const pageCount = useTypedSelector(state => state.cardPacks.pageCount);
  const minCardsCount = useTypedSelector(state => state.cardPacks.minCardsCount)
  const maxCardsCount = useTypedSelector(state => state.cardPacks.maxCardsCount)


  const [isSearch, setIsSearch] = useState(false)
  const [isMounted, setIsMounted] = useState(false)

  const [minMaxSlider, setMinMaxSlider] = useState([minCardsCount, maxCardsCount])
  const [searchText, setSearchText] = useState<string>('');

  useEffect(() => {
    if (isMounted) {
      const queryString = qs.stringify({
        minCardsCount,
        maxCardsCount,
        searchText,
        page
      })
      navigate(`?${queryString}`)
    }
    setIsMounted(true)
  }, [page, minMaxSlider, searchText])


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
        fetchPacksTC(
          minMaxSlider[0],
          minMaxSlider[1],
          page,
          pageCount,
          searchText,
          category!,
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
  }, [minCardsCount, maxCardsCount, page, minMaxSlider, searchText]);



  return (
    <>
      <nav>
        <Header/>
      </nav>

      <div className={l.settingsContainer}>
        <Settings minMaxSlider={minMaxSlider} setMinMaxSlider={setMinMaxSlider}/>
        <TableContent searchText={searchText}
                      setSearchText={setSearchText}
                      page={page}
                      pageCount={pageCount}
        />
      </div>
    </>
  );
};

export default Packs;
