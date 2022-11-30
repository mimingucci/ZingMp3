import axios from '../axios'
export const getHome = ()=> new Promise(async(resolve, reject)=>{
    try {
        const response=await axios.get({url:"/home"});
        resolve(response);
    } catch (error) {
        reject(error);
    }
})