/* eslint-disable no-unused-vars */
/* eslint-disable react/prop-types */
import { Card, Badge, Title, Modal, Divider, Checkbox, NumberInput, Button, Text, Textarea } from '@mantine/core';
import { useDisclosure } from '@mantine/hooks';
import { useState, useEffect } from 'react';
import { Tabs, rem, Avatar } from '@mantine/core';


export default function ProjectEmployeeCard({key, name, roles }) {

    

    const [opened, { open, close}] = useDisclosure(false);
    const [isHovering, setIsHovering] = useState(false);
    const [visible, setVisible] = useState(false);

    const getInitials = (name) => {
        const names = name.split(' ');
        return names.map((name) => name[0]).join('').toUpperCase();
    };

    console.log("ROLES:", roles)

    return (
        <>
            <Modal opened={opened} onClose={close} size={1200} transitionProps={{ transition: 'fade', duration: 200 }} className="dark:bg-card_modal text-white select-none" zIndex={300}>
                <div className="flex flex-col">
                    <Title className="flex justify-center">
                        PROJECT NAME
                    </Title>
                    <div className='mt-[30px] w-full flex'>
                        <div className="text-[20px] px-9 py-2 w-1/2">
                            <p className="py-1"><span className="font-bold">Period</span>: PROJECT START DATE</p>
                            <p className="py-1"><span className="font-bold">Deadline Date</span>: PROJECT DEADLINE DATE</p>
                            <p className="py-1"><span className="font-bold">Status</span>: PROJECT STATUS</p>
                            <p className="py-1"><span className="font-bold">Description</span>: PROJECT DESCRIPTION</p>
                            <div className="flex items-center flex-wrap">
                                <p className="py-1"><span className="font-bold">Technology Stack</span>: </p>
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
                                    <div className='flex flex-wrap'>
                                        <Card className="flex w-[250px] h-[80px] bg-[#505A5E] my-[20px] rounded-xl text-white select-none font-bold border border-white">                                        
                                            <div className="flex items-center justify-left h-full">
                                                <>
                                                    <div className="w-[50px] h-[50px] m-1">
                                                        <Avatar className="w-[50px] h-[50px] bg-[#E9E5E6]">{getInitials('NumeEmployee')}</Avatar>
                                                    </div>
                                                    <div className="flex flex-col">
                                                        <div className="text-xl font-bold">Nume Employee</div>
                                                    </div>
                                                </>
                                            </div>
                                        </Card>
                                        <Card className="flex w-[250px] h-[80px] bg-[#505A5E] mx-[40px] my-[20px] rounded-xl text-white select-none font-bold border border-white">
                                            <div className="flex items-center justify-left h-full">
                                                <>
                                                    <div className="w-[50px] h-[50px] m-1">
                                                        <Avatar className="w-[50px] h-[50px] bg-[#E9E5E6]">{getInitials('NumeEmployee')}</Avatar>
                                                    </div>
                                                    <div className="flex flex-col">
                                                        <div className="text-xl font-bold">Nume Employee</div>
                                                    </div>
                                                </>
                                            </div>
                                        </Card>
                                    </div>
                                </Tabs.Panel>

                                <Tabs.Panel value="PastMembers">
                                    PAST MEMBERS
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
                        <div className="text-[18px] pt-4 pl-4">
                            
                            {/* {roles.map((role, index) => (
                            <>
                                <p className="py-1">{role[index].role_name}</p>
                            </>
                          ))} */}
                            <p className="py-1"><span className="font-bold">TECH STACK</span>: TECHNOLOGY STACK</p>
                            {/* {project.deadline_date && (
                                < p className="py-1"><span className="font-bold">Deadline Date</span>: DEADLINE DATE</p>
                            )} */}
                            <p className="pt-1"><span className="font-bold">Status</span>:STATUS</p>
                        </div>
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