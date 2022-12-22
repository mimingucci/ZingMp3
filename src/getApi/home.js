import axios from '../axios'
export const getHome = async()=>{
    try {
        const response=await axios(
            {
                url: '/home',
                method: 'get'
            }
        );
        return response
    } catch (error) {
       return error
    }
}

export const apiSearch=async(keyword)=>{
    try {
        const response=await axios(
            {
                url:'/search',
                method:'get',
                params:{keyword}
            }
        );
        return response;
    } catch (error) {
        return error;
    }
}

export const getMv=async(id)=>{
    try {
        const response=await axios(
            {
                url:'/categorymv',
                method:'get',
                params: {id: id}
            }
        );
        return response;
    } catch (error) {
        return error;
    }
}

export const getArtist=async(name)=>{
    try {
        const response=await axios(
            {
                url:'/artist',
                method:'get',
                params: {name: name}
            }
        );
        return response;
    } catch (error) {
        return error;
    }
}