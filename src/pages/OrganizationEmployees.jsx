/* eslint-disable no-unused-vars */
import GenericHeader from './components/header';
import { Avatar } from '@mantine/core';
import { Box, Portal, ScrollArea, Button, rem } from '@mantine/core';
import { useHeadroom } from '@mantine/hooks';
import React, { useContext, useEffect } from 'react';
import { Context } from '../App';
import EmployeeCard from './components/employeeCard';
import employeesData from './fakedb/employeesData'

export default function OrganizationEmployeesPage() {

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
                            <div className='dark:bg-darkcanvas bg-canvas h-screen flex flex-wrap'>
                                {employeesData.map((employee, index) => (
                                    <EmployeeCard key={index} employee={employee} />
                                ))}
                                <Button className='w-[300px] h-[230px] bg-accent mx-[40px] my-[20px] rounded-xl dark:text-darktext text-text select-none'>
                                    <h2 className='text-2xl block'>Need more employees?</h2>
                                </Button>

                            </div>
                        </div>
                    </Portal>
                </ScrollArea>
            </div>
        </>
    )
}