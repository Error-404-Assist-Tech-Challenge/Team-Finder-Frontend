/* eslint-disable no-unused-vars */

import React, { useContext, useEffect, useState } from 'react';
import useAxiosPrivate from '../../hooks/useAxiosPrivate';
import { Button, Modal, TextInput, Loader, Title } from '@mantine/core';
import { useHeadroom, useDisclosure } from '@mantine/hooks';
import { Context } from '../../App';
import DepartmentCard from '../departmentComponents/DepartmentCard';

export default function OrganizationDepartmentsPage() {

    const [darkMode, setDarkMode] = useContext(Context);
    const pinned = useHeadroom({ fixedAt: 20 });
    const axiosPrivate = useAxiosPrivate();
    const [departments, setDepartments] = useState([]);
    const [opened, { open, close }] = useDisclosure(false);
    const [departmentName, setDepartmentName] = useState('');
    const [departmentManagers, setDepartmentManagers] = useState([]);
    const [visible, setVisible] = useState(true);

    // GET DEPARTMENTS 

    useEffect(() => {
        let isMounted = true;
        const controller = new AbortController();
        const fetchDepartments = async () => {
            try {
                const response = await axiosPrivate.get('departments', {
                    signal: controller.signal,
                    withCredentials: true
                });
                console.log('Departments:', response.data);
                isMounted && setDepartments(response.data);
                setVisible(false);

            } catch (error) {
                console.error('Error fetching departments:', error);
            }
            finally {
                isMounted = false;
                controller.abort();
            }
        }
        fetchDepartments();
        return () => {
            isMounted = false;
            controller.abort();
        }
    }, []);



    // GET DEPARTMENT MANAGERS

    useEffect(() => {
        let isMounted = true;
        const controller = new AbortController();
        const fetchDepartmentManagers = async () => {
            try {
                const response = await axiosPrivate.get('departments/managers', {
                    signal: controller.signal,
                    withCredentials: true
                });
                console.log('Department Managers:', response.data);
                if (isMounted) {
                    setDepartmentManagers(response.data);
                }
            } catch (error) {
                console.error('Error fetching departments:', error);
            }
            finally {
                isMounted = false;
                controller.abort();
            }
        }
        fetchDepartmentManagers();
        return () => {
            isMounted = false;
            controller.abort();
        }
    }, []);


    // ADD DEPARTMENT

    const handleAddDepartment = async () => {
        try {
            const response = await axiosPrivate.post('departments',
                JSON.stringify({
                    name: departmentName,
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

            setDepartments(response.data);

        } catch (error) {
            console.error('Error fetching unused skills:', error);
        }

        close();
    }

    useEffect(() => {

    }, [darkMode]);


    return (
        <>
            <div className={`${darkMode && 'dark'}`}>
                <div className='dark:bg-darkcanvas bg-canvas h-auto select-none'>
                    {visible && (
                        <div className="fixed top-1/2 left-1/2 transform -translate-x-1/2 -translate-y-1/2">
                            <Loader size={30} color="red" />
                        </div>
                    )}
                    <Modal opened={opened} onClose={close} centered overflow="inside" size={500} className="dark:bg-card_modal text-white select-none" zIndex={1000002}>
                        <div className="flex justify-center">
                            <Title className="pb-[30px]">Create Department</Title>
                        </div>
                        <TextInput
                            label="Department Name"
                            placeholder="Department name"
                            size="lg"
                            value={departmentName}
                            onChange={(event) => setDepartmentName(event.currentTarget.value)}
                            className=" py-[30px]"
                        />
                        {departmentName &&
                            (<Button onClick={handleAddDepartment}
                                className="bg-accent text-white hover:bg-btn_hover font-bold px-4 py-2 rounded mx-[10px] my-[10px] mt-[20px]">
                                Create Department
                            </Button>)}
                    </Modal>

                    {!visible && (
                        <div className="flex flex-wrap justify-centerbg-darkcanvas">
                            <div className='bg-darkcanvas select-none h-auto py-[30px] flex flex-wrap'>
                                {departments.map((department, index) => (
                                    <DepartmentCard key={index}
                                        id={department.id} manager={department.manager_name} manager_id={department.manager_id} name={department.name} members={department.department_members}
                                        departmentManagers={departmentManagers} setDepartmentManagers={setDepartmentManagers}
                                        departments={departments} setDepartments={setDepartments} />
                                ))}
                                <div className="w-[200px] h-[224px] flex justify-center items-center">
                                    <Button variant="outline" onClick={open}
                                        className={`relative w-[80px] h-[80px] m-[6px] rounded-full p-0 text-accent border-accent border-[5px] hover:text-accent`}>
                                        <svg xmlns="http://www.w3.org/2000/svg" className="icon icon-tabler icon-tabler-plus w-full h-full" viewBox="0 0 24 24" strokeWidth="1.5" stroke="currentColor" fill="none" strokeLinecap="round" strokeLinejoin="round">
                                            <path stroke="none" d="M0 0h24v24H0z" fill="none" />
                                            <path d="M12 5l0 14" />
                                            <path d="M5 12l14 0" />
                                        </svg>
                                    </Button>
                                </div>
                            </div>
                        </div>
                    )}
                </div>
            </div>
        </>
    )
}