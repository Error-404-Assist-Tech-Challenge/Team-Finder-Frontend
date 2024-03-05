/* eslint-disable no-unused-vars */

/* eslint-disable no-unused-vars */
/* eslint-disable react-hooks/exhaustive-deps */

import React, { useContext, useEffect, useState } from 'react';
import { Button, Modal, Select, Loader } from '@mantine/core';
import { useDisclosure } from '@mantine/hooks';
import { Context } from '../../App';
import useAxiosPrivate from "../../hooks/useAxiosPrivate";
import DepartmentEmployee from '../departmentComponents/DepartmentEmployee';

export default function OrganizationEmployeesPage() {

    // Initialization

    const [darkMode, setDarkMode] = useContext(Context);
    const axiosPrivate = useAxiosPrivate();
    const [visible, setVisible] = useState(true);
    const [members, setMembers] = useState([]);
    const [addedEmployee, setAddedEmployee] = useState('');
    const [opened, { open, close }] = useDisclosure(false);
    const [avalaible, setAvalaible] = useState([]);

    const employeeList = []

    useEffect(() => {
    }, [darkMode]);


    // Function that gets all the members from department

    useEffect(() => {
        let isMounted = true;
        const controller = new AbortController();

        const getDepartmentMembers = async () => {
            try {
                const response = await axiosPrivate.get('departments/members', {
                    signal: controller.signal,
                    withCredentials: true
                });
                console.log('Department members:', response.data);
                isMounted && setMembers(response.data)
                setVisible(false);
            } catch (error) {
                console.error('Error fetching department members:', error);
            }
        }
        
        getDepartmentMembers();
        
        return () => {
            isMounted = false;
            controller.abort();
        }
    }, [])

    // Function that gets all the avalaible members

    useEffect(() => {
        let isMounted = true;
        const controller = new AbortController();
        
        const getAvalaibleMembers = async () => {
            try {
                const response = await axiosPrivate.get('departments/members/available', {
                    signal: controller.signal,
                    withCredentials: true
                });
                console.log('Avalaible employees:', response.data);
                isMounted && setAvalaible(response.data)
                console.log({ avalaible })
                setVisible(false);
            } catch (error) {
                console.error('Error fetching members without department:', error);
            }
        }
        
        getAvalaibleMembers();
        
        return () => {
            isMounted = false;
            controller.abort();
        }
    }, [])
    for (let i = 0; i < avalaible.length; i++) {
        employeeList[i] = {
            value: avalaible[i].id,
            label: avalaible[i].name
        };
    }
    // Add new employee to department

    const handleAddEmployee = async () => {
        try {
            const response = await axiosPrivate.post('departments/members',
                JSON.stringify({
                    dept_id: members[0].dept_id,
                    user_id: addedEmployee,
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
        } catch (error) {
            console.error('Error adding employees:', error);
        }
        close();
    }
    // All the user cards + button to generate signup employee link

    return (
        <div className={`${darkMode && 'dark'}`}>
            <div className='dark:bg-darkcanvas bg-canvas h-screen flex flex-wrap'>
                {visible && (
                        <div className="fixed top-1/2 left-1/2 transform -translate-x-1/2 -translate-y-1/2">
                            <Loader size={30} color="red" />
                        </div>
                    )}
                {!visible && (
                    <>
                        {members.map((member, index) => (
                            <DepartmentEmployee key={index} name={member.user_name} user_id={member.user_id}/>
                        ))}
                        <Button variant="outline" onClick={open}
                            className={`relative w-[80px] h-[80px] m-[38px] rounded-full p-0 text-accent border-accent border-[5px] hover:text-accent`}>
                            <svg xmlns="http://www.w3.org/2000/svg" className="icon icon-tabler icon-tabler-plus w-full h-full" viewBox="0 0 24 24" strokeWidth="1.5" stroke="currentColor" fill="none" strokeLinecap="round" strokeLinejoin="round">
                                <path stroke="none" d="M0 0h24v24H0z" fill="none" />
                                <path d="M12 5l0 14" />
                                <path d="M5 12l14 0" />
                            </svg>
                        </Button>
                    </>  
                )}
            </div>
            <Modal opened={opened} onClose={close} centered overflow="inside" className="bg-graybg text-white select-none" zIndex={1000002} closeOnClickOutside={false}>
                <Select
                    label="Unassigned employees:"
                    placeholder="Pick employee"
                    data={employeeList}
                    value={addedEmployee}
                    onChange={setAddedEmployee}
                    searchable
                    nothingFoundMessage="No employees avalaible..."
                    comboboxProps={{ zIndex: 1000000000 }}
                    clearable />
                <div className="flex justify-center">
                    <Button className="bg-accent text-white hover:bg-btn_hover font-bold py-2 rounded mx-auto mt-10" onClick={handleAddEmployee}>
                        Add Employees
                    </Button>
                </div>
            </Modal>
        </div>
    )
}