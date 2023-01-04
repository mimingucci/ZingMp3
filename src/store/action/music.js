import actionType from "./actionType";
import * as apis from '../../getApi'
// export const getCurrentSong=async(songId)=>{
//     const response=await apis.getSong(songId);
//    return response;
// }
// export const getDetailPlaylist=async(pid)=>{
//     const response=await apis.apiGetDetaiPlaylist(pid);
//     console.log('playlist',response)
// }
export const setSongId=(songId)=>{
    return {
        type: actionType.SET_SONG,
        payload: songId,
    }
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

export const listSongsInAlbum=(listSongs)=>{
    return {
        type: actionType.SET_LIST_SONGS_IN_ALBUM,
        payload: listSongs,
    }
}
export const updateCurrentSongInAlbum=( currentSongId, linkCurrentSong, image, songName, artists)=>{
    return {
        type: actionType.UPDATE_CURRENT_SONG_IN_ALBUM,
        payload:{currentSongId, linkCurrentSong, image, songName, artists},
    }
}

export const updatePositionOfSong=(isInAlbum, isInPlaylist)=>{
    return {
        type: actionType.UPDATE_POSITION_OF_SONG,
        payload: {isInAlbum, isInPlaylist},
    }
}

export const setTop100Vietnam=(top100Vietnam)=>{
    return {
        type: actionType.SET_TOP_100_VIETNAM,
        payload: top100Vietnam,
    }
}