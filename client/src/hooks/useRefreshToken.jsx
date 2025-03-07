import axios from '../api/axios';
import useAuth from './useAuth';

const useRefreshToken = () => {
    const { setAuth } = useAuth();

    //this func will be called when the first request fails/accessToken is expired then it will get a new access token
    const refresh = async () => {
        const response = await axios.get('/api/refresh', {
            withCredentials: true   //needed for httpCookies, to send to the /api/refresh endpoint
        });

        //this will update the state in the auth provider with the new accessToken
        setAuth(prev => {
            return {...prev, accessToken: response.data.accessToken }  //update the prev state with a new accessToken
        })
        return response.data.accessToken 
    }
    return refresh;
}

export default useRefreshToken;
