/* eslint-disable no-unused-vars */

/* eslint-disable no-unused-vars */
/* eslint-disable react-hooks/exhaustive-deps */

import React, { useContext, useEffect, useState } from 'react';
import { Button, Modal, Select, Loader, Title, Box } from '@mantine/core';
import { useDisclosure } from '@mantine/hooks';
import { Context } from '../../App';
import useAxiosPrivate from "../../hooks/useAxiosPrivate";
import PaginationComp from '../pageComponents/Pagination';
import MyDepartmentComp from '../pageComponents/MyDepartmentComp';

export default function MyDepartmentPage() {

    // Initialization

    const [darkMode, setDarkMode] = useContext(Context);
    const axiosPrivate = useAxiosPrivate();
    const [visible, setVisible] = useState(true);
    const [members, setMembers] = useState([]);
    const [departmentName, setDepartmentName] = useState('');
    const [opened, { open, close }] = useDisclosure(false);

    const [unusedSkills, setUnusedSkills] = useState([]);
    const [addedSkill, setAddedSkill] = useState('');   

    const [currentPage, setCurrentPage] = useState(1);
    const [postPerPage, setPostPerPage] = useState(14);
    const lastPostIndex = currentPage * postPerPage;
    const firstPostIndex = lastPostIndex - postPerPage;
    const currentPosts =  members.slice(firstPostIndex, lastPostIndex);
    

    useEffect(() => {
    }, [darkMode]);

    useEffect(() => {
        let isMounted = true;
        const controller = new AbortController();

        const getDepartmentName = async () => {
            try {
                const response = await axiosPrivate.get('departments/managed', {
                    signal: controller.signal,
                    withCredentials: true
                });
                console.log('Department name:', response.data);

                if (isMounted) {
                    setDepartmentName(response.data.name);
                    getDepartmentMembers();
                }
            } catch (error) {
                if (error?.response == 409)
                    console.error('You have no department');
                else
                    console.error('Error fetching department members:', error);
            }
        }

        getDepartmentName();

        return () => {
            isMounted = false;
            controller.abort();
        }
    }, [])


    // Function that gets all the members from department

    const getDepartmentMembers = async () => {
        try {
            const response = await axiosPrivate.get('departments/members', {
                withCredentials: true
            });
            console.log('Department members:', response.data);
            setMembers(response.data)
            setVisible(false);
        } catch (error) {
            console.error('Error fetching department members:', error);
        }
    }


    // All the user cards + button to generate signup employee link

    return (
        <div className={`${darkMode && 'dark'}`}>
            <div className='dark:bg-darkcanvas bg-canvas h-auto min-h-screen select-none'>
                {visible && (
                    <div className="fixed top-1/2 left-1/2 transform -translate-x-1/2 -translate-y-1/2">
                        <Loader size={30} color="red" />
                    </div>
                )}
                {!visible && (
                    <>
                        <div className="flex flex-col">
                            <div className="flex justify-center text-white p-9 select-none">
                                {departmentName && (<Title className="text-4xl">{departmentName} Department</Title>)}
                                {!departmentName && (<Title className="text-4xl">You have no department</Title>)}
                            </div>
                        </div>
                        <div className="flex flex-wrap">
                            <MyDepartmentComp members={currentPosts} setMembers={setMembers}/>
                        </div>
                    </>
                )}
            </div>
            <div className='dark:bg-darkcanvas bg-canvas flex justify-center items-center'>
                <PaginationComp totalPosts={members.length} postsPerPage={postPerPage} currentPage={currentPage} setCurrentPage={setCurrentPage}/>
            </div>
        </div >
    )
}