import reducer from './reducer'
import songReducer from './songReducer'
import { combineReducers } from 'redux'
import { persistReducer } from 'redux-persist'
import storage from 'redux-persist/lib/storage'
import autoMergeLevel2 from "redux-persist/lib/stateReconciler/autoMergeLevel2";

const globalConfig={
    storage: storage,
    stateReconciler: autoMergeLevel2
}

const musicConfig={
  ...globalConfig, 
  key: 'music',
  whitelist: ['currentSongId'],
}

const appConfig={
  ...globalConfig,
  key: 'history',
  whitelist:['historySongs', 'isInSearchPage', 'isInMainPage', 'isInArtistsPage'],
}
const rootReducer=combineReducers(
    {
       app : persistReducer(appConfig, reducer),
       music : persistReducer(musicConfig, songReducer), 
    }
)
export default rootReducer