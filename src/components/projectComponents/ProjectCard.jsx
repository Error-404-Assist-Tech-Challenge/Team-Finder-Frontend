/* eslint-disable react/prop-types */
import { Card, Badge, Title, Modal, Divider } from '@mantine/core';
import { useDisclosure } from '@mantine/hooks';
import { useState } from 'react';

export default function ProjectCard({ project }) {

    const [isHovering, setIsHovering] = useState(false);
    const [opened, { open, close }] = useDisclosure(false);

    return (
        <>
            <Modal opened={opened} onClose={close} size="calc(100vw - 3rem)" transitionProps={{ transition: 'fade', duration: 200 }} className="dark:bg-card_modal text-white select-none" zIndex={1000002}>
                <div className="h-[80vh] flex">
                    <div className="w-1/2">
                        <Title className="flex justify-center">
                            {project.name}
                        </Title>
                        <div className="text-[20px] p-9">
                            <p className="py-1"><span className="font-bold">Period</span>: {project.period}</p>
                            <p className="py-1"><span className="font-bold">Start Date</span>: {project.start_date}</p>
                            {project.deadline_date && (
                                <p className="py-1"><span className="font-bold">Deadline Date</span>: {project.deadline_date}</p>
                            )}
                            <p className="py-1"><span className="font-bold">Status</span>: {project.status}</p>
                            <p className="py-1"><span className="font-bold">Description</span>: {project.description}</p>
                            <div className="flex items-center flex-wrap">
                                <p className="py-1"><span className="font-bold">Technology Stack</span>: </p>
                                {project.tech_stack.map((tech, index) => (
                                    <Badge key={index} className="mx-3 my-1" color="gray" size="xl">{tech}</Badge>
                                ))}
                            </div>
                            <div className="flex items-center flex-wrap">
                                <p className="py-1"><span className="font-bold">Team Roles</span>: </p>
                                {project.roles.map((role, index) => (
                                    <Badge key={index} className="mx-3 my-1" color="gray" size="xl">

                                        {/* <Button variant="outline"
                                            className={`w-[20px] h-[20px] m-[6px] rounded-full p-0 text-accent border-accent border-[3px]`}>
                                            <svg xmlns="http://www.w3.org/2000/svg" className="icon icon-tabler icon-tabler-minus w-[12px] h-[12px]" width="24" height="24" viewBox="0 0 24 24" strokeWidth="4" stroke="currentColor" fill="none" strokeLinecap="round" strokeLinejoin="round">
                                                <path stroke="none" d="M0 0h24v24H0z" fill="none" />
                                                <path d="M5 12l14 0" />
                                            </svg>
                                        </Button> */}

                                        {role.members}x {role.role}

                                        {/* <Button variant="outline"
                                            className={`w-[20px] h-[20px] m-[6px] rounded-full p-0 text-accent border-accent border-[3px]`}>
                                            <svg xmlns="http://www.w3.org/2000/svg" className="icon icon-tabler icon-tabler-plus w-[15px] h-[15px]" viewBox="0 0 24 24" strokeWidth="4" stroke="currentColor" fill="none" strokeLinecap="round" strokeLinejoin="round">
                                                <path stroke="none" d="M0 0h24v24H0z" fill="none" />
                                                <path d="M12 5l0 14" />
                                                <path d="M5 12l14 0" />
                                            </svg>
                                        </Button> */}

                                    </Badge>
                                ))}
                            </div>
                        </div>
                    </div>
                    <Divider className="color-white" size="md" orientation="vertical" />
                    <div className="w-1/2">
                        <Title className="flex justify-center">
                            Team Finder
                        </Title>
                    </div>
                </div>
            </Modal>
            <Card className="flex w-[350px] h-[280px] dark:bg-card_modal mx-[40px] my-[40px] rounded-xl dark:text-darktext text-text select-none"
                onClick={open} onMouseEnter={() => setIsHovering(true)} onMouseLeave={() => setIsHovering(false)}>
                <Card.Section className="dark:bg-[#495256]">
                    <Title className="py-6 px-2 flex justify-center text-center text-[28px]">
                        {project.name}
                    </Title>
                </Card.Section>
                <div className="flex h-full justify-center ml-4 flex-col">
                    {!isHovering && (
                        <div className="text-[18px]">
                            <p className="py-1"><span className="font-bold">Period</span>: {project.period}</p>
                            <p className="py-1"><span className="font-bold">Start Date</span>: {project.start_date}</p>
                            {project.deadline_date && (
                                <p className="py-1"><span className="font-bold">Deadline Date</span>: {project.deadline_date}</p>
                            )}
                            <p className="py-1"><span className="font-bold">Status</span>: {project.status}</p>
                        </div>
                    )}
                    {isHovering && (
                        <p className="text-xl text-center">Click to see more!</p>
                    )}
                </div>
            </Card>
        </>
    )
}
