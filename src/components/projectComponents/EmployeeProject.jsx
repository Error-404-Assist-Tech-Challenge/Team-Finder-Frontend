/* eslint-disable no-unused-vars */
/* eslint-disable react/prop-types */
import { Card, Badge, Title, Modal, Divider, Checkbox, NumberInput, Button, Text, Textarea } from '@mantine/core';
import { useDisclosure } from '@mantine/hooks';
import { useState, useEffect } from 'react';
import { Tabs, rem, Avatar } from '@mantine/core';
import useAxiosPrivate from "../../hooks/useAxiosPrivate";


export default function ProjectEmployeeCard({ name, roles, period, status, tech_stack, start, deadline, description, project_id }) {


    const axiosPrivate = useAxiosPrivate();
    const [opened, { open, close }] = useDisclosure(false);
    const [isHovering, setIsHovering] = useState(false);
    const [visible, setVisible] = useState(false);
    const [pastMembers, setPastMembers] = useState([])
    const [activeMembers, setActiveMembers] = useState([])

    const getInitials = (name) => {
        const names = name.split(' ');
        return names.map((name) => name[0]).join('').toUpperCase();
    };

    useEffect(() => {
        let isMounted = true;
        const controller = new AbortController();

        const fetchMembers = async () => {
            try {
                const response = await axiosPrivate.get(
                    'projects/search_employees',
                    {
                        params: {
                            proj_id: project_id,
                        },
                        headers: {
                            'Content-Type': 'application/json',
                            'Access-Control-Allow-Origin': '*',
                            'Access-Control-Allow-Credentials': 'true'
                        },
                        withCredentials: true
                    }
                );
                console.log('Project Employees:', response.data);
                isMounted && setActiveMembers(response.data.active);
                isMounted && setPastMembers(response.data.past);
                setVisible(true);
                // setActiveMembers(response.data.active);
                // setPastMembers(response.data.past);
            } catch (error) {
                console.error('Error fetching project employees:', error);
            }
        }
        fetchMembers();
        return () => {
            isMounted = false;
            controller.abort();
        }
    }, [])
    // console.log("ROLES:", roles)

    return (
        <>
            <Modal opened={opened} onClose={close} size={550} transitionProps={{ transition: 'fade', duration: 200 }} className="dark:bg-card_modal text-white select-none" zIndex={300}>
                <div className="flex flex-col">
                    <Title className="flex justify-center">
                        {name}
                    </Title>
                    <div className='mt-[30px] w-full'>
                        <div className="text-[20px] px-9 py-2">
                            <p className="py-1"><span className="font-bold">Period</span>: {period}</p>
                            <p className="py-1"><span className="font-bold">Start Date</span>: {start.substring(0, 10)}</p>
                            {deadline &&
                                <p className="py-1"><span className="font-bold">Deadline Date</span>: {deadline.substring(0, 10)}</p>
                            }
                            <p className="py-1"><span className="font-bold">Status</span>: {status}</p>
                            <p className="py-1"><span className="font-bold">Description</span>: {description}</p>
                            <div className="text-[20px] flex flex-wrap mt-2">
                                <p className='font-bold my-1'>Tech stack: </p>
                                {tech_stack.map((tech, index) => (
                                    <>
                                        <Badge color="gray " size='lg' className='mx-2 my-1.5'>{tech.skill_name}</Badge>
                                    </>
                                ))}
                            </div>
                            <div className="flex items-center flex-wrap">
                                {/* Render technology stack badges here */}
                            </div>
                        </div>
                        <Tabs defaultValue="ActiveMembers" color="#FF3D2E">
                            <Tabs.List grow>
                                <Tabs.Tab value="ActiveMembers" className="text-xl w-[120px]">
                                    Project Team
                                </Tabs.Tab>
                                <Tabs.Tab value="PastMembers" className="text-xl w-[120px]">
                                    Past Members
                                </Tabs.Tab>
                            </Tabs.List>

                            <Tabs.Panel value="ActiveMembers">

                                <div className='py-7 w-full flex flex-wrap justify-center'>
                                    {activeMembers.map((member, index) => (
                                        <Button className="flex bg-[#878e96] h-[90px] w-[220px] px-0 mx-[10px] my-[10px] rounded-xl text-white select-none font-bold" key={index}>
                                            <div className="flex items-center justify-center h-full">
                                                {!isHovering &&
                                                    <>
                                                        <Avatar className="w-[60px] h-[60px] m-3 bg-[#E9E5E6]">{getInitials(member.name)}</Avatar>
                                                        <div className="text-xl font-bold text-left">
                                                            {member.name.split(' ').slice(0, 2).map((word, index) => (
                                                                <div key={index}>{word}</div>
                                                            ))}
                                                        </div>
                                                    </>}
                                            </div>
                                            <div className="flex items-center justify-center h-full w-[220px]">
                                                {isHovering && <Text className="text-lg font-bold text-center">Click to see more</Text>}
                                            </div>
                                        </Button >
                                    ))}
                                </div>
                            </Tabs.Panel>
                            <Tabs.Panel value="PastMembers">
                                <div className='py-7 w-full flex flex-wrap justify-center'>
                                    {pastMembers.map((member, index) => (
                                        <Button className="flex bg-[#878e96] h-[90px] w-[220px] px-0 mx-[10px] my-[10px] rounded-xl text-white select-none font-bold" key={index}>
                                            <div className="flex items-center justify-center h-full">
                                                {!isHovering &&
                                                    <>
                                                        <Avatar className="w-[60px] h-[60px] m-3 bg-[#E9E5E6]">{getInitials(member.name)}</Avatar>
                                                        <div className="text-xl font-bold text-left">
                                                            {member.name.split(' ').slice(0, 2).map((word, index) => (
                                                                <div key={index}>{word}</div>
                                                            ))}
                                                        </div>
                                                    </>}
                                            </div>
                                            <div className="flex items-center justify-center h-full w-[220px]">
                                                {isHovering && <Text className="text-lg font-bold text-center">Click to see more</Text>}
                                            </div>
                                        </Button >
                                    ))}
                                </div>
                            </Tabs.Panel>
                        </Tabs>
                    </div>
                </div>
            </Modal>

            <Card className="flex w-[350px] h-[300px] dark:bg-card_modal mx-[40px] rounded-xl dark:text-darktext text-text select-none "
                onMouseEnter={() => setIsHovering(true)} onMouseLeave={() => setIsHovering(false)}>
                <Card.Section className="dark:bg-[#495256]" onClick={open}>
                    <Title className="py-6 px-2 flex justify-center text-center text-[28px]">
                        {name}
                    </Title>
                </Card.Section>
                <div className="h-[250px]" onClick={open}>
                    {!isHovering && (
                        <>
                            <div className="text-[18px] pt-4 pl-4 flex flex-wrap">
                                <p className='font-bold'>Roles: </p>
                                {roles.map((role, index) => (
                                    <Badge key={index} color="gray" className='mx-2 my-1'>{role.role_name}</Badge>
                                ))}

                            </div>
                            <div className="text-[18px] pt-4 pl-4 flex flex-wrap">
                                <p className='font-bold'>Tech stack: </p>
                                {tech_stack.map((tech, index) => (
                                    <Badge color="gray" key={index} className='mx-1 my-1'>{tech.skill_name}</Badge>
                                ))}
                            </div>
                            <p className="text-[18px] pt-4 pl-4 flex flex-wrap"><span className="font-bold">Status</span>: {status}</p>
                        </>
                    )}
                    {isHovering && (
                        <div className="flex h-full w-full justify-center text-center items-center">
                            <p className="text-xl text-center">Click to see more!</p>
                        </div>
                    )}
                </div>
            </Card >
        </>
    )
}