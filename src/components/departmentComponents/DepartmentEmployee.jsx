/* eslint-disable no-unused-vars */
/* eslint-disable react/prop-types */

import { Card, Avatar, Modal, Button, Text, Title } from '@mantine/core';
import { useDisclosure } from '@mantine/hooks';
import React, { useContext, useEffect, useState } from 'react';
import useAxiosPrivate from '../../hooks/useAxiosPrivate';

export default function DepartmentEmployee(props) {

    const axiosPrivate = useAxiosPrivate();
    const [opened, { open, close }] = useDisclosure(false);
    const [isHovering, setIsHovering] = useState(false);

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
            <Modal opened={opened} onClose={close} centered overflow="inside" className="bg-graybg text-white select-none" zIndex={1000002} closeOnClickOutside={false}>
                <h1 className="flex justify-center text-lg font-bold" style={{ whiteSpace: 'pre' }}>
                    Are you sure you want to remove this employee?
                </h1>
                <div className="p-[10px]">
                    <Button className="bg-light-grey hover:bg-transparent text-white font-bold px-4 py-2 rounded mx-[10px] my-[10px] mt-[20px] border-white" onClick={close}>
                        Cancel
                    </Button>
                    <Button className="bg-btn_hover text-white hover:bg-accent font-bold px-4 py-2 rounded mx-[10px] my-[10px] mt-[20px] float-right" onClick={handleRemoveMember}>
                        Confirm
                    </Button>
                </div>
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