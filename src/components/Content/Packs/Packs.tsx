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
import useDebounce from "hooks/debounceHook";


const Packs = (): ReactElement => {

  const dispatch = useAppDispatch();
  const navigate = useNavigate()
  const {category} = useParams()


  const page = useTypedSelector(state => state.cardPacks.page);
  const pageCount = useTypedSelector(state => state.cardPacks.pageCount);
  const minCardsCount = useTypedSelector(state => state.cardPacks.minCardsCount)
  const maxCardsCount = useTypedSelector(state => state.cardPacks.maxCardsCount)

  const myID = useTypedSelector(state => state.profile.id)


  const [isSearch, setIsSearch] = useState(false)
  const [isMounted, setIsMounted] = useState(false)

  const [minMaxSlider, setMinMaxSlider] = useState([minCardsCount, maxCardsCount])
  const [searchText, setSearchText] = useState<string>('');

  const debouncedSearch = useDebounce(searchText, 500);


  const fetchData = async () => {
    await dispatch(fetchPacksTC(
        minMaxSlider[0],
        minMaxSlider[1],
        page,
        pageCount,
        searchText,
        category === 'my' ? myID : ''
      ),
    );
  }


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

  useEffect(() => {
    if (!isSearch) {
      fetchData()
        .catch(console.error)
    }

    setIsSearch(false)
  }, [minCardsCount, maxCardsCount, page, minMaxSlider, category, debouncedSearch]);




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
