/* eslint-disable no-unused-vars */
/* eslint-disable react/prop-types */

import { Card, Avatar, Modal, Badge, Button, Text, Title } from '@mantine/core';
import { useDisclosure } from '@mantine/hooks';
import { useState } from 'react'
import useAxiosPrivate from '../../hooks/useAxiosPrivate';

export default function EmployeeCard({ employee }) {

    const axiosPrivate = useAxiosPrivate();
    const [opened, { open, close }] = useDisclosure(false);
    const [isHovering, setIsHovering] = useState(false);
    const [selectedRole, selectRole] = useState('');
    const getInitials = (name) => {
        const names = name.split(' ');
        return names.map((name) => name[0]).join('').toUpperCase();
    };

    const removeRole = async (e, role) => {

    }

    const assignRole = async (e, role) => {

        try {
            const response = await axiosPrivate.post('users/admin',
                JSON.stringify({
                    user_id: employee.id,
                    role: role,
                }),
                {
                    headers: {
                        'Content-Type': 'application/json',
                        'Access-Control-Allow-Origin': '*',
                        'Access-Control-Allow-Credentials': 'true'
                    },
                    withCredentials: true
                });

            console.log(response.data);

        } catch (error) {
            console.error(error);
        }
    }

    return (
        <>
            <Modal opened={opened} onClose={close} centered overflow="inside" className="bg-graybg text-white select-none">
                <div className="flex items-center">
                    <Avatar className="m-3 w-[75px] h-[75px] bg-[#E9E5E6] bigavatar">{getInitials(employee.name)}</Avatar>
                    <div className="flex flex-col">
                        <div className="text-3xl font-bold">{employee.name}</div>
                    </div>
                </div>
                <div className="flex justify-center p-6">
                    <p>{employee.email}</p>
                </div>
                <div className="pt-4 flex justify-start">
                    <p className="ml-8 text-lg font-bold">Roles:</p>
                </div>

                <div className="pt-4 flex justify-center">
                    {!employee.user_roles.length && (<Badge color="gray" size="xl" variant="filled">Employee</Badge>)}
                    {employee.user_roles.includes("admin") && (<Badge color="gray" size="xl" variant="filled">Organization Admin</Badge>)}
                    {employee.user_roles.includes("dept_manager") && (<Badge color="gray" size="xl" variant="filled">Department Manager</Badge>)}
                    {employee.user_roles.includes("proj_manager") && (<Badge color="gray" size="xl" variant="filled">Project Manager</Badge>)}
                </div>

                <div className="pt-4 flex flex-col items-center">
                    {employee.user_roles.includes('admin') && (
                        <Button className="bg-accent2 text-white font-bold rounded-xl text-lg px-5 m-[10px] w-[300px]"
                            onClick={() => { removeRole('admin') }}
                        >Remove Organization Admin</Button>)
                    }
                    {employee.user_roles.includes('dept_manager') && (
                        <Button className="bg-accent2 text-white font-bold rounded-xl text-lg px-5 m-[10px] w-[300px]"
                            onClick={() => { removeRole('dept_manager') }}
                        >Remove Department Manager</Button>)
                    }
                    {employee.user_roles.includes('proj_manager') && (
                        <Button className="bg-accent2 text-white font-bold rounded-xl text-lg px-5 m-[10px] w-[300px]"
                            onClick={() => { removeRole('proj_manager') }}
                        >Remove Project Manager</Button>)
                    }
                    {!employee.user_roles.includes('admin') && (
                        <Button className="bg-accent text-white font-bold rounded-xl text-lg px-5 m-[10px] w-[300px]"
                            onClick={() => { assignRole('dept_manager') }}
                        >Make Organization Admin</Button>)
                    }
                    {!employee.user_roles.includes('dept_manager') && (
                        <Button className="bg-accent text-white font-bold rounded-xl text-lg px-5 m-[10px] w-[300px]"
                            onClick={() => { assignRole('dept_manager') }}
                        >Make Department Manager</Button>)
                    }
                    {!employee.user_roles.includes('proj_manager') && (
                        <Button className="bg-accent text-white font-bold rounded-xl text-lg px-5 m-[10px] w-[300px]"
                            onClick={() => { assignRole('dept_manager') }}
                        >Make Project Manager</Button>)
                    }
                </div>
            </Modal>

            <Card className="flex w-[300px] h-[230px] bg-[#505A5E] mx-[40px] my-[20px] rounded-xl dark:text-darktext text-text select-none font-bold"
                onClick={open} onMouseEnter={() => setIsHovering(true)} onMouseLeave={() => setIsHovering(false)}>
                <div className="flex items-center">
                    <Avatar className="m-3 w-[50px] h-[50px] bg-[#E9E5E6]">{getInitials(employee.name)}</Avatar>
                    <div className="flex flex-col">
                        <div className="text-xl font-bold">{employee.name}</div>
                    </div>
                </div>
                <div className='ml-3'>{employee.email}</div>
                <div className="flex justify-center items-center flex-col text-center h-full">
                    {!isHovering && !employee.user_roles.length && (
                        <Badge color="gray" size="xl" variant="filled">Employee</Badge>
                    )}
                    {!isHovering && employee.user_roles.includes("admin") && (
                        <Badge color="gray" size="xl" variant="filled">Organization Admin</Badge>
                    )}
                    {!isHovering && employee.user_roles.includes("dept_manager") && (
                        <Badge color="gray" size="xl" variant="filled">Department Manager</Badge>
                    )}
                    {!isHovering && employee.user_roles.includes("proj_manager") && (
                        <Badge color="gray" size="xl" variant="filled">Project Manager</Badge>
                    )}

                    {isHovering && <Text className="text-xl">Click to see more!</Text>}
                </div>
            </Card>
        </>
    )
}