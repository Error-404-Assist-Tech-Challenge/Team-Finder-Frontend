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
import TeamRolesComp from '../pageComponents/TeamRolesComp';


export default function OrganizationEmployeesPage() {

    // Initialization

    const [darkMode, setDarkMode] = useContext(Context);
    const axiosPrivate = useAxiosPrivate();
    const [users, setUsers] = useState([]);
    const [teamRoles, setTeamRoles] = useState([]);
    const [visible, setVisible] = useState(true);
    const [opened, { open, close }] = useDisclosure(false);

    // Pagination for Org Employees 
    const [currentPage, setCurrentPage] = useState(1);
    const [postPerPage, setPostPerPage] = useState(7);
    const lastPostIndex = currentPage * postPerPage;
    const firstPostIndex = lastPostIndex - postPerPage;
    const currentPosts = users.slice(firstPostIndex, lastPostIndex);

    // Pagination for Drawer
    const [currentPagetRole, setCurrentPagetRole] = useState(1);
    const [postPerPagetRole, setPostPerPagetRole] = useState(4);
    const lastPostIndextRole = currentPagetRole * postPerPagetRole;
    const firstPostIndextRole = lastPostIndextRole - postPerPagetRole;
    const currentPoststRole = teamRoles.slice(firstPostIndextRole, lastPostIndextRole);

    const isAdminOnly = users.filter(user => user.roles.includes('admin')).length === 1;

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

            console.log('Updated team roles:', response.data);

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
                                    <TeamRolesComp teamRoles={currentPoststRole} setTeamRoles={setTeamRoles} visible={visible} setVisible={setVisible} />
                                    <div className='flex justify-center items-center'>
                                        <PaginationComp totalPosts={teamRoles.length} postsPerPage={postPerPagetRole} currentPage={currentPagetRole} setCurrentPage={setCurrentPagetRole} drawer={true} />
                                    </div>
                                </Drawer>
                                <OrganizationEmployeesComp users={currentPosts} isAdminOnly={isAdminOnly} setUsers={setUsers} visible={visible} setVisible={setVisible} />
                                <div className="fixed bottom-9 right-9">
                                    <Button size="lg" className="bg-accent text-white font-bold py-2 px-4 text-lg rounded" onClick={() => { /*getTeamRoles();*/ open(); }}>
                                        Team Roles
                                    </Button>
                                </div>
                            </>
                        )}
                    </div>
                    <div className='dark:bg-darkcanvas bg-canvas flex justify-center items-center'>
                        <PaginationComp totalPosts={users.length} postsPerPage={postPerPage} currentPage={currentPage} setCurrentPage={setCurrentPage} drawer={false} />
                    </div>
                </div>
            </div >
        </>
    )
}