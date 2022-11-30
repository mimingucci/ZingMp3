import {createStore, applyMiddleware} from "redux"
import thunk from 'redux-thunk'

import appReducer from "./store/reducer/reducer"
export const reduxConfig=()=>{
      const rd=createStore(appReducer, applyMiddleware(thunk));
      return rd;
}