import './App.css';
import path from './utils/path';
import {Route, Routes} from 'react-router-dom'
import Home from './containers/public/Home';
import * as actions from './store/action'
import {useEffect} from 'react'
import { useDispatch } from 'react-redux';
import Album from './containers/public/Album';
import Public from './containers/public/Public';
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
        <Route path={path.PUBLIC} element={<Public/>}>
        {/* <Route path={path.HOME} element={<Home/>} /> */}
        {/* <Route path={path.STAR} element={<Home/>} /> */}
        </Route>
        <Route path={'/'+path.ALBUM__TITLE__PID} element={<Album/>}/>
      </Routes>
    </div>
  );
}

export default App;
