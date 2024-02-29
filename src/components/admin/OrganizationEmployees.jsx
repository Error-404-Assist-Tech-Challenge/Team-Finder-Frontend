/* eslint-disable no-unused-vars */
import { Button, Loader } from '@mantine/core';
import { useHeadroom } from '@mantine/hooks';
import React, { useContext, useEffect, useRef, useState } from 'react';
import { Context } from '../../App';
import Users from './Users';

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
            <div className='dark:bg-darkcanvas bg-canvas h-screen flex flex-wrap'>
             {visible && (
                        <div className="fixed top-1/2 left-1/2 transform -translate-x-1/2 -translate-y-1/2">
                            <Loader size={30} color="red" />
                        </div>
                    )}
                {!visible &&
                <Users />}
                {!visible &&
                <Button className='w-[300px] h-[230px] mx-[40px] my-[20px] rounded-xl select-none
                                bg-accent text-white text-2xl'>
                    Need more employees
                </Button>}
            </div>
        </div>
    )
}