/* eslint-disable no-unused-vars */

/* eslint-disable no-unused-vars */
/* eslint-disable react-hooks/exhaustive-deps */

import React, { useContext, useEffect, useState } from 'react';
import { Button, Modal, Select, Loader, Title, Box, Drawer } from '@mantine/core';
import { useDisclosure } from '@mantine/hooks';
import { Context } from '../../App';
import useAxiosPrivate from "../../hooks/useAxiosPrivate";
import PaginationComp from '../pageComponents/Pagination';
import MyDepartmentComp from '../pageComponents/MyDepartmentComp';
import ProposalCard from '../departmentComponents/ProposalCard';

export default function MyDepartmentPage() {

    // Initialization

    const [darkMode, setDarkMode] = useContext(Context);
    const axiosPrivate = useAxiosPrivate();
    const [visible, setVisible] = useState(true);
    const [members, setMembers] = useState([]);
    const [departmentName, setDepartmentName] = useState('');
    const [proposals, setProposals] = useState([])

    const [unusedSkills, setUnusedSkills] = useState([]);
    const [addedSkill, setAddedSkill] = useState('');

    const [openedDrawer, { open: openDrawer, close: closeDrawer }] = useDisclosure(false);

    const [currentPage, setCurrentPage] = useState(1);
    const [postPerPage, setPostPerPage] = useState(14);
    const lastPostIndex = currentPage * postPerPage;
    const firstPostIndex = lastPostIndex - postPerPage;
    const currentPosts = members.slice(firstPostIndex, lastPostIndex);

    const skillProposals = [
        { user_name: "Alice", skill_name: "JavaScript", level: 3, experience: 4 },
        { user_name: "Bob", skill_name: "Python", level: 2, experience: 5 },
        { user_name: "Charlie", skill_name: "React", level: 4, experience: 3 },
        { user_name: "David", skill_name: "Node.js", level: 5, experience: 6 },
        { user_name: "Eve", skill_name: "HTML", level: 1, experience: 2 },
        { user_name: "Frank", skill_name: "CSS", level: 2, experience: 1 },
        { user_name: "Grace", skill_name: "Java", level: 3, experience: 5 },
        { user_name: "Heidi", skill_name: "SQL", level: 4, experience: 4 },
        { user_name: "Ivan", skill_name: "C++", level: 5, experience: 3 },
        { user_name: "Jack", skill_name: "Ruby", level: 1, experience: 6 }
    ];


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


    useEffect(() => {
        let isMounted = true;
        const controller = new AbortController();

        const getProposals = async () => {
            try {
                const response = await axiosPrivate.get('skills/proposal', {
                    signal: controller.signal,
                    withCredentials: true
                });

                console.log('Propasals:', response.data);

                isMounted && setProposals(response.data)

            } catch (error) {
                if (error?.response == 409)
                    console.error('You have no department');
                else
                    console.error('Error fetching department members:', error);
            }
        }

        getProposals();

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
                        <Drawer offset={8} radius="md" opened={openedDrawer} onClose={closeDrawer} position="right" zIndex="1000000">
                            <div className="flex justify-center text-white pb-9 select-none">
                                <Title className="text-4xl">Requests</Title>
                            </div>
                            <div className="flex flex-wrap justify-center">
                                {proposals.map((proposal, index) => (
                                    <ProposalCard key={index} proposal={proposal} setProposals={setProposals} />
                                ))}
                            </div>
                        </Drawer>
                        <div className="flex flex-col">
                            <div className="flex justify-center text-white p-9 select-none">
                                {departmentName && (<Title className="text-4xl">{departmentName} Department</Title>)}
                                {!departmentName && (<Title className="text-4xl">You have no department</Title>)}
                            </div>
                        </div>
                        <div className="flex flex-wrap">
                            <MyDepartmentComp members={currentPosts} setMembers={setMembers} />
                        </div>
                        <div className="fixed bottom-9 right-9">
                            <Button size="lg" className="bg-accent text-white font-bold py-2 px-4 text-lg rounded" onClick={openDrawer}>
                                Department Requests
                            </Button>
                        </div>
                    </>
                )}
            </div>
            <div className='dark:bg-darkcanvas bg-canvas flex justify-center items-center'>
                <PaginationComp totalPosts={members.length} postsPerPage={postPerPage} currentPage={currentPage} setCurrentPage={setCurrentPage} />
            </div>
        </div >
    )
}