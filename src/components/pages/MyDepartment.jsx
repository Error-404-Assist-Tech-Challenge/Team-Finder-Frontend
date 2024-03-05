/* eslint-disable no-unused-vars */

/* eslint-disable no-unused-vars */
/* eslint-disable react-hooks/exhaustive-deps */

import React, { useContext, useEffect, useState } from 'react';
import { Button, Modal, MultiSelect } from '@mantine/core';
import { useDisclosure } from '@mantine/hooks';
import { Context } from '../../App';
import useAxiosPrivate from "../../hooks/useAxiosPrivate";
import DepartmentEmployee from '../departmentComponents/DepartmentEmployee';

export default function OrganizationEmployeesPage() {

    // Initialization

    const [darkMode, setDarkMode] = useContext(Context);
    const axiosPrivate = useAxiosPrivate();
    const [members, setMembers] = useState([]);
    const [visible, setVisible] = useState(false);

    const [addedEmployee, setAddedEmployee] = useState([]);
    const [opened, { open, close }] = useDisclosure(false);
    const [avalaible, setAvalaible] = useState([]);
    
    const list = []

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
            } catch (error) {
                console.error('Error fetching department members:', error);
            }
            finally {
                const timeout = 200;
                setTimeout(() => {
                    setVisible(true);
                }, timeout);
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
                console.log({avalaible})
            } catch (error) {
                console.error('Error fetching members without department:', error);
            }
            finally {
                const timeout = 200;
                setTimeout(() => {
                    setVisible(true);
                }, timeout);
            }
        }

        getAvalaibleMembers();

        return () => {
            isMounted = false;
            controller.abort();
        }
    }, [])

    for(let i = 0; i < avalaible.length; i = i + 1)
        list[i] = avalaible[i].name

    
   // All the user cards + button to generate signup employee link

    return (
        <div className={`${darkMode && 'dark'}`}>
            <div className='dark:bg-darkcanvas bg-canvas h-screen flex flex-wrap'>
                {members.map((member, index) => (
                                <DepartmentEmployee key={index} name={member.user_name}/>
                            ))}
                <Button variant="outline" onClick={open}
                        className={`relative w-[80px] h-[80px] m-[38px] rounded-full p-0 text-accent border-accent border-[5px] hover:text-accent`}>
                        <svg xmlns="http://www.w3.org/2000/svg" className="icon icon-tabler icon-tabler-plus w-full h-full" viewBox="0 0 24 24" strokeWidth="1.5" stroke="currentColor" fill="none" strokeLinecap="round" strokeLinejoin="round">
                            <path stroke="none" d="M0 0h24v24H0z" fill="none" />
                            <path d="M12 5l0 14" />
                            <path d="M5 12l14 0" />
                        </svg>
                </Button>
            </div>
            <Modal opened={opened} onClose={close} centered overflow="inside" className="bg-graybg text-white select-none" zIndex={1000002} closeOnClickOutside={false}>       
            <MultiSelect
                    label="Avalaible employees for your department:"
                    placeholder="Pick employee"
                    data={list}
                    value={addedEmployee}
                    onChange={setAddedEmployee}
                    searchable
                    nothingFoundMessage="No employees avalaible..."
                    comboboxProps={{ zIndex: 1000000000 }}
                    clearable/>
                    <div className="flex justify-center">
                        <Button className="bg-accent text-white hover:bg-btn_hover font-bold py-2 rounded mx-auto mt-10" onClick={close}>
                                        Add Employees
                        </Button>
                    </div>
            </Modal>
            <p>{addedEmployee}</p>  
        </div>
    )
}