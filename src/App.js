import './App.css';
import path from './utils/path';
import {Route, Routes} from 'react-router-dom'
import Home from './containers/public/Home';
import * as actions from './store/action'
import {useEffect} from 'react'
import { useDispatch } from 'react-redux';
import Album from './containers/public/Album';
import Public from './containers/public/Public';
import { SearchAllPage, SearchSong, PlaylistSearch, ArtistsSearch} from './components/home';
import { ZingChartPage } from './components/zingchart';
import Artists from './components/home/Artists';
function App() {
  // const dispatch=useDispatch();
  // useEffect(()=> {dispatch(getHomeApi())}, [])
  const dispatch = useDispatch()
  useEffect(() => {
    dispatch(actions.getHomeApi())
  }, [])
  return (
    <div className="App">
     
      <Routes>
        <Route path={path.PUBLIC} element={<Public/>} >
          <Route path={path.ARTISTS} element={<Artists />} />
          <Route path='zing-chart' element={<ZingChartPage />}/>
          {/* <Route path={path.STAR} element={<Home/>} /> */}
          <Route path={path.API_SEARCH_ALL+'/'+path.ALL} element={<SearchAllPage />} >
            <Route path={path.SONG} element={<SearchSong />}/>
            <Route path={path.PLAYLIST} element={<PlaylistSearch />}/>
            <Route path={path.ARTISTS} element={<ArtistsSearch />}/>
          </Route>
          {/* <Route path={path.API_SEARCH_ALL+'/'+path.ALL+'/'+path.SONG} element={<SearchAllPage />} /> */}
        </Route>
        {/* <Route path={'/'+path.API_SEARCH_ALL+'/'+path.ALL}/> */}
         <Route path={'/'+path.ALBUM__TITLE__PID} element={<Album/>}/>
      </Routes>
    </div>
  );
}

export default App;
