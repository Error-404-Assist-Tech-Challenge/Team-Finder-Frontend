/* eslint-disable no-unused-vars */
import GenericHeader from './components/header';
import { ScrollArea } from '@mantine/core';
import { Box, Portal, rem, Table } from '@mantine/core';
import { useHeadroom } from '@mantine/hooks';
import { useContext, useEffect } from 'react';
import { Context } from '../App';

export default function OrganizationDepartmentsPage() {

    const [darkMode, setDarkMode] = useContext(Context);
    const pinned = useHeadroom({ fixedAt: 20 });

    useEffect(() => {

    }, [darkMode]);

    return (
        <div className={`${darkMode && 'dark'}`}>
            <div className='dark:bg-darkcanvas bg-canvas h-screen'>
                <ScrollArea h={rem(140)}>
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
                                transition: 'transform 200ms ease',
                            }}
                        >
                            <GenericHeader />
                            <h1>Departments</h1>
                        </Box>
                    </Portal>
                </ScrollArea>
            </div>
        </div>
    )
}