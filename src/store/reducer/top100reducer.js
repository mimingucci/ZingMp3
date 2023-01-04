import actionType from "../action/actionType"
const top100={
    vietnam: [],
    usuk:[],
    kpop:[],
}
const top100reducer=(state = top100, action)=>{
    switch(action.type){
        case actionType.SET_TOP_100_VIETNAM:
            return {
                ...state,
                vietnam: [...action.payload.top100Vietnam],
                usuk:[...action.payload.top100USUK],
                kpop:[...action.payload.top100Kpop],
            }
        default:
            return state;
    }
}
export default top100reducer