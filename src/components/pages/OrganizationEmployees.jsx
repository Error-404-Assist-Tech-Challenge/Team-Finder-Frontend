/* eslint-disable no-unused-vars */
/* eslint-disable react-hooks/exhaustive-deps */
import { randomId, useDisclosure } from '@mantine/hooks';
import React, { useContext, useEffect, useState } from 'react';
import { Loader, Drawer, Title, Button } from '@mantine/core';
import { Context } from '../../App';
import useAxiosPrivate from "../../hooks/useAxiosPrivate";
import OrganizationEmployeesComp from '../pageComponents/OrganizationEmployeesComp';
import PaginationComp from '../pageComponents/Pagination';
import TeamRoleCard from '../employeeComponents/TeamRoleCard';


export default function OrganizationEmployeesPage() {

    // Initialization

    const [darkMode, setDarkMode] = useContext(Context);
    const axiosPrivate = useAxiosPrivate();
    const [users, setUsers] = useState([]);
    const [teamRoles, setTeamRoles] = useState([]);
    const [visible, setVisible] = useState(true);

    const [currentPage, setCurrentPage] = useState(1);
    const [postPerPage, setPostPerPage] = useState(7);
    const [opened, { open, close }] = useDisclosure(true); // false
    const lastPostIndex = currentPage * postPerPage;
    const firstPostIndex = lastPostIndex - postPerPage;
    const currentPosts = users.slice(firstPostIndex, lastPostIndex);

    // const teamRoles = [
    //     {
    //         "role_id": "1b9d6bcd-bbfd-4b2d-9b5d-ab8dfbbd4bed",
    //         "role_name": "Software Engineer/Developer"
    //     },
    //     {
    //         "role_id": "8aa96249-1db8-4317-8258-4b326d7a0a9a",
    //         "role_name": "Product Manager"
    //     },
    //     {
    //         "role_id": "2fd4e1c6-7a8b-4f9c-9b5d-7650d3a78d92",
    //         "role_name": "UX/UI Designer"
    //     },
    //     {
    //         "role_id": "eb94bcb2-15e7-4b16-ba6d-4cf1a168c3ec",
    //         "role_name": "Quality Assurance Engineer/Test Engineer"
    //     },
    //     {
    //         "role_id": "0c7a5f1b-c6df-4f91-89a0-007bb4193d2a",
    //         "role_name": "Data Scientist/Data Analyst"
    //     },
    //     {
    //         "role_id": "77de68da-ecd8-4f78-a179-7b12beaac3b7",
    //         "role_name": "DevOps Engineer"
    //     },
    //     {
    //         "role_id": "14bfa6da-7b93-4aa0-b8d2-4938f8247938",
    //         "role_name": "Systems Architect"
    //     },
    //     {
    //         "role_id": "e4d7f1b5-fa41-45c9-b7fb-e80e8a1213ab",
    //         "role_name": "Technical Support Engineer"
    //     },
    //     {
    //         "role_id": "65b9ee60-775c-4ba9-9f56-2b1cafe91180",
    //         "role_name": "Scrum Master/Agile Coach"
    //     },
    //     {
    //         "role_id": "10267f33-4ff8-4797-aa3d-7f2d6bc74796",
    //         "role_name": "Technical Writer"
    //     }
    // ]

    useEffect(() => {
    }, [darkMode]);


    // Function that gets team roles

    useEffect(() => {
        let isMounted = true;
        const controller = new AbortController();

        const getTeamRoles = async () => {
            try {
                const response = await axiosPrivate.get('organizations/team_roles', {
                    signal: controller.signal,
                    withCredentials: true
                });

                console.log('Team Roles:', response.data);

                // isMounted && setUsers(response.data)

            } catch (error) {
                console.error('Error fetching organization members:', error);
            }
        }

        getTeamRoles();

        return () => {
            isMounted = false;
            controller.abort();
        }
    }, [])


    // Function that gets all the users from the organization

    useEffect(() => {
        let isMounted = true;
        const controller = new AbortController();

        const getUsers = async () => {
            try {
                const response = await axiosPrivate.get('organization/users', {
                    signal: controller.signal,
                    withCredentials: true
                });
                console.log('Users:', response.data);
                isMounted && setUsers(response.data)
                setVisible(false);
            } catch (error) {
                console.error('Error fetching organization members:', error);
            }
        }

        getUsers();

        return () => {
            isMounted = false;
            controller.abort();
        }
    }, [])

    // All the user cards + button to generate signup employee link

    return (
        <>
            <div className={`${darkMode && 'dark'}`}>
                <div className='dark:bg-darkcanvas bg-canvas h-auto min-h-screen'>
                    <div className="flex flex-wrap justify-center">
                        {visible && (
                            <div className="fixed top-1/2 left-1/2 transform -translate-x-1/2 -translate-y-1/2">
                                <Loader size={30} color="red" />
                            </div>
                        )}
                        {!visible && (
                            <>
                                <Drawer offset={8} radius="md" opened={opened} onClose={close} position="right" zIndex="1000000">
                                    <div className="flex justify-center text-white pb-9 select-none">
                                        <Title className="text-4xl">Team Roles</Title>
                                    </div>
                                    <div className="flex flex-wrap justify-center">
                                        {teamRoles.map(role => (
                                            <TeamRoleCard key={role.role_id} id={role.role_id} name={role.role_name} />
                                        ))}
                                    </div>
                                </Drawer>
                                <OrganizationEmployeesComp users={currentPosts} setUsers={setUsers} visible={visible} setVisible={setVisible} />
                                <div className="fixed bottom-9 right-9">
                                    <Button size="lg" className="bg-accent text-white font-bold py-2 px-4 text-lg rounded" onClick={() => { /*getTeamRoles();*/ open(); }}>
                                        Team Roles
                                    </Button>
                                </div>
                            </>
                        )}
                    </div>
                    <div className='dark:bg-darkcanvas bg-canvas flex justify-center items-center'>
                        <PaginationComp totalPosts={users.length} postsPerPage={postPerPage} currentPage={currentPage} setCurrentPage={setCurrentPage} />
                    </div>
                </div>
            </div >
        </>
    )
}