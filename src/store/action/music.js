import actionType from "./actionType";
import * as apis from '../../getApi'
export const getCurrentSong=async(songId)=>{
    const response=await apis.getSong(songId);
   // console.log('song', response);
}
export const getDetailPlaylist=async(pid)=>{
    const response=await apis.apiGetDetaiPlaylist(pid);
    console.log('playlist',response)
}