/* eslint-disable no-unused-vars */
import { Button, LoadingOverlay } from '@mantine/core';
import { useHeadroom } from '@mantine/hooks';
import React, { useContext, useEffect, useState } from 'react';
import { Context } from '../App';
import Users from './components/users';

export default function OrganizationEmployeesPage() {

    const [darkMode, setDarkMode] = useContext(Context);
    const pinned = useHeadroom({ fixedAt: 20 });
    const [visible, setVisible] = useState(true);

    useEffect(() => {
        const timeout = 400;
        setTimeout(() => {
            setVisible(false);
        }, timeout);
    }, [darkMode]);

    return (
        <div className={`${darkMode && 'dark'}`}>
            <LoadingOverlay visible={visible} zIndex={1000} overlayProps={{ radius: "sm", blur: 3 }} />
            <div className='dark:bg-darkcanvas bg-canvas h-screen flex flex-wrap'>
                <Users />
                <Button className='w-[300px] h-[230px] mx-[40px] my-[20px] rounded-xl select-none
                                bg-accent text-white'>
                    <h2 className='text-2xl block'>Need more employees?</h2>
                </Button>
            </div>
        </div>
    )
}