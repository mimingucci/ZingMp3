import actionType from "../action/actionType"


const initState = {
  banner : [],
  isShuffle: false,
  isLoop: false,
  playlist:[],
  events:[],
  weekChart:[],
  chart:{},
}

const appReducer = (state = initState, action) => {
  switch (action.type) {
      case actionType.GET_HOME:{
        
          return {
            ...state,
            banner: action.payload?.find(item => item.sectionType === 'banner')?.items || null
          }
      }
      case actionType.SET_SHUFFLE_SONGS_IN_ALBUM:
        return {
          ...state, 
          isShuffle: action.payload,
        }
      case actionType.SET_LOOP:
        return {
          ...state,
          isLoop: action.payload,
        }
      case actionType.SET_EVENTS:
        return {
          ...state,
          events:[...action.payload],
        }
      case actionType.SET_CHART:
        return {
          ...state,
          weekChart: [...action.payload.weekChart],
          chart: {...action.payload.chart},
        }
      default:
          return state
  }
}

export default appReducer