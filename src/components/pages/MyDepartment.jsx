/* eslint-disable no-unused-vars */

import React, { useContext, useEffect } from 'react';
import { useHeadroom } from '@mantine/hooks';

import { Context } from '../../App';

export default function MyDepartment() {

    const [darkMode, setDarkMode] = useContext(Context);
    const pinned = useHeadroom({ fixedAt: 20 });

    useEffect(() => {

    }, [darkMode]);

    return (
        <>
            <p className='dark:text-darktext text-text text-xl m-[20px] '>My Department</p>
        </>
    )
}