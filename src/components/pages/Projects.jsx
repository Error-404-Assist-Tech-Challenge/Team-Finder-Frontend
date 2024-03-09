/* eslint-disable no-unused-vars */

import React, { useContext, useEffect } from 'react';
import { useDisclosure } from '@mantine/hooks';
import { useState } from 'react';
import { useHeadroom } from '@mantine/hooks';
import { Card, Text, Title, Modal } from '@mantine/core';
import { Context } from '../../App';

export default function ProjectsPage() {

    const [darkMode, setDarkMode] = useContext(Context);
    const pinned = useHeadroom({ fixedAt: 20 });
    const [isHovering, setIsHovering] = useState(false);
    const [opened, { open, close }] = useDisclosure(false);

    useEffect(() => {

    }, [darkMode]);

    return (
        <div className={`${darkMode && 'dark'}`}>
            <Modal  opened={opened}
                    onClose={close}
                    title="This is a fullscreen modal"
                    fullScreen
                    radius={0}
                    transitionProps={{ transition: 'fade', duration: 200 }} className="dark:bg-card_modal text-white select-none" zIndex={1000002}>
                Project details
            </Modal>
            <div className='dark:bg-darkcanvas bg-canvas h-auto min-h-screen select-none'>
                <Card className="flex w-[330px] h-[230px] dark:bg-card_modal mx-[40px] my-[00px] rounded-xl dark:text-darktext text-text select-none font-bold"
                       onClick={open} onMouseEnter={() => setIsHovering(true)} onMouseLeave={() => setIsHovering(false)}>
                    <Card.Section className="dark:bg-[#495256]">
                        <Title className="p-4 flex justify-center">
                            25H usv
                        </Title>
                    </Card.Section>
                    <div className="flex justify-center items-center flex-col text-center h-full">
                        {!isHovering && (
                            <>
                                <Text>Members:</Text>
                                <Text>Due to:</Text>
                            </>
                        )}
                        {isHovering && <Text className="text-xl">Click to see more!</Text>}
                    </div>
                </Card>
            </div>
        </div>
    )
}