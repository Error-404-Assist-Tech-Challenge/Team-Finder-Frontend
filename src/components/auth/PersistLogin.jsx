/* eslint-disable react-hooks/exhaustive-deps */
/* eslint-disable no-unused-vars */
import { Outlet } from "react-router-dom"
import { useState, useEffect } from "react"
import useRefreshToken from '../../hooks/useRefreshToken'
import useAuth from '../../hooks/useAuth'
import { useContext } from 'react';
import { Context } from '../../App';
import { Loader } from '@mantine/core';

const PersistLogin = () => {
    const [isLoading, setIsLoading] = useState(true);
    const refresh = useRefreshToken();
    const { auth } = useAuth();

    const [darkMode, setDarkMode] = useContext(Context);

    useEffect(() => {
        const verifyRefreshToken = async () => {
            try {
                await refresh();
            }
            catch(error) {
                console.error(error);
            }
            finally {
                setIsLoading(false);
            }
        }
        !auth?.accessToken ? verifyRefreshToken() : setIsLoading(false);
    }, [])

    return (
        <>
        {isLoading
            ? <div className={`${darkMode && 'dark'}`}>
                <div className='dark:bg-darkcanvas bg-canvas h-screen select-none'>
                    <div className="fixed top-1/2 left-1/2 transform -translate-x-1/2 -translate-y-1/2">
                        <Loader size={30} color="red" />
                    </div>
                </div>
              </div>
            : <Outlet/>
            }
        </>
    )
}

export default PersistLogin