/* eslint-disable react/prop-types */
/* eslint-disable no-unused-vars */

import React, { useContext, useEffect } from 'react';
import { ScrollArea, Box, Portal, rem } from '@mantine/core';
import { useHeadroom } from '@mantine/hooks';

import { Context } from '../../App';
import useAuth from '../../hooks/useAuth'
import GenericHeader from '../layout/Header';


export default function MainPage({Content}) {

    const { setAuth } = useAuth();
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
                                zIndex: 200,
                                transform: `translate3d(0, ${pinned ? 0 : rem(-80)}, 0)`,
                                transition: 'transform 400ms ease',
                            }}
                            >
                            <GenericHeader />
                        </Box>
                            <div className='dark:bg-darkcanvas bg-canvas h-auto'>
                                
                                <Content />

                            </div>
                    </Portal>
                </ScrollArea>
            </div>
        </>
    )
}