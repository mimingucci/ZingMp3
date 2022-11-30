import { getHome } from "../../getApi/home";
import actionType from "./actionType";
export const getHome=()=>async(dispatch)=>{
     try {
        const response=await getHome();
        dispatch({
            type:actionType.GET_HOME,
            payload: response.data.data.items
        })
     } catch (error) {
        dispatch({
            type: actionType.GET_HOME,
            payload: null
        })
     }
}