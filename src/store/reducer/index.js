import reducer from './reducer'
import { combineReducers } from 'redux'

const rootReducer=combineReducers(
    {
       app : reducer,
    }
)
export default rootReducer