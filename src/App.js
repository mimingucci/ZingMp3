import './App.css';
import path from './utils/path';
import {Route, Routes} from 'react-router-dom'
import {useDispatch} from 'react-redux'
import { useEffect } from 'react';
import {getHome} from './store/action/home'
import Home from './containers/public/Home';
function App() {
  const dispatch=useDispatch();
  useEffect(()=>
    dispatch(getHome())
  , [])
  return (
    <div className="App">
     
      <Routes>
        <Route path={path.PUBLIC} element={<Home/>}>
        <Route path={path.HOME} element={<Home/>} />
        <Route path={path.STAR} element={<Home/>} />
        </Route>
      </Routes>
    </div>
  );
}

export default App;
