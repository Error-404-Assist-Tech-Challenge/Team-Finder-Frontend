/* eslint-disable react/prop-types */
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


export default function TeamRolesComp({ teamRoles, setTeamRoles, visible, setVisible }) {

    // Initialization

    const [darkMode, setDarkMode] = useContext(Context);
    const axiosPrivate = useAxiosPrivate();
    const [users, setUsers] = useState([]);


    useEffect(() => {
    }, [darkMode]);

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
                <div className='bg-[#6d6f77] h-auto'>
                    <div className="flex flex-wrap justify-center">
                        {visible && (
                            <div className="fixed top-1/2 left-1/2 transform -translate-x-1/2 -translate-y-1/2">
                                <Loader size={30} color="red" />
                            </div>
                        )}
                        {!visible && (
                            <>
                                <div className="flex justify-center text-white pb-9 select-none">
                                    <Title className="text-4xl">Team Roles</Title>
                                </div>
                                <div className="flex flex-wrap justify-center">
                                    {teamRoles.map(role => (
                                        <TeamRoleCard key={role.role_id} id={role.id} name={role.name} setTeamRoles={setTeamRoles} used={role.used} />
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
                            </>
                        )}
                    </div>
                </div>
            </div >
        </>
    )
}