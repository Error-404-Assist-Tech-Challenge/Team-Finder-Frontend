/* eslint-disable react/no-unescaped-entities */
/* eslint-disable no-unused-vars */
/* eslint-disable react/prop-types */

import { Card, Avatar, Modal, Button, Text, Loader, Badge } from '@mantine/core';
import { useDisclosure } from '@mantine/hooks';
import React, { useContext, useEffect, useState } from 'react';
import useAxiosPrivate from '../../hooks/useAxiosPrivate';

export default function DepartmentEmployee(props) {

    const axiosPrivate = useAxiosPrivate();
    const [opened, { open, close }] = useDisclosure(false);
    const [isHovering, setIsHovering] = useState(false);

    // Remove user skill

    const handleRemoveMember = async () => {
        props.setVisible(true);
        close();
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

            props.setMembers(response.data)

        } catch (error) {
            console.error('Error deleting department member:', error);
        }
        props.setVisible(false)
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
                {props.skills.map((skill, index) => (
                    <Badge key={index} className="m-2" color="gray" size="xl" variant="filled">{skill}</Badge>
                ))}
                <div className="pt-4 flex flex-col justify-start">
                    <p className="p-4 text-xl font-bold">{props.name}'s Endorsements:</p>
                    <Badge className="m-2" color="gray" size="xl" variant="filled">Training endorsement</Badge>
                    {/* <div className='flex flex-col'>
                        {endorsements.map((endorsement, index) =>(
                            <SkillEndorsementBadge key={index} index={index} endorsement={endorsement}/>
                        ))}
                    </div> */}
                </div>
                <div>
                    <Button className="bg-accent text-white hover:bg-btn_hover font-bold my-[20px] rounded float-right" onClick={handleRemoveMember}>
                        Remove Employee
                    </Button>
                </div>
            </Modal>

            {props.visible && (
                <div className="fixed top-1/2 left-1/2 transform -translate-x-1/2 -translate-y-1/2">
                    <Loader size={30} color="red" />
                </div>
            )}
            {!props.visible && (
                <Card className="flex w-[300px] h-[120px] bg-[#505A5E] mx-[40px] my-[20px] rounded-xl text-white select-none font-bold"
                    onClick={open} onMouseEnter={() => setIsHovering(true)} onMouseLeave={() => setIsHovering(false)}>
                    {!isHovering &&
                        <div className="flex items-center justify-left h-full">
                            <>
                                <div className="w-[75px] h-[75px] m-3">
                                    <Avatar className="w-[75px] h-[75px] bg-[#E9E5E6]">{getInitials(props.name)}</Avatar>
                                </div>
                                <div className="flex flex-col">
                                    <div className="text-xl font-bold">{props.name}</div>
                                </div>
                            </>
                        </div>
                    }
                    {isHovering &&
                        <div className="flex items-center justify-center h-full">
                            <Text className="text-lg text-center font-bold">Click to see more</Text>
                        </div>}
                </Card>)}
        </>
    )
}