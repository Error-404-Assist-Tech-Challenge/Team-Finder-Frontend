/* eslint-disable no-unused-vars */

import React, { useContext, useEffect } from 'react';
import useAxiosPrivate from '../../hooks/useAxiosPrivate';

import { useHeadroom } from '@mantine/hooks';

import { Context } from '../../App';
import DepartmentCard from '../skillComponents/DepartmentCard';

export default function OrganizationDepartmentsPage() {

    const [darkMode, setDarkMode] = useContext(Context);
    const pinned = useHeadroom({ fixedAt: 20 });
    const axiosPrivate = useAxiosPrivate();

    useEffect(() => {
        const controller = new AbortController();
        const fetchUserSkills = async () => {
            try {
                const response = await axiosPrivate.get('departments', {
                    signal: controller.signal
                });
                console.log('Departments:', response.data);
            } catch (error) {
                console.error('Error fetching departments:', error);
            }
        }
        fetchUserSkills();
        return () => {
            
        }
    }, []);

    useEffect(() => {

    }, [darkMode]);

    return (
        <>
            <div className={`${darkMode && 'dark'}`}>
                <div className='dark:bg-darkcanvas bg-canvas h-auto select-none'>
                    <DepartmentCard />
                </div>
            </div>
        </>
    )
}