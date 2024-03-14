/* eslint-disable no-unused-vars */
/* eslint-disable react/prop-types */
import { Card, Badge, Title, Modal, Divider, Checkbox, NumberInput, Button, Text, Textarea } from '@mantine/core';
import { useDisclosure } from '@mantine/hooks';
import { useState, useEffect } from 'react';
import { Tabs, rem, Avatar } from '@mantine/core';
import useAxiosPrivate from "../../hooks/useAxiosPrivate";


export default function ProjectEmployeeCard({ name, roles, status, tech_stack, start, deadline, description, project_id }) {


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
            <Modal opened={opened} onClose={close} size={1200}  transitionProps={{ transition: 'fade', duration: 200 }} className="dark:bg-card_modal text-white select-none" zIndex={300}>
                <div className="flex flex-col">
                    <Title className="flex justify-center">
                        {name}
                    </Title>
                    <div className='mt-[30px] w-full flex'>
                        <div className="text-[20px] px-9 py-2 w-1/2">
                            <p className="py-1"><span className="font-bold">Period</span>: {start}</p>
                            <p className="py-1"><span className="font-bold">Deadline Date</span>: {deadline}</p>
                            <p className="py-1"><span className="font-bold">Status</span>: {status}</p>
                            <p className="py-1"><span className="font-bold">Description</span>: {description}</p>
                            <div className="text-[18px] flex flex-wrap mt-2">
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
                        <div className='w-1/2'>
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
                                    
                                    <div className='mt-[40px] flex flex-wrap'>
                                        {activeMembers.map((member, index) => (
                                            <>
                                                <Card className="flex w-[250px] h-[80px] bg-[#505A5E] my-3 rounded-xl text-white select-none font-bold border border-white mx-3">
                                                    <div className="flex items-center justify-left h-full">
                                                        <>
                                                            <div className="w-[50px] h-[50px] mr-3 ">
                                                                <Avatar className="w-[50px] h-[50px] bg-[#E9E5E6]">{getInitials(member.name)}</Avatar>
                                                            </div>
                                                            <div className="flex flex-col">
                                                                <div className="text-xl font-bold">{member.name}</div>
                                                            </div>
                                                        </>
                                                    </div>
                                                </Card>
                                            </>
                                        ))}
                                    </div>
                                </Tabs.Panel>

                                <Tabs.Panel value="PastMembers">
                                    <div className='mt-[40px] flex flex-wrap'>
                                        {pastMembers.map((member, index) => (
                                            <>
                                                <Card className="flex w-[250px] h-[80px] bg-[#505A5E] my-3 rounded-xl text-white select-none font-bold border border-white mx-3">
                                                    <div className="flex items-center justify-left h-full">
                                                        <>
                                                            <div className="w-[50px] h-[50px] mr-3 ">
                                                                <Avatar className="w-[50px] h-[50px] bg-[#E9E5E6]">{getInitials(member.name)}</Avatar>
                                                            </div>
                                                            <div className="flex flex-col">
                                                                <div className="text-xl font-bold">{member.name}</div>
                                                            </div>
                                                        </>
                                                    </div>
                                                </Card>
                                            </>
                                        ))}
                                    </div>
                                </Tabs.Panel>
                            </Tabs>
                        </div>
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
                                        <>
                                            
                                            <Badge color="gray  " className='mx-2 my-1'>{role.role_name}</Badge>
                                        </>
                                    ))}
                                
                            </div>
                            <div className="text-[18px] pt-4 pl-4 flex flex-wrap">
                                    <p className='font-bold'>Tech stack: </p>
                                    {tech_stack.map((tech, index) => (
                                        <>
                                            
                                            <Badge color="gray  " className='mx-1 my-1'>{tech.skill_name}</Badge>
                                        </>
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