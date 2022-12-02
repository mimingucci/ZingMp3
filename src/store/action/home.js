import actionType from "./actionType";
import * as apis from '../../getApi'
export const getHomeApi=()=>async(dispatch)=>{
     try {
        const response=await apis.getHome();
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