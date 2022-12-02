import { getHome } from "../../getApi/home";
import actionType from "./actionType";
export const getHomeApi=()=>async(dispatch)=>{
     try {
        const response=await getHome();
        if(response?.data.err===0){
            dispatch({
                type: actionType.GET_HOME,
                payload: response?.data.data.items,
            })
        }else{
            dispatch({
                type: actionType.GET_HOME,
                payload: null,
            })
        }
        
     } catch (error) {
        dispatch({
            type: actionType.GET_HOME,
            payload: null,
        })
     }
}