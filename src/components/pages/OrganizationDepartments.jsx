/* eslint-disable no-unused-vars */

import React, { useContext, useEffect, useState } from 'react';
import useAxiosPrivate from '../../hooks/useAxiosPrivate';
import { Button } from '@mantine/core';
import { useHeadroom } from '@mantine/hooks';
import { Context } from '../../App';
import DepartmentCard from '../departmentComponents/DepartmentCard';

export default function OrganizationDepartmentsPage() {

    const [darkMode, setDarkMode] = useContext(Context);
    const pinned = useHeadroom({ fixedAt: 20 });
    const axiosPrivate = useAxiosPrivate();
    const [departments, setDepartments] = useState([]);

    // GET DEPARTMENTS 
    useEffect(() => {
        let isMounted = true;
        const controller = new AbortController();
        const fetchDepartments = async () => {
            try {
                const response = await axiosPrivate.get('departments', {
                    signal: controller.signal,
                    // withCredentials: true
                });
                console.log('Departments:', response.data);
                isMounted && setDepartments(response.data);

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

    useEffect(() => {

    }, [darkMode]);

    return (
        <>
            <div className={`${darkMode && 'dark'}`}>
                <div className='dark:bg-darkcanvas bg-canvas h-auto select-none'>
                    <div className="flex flex-wrap bg-darkcanvas">
                        <div className='bg-darkcanvas select-none h-auto py-[30px] flex'>
                            {departments.map((department, index) => (
                                <DepartmentCard key={index} leader={department.manager_name} name={department.name} members={department.department_members} />
                            ))}
                        </div>
                        <div className="w-[200px] h-[270px] flex justify-center items-center">
                            <Button variant="outline"
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
            </div>
        </>
    )
}