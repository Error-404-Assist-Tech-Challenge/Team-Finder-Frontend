/* eslint-disable no-unused-vars */
import GenericHeader from './components/header';
import { ScrollArea } from '@mantine/core';
import { Box, Portal, rem } from '@mantine/core';
import { useHeadroom } from '@mantine/hooks';
import React, { useContext, useEffect } from 'react';
import { Context } from '../App';

export default function MyProjectsPage() {

    const [darkMode, setDarkMode] = useContext(Context);
    const pinned = useHeadroom({ fixedAt: 20 });

    useEffect(() => {

    }, [darkMode]);

    return (
        <>
            <div className={`${darkMode && 'dark'}`}>
                <ScrollArea h={rem(140)} className='dark:bg-darkcanvas bg-canvas'>
                    <Portal>
                        <Box
                            style={{
                                position: 'fixed',
                                top: 0,
                                left: 0,
                                right: 0,
                                height: rem(60),
                                zIndex: 1000000,
                                transform: `translate3d(0, ${pinned ? 0 : rem(-80)}, 0)`,
                                transition: 'transform 400ms ease',
                            }}
                        >
                            <GenericHeader />
                        </Box>
                        <div className={`${darkMode && 'dark'}`}>
                            <div className='dark:bg-darkcanvas bg-canvas h-auto'>
                                <h1 className='text-white'>My Projects1</h1>
                            </div>
                            <div className='dark:bg-darkcanvas bg-canvas h-screen'></div>
                        </div>
                    </Portal>
                </ScrollArea>
            </div>
        </>
    )
}