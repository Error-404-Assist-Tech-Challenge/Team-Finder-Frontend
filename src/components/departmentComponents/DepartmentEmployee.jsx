/* eslint-disable react/no-unescaped-entities */
/* eslint-disable no-unused-vars */
/* eslint-disable react/prop-types */

import { Card, Avatar, Modal, Button, Text, Title, Badge } from '@mantine/core';
import { useDisclosure } from '@mantine/hooks';
import React, { useContext, useEffect, useState } from 'react';
import useAxiosPrivate from '../../hooks/useAxiosPrivate';

export default function DepartmentEmployee(props) {

    const axiosPrivate = useAxiosPrivate();
    const [opened, { open, close }] = useDisclosure(false);
    const [isHovering, setIsHovering] = useState(false);

    const skills = [
        "Programming Languages",
        "Data Structures",
        "Algorithms",
        "Object-Oriented Design",
        "Database Management",
        "Web Development",
        "Software Engineering",
        "Version Control Systems",
        "Networking",
        "Operating Systems"
    ]

    // Remove user skill

    const handleRemoveMember = async () => {
        try {
            const userId = props.user_id;
            const response = await axiosPrivate.delete('departments/members', {
                headers: {
                    'Content-Type': 'application/json',
                    'Access-Control-Allow-Origin': '*',
                    'Access-Control-Allow-Credentials': 'true'
                },
                data: {
                    user_id: userId
                },
                withCredentials: true
            });
            console.log('Response:', response.data);

        } catch (error) {
            console.error('Error deleting department member:', error);
        }
        close();
    }

    const getInitials = (name) => {
        const names = name.split(' ');
        return names.map((name) => name[0]).join('').toUpperCase();
    };

    return (
        <>
            <Modal opened={opened} onClose={close} centered overflow="inside" size="500" className="bg-graybg text-white select-none" zIndex={1000002}>
                <div className="flex items-center pb-5">
                    <Avatar className="m-3 w-[75px] h-[75px] bg-[#E9E5E6] bigavatar">{getInitials(props.name)}</Avatar>
                    <div className="flex flex-col">
                        <div className="text-3xl font-bold">{props.name}</div>
                    </div>
                </div>
                <div className="pt-4 flex justify-start">
                    <p className="p-4 text-xl font-bold">{props.name}'s Skills:</p>
                </div>
                {skills.map((skill, index) => (
                    <Badge key={index} className="m-2" color="gray" size="xl" variant="filled">{skill}</Badge>
                ))}

            </Modal>

            <Card className="flex w-[240px] h-[120px] bg-[#505A5E] mx-[40px] my-[20px] rounded-xl text-white select-none font-bold"
                onClick={open} onMouseEnter={() => setIsHovering(true)} onMouseLeave={() => setIsHovering(false)}>
                <div className="flex items-center justify-left h-full">
                    {!isHovering &&
                        <>
                            <Avatar className="m-3 w-16 h-16 bg-[#E9E5E6]">{getInitials(props.name)}</Avatar>
                            <div className="flex flex-col">
                                <div className="text-xl font-bold">{props.name}</div>
                            </div>
                        </>}
                    {isHovering && <Text className="text-xl font-bold">Remove</Text>}
                </div>
            </Card>
        </>
    )
}