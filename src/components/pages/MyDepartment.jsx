/* eslint-disable no-unused-vars */

/* eslint-disable no-unused-vars */
/* eslint-disable react-hooks/exhaustive-deps */

import React, { useContext, useEffect, useState } from 'react';
import { Button, Loader, Card, rem } from '@mantine/core';

import { Context } from '../../App';
import useAxiosPrivate from "../../hooks/useAxiosPrivate";
import EmployeeCard from '../employeeComponents/EmployeeCard'
import { notifications } from '@mantine/notifications';
import { IconCheck } from '@tabler/icons-react';
import DepartmentEmployee from '../employeeComponents/DepartmentEmployee';

export default function OrganizationEmployeesPage() {

    // Initialization

    const [darkMode, setDarkMode] = useContext(Context);
    const axiosPrivate = useAxiosPrivate();
    const [members, setMembers] = useState([]);
    const [visible, setVisible] = useState(false);
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

    
   // All the user cards + button to generate signup employee link

    return (
        <div className={`${darkMode && 'dark'}`}>
            <div className='dark:bg-darkcanvas bg-canvas h-screen flex flex-wrap'>
            {members.map((member, index) => (
                            <DepartmentEmployee key={index} name={member.user_name}/>
                        ))}
            </div>
        </div>
    )
}