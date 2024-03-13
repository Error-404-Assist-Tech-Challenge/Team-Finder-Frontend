/* eslint-disable no-unused-vars */
/* eslint-disable react/prop-types */
import { Card, Badge, Title, Modal, Divider, Checkbox, NumberInput, Button, Text, Textarea } from '@mantine/core';
import { useDisclosure } from '@mantine/hooks';
import { useState, useEffect } from 'react';
import useAxiosPrivate from '../../hooks/useAxiosPrivate';
import PaginationComp from '../pageComponents/Pagination';
import { Tabs, rem } from '@mantine/core';
import { modals } from '@mantine/modals';
import ProjectEdit from './ProjectEdit';
import NewMemberComp from '../pageComponents/NewMemberComp';
import ProposedMemberCard from './ProposedMemberCard';
import ActiveMemberCard from './ActiveMemberCard';

export default function ProjectCard({ project, setProjects, roles, teamRoles, setTeamRoles, skills }) {

    const [isHovering, setIsHovering] = useState(false);
    const [openedProject, { open: openProject, close: closeProject }] = useDisclosure(false);
    const [openedEdit, { open: openEdit, close: closeEdit }] = useDisclosure(false);
    const axiosPrivate = useAxiosPrivate();

    const [partiallyAvailable, setPartiallyAvailable] = useState(false)
    const [closeToFinish, setCloseToFinish] = useState(null)
    const [unavailable, setUnavailable] = useState(false)

    const [activeMembers, setActiveMembers] = useState([])
    const [newMembers, setNewMembers] = useState([])
    const [pastMembers, setPastMembers] = useState([])
    const [proposedMembers, setProposedMembers] = useState([])

    const [context, setContext] = useState([])

    const handleOpenProject = () => {
        fetchProjects();
        openProject();
    }

    const fetchProjects = async () => {
        try {
            const response = await axiosPrivate.get(
                'projects/search_employees',
                {
                    params: {
                        proj_id: project.id,
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
            setActiveMembers(response.data.active);
            setNewMembers(response.data.new);
            setPastMembers(response.data.past);
            setProposedMembers(response.data.proposed);
        } catch (error) {
            console.error('Error fetching project employees:', error);
        }
    }

    const deleteProject = async () => {
        close();
        try {
            const response = await axiosPrivate.delete('project', {
                headers: {
                    'Content-Type': 'application/json',
                    'Access-Control-Allow-Origin': '*',
                    'Access-Control-Allow-Credentials': 'true'
                },
                data: {
                    proj_id: project.id
                },
                withCredentials: true
            });
            console.log('Response:', response.data);
            setProjects(response.data);
        } catch (error) {
            console.error('Error deleting project:', error);
        }
    }

    const filteredMembers = newMembers.filter(employee => {
        const isFullyAvailable = employee.work_hours == 0;
        const isPartiallyAvailable = partiallyAvailable && employee.work_hours < 8;
        const isCloseToFinish = closeToFinish && employee.deadline <= closeToFinish;
        const isUnavailable = unavailable && employee.work_hours === 8;
        return isFullyAvailable || isPartiallyAvailable || isCloseToFinish || isUnavailable;
    });

    const [currentPage, setCurrentPage] = useState(1);
    const [postPerPage, setPostPerPage] = useState(6);
    const lastPostIndex = currentPage * postPerPage;
    const firstPostIndex = lastPostIndex - postPerPage;
    const currentPosts = filteredMembers.slice(firstPostIndex, lastPostIndex);

    const openDeleteModal = () =>
        modals.openConfirmModal({
            title: 'Delete project',
            centered: true,
            children: (
                <Text size="sm">
                    Are you sure you want to delete this project? This action is destructive and you will have
                    to contact support to restore your data.
                </Text>
            ),
            labels: { confirm: 'Delete project', cancel: "No don't delete it" },
            confirmProps: { color: 'red' },
            onCancel: () => console.log('Cancel'),
            onConfirm: () => deleteProject(),
        });

    return (
        <>
            <Modal opened={openedProject} onClose={closeProject} fullScreen transitionProps={{ transition: 'fade', duration: 200 }} className="dark:bg-card_modal text-white select-none" zIndex={300}>
                <div className="h-[90vh] flex">
                    <div className="w-1/2">
                        <Title className="flex justify-center">
                            {project.name}
                        </Title>
                        <div className="text-[20px] p-9">
                            <p className="py-1"><span className="font-bold">Period</span>: {project.period}</p>
                            <p className="py-1"><span className="font-bold">Start Date</span>: {project.start_date.substring(0, 10)}</p>
                            {project.deadline_date && (
                                <p className="py-1"><span className="font-bold">Deadline Date</span>: {project.deadline_date.substring(0, 10)}</p>
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
                        <div>
                            <Tabs defaultValue="ActiveMembers" color="#FF3D2E">
                                <Tabs.List grow>
                                    <Tabs.Tab value="ActiveMembers" className="  text-xl px-[40px]" >
                                        Project Team ({activeMembers.length})
                                    </Tabs.Tab>
                                    <Tabs.Tab value="PastMembers" className=" text-xl px-[40px]">
                                        Past Members ({pastMembers.length})
                                    </Tabs.Tab>
                                </Tabs.List>

                                <Tabs.Panel value="ActiveMembers">
                                    <div className="flex flex-wrap justify-center">

                                        {activeMembers.map((employee, index) => (
                                            <ActiveMemberCard key={index} employee={employee} available_roles={project.available_roles} project_id={project.id} />
                                        ))}
                                    </div>
                                </Tabs.Panel>

                                <Tabs.Panel value="PastMembers">
                                </Tabs.Panel>
                            </Tabs>
                        </div>
                    </div>

                    <Divider className="color-white" size="md" orientation="vertical" />
                    
                    <div className="w-1/2">
                        <Title className="flex justify-center pb-3">
                            Team Finder
                        </Title>

                        <div>
                            <Tabs defaultValue="NewMembers" color="#FF3D2E">
                                <Tabs.List grow>
                                    <Tabs.Tab value="NewMembers" className="  text-xl px-[40px]" >
                                        New Team Members ({filteredMembers.length} / {newMembers.length})
                                    </Tabs.Tab>
                                    <Tabs.Tab value="ProposedMembers" className=" text-xl px-[40px]">
                                        Proposed Members ({proposedMembers.length})
                                    </Tabs.Tab>
                                </Tabs.List>

                                <Tabs.Panel value="NewMembers">
                                    <div>
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
                                        <div className="flex flex-wrap justify-center">
                                            <NewMemberComp setNewMembers={setNewMembers} setProposedMembers={setProposedMembers} filteredMembers={currentPosts} available_roles={project.available_roles} project_id={project.id} />
                                        </div>
                                        <div className='flex justify-center items-center'>
                                            <PaginationComp totalPosts={filteredMembers.length} postsPerPage={postPerPage} currentPage={currentPage} setCurrentPage={setCurrentPage} drawer={true} />
                                        </div>
                                    </div>
                                    <Divider className="my-9" />
                                    <div className="flex w-full items-center">
                                        <Textarea
                                            size="md"
                                            autosize
                                            minRows={4}
                                            maxRows={4}
                                            placeholder="Additional context for chatgpt..."
                                            className="m-5 w-full"
                                            value={context}
                                            onChange={(event) => setContext(event.currentTarget.value)}
                                        />
                                        {context.length == 0 &&
                                            <Button className="bg-[#19c37d] my-5 ml-5 w-[120px] h-[74px] text-xl font-bold rounded-lg">Find</Button>
                                        }
                                        {context.length != 0 &&
                                            <Button className="bg-[#19c37d] my-5 ml-5 w-[187px] h-[116px] text-xl font-bold rounded-lg">
                                                Find <br />
                                                with <br />
                                                ChatGPT
                                            </Button>
                                        }
                                    </div>
                                </Tabs.Panel>

                                <Tabs.Panel value="ProposedMembers">
                                    <div className="flex flex-wrap justify-center py-9">
                                        {proposedMembers.map((employee, index) => (
                                            <ProposedMemberCard setNewMembers={setNewMembers} setProposedMembers={setProposedMembers} key={index} employee={employee} available_roles={project.available_roles} project_id={project.id} />
                                        ))}
                                    </div>
                                </Tabs.Panel>
                            </Tabs>
                        </div>
                    </div>
                </div>
            </Modal>

            <Modal opened={openedEdit} onClose={closeEdit} transitionProps={{ transition: 'fade', duration: 200 }} className="dark:bg-card_modal text-white select-none" zIndex={300}>
                <ProjectEdit project={project} setProjects={setProjects} roles={roles} teamRoles={teamRoles} setTeamRoles={setTeamRoles} skills={skills} closeEdit={closeEdit} />
            </Modal>

            <Card className="flex w-[350px] h-[300px] dark:bg-card_modal mx-[40px] my-[40px] rounded-xl dark:text-darktext text-text select-none"
                onMouseEnter={() => setIsHovering(true)} onMouseLeave={() => setIsHovering(false)}>
                <Card.Section className="dark:bg-[#495256]" onClick={handleOpenProject}>
                    <Title className="py-6 px-2 flex justify-center text-center text-[28px]">
                        {project.name}
                    </Title>
                </Card.Section>
                <div className="h-[250px]" onClick={handleOpenProject}>
                    {!isHovering && (
                        <div className="text-[18px] pt-4 pl-4">
                            <p className="py-1"><span className="font-bold">Period</span>: {project.period}</p>
                            <p className="py-1"><span className="font-bold">Start Date</span>: {project.start_date.substring(0, 10)}</p>
                            {project.deadline_date && (
                                < p className="py-1"><span className="font-bold">Deadline Date</span>: {project.deadline_date.substring(0, 10)}</p>
                            )}
                            <p className="pt-1"><span className="font-bold">Status</span>: {project.status}</p>
                        </div>
                    )}
                    {isHovering && (
                        <div className="flex h-full w-full justify-center text-center items-center">
                            <p className="text-xl text-center">Click to see more!</p>
                        </div>
                    )}
                </div>
                <div className="flex justify-between">
                    <Button className="w-[120px] h-[35px] mx-4 bg-accent text-[18px]" onClick={openEdit}>Edit</Button>
                    {project.can_be_deleted == "True" &&
                        <Button className="w-[120px] h-[35px] mx-4 bg-accent text-[18px]" onClick={openDeleteModal}>Remove</Button>
                    }
                    {project.can_be_deleted != "True" &&
                        <Button className="w-[120px] h-[35px] mx-4 bg-[gray] text-[18px]" disabled>Remove</Button>
                    }
                </div>
            </Card >
        </>
    )
}
