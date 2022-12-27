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

export const setShuffle=(state)=>{
    return {
        type: actionType.SET_SHUFFLE_SONGS_IN_ALBUM, 
        payload: state,
    }
}

export const setLoop=(state)=>{
    return {
        type: actionType.SET_LOOP, 
        payload: state,
    }
}

export const setPlaylist=(playlist)=>{
    return {
        type: actionType.SET_PLAYLIST,
        payload: playlist,
    }
}

export const setEvents=(events)=>{
    return {
        type: actionType.SET_EVENTS,
        payload: events,
    }
}

export const setChart=(weekChart, chart)=>{
    return {
        type: actionType.SET_CHART,
        payload:{
            weekChart,
            chart,
        }
    }
}

export const pustSongToHistory=(song)=>{
     //const song=await apis.apiGetSong(songId);
     //console.log(song)
     return{
        type: actionType.PUST_SONG_TO_HISTORY,
        payload: song,
     }
}

export const searchdata=(response)=>{
    return {
        type: actionType.SET_DATA_SEARCH,
        payload: response,
    }
}

export const setCurrentPage=(isInMainPage, isInSearchPage, isInArtistsPage)=>{
    return {
        type: actionType.SET_CURRENT_PAGE,
        payload:{isInMainPage, isInSearchPage, isInArtistsPage},
    }
}

export const setCurrentUrl=(path)=>{
    return {
        type: actionType.SET_CURRENT_URL,
        payload: path,
    }
}