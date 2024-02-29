/* eslint-disable no-unused-vars */
import axios from "../api/axios";
import useAuth from "./useAuth";
import { axiosPrivate } from "../api/axios";

const useRefreshToken = () => {
    const { auth, setAuth } = useAuth();

    const refresh = async () => {
        console.log("The token I set was: ", auth.refreshToken)
        try {
            const response = await axios.get('/users/refresh_token', {
                // withCredentials: true,
                headers: {
                    'Authorization': `Bearer ${auth.refreshToken}`,
                    'Access-Control-Allow-Headers': '*'
                }
            });

            console.log("New access token:", response.data.access_token);

            setAuth(prev => ({
                ...prev,
                accessToken: response.data.access_token
            }));

            return response.data.access_token;
        } catch (error) {
            console.error("Error refreshing token:", error);
            throw error;
        }
    };

    return refresh;
};

export default useRefreshToken;