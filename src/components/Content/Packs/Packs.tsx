import React, { ReactElement, useEffect, useState } from 'react';
import Header from 'components/Header/Header';
import l from 'components/Content/Packs/Pack.module.scss';
import 'antd/dist/antd.min.css';
import { useTypedSelector } from 'hooks/useTypedSelector';
import { useAppDispatch } from 'store/store';
import { Navigate, useNavigate, useParams } from 'react-router-dom';
import TableContent from "components/Content/Packs/TableContent/TableContent";
import Settings from "components/Content/Packs/Settings/Settings";
import qs from 'qs';
import useDebounce from "hooks/debounceHook";
import { PATH } from "components/AppRoutes";
import { setFilterAC } from "store/actions/packs";
import { fetchPacksTC } from "store/middlewares/packFlow";


const DEBOUNCE_DELAY = 500;
const FIRST_INDEX = 0;
const SECOND_INDEX = 1;

const Packs = (): ReactElement => {

  const dispatch = useAppDispatch();
  const navigate = useNavigate()
  const {category} = useParams()


  const page = useTypedSelector(state => state.packs.page);
  const pageCount = useTypedSelector(state => state.packs.pageCount);
  const minCardsCount = useTypedSelector(state => state.packs.minCardsCount)
  const maxCardsCount = useTypedSelector(state => state.packs.maxCardsCount)
  const myID = useTypedSelector(state => state.profile.id)
  const isLoggedIn = useTypedSelector(state => state.login.isLoggedIn)

  const [isSearch, setIsSearch] = useState(false)
  const [isMounted, setIsMounted] = useState(false)

  const [minMaxSlider, setMinMaxSlider] = useState([minCardsCount, maxCardsCount])
  const [searchText, setSearchText] = useState<string>('');

  const debouncedSearch = useDebounce(searchText, DEBOUNCE_DELAY);
  const debouncedSlider = useDebounce(minMaxSlider, DEBOUNCE_DELAY);

  const onPaginatorChange = (page:number, pageCount:number) => {
    dispatch(setFilterAC({page, pageCount}))
  }

  const fetchData = async () => {
    await dispatch(fetchPacksTC(
        minMaxSlider[FIRST_INDEX],
        minMaxSlider[SECOND_INDEX],
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
        minCardsCount: minMaxSlider[0],
        maxCardsCount: minMaxSlider[1],
        searchText,
        page
      })
      navigate(`?${queryString}`)
    }
    setIsMounted(true)
  }, [page, pageCount, searchText,  debouncedSlider])


  useEffect(() => {
    if (window.location.search) {
      const params = qs.parse(window.location.search.substring(1))
      // setMinMaxSlider([minCardsCount, maxCardsCount])
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
    }

    setIsSearch(false)
  }, [page, pageCount, category, debouncedSearch, debouncedSlider]);


  if (!isLoggedIn) {
    return <Navigate to={PATH.LOGIN}/>;
  }


  return (
    <>
      <nav>
        <Header/>
      </nav>
      <div className={l.settingsContainer}>
        <Settings minMaxSlider={minMaxSlider} setMinMaxSlider={setMinMaxSlider}/>
        <TableContent
          onPaginatorChange={onPaginatorChange}
          searchText={searchText}
          setSearchText={setSearchText}
          page={page}
          pageCount={pageCount}
          showAddNewPackButton={true}
        />
      </div>
    </>
  );
};

export default Packs;
