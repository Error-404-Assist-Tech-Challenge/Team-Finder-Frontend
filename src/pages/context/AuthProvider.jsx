/* eslint-disable react/prop-types */
import { createContext, useState } from "react";

const AuthContext = createContext({});

export const AuthProvider = ({children}) => {
    const [auth, setAuth] = useState({});

    return (
        <AuthContext.Provide value={{auth, setAuth}}>
            {children}
        </AuthContext.Provide>
    )
}

export default AuthContext;