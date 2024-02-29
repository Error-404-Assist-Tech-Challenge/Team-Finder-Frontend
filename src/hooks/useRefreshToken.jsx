import axios from "../api/axios";
import useAuth from "./useAuth";

const useRefreshToken = () => {
    const { auth, setAuth } = useAuth();

    const refresh = async () => {
        console.log("The token I set was: ", auth.token)
        try {
            const response = await axios.get('/users/refresh_token', {
                // withCredentials: true,
                headers: {
                    'Authorization': `Bearer ${auth.token}`,
                    'Access-Control-Allow-Headers': '*'
                }
            });

            setAuth(prev => ({
                ...prev,
                token: response.data.token
            }));

            return response.data.token;
        } catch (error) {
            console.error("Error refreshing token:", error);
            throw error;
        }
    };

    return refresh;
};

export default useRefreshToken;