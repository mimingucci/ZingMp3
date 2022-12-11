import actionType from "../action/actionType"


const initState = {
  banner : [],
  isShuffle: false,
  isLoop: false,
  playlist:[],
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
      default:
          return state
  }
}

export default appReducer