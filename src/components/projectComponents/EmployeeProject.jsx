/* eslint-disable no-unused-vars */
/* eslint-disable react/prop-types */
import { Card, Badge, Title, Modal, Divider, Checkbox, NumberInput, Button, Text, Textarea, Select } from '@mantine/core';
import { useDisclosure } from '@mantine/hooks';
import { useState, useEffect } from 'react';
import { Tabs, rem, Avatar } from '@mantine/core';
import useAxiosPrivate from "../../hooks/useAxiosPrivate";
import SkillLevelUneditable from './SkillLevelUneditable';
import { SkillSelect } from './SkillSelect';


export default function ProjectEmployeeCard({ name, roles, period, status, tech_stack, start, deadline, description, project_id, required_skills }) {

    const axiosPrivate = useAxiosPrivate();
    const [opened, { open, close }] = useDisclosure(false);
    const [isHovering, setIsHovering] = useState(false);
    const [visible, setVisible] = useState(false);
    const [pastMembers, setPastMembers] = useState([])
    const [activeMembers, setActiveMembers] = useState([])
    const [isAdding, setIsAdding] = useState(false)
    const getInitials = (name) => {
        const names = name.split(' ');
        return names.map((name) => name[0]).join('').toUpperCase();
    };
    const [skills, setSkills] = useState([])
    const [chosenSkills, setChosenSkills] = useState([]);

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

    useEffect(() => {
        let isMounted = true;
        const controller = new AbortController();
        const fetchSkills = async () => {
            try {
                const response = await axiosPrivate.get(`projects/eligible_skills`, {
                    signal: controller.signal,
                    params: {
                        proj_id: project_id,
                    },
                    headers: {
                        'Content-Type': 'application/json',
                        'Access-Control-Allow-Origin': '*',
                        'Access-Control-Allow-Credentials': 'true'
                    },
                    withCredentials: true
                });
                console.log('Eligible Skills:', response.data);
                if (isMounted) {
                    const mappedSkills = response.data.map(skill => ({
                        id: skill.id,
                        name: skill.name,
                        minimum_level: 1,
                    }));
                    setSkills(mappedSkills);
                    console.log(mappedSkills);
                }
            } catch (error) {
                console.error('Error fetching eligible skills:', error);
            }
        }
        fetchSkills();
        return () => {
            isMounted = false;
            controller.abort();
        }
    }, []);

    const handleUpdateRequirements = async () => {
        const skillRequirements = chosenSkills.map(skill => ({
            proj_id: project_id,
            skill_id: skill.id,
            minimum_level: skill.minimum_level
        }));
        try {
            const response = await axiosPrivate.post('projects/skill_requirement',
                JSON.stringify({
                    skills: skillRequirements
                }),
                {
                    headers: {
                        'Content-Type': 'application/json',
                        'Access-Control-Allow-Origin': '*',
                        'Access-Control-Allow-Credentials': 'true'
                    },
                    withCredentials: true
                });
            console.log('Skill requirement update response:', response.data);
        } catch (error) {
            console.error('Error updating skill requirements:', error);
        }
        setIsAdding(false)
        close()
    }

    return (
        <>
            <Modal opened={opened} onClose={close} size="100%" transitionProps={{ transition: 'fade', duration: 200 }} className="dark:bg-card_modal text-[white] select-none" zIndex={350}>
                <Title className="flex justify-center mb-3">
                    {name}
                </Title>
                <div className="flex">
                    <div className='w-3/5'>
                        <div className="text-[20px] px-9 py-2">
                            <p className="py-1"><span className="font-bold">Period</span>: {period}</p>
                            <p className="py-1"><span className="font-bold">Start Date</span>: {start.substring(0, 10)}</p>
                            {deadline &&
                                <p className="py-1"><span className="font-bold">Deadline Date</span>: {deadline.substring(0, 10)}</p>
                            }
                            <p className="py-1"><span className="font-bold">Status</span>: {status}</p>
                            <p className="py-1"><span className="font-bold">Description</span>: {description}</p>
                            <div className="flex items-center flex-wrap">
                                <p className="py-1"><span className="font-bold">Technology Stack</span>: </p>
                                {tech_stack.map((tech, index) => (
                                    <Badge key={index} className="mx-3 my-1" color="gray" size="xl">{tech}</Badge>
                                ))}
                            </div>
                            <div className="flex items-center flex-wrap">
                                <p className="py-1"><span className="font-bold">Team Roles</span>: </p>
                                {roles.map((role) => (
                                    <Badge key={role.role_id} className="mx-3 my-1" color="gray" size="xl">
                                        {role.count}x {role.role_name}
                                    </Badge>
                                ))}
                            </div>
                            <div className="flex items-center flex-wrap">
                                <p className="py-1"><span className="font-bold">Skill Requirements</span>: </p>
                                {required_skills.map((skill) => (
                                    <Badge key={skill.skill_id} className="mx-3 my-1 h-auto" color="gray">
                                        <div className="h-[50px] py-[6px] w-[100px] flex justify-center items-center flex-wrap">
                                            <p className="">{skill.name}</p>
                                            <SkillLevelUneditable level={skill.minimum_level} />
                                        </div>
                                    </Badge>
                                ))}
                            </div>

                            {!isAdding &&
                                <div className="w-[100px] h-[50px] flex justify-center items-center">
                                    <Button variant="outline" onClick={() => { setIsAdding(true) }}
                                        className={`relative w-[30px] h-[30px] rounded-full p-0 text-accent border-accent border-[3px] hover:text-accent`}>
                                        <svg xmlns="http://www.w3.org/2000/svg" className="icon icon-tabler icon-tabler-plus w-full h-full" viewBox="0 0 24 24" strokeWidth="2" stroke="currentColor" fill="none" strokeLinecap="round" strokeLinejoin="round">
                                            <path stroke="none" d="M0 0h24v24H0z" fill="none" />
                                            <path d="M12 5l0 14" />
                                            <path d="M5 12l14 0" />
                                        </svg>
                                    </Button>
                                </div>
                            }
                            {isAdding &&
                                <SkillSelect
                                    skills={skills}
                                    value={chosenSkills}
                                    setValue={setChosenSkills}
                                />
                            }
                            {chosenSkills.length != 0 && (
                                <div className="flex justify-center">
                                    <Button
                                        size="lg" onClick={handleUpdateRequirements}
                                        className="bg-accent text-white hover:bg-btn_hover font-bold px-4 py-2 rounded mb-[10px] mt-[20px]">
                                        Update Project
                                    </Button>
                                </div>
                            )}
                        </div>
                    </div>

                    <Divider size="sm" orientation="vertical" className="mr-5" />

                    <div className='w-2/5'>
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

            <Card className="flex w-[350px] h-[280px] dark:bg-card_modal mx-[40px] rounded-xl text-darktext select-none "
                onMouseEnter={() => setIsHovering(true)} onMouseLeave={() => setIsHovering(false)}>
                <Card.Section className="dark:bg-[#495256]" onClick={open}>
                    <Title className="py-6 px-2 flex justify-center text-center text-[28px]">
                        {name}
                    </Title>
                </Card.Section>
                <div className="h-full" onClick={open}>
                    {!isHovering && (
                        <>
                            <div className="text-[18px] pt-4 pl-4 flex items-center flex-wrap">
                                <p className='font-bold'>Roles: </p>
                                {roles.map((role, index) => (
                                    <Badge key={index} className="mx-1 my-1" color="gray" size="md">{role.role_name}</Badge>
                                ))}

                            </div>
                            <div className="text-[18px] flex pt-2 pl-4  items-center flex-wrap">
                                <p className="py-1"><span className="font-bold">Technology Stack</span>: </p>
                                {tech_stack.map((tech, index) => (
                                    <Badge key={index} className="mx-1 my-1" color="gray" size="md">{tech}</Badge>
                                ))}
                            </div>
                            <p className="text-[18px] pt-2 pl-4 flex flex-wrap"><span className="font-bold">Status</span>: {status}</p>
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