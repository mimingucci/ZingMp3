import React from 'react'
import actionType from '../action/actionType'
const initState={
    currentSongId: null,
    isPlaying: false,
}
const songReducer = (state=initState, action) => {

    switch (action.type) {
        case actionType.GET_CURRENT_SONG:{
          
            return {
              ...state,
              currentSongId: action.songId || null,
            }
        }
        default:
            return state
    }
}

export default songReducer