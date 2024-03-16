/* eslint-disable no-unused-vars */
/* eslint-disable react/prop-types */
import { Card, Badge, Title, Modal, Divider, Checkbox, NumberInput, Button, Text, Textarea, Loader } from '@mantine/core';
import { useDisclosure } from '@mantine/hooks';
import { useState, useEffect } from 'react';
import useAxiosPrivate from '../../hooks/useAxiosPrivate';
import PaginationComp from '../pageComponents/Pagination';
import { Tabs, rem } from '@mantine/core';
import { modals } from '@mantine/modals';
import ProjectEdit from './ProjectEdit';
import NewMemberComp from '../pageComponents/NewMemberComp';
import ActiveMemberCard from './ActiveMemberCard';
import ProposedMembersComp from './ProposedMembersComp';
import PastMemberCard from './PastMemberCard';
import OrganizationEmployeesComp from '../pageComponents/OrganizationEmployeesComp';

export default function ProjectCard({ project, setProjects, roles, teamRoles, setTeamRoles }) {

    const [visible, setVisible] = useState(true)
    const [isHovering, setIsHovering] = useState(false);
    const [openedProject, { open: openProject, close: closeProject }] = useDisclosure(false);
    const [openedEdit, { open: openEdit, close: closeEdit }] = useDisclosure(false);
    const axiosPrivate = useAxiosPrivate();

    const [partiallyAvailable, setPartiallyAvailable] = useState(false)
    const [closeToFinish, setCloseToFinish] = useState(null)
    const [unavailable, setUnavailable] = useState(false)

    const [allMembers, setAllMembers] = useState([])
    const [activeMembers, setActiveMembers] = useState([])
    const [newMembers, setNewMembers] = useState([])
    const [pastMembers, setPastMembers] = useState([])
    const [proposedMembers, setProposedMembers] = useState([])

    const [contextChatgpt, setContextChatgpt] = useState('')
    const [listFromChatgpt, setListFromChatgpt] = useState(false)

    const filteredMembers = newMembers.filter(employee => {
        const isFullyAvailable = employee.work_hours == 0;
        const isPartiallyAvailable = partiallyAvailable && employee.work_hours < 8;
        const isCloseToFinish = closeToFinish && employee.deadline <= closeToFinish;
        const isUnavailable = unavailable && employee.work_hours === 8;
        return isFullyAvailable || isPartiallyAvailable || isCloseToFinish || isUnavailable;
    });

    const [currentPageFiltered, setCurrentPageFiltered] = useState(1);
    const [postPerPageFiltered, setPostPerPageFiltered] = useState(6);
    const lastPostIndexFiltered = currentPageFiltered * postPerPageFiltered;
    const firstPostIndexFiltered = lastPostIndexFiltered - postPerPageFiltered;
    const currentPostsFiltered = filteredMembers.slice(firstPostIndexFiltered, lastPostIndexFiltered);

    const [currentPageProposed, setCurrentPageProposed] = useState(1);
    const [postPerPageProposed, setPostPerPageProposed] = useState(9);
    const lastPostIndexProposed = currentPageProposed * postPerPageProposed;
    const firstPostIndexProposed = lastPostIndexProposed - postPerPageProposed;
    const currentPostsProposed = proposedMembers.slice(firstPostIndexProposed, lastPostIndexProposed);

    const [currentPageActiveMember, setCurrentPageActiveMember] = useState(1);
    const [postPerPageActiveMember, setPostPerPageActiveMember] = useState(3);
    const lastPostIndexActiveMember = currentPageActiveMember * postPerPageActiveMember;
    const firstPostIndexActiveMember = lastPostIndexActiveMember - postPerPageActiveMember;
    const currentPostsActiveMember = activeMembers.slice(firstPostIndexActiveMember, lastPostIndexActiveMember);

    const [currentPagePastMember, setCurrentPagePastMember] = useState(1);
    const [postPerPagePastMember, setPostPerPagePastMember] = useState(3);
    const lastPostIndexPastMember = currentPagePastMember * postPerPagePastMember;
    const firstPostIndexPastMember = lastPostIndexPastMember - postPerPagePastMember;
    const currentPostsPastMember = pastMembers.slice(firstPostIndexPastMember, lastPostIndexPastMember);

    const handleOpenProject = () => {
        fetchProjectEmployees();
        openProject();
    }

    const fetchProjectEmployees = async () => {
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
            setAllMembers(response.data)
            setActiveMembers(response.data.active);
            setNewMembers(response.data.new);
            setPastMembers(response.data.past);
            setProposedMembers(response.data.proposed);
            setVisible(false);
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

    const sendToChatgpt = async () => {
        setListFromChatgpt(true)
        setVisible(true)
        setPartiallyAvailable(true)
        try {
            const response = await axiosPrivate.post('chat_gpt_feature',
                JSON.stringify({
                    context: contextChatgpt,
                    project_members: allMembers,
                    project: project
                }),
                {
                    headers: {
                        'Content-Type': 'application/json',
                        'Access-Control-Allow-Origin': '*',
                        'Access-Control-Allow-Credentials': 'true'
                    },
                    withCredentials: true
                });
            console.log('Response from chatgpt:', response.data);
            setNewMembers(response.data);
        } catch (error) {
            console.error('Error with chatgpt feature:', error);
        }
        setVisible(false)
    }

    const handleReset = () => {
        setVisible(true)
        fetchProjectEmployees();
        setListFromChatgpt(false);
        setContextChatgpt('');
    }

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
                                {project.tech_stack.map((tech, index) => (
                                    <Badge key={index} className="mx-3 my-1" color="gray" size="xl">{tech}</Badge>
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
                                    {visible && (
                                        <div className="fixed bottom-0 left-1/4 w-1/2 h-1/2 transform translate-y-1/2">
                                            <Loader size={30} color="red" />
                                        </div>
                                    )}

                                    {!visible && (
                                        <>
                                            <div className="flex flex-wrap justify-center items-center h-[180px]">
                                                {activeMembers.length != 0 && currentPostsActiveMember.map((employee, index) => (
                                                    <ActiveMemberCard key={index} employee={employee} project_id={project.id} setActiveMembers={setActiveMembers} />
                                                ))}
                                                {activeMembers.length == 0 &&
                                                    <p>No active members in this project...</p>
                                                }
                                            </div>
                                            <div className='flex justify-center items-center'>
                                                <PaginationComp totalPosts={activeMembers.length} postsPerPage={postPerPageActiveMember} currentPage={currentPageActiveMember} setCurrentPage={setCurrentPageActiveMember} drawer={true} />
                                            </div>
                                        </>
                                    )}
                                </Tabs.Panel>

                                <Tabs.Panel value="PastMembers">
                                    <div className="flex flex-wrap justify-center items-center h-[180px]">
                                        {pastMembers.length != 0 && currentPostsPastMember.map((employee, index) => (
                                            <PastMemberCard key={index} employee={employee} project_id={project.id} setActiveMembers={setActiveMembers} />
                                        ))}
                                        {pastMembers.length == 0 &&
                                            <p>No past members in this project...</p>
                                        }
                                    </div>
                                    <div className='flex justify-center items-center'>
                                        <PaginationComp totalPosts={pastMembers.length} postsPerPage={postPerPagePastMember} currentPage={currentPagePastMember} setCurrentPage={setCurrentPagePastMember} drawer={true} />
                                    </div>
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

                                        <div className="flex flex-wrap justify-center items-center h-[220px]">
                                            {visible && (
                                                <div className="fixed bottom right transform translate-x-1/2 translate-y-1/2 h-[220px]">
                                                    <Loader size={30} color="red" />
                                                </div>
                                            )}

                                            {!visible && (<>
                                                {newMembers.length != 0 &&
                                                    <NewMemberComp setNewMembers={setNewMembers} setProposedMembers={setProposedMembers} filteredMembers={currentPostsFiltered} available_roles={project.available_roles} project_id={project.id} />
                                                }
                                                {newMembers.length == 0 &&
                                                    <p>No employees match the criteria for this project...</p>
                                                }
                                            </>
                                            )}
                                        </div>
                                        <div className='flex justify-center items-center'>
                                            <PaginationComp totalPosts={filteredMembers.length} postsPerPage={postPerPageFiltered} currentPage={currentPageFiltered} setCurrentPage={setCurrentPageFiltered} drawer={true} />
                                        </div>
                                    </div>

                                    <Divider className="mb-4 mt-6" />

                                    <div className="flex w-full items-center">
                                        <Textarea
                                            size="md"
                                            autosize
                                            minRows={5}
                                            maxRows={5}
                                            placeholder="Additional context for chatgpt..."
                                            className="m-5 w-full"
                                            value={contextChatgpt}
                                            onChange={(event) => setContextChatgpt(event.currentTarget.value)}
                                        />
                                        {contextChatgpt.length == 0 &&
                                            <div className="w-[120px] mx-5">
                                                <Button className="bg-[#19c37d] my-2 w-full h-[50px] text-xl font-bold rounded-lg " onClick={sendToChatgpt}>Find</Button>
                                                {listFromChatgpt &&
                                                    <Button className="bg-[#149760] my-2 w-full h-[50px] text-xl font-bold rounded-lg" onClick={handleReset}>Reset</Button>
                                                }
                                            </div>

                                        }
                                        {contextChatgpt.length != 0 &&
                                            <div className="w-[187px] mx-5">
                                                <Button className="bg-[#19c37d] my-2 w-full h-[90px] text-xl font-bold rounded-lg" onClick={sendToChatgpt}>
                                                    Find <br />
                                                    with <br />
                                                    ChatGPT
                                                </Button>
                                                {listFromChatgpt &&
                                                    <Button className="bg-[#149760] my-2 w-full h-[35px] text-xl font-bold rounded-lg" onClick={handleReset}>Reset</Button>
                                                }
                                            </div>
                                        }

                                    </div>
                                </Tabs.Panel>

                                <Tabs.Panel value="ProposedMembers">
                                    <div>
                                        <div className="flex flex-wrap justify-center items-center py-9 h-[220px]">
                                            {proposedMembers.length != 0 &&
                                                <ProposedMembersComp proposedMembers={currentPostsProposed} available_roles={project.available_roles} project_id={project.id} />
                                            }
                                            {proposedMembers.length == 0 &&
                                                <p>No members have been proposed for this project...</p>
                                            }
                                        </div>
                                        <div className='flex justify-center items-center'>
                                            <PaginationComp totalPosts={proposedMembers.length} postsPerPage={postPerPageProposed} currentPage={currentPageProposed} setCurrentPage={setCurrentPageProposed} drawer={true} />
                                        </div>
                                    </div>
                                </Tabs.Panel>
                            </Tabs>
                        </div>
                    </div>
                </div>
            </Modal >

            <Modal opened={openedEdit} onClose={closeEdit} transitionProps={{ transition: 'fade', duration: 200 }} className="dark:bg-card_modal text-white select-none" zIndex={300}>
                <ProjectEdit project={project} setProjects={setProjects} roles={roles} teamRoles={teamRoles} setTeamRoles={setTeamRoles} closeEdit={closeEdit} />
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
