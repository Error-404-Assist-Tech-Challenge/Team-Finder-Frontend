/* eslint-disable no-unused-vars */
/* eslint-disable react/prop-types */

import { Card, Avatar, Modal, Badge, Button, Text, Title } from '@mantine/core';
import { useDisclosure } from '@mantine/hooks';
import { useState } from 'react'
import useAxiosPrivate from '../../hooks/useAxiosPrivate';

export default function DepartmentEmployee(props) {

    const axiosPrivate = useAxiosPrivate();
    const [opened, { open, close }] = useDisclosure(false);
    const [isHovering, setIsHovering] = useState(false);
    const getInitials = (name) => {
        const names = name.split(' ');
        return names.map((name) => name[0]).join('').toUpperCase();
    };

    return (
        <>
            <Modal opened={opened} onClose={close} centered overflow="inside" className="bg-graybg text-white select-none" zIndex={1000002}>
               blablsa
            </Modal>

            <Card className="flex w-[240px] h-[184px] bg-[#505A5E] mx-[40px] my-[20px] rounded-xl text-white select-none font-bold"
                onClick={open} onMouseEnter={() => setIsHovering(true)} onMouseLeave={() => setIsHovering(false)}>
                <div className="flex items-center">
                    <Avatar className="m-3 w-[50px] h-[50px] bg-[#E9E5E6]">{getInitials(props.name)}</Avatar>
                    <div className="flex flex-col">
                        <div className="text-xl font-bold">{props.name}</div>
                    </div>
                </div>
                <div className="flex justify-center items-center flex-col text-center h-full">
                    {isHovering && <Text className="text-xl">Click to see more!</Text>}
                </div>
            </Card>
        </>
    )
}