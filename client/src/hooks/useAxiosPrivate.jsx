//this hook will actually attach the axios interceptors: which are like vanilla javscript event listeners
//interceptors are also used to handle jwt tokens and their data, also handles re-trying logic for getting a new access token

import { axiosPrivate } from "../api/axios";
import { useEffect } from "react";
import useRefreshToken from "./useRefreshToken";
import useAuth from "./useAuth";

const useAxiosPrivate = () => {
    const refresh = useRefreshToken();
    const { auth } = useAuth();

    useEffect(() => {
        const requestIntercept =  axiosPrivate.interceptors.request.use(
            (config) => {
                //if the authorization header does not exist this not a retry, since it is the first attempt
               if(!config.headers['Authorization']) {
                  config.headers['Authorization'] = `Bearer ${auth?.accessToken}`; //update the inital request's accessToken to the one in the auth state from signing or refreshing
               }
               return config;
            },
            (error) => Promise.reject(error)
        )

        const responseIntercept = axiosPrivate.interceptors.response.use(
            response => response,
            //if the token is expired the 403 error will exist and cause this async func to run
            async (error) => {
                const prevRequest = error?.config;

                if(error?.response?.status === 403 && !prevRequest?.sent) {
                    prevRequest.sent = true;         //add a custom property called sent that is a flag that represent only retry once
                    const newAccessToken = await refresh();
                    prevRequest.headers['Authorization'] = `Bearer ${newAccessToken}`;

                    return axiosPrivate(prevRequest);    //make the request again
                }
                return Promise.reject(error);
            }
        )


        //need to remove interceptors, don't want to attach more and more
        return () => {
            axiosPrivate.interceptors.response.eject(responseIntercept);
            axiosPrivate.interceptors.request.eject(requestIntercept);

        }
    }, [auth, refresh])

    return axiosPrivate;
}


export default useAxiosPrivate;
