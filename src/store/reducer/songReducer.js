import actionType from '../action/actionType'
const initState={
    currentSongId: null,
    isPlaying: false,
    linkCurrentSong: '',
    image:'',
    songName:'',
    artists:[],
    prevSong: 0,
    nextSong: 0,
    listSongs:[],
}

const songReducer = (state=initState, action) => {
    console.log(action)
    switch (action.type) {
        case actionType.GET_CURRENT_SONG:{
          
            return {
              ...state,
              currentSongId: action.songId || null,
            }
        }
        case actionType.SET_CURRENT_SONG_ID:
            
            return {
                ...state,
                currentSongId: action.payload.songId || null,
                linkCurrentSong: action.payload.linkSong || '',
                image: action.payload.linkImage,
                songName: action.payload.songName,
                artists: [...action.payload.artists],
                prevSong: action.payload.previousSong || 0,
                nextSong: action.payload.nextSong || 0,
            }
        case actionType.PLAY:
            return {
                ...state,
                isPlaying: action.payload,
            }
        case actionType.SET_LIST_SONGS_IN_ALBUM:
            return {
                ...state,
                listSongs: [...action.payload],
            }
        case actionType.UPDATE_CURRENT_SONG_IN_ALBUM:
            let nextSongIndex;
            let previousSongIndex;
            if(action.payload.currentSongIndex===0){
                previousSongIndex=state.listSongs.length-1;
            }else{
                previousSongIndex=action.payload-1;
            }
            if(action.payload.currentSongIndex===state.listSongs.length-1){
                nextSongIndex=0;
            }else{
                nextSongIndex=action.payload+1;
            }
           return {
            ...state,
            currentSongId: action.payload.currentSongId,
            linkCurrentSong: action.payload.linkCurrentSong,
            image: action.payload.image,
            songName: action.payload.songName,
            artists: action.payload.artists,
            prevSong:previousSongIndex,
            nextSong: nextSongIndex,
           }
        default:
            return state
    }
}

export default songReducer