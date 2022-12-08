import actionType from "./actionType";
import * as apis from '../../getApi'
export const getCurrentSong=async(songId)=>{
    const response=await apis.getSong(songId);
   return response;
}
export const getDetailPlaylist=async(pid)=>{
    const response=await apis.apiGetDetaiPlaylist(pid);
    console.log('playlist',response)
}

export const setCurrentSongId=(songId, linkSong,linkImage, songName, artists, previousSong, nextSong)=>{
    return {
        type: actionType.SET_CURRENT_SONG_ID,
        payload: {songId, linkSong, linkImage, songName, artists, previousSong, nextSong},
    }
}

export const play=(flag)=>({
    type: actionType.PLAY,
    payload: flag,
} )

export const listSongsInAlbum=(listSongs)=>{
    return {
        type: actionType.SET_LIST_SONGS_IN_ALBUM,
        payload: listSongs,
    }
}
export const updateCurrentSongInAlbum=( currentSongIndex ,currentSongId, linkCurrentSong, image, songName, artists)=>{
    return {
        type: actionType.UPDATE_CURRENT_SONG_IN_ALBUM,
        payload:{currentSongIndex ,currentSongId, linkCurrentSong, image, songName, artists},
    }
}