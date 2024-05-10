/* eslint-disable react/prop-types */
/* eslint-disable no-unused-vars */

import React, { useContext, useEffect } from 'react';
import { ScrollArea, Box, Portal, rem } from '@mantine/core';
import { useHeadroom } from '@mantine/hooks';

import { Context } from '../../App';
import useAuth from '../../hooks/useAuth'
import GenericHeader from '../layout/Header';
import { useMediaQuery } from '@mantine/hooks';


export default function MainPage({Content}) {
    
    const isMobile = useMediaQuery('(max-width: 640px)');
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
                                transform: `translate3d(0, ${pinned ? 0 : (isMobile ? 0 : rem(-80))}, 0)`, // Conditional transformation
                                transition: 'transform 400ms ease',
                                width: '100%',
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