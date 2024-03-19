/* eslint-disable no-unused-vars */
/* eslint-disable react/prop-types */

import { Card, Avatar, Modal, Badge, Button, Text, Title } from '@mantine/core';
import { useDisclosure } from '@mantine/hooks';
import { useState } from 'react'
import useAxiosPrivate from '../../hooks/useAxiosPrivate';
import useAuth from '../../hooks/useAuth';

export default function EmployeeCard({ isAdminOnly, employee, setUsers, visible, setVisible }) {

    const axiosPrivate = useAxiosPrivate();
    const [opened, { open, close }] = useDisclosure(false);
    const [isHovering, setIsHovering] = useState(false);
    const { auth } = useAuth();

    const getInitials = (name) => {
        const names = name.split(' ');
        return names.map((name) => name[0]).join('').toUpperCase();
    };

    const removeRole = async (e, role) => {
        close();
        setVisible(true);
        try {
            const response = await axiosPrivate.delete('organizations/roles', {
                headers: {
                    'Content-Type': 'application/json',
                    'Access-Control-Allow-Origin': '*',
                    'Access-Control-Allow-Credentials': 'true'
                },
                data: {
                    user_id: employee.id,
                    role_name: role,
                },
                withCredentials: true
            });

            // console.log(response.data);

            setUsers(response.data);

            if (employee.email == auth.email)
                window.location.reload();

        } catch (error) {
            console.error(error);
        }
        setVisible(false);
    }

    const assignRole = async (e, role) => {
        close();
        setVisible(true);
        try {
            const response = await axiosPrivate.post('organizations/roles',
                JSON.stringify({
                    user_id: employee.id,
                    role_name: role,
                }),
                {
                    headers: {
                        'Content-Type': 'application/json',
                        'Access-Control-Allow-Origin': '*',
                        'Access-Control-Allow-Credentials': 'true'
                    },
                    withCredentials: true
                });

            // console.log(response.data);

            setUsers(response.data);

            if (employee.email == auth.email)
                window.location.reload();

        } catch (error) {
            console.error(error);
        }
        setVisible(false);
    }

    return (
        <>
            <Modal opened={opened} onClose={close} centered overflow="inside" className="bg-graybg text-white select-none" zIndex={1000002}>
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

                <div className="flex justify-center items-center flex-col text-center h-full">
                    {!employee.roles.length && (<Badge className="m-2" color="gray" size="xl" variant="filled">Employee</Badge>)}
                    {employee.roles.includes("admin") && (<Badge className="m-2" color="gray" size="xl" variant="filled">Organization Admin</Badge>)}
                    {employee.roles.includes("dept_manager") && (<Badge className="m-2" color="gray" size="xl" variant="filled">Department Manager</Badge>)}
                    {employee.roles.includes("proj_manager") && (<Badge className="m-2" color="gray" size="xl" variant="filled">Project Manager</Badge>)}
                </div>

                <div className="pt-4 flex flex-col items-center">
                    {employee.roles.includes('admin') && (
                        <Button className={`bg-${isAdminOnly ? "[#868e96]" : "accent2"} text-white font-bold rounded-xl text-lg px-5 m-[10px] w-[300px] hover:bg-${isAdminOnly ? "[#868e96]" : "accent"}`}
                            onClick={() => { removeRole(null, 'admin') }} disabled={isAdminOnly}
                        >{isAdminOnly ? "Only Admin: Cannot Remove" : "Remove Organization Admin"}</Button>)
                    }
                    {!employee.roles.includes('admin') && (
                        <Button className="bg-accent text-white font-bold rounded-xl text-lg px-5 m-[10px] w-[300px] hover:bg-accent2"
                            onClick={() => { assignRole(null, 'admin') }}
                        >Make Organization Admin</Button>)
                    }
                    {employee.roles.includes('dept_manager') && (
                        <Button className="bg-accent2 text-white font-bold rounded-xl text-lg px-5 m-[10px] w-[300px] hover:bg-accent"
                            onClick={() => { removeRole(null, 'dept_manager') }}
                        >Remove Department Manager</Button>)
                    }

                    {!employee.roles.includes('dept_manager') && !employee.is_in_department && (
                        <Button className="bg-accent text-white font-bold rounded-xl text-lg px-5 m-[10px] w-[300px] hover:bg-accent2"
                            onClick={() => { assignRole(null, 'dept_manager') }}
                        >Make Department Manager</Button>)
                    }
                    {!employee.roles.includes('dept_manager') && employee.is_in_department && (
                        <Button className="bg-[#878e96] text-white font-bold rounded-xl text-lg px-5 m-[10px] w-[300px]"
                            disabled
                        >Is in department</Button>)
                    }

                    {employee.roles.includes('proj_manager') && (
                        <Button className="bg-accent2 text-white font-bold rounded-xl text-lg px-5 m-[10px] w-[300px] hover:bg-accent"
                            onClick={() => { removeRole(null, 'proj_manager') }}
                        >Remove Project Manager</Button>)
                    }
                    {!employee.roles.includes('proj_manager') && (
                        <Button className="bg-accent text-white font-bold rounded-xl text-lg px-5 m-[10px] w-[300px] hover:bg-accent2"
                            onClick={() => { assignRole(null, 'proj_manager') }}
                        >Make Project Manager</Button>)
                    }
                </div>
            </Modal>

            <Card className="flex w-[300px] h-[300px] bg-[#505A5E] mx-[40px] my-[40px] rounded-xl text-white select-none font-bold"
                onClick={open} onMouseEnter={() => setIsHovering(true)} onMouseLeave={() => setIsHovering(false)}>
                <div className="flex items-center">
                    <Avatar className="m-3 w-[50px] h-[50px] bg-[#E9E5E6]">{getInitials(employee.name)}</Avatar>
                    <div className="flex flex-col">
                        <div className="text-xl font-bold">{employee.name}</div>
                    </div>
                </div>
                <div className='ml-3'>
                    <div style={{ wordWrap: 'break-word' }}>{employee.email}</div>
                </div>
                <div className="flex justify-center items-center flex-col text-center h-full">
                    {!isHovering && !employee.roles.length && (
                        <Badge className="m-2" color="gray" size="xl" variant="filled">Employee</Badge>
                    )}
                    {!isHovering && employee.roles.includes("admin") && (
                        <Badge className="m-2" color="gray" size="xl" variant="filled">Organization Admin</Badge>
                    )}
                    {!isHovering && employee.roles.includes("dept_manager") && (
                        <Badge className="m-2" color="gray" size="xl" variant="filled">Department Manager</Badge>
                    )}
                    {!isHovering && employee.roles.includes("proj_manager") && (
                        <Badge className="m-2" color="gray" size="xl" variant="filled">Project Manager</Badge>
                    )}

                    {isHovering && <Text className="text-xl">Click to see more!</Text>}
                </div>
            </Card>
        </>
    )
}