/* eslint-disable no-unused-vars */

/* eslint-disable no-unused-vars */
/* eslint-disable react-hooks/exhaustive-deps */

import React, { useContext, useEffect, useState } from 'react';
import { Button, Modal, Text, Loader, Title, Box, Drawer, Card } from '@mantine/core';
import { useDisclosure } from '@mantine/hooks';
import { Context } from '../../App';
import useAxiosPrivate from "../../hooks/useAxiosPrivate";
import PaginationComp from '../pageComponents/Pagination';
import MyDepartmentComp from '../pageComponents/MyDepartmentComp';
import ProposalCard from '../departmentComponents/ProposalCard';
import StatisticsComp from '../statistics/Statistics';
import LevelStatsComp from '../statistics/LevelStats';


export default function MyDepartmentPage() {

    // Initialization

    const [darkMode, setDarkMode] = useContext(Context);
    const axiosPrivate = useAxiosPrivate();
    const [visible, setVisible] = useState(true);
    const [visibleLoad, setVisibleLoad] = useState(true);
    const [members, setMembers] = useState([]);
    const [departmentName, setDepartmentName] = useState('');
    const [proposals, setProposals] = useState([]);
    const [stats, setStats] = useState([]);

    const [unusedSkills, setUnusedSkills] = useState([]);
    const [addedSkill, setAddedSkill] = useState('');

    const [openedDrawer, { open: openDrawer, close: closeDrawer }] = useDisclosure(false);
    const [openedStatsDrawer, { open: openStatsDrawer, close: closeStatsDrawer }] = useDisclosure(false);

    const [currentPage, setCurrentPage] = useState(1);
    const [postPerPage, setPostPerPage] = useState(11);
    const lastPostIndex = currentPage * postPerPage;
    const firstPostIndex = lastPostIndex - postPerPage;
    const currentPosts = members.slice(firstPostIndex, lastPostIndex);

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
                // console.log('Department name:', response.data);

                if (isMounted) {
                    setDepartmentName(response.data.name);
                    getDepartmentMembers();
                }
            } catch (error) {
                if (error?.response.status === 409) {
                    setVisible(false);
                    console.error('You have no department');
                }
                else
                    console.error('Error fetching department members:', error);
            }
        }

        getDepartmentName();
        // GET statistics
        const getStats = async () => {
            try {
                const response = await axiosPrivate.get('departments/statistics', {
                    headers: {
                        'Content-Type': 'application/json',
                        'Access-Control-Allow-Origin': '*',
                        'Access-Control-Allow-Credentials': 'true'
                    },
                    withCredentials: true
                });

                // console.log('Stats:', response.data);
                setStats(response.data);

            } catch (error) {
                if (error?.response == 409)
                    console.error('You have no department');
                else
                    console.error('Error fetching department members:', error);
            }
        }
        getStats();

        return () => {
            isMounted = false;
            controller.abort();
        }
    }, [])

    const getProposals = async () => {
        setVisibleLoad(true);
        try {
            const response = await axiosPrivate.get('skills/proposal', {
                headers: {
                    'Content-Type': 'application/json',
                    'Access-Control-Allow-Origin': '*',
                    'Access-Control-Allow-Credentials': 'true'
                },
                withCredentials: true
            });

            // console.log('Propasals:', response.data);

            setProposals(response.data)

        } catch (error) {
            if (error?.response == 409)
                console.error('You have no department');
            else
                console.error('Error fetching department members:', error);
        }
        setVisibleLoad(false);
    }

    const getDepartmentMembers = async () => {
        try {
            const response = await axiosPrivate.get('departments/members', {
                headers: {
                    'Content-Type': 'application/json',
                    'Access-Control-Allow-Origin': '*',
                    'Access-Control-Allow-Credentials': 'true'
                },
                withCredentials: true
            });
            // console.log('Department members:', response.data);
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
                                {visibleLoad && (
                                    <div className="fixed top-1/2 left-1/2 transform -translate-x-1/2 -translate-y-1/2">
                                        <Loader size={30} color="red" />
                                    </div>
                                )}
                                {!visibleLoad && (<>
                                    {proposals.map((proposal, index) => (
                                        <ProposalCard key={index} proposal={proposal} setProposals={setProposals} proposals={proposals} visible={visibleLoad} setVisible={setVisibleLoad} />
                                    ))}</>)}
                            </div>
                        </Drawer>
                        {stats && (
                            <Drawer offset={8} radius="xl" size="95%" opened={openedStatsDrawer} onClose={closeStatsDrawer} position="bottom" zIndex="1000000">
                                <div className="flex justify-center text-white pb-9 select-none">
                                    <Title className="text-4xl">Statistics</Title>
                                </div>
                                <div className='flex flex-wrap'>
                                    <div className='bg-blue w-3/5 flex flex-wrap'>
                                        {stats.map((stat, index) => (
                                            <StatisticsComp key={index} stat={stat} />
                                        ))}
                                    </div>
                                    <div className='bg-red w-2/5' style={{ display: 'grid', placeItems: 'center' }}>
                                        <LevelStatsComp index={0} stats={stats} />
                                    </div>
                                </div>
                            </Drawer>
                        )}
                        {departmentName && (
                            <>
                                <div className="flex flex-col">
                                    <div className="flex justify-center text-white p-9 select-none">
                                        <Title className="text-4xl">{departmentName} Department</Title>
                                    </div>
                                </div>
                                <div className="flex flex-wrap">
                                    <MyDepartmentComp members={currentPosts} setMembers={setMembers} />
                                </div>
                                <div className="fixed bottom-9 right-9 flex flex-col">
                                    <Button size="lg" className="bg-accent text-white font-bold py-2 px-4 text-lg rounded" onClick={() => { getProposals(); openDrawer(); }}>
                                        Department Requests
                                    </Button>
                                    <Button size="lg" className="bg-accent text-white font-bold py-2 px-4 text-lg rounded my-4" onClick={openStatsDrawer}>
                                        Statistics
                                    </Button>
                                </div>
                            </>)}

                        {!departmentName && (<div className="flex flex-col">
                            <div className="flex justify-center text-white p-9 select-none">
                                <Title className="text-4xl">You have no department</Title>
                            </div>
                        </div>)}
                    </>
                )}
            </div>
            <div className='dark:bg-darkcanvas bg-canvas flex justify-center items-center'>
                <PaginationComp totalPosts={members.length} postsPerPage={postPerPage} currentPage={currentPage} setCurrentPage={setCurrentPage} drawer={false} />
            </div>
        </div >
    )
}