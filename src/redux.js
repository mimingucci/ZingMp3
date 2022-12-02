import { legacy_createStore as createStore, applyMiddleware} from "redux"
import thunk from 'redux-thunk'
import {persistStore} from 'redux-persist'
import appReducer from "./store/reducer/reducer"

import rootReducer from "./store/reducer/index"

const reduxConfig=()=>{
    const store=createStore(appReducer, applyMiddleware(thunk));
    const persistor = persistStore(store);
    return {store, persistor};
}
     
export default reduxConfig;