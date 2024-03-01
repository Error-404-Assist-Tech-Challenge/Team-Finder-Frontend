/* eslint-disable no-unused-vars */

import axios from "../api/axios";
import useAuth from "./useAuth";

const useRefreshToken = () => {
    const { auth, setAuth } = useAuth();

    const refresh = async () => {
        try {
            const response = await axios.get('users/refresh_token', {
                withCredentials: true,
                headers: {
                    "Access-Control-Allow-Origin": "http://localhost:5173/",
                },
            });

            console.log("New access token:", response.data.access_token);

            const name = response.data.name;
            const email = response.data.email;
            const accessToken = response.data.access_token;
            const organization = response.data.org_name;
            const address = response.data.hq_address;
            const roles = [...response.data.roles];

            setAuth({ name, email, organization, address, roles, accessToken })

            return response.data.access_token;
        } catch (error) {
            console.error("Error refreshing token:", error);
            throw error;
        }
    };

    return refresh;
};

export default useRefreshToken;