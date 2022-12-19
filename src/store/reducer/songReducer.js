import actionType from '../action/actionType'
const initState={
    currentSongId: null,
    isPlaying: false,
    linkCurrentSong: '',
    image:'',
    songName:'',
    artists:[],
    listSongs:[],
    isInAlbum: true,
    isInPlaylist: false,
}

const songReducer = (state=initState, action) => {
    //console.log(action)
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
            }
        case actionType.PLAY:
            return {
                ...state,
                isPlaying: action.payload,
            }
        case actionType.SET_LIST_SONGS_IN_ALBUM:
            console.log(action.payload)
            return {
                ...state,
                listSongs: [...action.payload],
            }
        case actionType.UPDATE_CURRENT_SONG_IN_ALBUM:
            
           return {
            ...state,
            currentSongId: action.payload.currentSongId,
            linkCurrentSong: action.payload.linkCurrentSong,
            image: action.payload.image,
            songName: action.payload.songName,
            artists: action.payload.artists,
            isPlaying: true,
           }
        case actionType.SET_SONG:
            return {
                ...state,
                currentSongId: action.payload,
            }
        case actionType.UPDATE_POSITION_OF_SONG:
            return {
                ...state, 
                isInAlbum: action.payload.isInAlbum, 
                isInPlaylist: action.payload.isInPlaylist,
            }
        default:
            return state
    }
}

export default songReducer