import actionType from "../action/actionType"


const initState = {
  banner : [],
}

const appReducer = (state = initState, action) => {
  switch (action.type) {
      case actionType.GET_HOME:{
        
          return {
            ...state,
            banner: action.payload?.find(item => item.sectionType === 'banner')?.items || null
          }
      }
      default:
          return state
  }
}

export default appReducer