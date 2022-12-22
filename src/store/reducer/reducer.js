import actionType from "../action/actionType"


const initState = {
  banner : [],
  isShuffle: false,
  isLoop: false,
  playlist:[],
  events:[],
  weekChart:[],
  chart:{},
  historySongs:[],
  searchdata:{},
  isInSearchPage:false,
  isInMainPage: true,
  isInArtistsPage:false,
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
      case actionType.PUST_SONG_TO_HISTORY:
        const historySong=[...state.historySongs];
        
        //console.log(action.payload);
        if(historySong.length>=20){
          historySong.shift();
        }
        for(let i=0; i<historySong.length; i++){
          if(historySong[i]?.encodeId===action.payload.encodeId){
            historySong.splice(i, 1);
            break;
          }
        }
        historySong.push(action.payload);
        return {
          ...state,
          historySongs: historySong,
        }
      case actionType.SET_DATA_SEARCH:
        return {
          ...state,
          searchdata:{...action.payload},
        }
      case actionType.SET_CURRENT_PAGE:
        return {
          ...state,
          isInMainPage: action.payload.isInMainPage,
          isInSearchPage: action.payload.isInSearchPage,
          isInArtistsPage: action.payload.isInArtistsPage,
        }
      default:
          return state
  }
}

export default appReducer