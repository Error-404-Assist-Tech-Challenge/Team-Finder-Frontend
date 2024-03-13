/* eslint-disable no-unused-vars */
/* eslint-disable react/prop-types */
import { Card, Badge, Title, Modal, Divider, Checkbox, NumberInput, Button, Text, Textarea } from '@mantine/core';
import { useDisclosure } from '@mantine/hooks';
import { useState, useEffect } from 'react';
import { Tabs, rem } from '@mantine/core';


export default function ProjectEmployeeCard({}) {

    const [opened, { open, close}] = useDisclosure(false);
    const [isHovering, setIsHovering] = useState(false);

    return (
        <>
            <Modal opened={opened} onClose={close} size={1200} transitionProps={{ transition: 'fade', duration: 200 }} className="dark:bg-card_modal text-white select-none" zIndex={300}>
                <div className="flex flex-col">
                    <Title className="flex justify-center">
                        PROJECT NAME
                    </Title>
                    <div className='flex flex-wrap mt-[30px]'>
                        <div className="text-[20px] px-9 py-2">
                            <p className="py-1"><span className="font-bold">Period</span>: PROJECT START DATE</p>
                            {/* <p className="py-1"><span className="font-bold">Start Date</span>: {project.start_date.substring(0, 10)}</p> */}
                                <p className="py-1"><span className="font-bold">Deadline Date</span>: PROJECT DEADLINE DATE</p>
                                {/* // <p className="py-1"><span className="font-bold">Deadline Date</span>: {project.deadline_date.substring(0, 10)}</p> */}
                            
                            <p className="py-1"><span className="font-bold">Status</span>: PROJECT STATUS</p>
                            <p className="py-1"><span className="font-bold">Description</span>: PROJECT DESCRIPTION</p>
                            <div className="flex items-center flex-wrap">
                                <p className="py-1"><span className="font-bold">Technology Stack</span>: </p>
                                {/* {project.tech_stack.map((tech) => (
                                    <Badge key={tech.skill_id} className="mx-3 my-1" color="gray" size="xl">{tech.skill_name}</Badge>
                                ))} */}
                            </div>
                            <div className="flex items-center flex-wrap">
                                {/* {project.team_role.map((role) => (
                                    <Badge key={role.role_id} className="mx-3 my-1" color="gray" size="xl">
                                        {role.count}x {role.role_name}
                                    </Badge>
                                ))} */}
                            </div>
                        </div>
                        <div>
                            <Tabs defaultValue="ActiveMembers" color="#FF3D2E">
                                <Tabs.List grow>
                                    <Tabs.Tab value="ActiveMembers" className="  text-xl w-[300px]" >
                                        Project Team 
                                    </Tabs.Tab>
                                    <Tabs.Tab value="PastMembers" className=" text-xl w-[300px]">
                                        Past Members 
                                    </Tabs.Tab>
                                </Tabs.List>

                                <Tabs.Panel value="ActiveMembers">
                                    ACTIVE MEMBERS
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
                        PROJECT NAME
                    </Title>
                </Card.Section>
                <div className="h-[250px]" onClick={open}>
                    {!isHovering && (
                        <div className="text-[18px] pt-4 pl-4">
                            <p className="py-1"><span className="font-bold">ROLES</span>: PROJECT ROLES</p>
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