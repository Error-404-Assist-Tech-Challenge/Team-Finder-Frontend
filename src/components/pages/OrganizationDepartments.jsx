/* eslint-disable no-unused-vars */

import React, { useContext, useEffect, useState } from 'react';
import useAxiosPrivate from '../../hooks/useAxiosPrivate';
import { Button, Modal, TextInput, Loader, Title } from '@mantine/core';
import { useHeadroom, useDisclosure } from '@mantine/hooks';
import { Context } from '../../App';
import OrganizationDepartmentsComp from '../pageComponents/OrganizationDepartmentsComp';
import PaginationComp from '../pageComponents/Pagination';

export default function OrganizationDepartmentsPage() {

    const [darkMode, setDarkMode] = useContext(Context);
    const pinned = useHeadroom({ fixedAt: 20 });
    const axiosPrivate = useAxiosPrivate();
    const [departments, setDepartments] = useState([]);
    const [departmentName, setDepartmentName] = useState('');
    const [departmentManagers, setDepartmentManagers] = useState([]);
    const [visible, setVisible] = useState(true);

    const [currentPage, setCurrentPage] = useState(1);
    const [postPerPage, setPostPerPage] = useState(9);
    const lastPostIndex = currentPage * postPerPage;
    const firstPostIndex = lastPostIndex - postPerPage;
    const currentPosts = departments.slice(firstPostIndex, lastPostIndex);

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
                // console.log('Departments:', response.data);
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
                // console.log('Department Managers:', response.data);
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

    useEffect(() => {

    }, [darkMode]);


    return (
        <>
            <div className={`${darkMode && 'dark'}`}>
                <div className='dark:bg-darkcanvas bg-canvas h-auto min-h-screen select-none'>
                    {visible && (
                        <div className="fixed top-1/2 left-1/2 transform -translate-x-1/2 -translate-y-1/2">
                            <Loader size={30} color="red" />
                        </div>
                    )}
                    {!visible && (
                        <div className="flex flex-wrap justify-centers dark:bg-darkcanvas bg-canvas">
                            <div className='dark:bg-darkcanvas bg-canvas select-none h-auto py-[30px] flex flex-wrap'>
                                <OrganizationDepartmentsComp departmentManagers={departmentManagers} setDepartmentManagers={setDepartmentManagers}
                                    departments={departments} setDepartments={setDepartments} visible={visible} setVisible={setVisible} />
                            </div>
                        </div>
                    )}
                </div>
                <div className='dark:bg-darkcanvas bg-canvas flex justify-center items-center'>
                    <PaginationComp totalPosts={departments.length} postsPerPage={postPerPage} currentPage={currentPage} setCurrentPage={setCurrentPage} drawer={false} />
                </div>
            </div>
        </>
    )
}