/* eslint-disable react/prop-types */
/* eslint-disable no-unused-vars */

import { Card, Badge, Modal, Button, Text, Title, TextInput, Textarea, Divider, HoverCard } from '@mantine/core';
import { useDisclosure } from '@mantine/hooks';
import { useState, useContext, useEffect } from 'react';
import LevelCirclesCard from './LevelCirclesCard'
import LevelCirclesModal from './LevelCirclesModal'
import ExperienceCirclesCard from './ExperienceCirclesCard'
import ExperienceCirclesModal from './ExperienceCirclesModal'
import { Context } from '../../App';
import useAxiosPrivate from '../../hooks/useAxiosPrivate';
import { modals } from '@mantine/modals';
import { notifications } from '@mantine/notifications';
import { IconCheck } from '@tabler/icons-react';

export default function SkillEndorsementBadge({endorsement, setEditEndorsement}) {

    const [darkMode, setDarkMode] = useContext(Context);
    const axiosPrivate = useAxiosPrivate();

    const handleEditEndorsment = async () => {
        setEditEndorsement(true)
    }

    return (
        <>
            <div className={`${darkMode && 'dark'}`}>
                <div className="flex flex-wrap"> 
                    <HoverCard width={280} shadow="md" zIndex={100000000}>
                        <HoverCard.Target>
                            <Badge variant="filled" color="rgba(250, 245, 240, 1)" size="lg" radius="lg" className='text-black my-[20px] mx-[10px]'>
                                <Button variant="outline" className={`w-[40px] h-[20px] mb-[3px] mr-[10px] rounded-full p-0 text-accent border-accent border-2`} onClick={handleEditEndorsment}>
                                    Edit
                                </Button>
                                {endorsement.type}: {endorsement.endo}
                                <Button variant="outline" className={`w-[20px] h-[20px] mb-[3px] ml-[10px] rounded-full p-0 text-accent border-accent border-2`}>
                                    <svg xmlns="http://www.w3.org/2000/svg" className="icon icon-tabler icon-tabler-minus w-[12px] h-[12px]" width="24" height="24" viewBox="0 0 24 24" strokeWidth="3" stroke="currentColor" fill="none" strokeLinecap="round" strokeLinejoin="round">
                                        <path stroke="none" d="M0 0h24v24H0z" fill="none" />
                                        <path d="M5 12l14 0" />
                                    </svg>
                                </Button>
                            </Badge>
                        </HoverCard.Target>
                        <HoverCard.Dropdown>
                        <Text size="sm">
                            {endorsement.description}
                        </Text>
                        </HoverCard.Dropdown>
                    </HoverCard>
                </div>
            </div>
        </>
    )
}
