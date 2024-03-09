/* eslint-disable no-unused-vars */
/* eslint-disable react-hooks/exhaustive-deps */
import { randomId, useDisclosure } from '@mantine/hooks';
import React, { useContext, useEffect, useState } from 'react';
import { Loader, Drawer, Title, Button, TextInput } from '@mantine/core';
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
    const [opened, { open, close }] = useDisclosure(false);
    const lastPostIndex = currentPage * postPerPage;
    const firstPostIndex = lastPostIndex - postPerPage;
    const currentPosts = users.slice(firstPostIndex, lastPostIndex);

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

                isMounted && setTeamRoles(response.data)

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

    // Adds new team role

    const [isAdding, setIsAdding] = useState(false)
    const [roleName, setRoleName] = useState('')

    const handleAddRole = async () => {
        try {
            const response = await axiosPrivate.post('organizations/team_roles',
                JSON.stringify({
                    name: roleName
                }),
                {
                    headers: {
                        'Content-Type': 'application/json',
                        'Access-Control-Allow-Origin': '*',
                        'Access-Control-Allow-Credentials': 'true'
                    },
                    withCredentials: true
                });

            console.log('Response:', response.data);

            setTeamRoles(response.data);

        } catch (error) {
            console.error('Error fetching unused skills:', error);
        }
        setIsAdding(false)
        setRoleName('')
    }

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
                                            <TeamRoleCard key={role.role_id} id={role.id} name={role.name} setTeamRoles={setTeamRoles} />
                                        ))}
                                        <div className="w-full h-[128px] rounded-lg bg-white p-4 my-2 select-none flex items-center justify-center">
                                            {!isAdding && (
                                                <Button variant="outline" onClick={() => setIsAdding(true)}
                                                    className={`relative w-[60px] h-[60px] m-[6px] rounded-full p-0 text-accent border-accent border-[5px] hover:text-accent`}>
                                                    <svg xmlns="http://www.w3.org/2000/svg" className="icon icon-tabler icon-tabler-plus w-full h-full" viewBox="0 0 24 24" strokeWidth="1.5" stroke="currentColor" fill="none" strokeLinecap="round" strokeLinejoin="round">
                                                        <path stroke="none" d="M0 0h24v24H0z" fill="none" />
                                                        <path d="M12 5l0 14" />
                                                        <path d="M5 12l14 0" />
                                                    </svg>
                                                </Button>
                                            )}
                                            {isAdding && (
                                                <div>
                                                    <TextInput
                                                        placeholder="Team role name..."
                                                        className="h-[52px]"
                                                        size="lg"
                                                        value={roleName}
                                                        onChange={(event) => setRoleName(event.currentTarget.value)}
                                                    />
                                                    <Button className="w-[240px] mr-[5px] bg-accent mt-[10px] text-[18px]" onClick={handleAddRole}>
                                                        Add Team Role
                                                    </Button>
                                                </div>
                                            )}
                                        </div>
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