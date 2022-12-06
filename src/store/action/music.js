import actionType from "./actionType";
import * as apis from '../../getApi'
export const getCurrentSong=async(songId)=>{
    const response=await apis.getSong(songId);
   // console.log('song', response);
   return response;
}
export const getDetailPlaylist=async(pid)=>{
    const response=await apis.apiGetDetaiPlaylist(pid);
    console.log('playlist',response)
}

export const setCurrentSongId=(songId, linkSong,linkImage, songName, artists)=>{
    return {
        type: actionType.SET_CURRENT_SONG_ID,
        payload: {songId, linkSong, linkImage, songName, artists},
    }
}

export const play=(flag)=>({
    type: actionType.PLAY,
    payload: flag,
} )