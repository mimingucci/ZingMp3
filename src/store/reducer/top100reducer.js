import actionType from "../action/actionType"
const top100={
    vietnam: [],
}
const top100reducer=(state = top100, action)=>{
    switch(action.type){
        case actionType.SET_TOP_100_VIETNAM:
            return {
                ...state,
                vietnam: [...action.payload],
            }
        default:
            return state;
    }
}
export default top100reducer