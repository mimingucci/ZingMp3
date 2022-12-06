import React from 'react'
import actionType from '../action/actionType'
const initState={
    currentSongId: null,
    isPlaying: false,
    linkCurrentSong: '',
    image:'',
    songName:'',
    artists:[],
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
            }
        case actionType.PLAY:
            return {
                ...state,
                isPlaying: action.payload,
            }
        default:
            return state
    }
}

export default songReducer