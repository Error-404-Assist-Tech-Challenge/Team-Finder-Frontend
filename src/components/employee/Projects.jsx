/* eslint-disable no-unused-vars */
import { useHeadroom } from '@mantine/hooks';
import React, { useContext, useEffect } from 'react';
import { Context } from '../../App';

export default function ProjectsPage() {

    const [darkMode, setDarkMode] = useContext(Context);
    const pinned = useHeadroom({ fixedAt: 20 });

    useEffect(() => {

    }, [darkMode]);

    return (
        <>
            <p className='dark:text-darktext text-text text-xl m-[20px] '>Projects</p>
        </>
    )
}