/* eslint-disable react/no-unescaped-entities */
/* eslint-disable no-unused-vars */
/* eslint-disable react/prop-types */

import { Card, Avatar, Modal, Button, Text, Loader, Badge } from '@mantine/core';
import { useDisclosure } from '@mantine/hooks';
import React, { useState } from 'react';
import useAxiosPrivate from '../../hooks/useAxiosPrivate';

export default function ProjectEmployee({ employee }) {

    const axiosPrivate = useAxiosPrivate();
    const [opened, { open, close }] = useDisclosure(false);
    const [isHovering, setIsHovering] = useState(false);

    const getInitials = (name) => {
        const names = name.split(' ');
        return names.map((name) => name[0]).join('').toUpperCase();
    };

    return (
        <>
            <Button className="flex bg-[#495256] h-[90px] w-[220px] p-0 mx-[20px] my-[10px] rounded-xl text-white select-none font-bold"
                onClick={open} onMouseEnter={() => setIsHovering(true)} onMouseLeave={() => setIsHovering(false)}>
                <div className="flex items-center justify-center h-full w-[220px]">
                    {!isHovering &&
                        <>
                            <Avatar className="w-[60px] h-[60px] mr-2 bg-[#E9E5E6]">{getInitials(employee.name)}</Avatar>
                            <div className="text-xl font-bold text-left">
                                {employee.name.split(' ').slice(0, 2).map((word, index) => (
                                    <div key={index}>{word}</div>
                                ))}
                            </div>
                        </>}
                    {isHovering && <Text className="text-lg font-bold text-center">Click to see more</Text>}
                </div>
            </Button>
        </>
    )
}