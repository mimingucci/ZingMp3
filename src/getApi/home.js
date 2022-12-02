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
