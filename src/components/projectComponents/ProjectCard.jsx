/* eslint-disable no-unused-vars */
/* eslint-disable react/prop-types */
import { Card, Badge, Title, Modal, Divider, Checkbox, NumberInput } from '@mantine/core';
import { useDisclosure } from '@mantine/hooks';
import { useState, useEffect } from 'react';
import useAxiosPrivate from '../../hooks/useAxiosPrivate';
import ProjectEmployee from './ProjectEmployee';
import { Tabs, rem } from '@mantine/core';

export default function ProjectCard({ project }) {

    const [isHovering, setIsHovering] = useState(false);
    const [opened, { open, close }] = useDisclosure(false);
    const axiosPrivate = useAxiosPrivate();
    const [projectEmployees, setProjectEmployees] = useState([])

    const [partiallyAvailable, setPartiallyAvailable] = useState(false)
    const [closeToFinish, setCloseToFinish] = useState(null)
    const [unavailable, setUnavailable] = useState(false)

    const handleOpen = () => {
        fetchProjects();
        open();
    }

    const fetchProjects = async () => {
        try {
            const response = await axiosPrivate.get(
                'projects/search_employees',
                {
                    params: {
                        proj_id: project.id,
                        weeks_until_deadline: null
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
            setProjectEmployees(response.data);
        } catch (error) {
            console.error('Error fetching project employees:', error);
        }
    }

    const filteredEmployees = projectEmployees.filter(employee => {

        const isFullyAvailable = employee.work_hours == 0;

        const isPartiallyAvailable = partiallyAvailable && employee.work_hours < 8;

        const isCloseToFinish = closeToFinish && employee.weeks_until_next_deadline <= closeToFinish;

        const isUnavailable = unavailable && employee.work_hours === 8;

        return isFullyAvailable || isPartiallyAvailable /*|| isCloseToFinish*/ || isUnavailable;
    });

    return (
        <>
            <Modal opened={opened} onClose={close} fullScreen transitionProps={{ transition: 'fade', duration: 200 }} className="dark:bg-card_modal text-white select-none" zIndex={1000002}>
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
                                {project.tech_stack.map((tech) => (
                                    <Badge key={tech.skill_id} className="mx-3 my-1" color="gray" size="xl">{tech.skill_name}</Badge>
                                ))}
                            </div>
                            <div className="flex items-center flex-wrap">
                                <p className="py-1"><span className="font-bold">Team Roles</span>: </p>
                                {project.team_role.map((role) => (
                                    <Badge key={role.role_id} className="mx-3 my-1" color="gray" size="xl">
                                        {role.count}x {role.role_name}
                                    </Badge>
                                ))}
                            </div>
                        </div>
                    </div>
                    <Divider className="color-white" size="md" orientation="vertical" />
                    <div className="w-1/2">
                        <Title className="flex justify-center pb-3">
                            Team Finder
                        </Title>
                        <div className='w-full py-6 flex items-center'>
                            <div className="w-1/3 flex justify-center">
                                <Checkbox
                                    size="md"
                                    label="Include partially available"
                                    checked={partiallyAvailable}
                                    onChange={(event) => setPartiallyAvailable(event.currentTarget.checked)}
                                />
                            </div>
                            <div className="w-1/3 flex justify-center">
                                <NumberInput
                                    placeholder="Include close to finish"
                                    min={2} max={6}
                                    className="w-10px"
                                    value={closeToFinish} onChange={setCloseToFinish}
                                />
                            </div>
                            <div className="w-1/3 flex justify-center">
                                <Checkbox
                                    size="md"
                                    label="Include unavailable"
                                    checked={unavailable}
                                    onChange={(event) => setUnavailable(event.currentTarget.checked)}
                                />
                            </div>
                        </div>
                        <div>
                            <Tabs defaultValue="NewMembers" color="#FF3D2E">
                                <Tabs.List grow>
                                    <Tabs.Tab value="NewMembers" className="  text-xl px-[40px]" >
                                        New Members
                                    </Tabs.Tab>
                                    <Tabs.Tab value="ProposeMembers"  className=" text-xl px-[40px]">
                                        Propose Members
                                    </Tabs.Tab>
                                </Tabs.List>
                                <Tabs.Panel value="NewMembers">
                                    <p>NEW MEMBERS</p>
                                    <div className="flex flex-wrap justify-center">
                                        {filteredEmployees.map((employee, index) => (
                                            < ProjectEmployee key={index} employee={employee} />
                                        ))}
                                    </div>
                                </Tabs.Panel>

                                <Tabs.Panel value="ProposeMembers">
                                    <p>PROPOSE MEMBERS</p>
                                </Tabs.Panel>
                            </Tabs>
                        </div>
                    </div>
                </div>
            </Modal>
            <Card className="flex w-[350px] h-[280px] dark:bg-card_modal mx-[40px] my-[40px] rounded-xl dark:text-darktext text-text select-none"
                onClick={handleOpen} onMouseEnter={() => setIsHovering(true)} onMouseLeave={() => setIsHovering(false)}>
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
