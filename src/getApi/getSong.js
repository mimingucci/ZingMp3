import React from 'react'
import axios from '../axios'
export const getSong=async(sid)=>{
    const response=await axios(
        {
            url: '/infosong',
            method: 'get',
            params: { id: sid },
        }
    )
    return response;
}

export const apiGetSong = async(sid) => {
    try {
        const response = await axios({
            url: '/song',
            method: 'get',
            params: { id: sid }
        })
       return response;
    } catch (error) {
        return error;
    }
}

export const apiGetDetaiPlaylist = async(pid) => {
    try {
        const response = await axios({
            url: '/detailplaylist',
            method: 'get',
            params: { id: pid }
        })
        return response
    } catch (error) {
        return error
    }
}

export const apiGetNewRelease=async()=>{
    try {
        const response = await axios({
            url: '/newreleasechart',
            method: 'get',
        })
        return response
    } catch (error) {
        return error
    }
}