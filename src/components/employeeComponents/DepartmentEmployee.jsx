/* eslint-disable no-unused-vars */
/* eslint-disable react/prop-types */

import { Card, Avatar, Modal, Badge, Button, Text, Title } from '@mantine/core';
import { useDisclosure } from '@mantine/hooks';
import React, { useContext, useEffect, useState } from 'react';
import useAxiosPrivate from '../../hooks/useAxiosPrivate';
import { MultiSelect } from '@mantine/core';

export default function DepartmentEmployee(props) {

    const axiosPrivate = useAxiosPrivate();
    const [opened, { open, close }] = useDisclosure(false);
    const [isHovering, setIsHovering] = useState(false);
    const [avalaible, setAvalaible] = useState([]);
    const [visible, setVisible] = useState(false);
    const list = []

    const getInitials = (name) => {
        const names = name.split(' ');
        return names.map((name) => name[0]).join('').toUpperCase();
    };

    // Function that gets all the avalaible members

    useEffect(() => {
        let isMounted = true;
        const controller = new AbortController();

        const getAvalaibleMembers = async () => {
            try {
                const response = await axiosPrivate.get('departments/members/available', {
                    signal: controller.signal,
                    withCredentials: true
                });
                console.log('Avalaible employees:', response.data);
                isMounted && setAvalaible(response.data)
                console.log({avalaible})
            } catch (error) {
                console.error('Error fetching members without department:', error);
            }
            finally {
                const timeout = 200;
                setTimeout(() => {
                    setVisible(true);
                }, timeout);
            }
        }

        getAvalaibleMembers();

        return () => {
            isMounted = false;
            controller.abort();
        }
    }, [])

    for(let i = 0; i < avalaible.length; i = i + 1)
        list[i] = avalaible[i].name
    
    return (
        <>
            <Modal opened={opened} onClose={close} centered overflow="inside" className="bg-graybg text-white select-none" zIndex={1000002} closeOnClickOutside={false}>
                <MultiSelect
                    label="Your favorite libraries"
                    placeholder="Pick value"
                    data={list}
                    searchable
                    nothingFoundMessage="Nothing found..."
                    comboboxProps={{ zIndex: 1000000000 }}
                    clearable/>
                    <div className="flex justify-center">
                        <Button className="bg-accent text-white hover:bg-btn_hover font-bold py-2 rounded mx-auto mt-10" onClick={close}>
                                        Add Employees
                        </Button>
                    </div>
            </Modal>

            <Card className="flex w-[240px] h-[120px] bg-[#505A5E] mx-[40px] my-[20px] rounded-xl text-white select-none font-bold"
                onClick={open} onMouseEnter={() => setIsHovering(true)} onMouseLeave={() => setIsHovering(false)}>
                <div className="flex items-center justify-center h-full">
                    {!isHovering &&
                        <>                    
                            <Avatar className="m-3 w-16 h-16 bg-[#E9E5E6]">{getInitials(props.name)}</Avatar>
                            <div className="flex flex-col">
                                <div className="text-xl font-bold">{props.name}</div>
                            </div>
                        </>}
                    {isHovering && <Text className="text-xl">Click to see more!</Text>}
                </div>
            </Card>
        </>
    )
}