import actionType from "../action/actionType"


const initState = {
  banner : [],
}

const appReducer = (state = initState, action) => {
  switch (action.type) {
      case actionType.GET_HOME:{
        const arrResponse=action.payload?.find(item => item.sectionType === 'banner')?.items;
        
          const arr=new Array();
          for(let i=0; i<arrResponse.length; i++)arr.push(arrResponse[i]);
         
          return {
            ...state,
            banner:arr,
          }
      }
      default:
          return state
  }
}

export default appReducer