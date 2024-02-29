/* eslint-disable no-unused-vars */
import axios from "../api/axios";
import useAuth from "./useAuth";
import { axiosPrivate } from "../api/axios";

const useRefreshToken = () => {
    const { auth, setAuth } = useAuth();

    const refresh = async () => {
        try {
            const response = await axios.get('/users/refresh_token', {
                withCredentials: true,
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