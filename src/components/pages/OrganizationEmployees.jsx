/* eslint-disable no-unused-vars */
import { Button, Loader } from '@mantine/core';
import { useHeadroom } from '@mantine/hooks';
import React, { useContext, useEffect, useRef, useState } from 'react';
import { Context } from '../../App';
import Users from '../employeeComponents/Users';
import useRefreshToken from '../../hooks/useRefreshToken';

export default function OrganizationEmployeesPage() {

    const refresh = useRefreshToken();
    const [darkMode, setDarkMode] = useContext(Context);
    const pinned = useHeadroom({ fixedAt: 20 });

    useEffect(() => {
    }, [darkMode]);

    return (
        <div className={`${darkMode && 'dark'}`}>
            <div className='dark:bg-darkcanvas bg-canvas h-screen flex flex-wrap'>
                <Users />
                {/* <Button className='w-[300px] h-[230px] mx-[40px] my-[20px] rounded-xl select-none
                                bg-accent text-white text-2xl hover:bg-btn_hover font-bold text-white'
                                onClick={()=>refresh()}>
                    Need more employees
                </Button> */}
            </div>
        </div>
    )
}