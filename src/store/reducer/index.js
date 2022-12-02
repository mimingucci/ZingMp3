import reducer from './reducer'
import { combineReducers } from 'redux'

const rootReducer=combineReducers(
    {
       banner : reducer,
    }
)
export default rootReducer