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
