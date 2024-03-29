/* eslint-disable react-hooks/exhaustive-deps */
/* eslint-disable no-unused-vars */

import { useState, useEffect, useContext } from 'react';
import { Loader, rem, Card, Modal, Button, Select, Title } from '@mantine/core';
import { useHeadroom, useDisclosure } from '@mantine/hooks';
import { Context } from '../../App';
import useAxiosPrivate from '../../hooks/useAxiosPrivate';
import MySkillsComp from '../pageComponents/MySkillsComp';
import PaginationComp from '../pageComponents/Pagination';

export default function MySkillsPage() {

    const [opened, { open, close }] = useDisclosure(false);
    const axiosPrivate = useAxiosPrivate();
    const [visible, setVisible] = useState(true);
    const [darkMode, setDarkMode] = useContext(Context);
    const pinned = useHeadroom({ fixedAt: 20 });
    const [changed, setChange] = useState(false)

    const [skills, setSkills] = useState([]);
    const [skillUpgrades, setSkillUpgrades] = useState([]);

    const [unusedSkills, setUnusedSkills] = useState([]);
    const [addedSkill, setAddedSkill] = useState('');

    const [currentPage, setCurrentPage] = useState(1);
    const [postPerPage, setPostPerPage] = useState(8);
    const lastPostIndex = currentPage * postPerPage;
    const firstPostIndex = lastPostIndex - postPerPage;
    const currentPosts = skills.slice(firstPostIndex, lastPostIndex);

    const language = unusedSkills.find(lang => lang.value === addedSkill);

    // GET USER SKILL

    useEffect(() => {
        let isMounted = true;
        const controller = new AbortController();
        const fetchUserSkills = async () => {
            try {
                const response = await axiosPrivate.get('skills/user', {
                    signal: controller.signal,
                    headers: {
                        'Content-Type': 'application/json',
                        'Access-Control-Allow-Origin': '*',
                        'Access-Control-Allow-Credentials': 'true'
                    },
                    withCredentials: true
                });

                // console.log('My Skills:', response.data);

                isMounted && setSkills(response.data)

                setVisible(false);
            } catch (error) {
                console.error('Error fetching user skills:', error);
            } finally {
                isMounted = false;
                controller.abort();
            }
        }
        fetchUserSkills();
        return () => {
            isMounted = false;
            controller.abort();
        }
    }, []);

    // GET USER SKILL UPGRADES

    useEffect(() => {
        let isMounted = true;
        const controller = new AbortController();
        const fetchUserSkillUpgrades = async () => {
            try {
                const response = await axiosPrivate.get('skills/employee_proposals', {
                    signal: controller.signal,
                    headers: {
                        'Content-Type': 'application/json',
                        'Access-Control-Allow-Origin': '*',
                        'Access-Control-Allow-Credentials': 'true'
                    },
                    withCredentials: true
                });

                // console.log('My Skill Upgrades:', response.data);

                isMounted && setSkillUpgrades(response.data)

                setVisible(false);
            } catch (error) {
                console.error('Error fetching user skill upgrades:', error);
            } finally {
                isMounted = false;
                controller.abort();
            }
        }
        fetchUserSkillUpgrades();
        return () => {
            isMounted = false;
            controller.abort();
        }
    }, []);

    // GET UNUSED USER SKILLS

    useEffect(() => {
        let isMounted = true;
        const controller = new AbortController();
        const fetchUnusedSkills = async () => {
            try {
                const response = await axiosPrivate.get('organizations/skills/unused', {
                    signal: controller.signal,
                    headers: {
                        'Content-Type': 'application/json',
                        'Access-Control-Allow-Origin': '*',
                        'Access-Control-Allow-Credentials': 'true'
                    },
                    withCredentials: true
                });
                // console.log('My Unused Skills:', response.data);
                isMounted && setUnusedSkills(response.data);
                setVisible(false);
            } catch (error) {
                console.error('Error fetching unused skills:', error);
            }
        }

        fetchUnusedSkills();

        return () => {
            isMounted = false;
            controller.abort();
        }
    }, []);

    useEffect(() => {
        setChange(true);
    }, [skills]);

    useEffect(() => {
    }, [darkMode]);

    return (
        <div className={`${darkMode && 'dark'}`}>
            <div className='dark:bg-darkcanvas bg-canvas h-auto min-h-screen select-none'>
                {visible && (
                    <div className="fixed top-1/2 left-1/2 transform -translate-x-1/2 -translate-y-1/2">
                        <Loader size={30} color="red" />
                    </div>
                )}

                {!visible &&
                    <div className="flex flex-wrap">
                        <MySkillsComp skills={currentPosts} setSkills={setSkills} skillUpgrades={skillUpgrades} setSkillUpgrades={setSkillUpgrades} unusedSkills={unusedSkills} setUnusedSkills={setUnusedSkills} visible={visible} setVisible={setVisible} />
                    </div>}
            </div>
            <div className='dark:bg-darkcanvas bg-canvas flex justify-center items-center'>
                <PaginationComp totalPosts={skills.length} postsPerPage={postPerPage} currentPage={currentPage} setCurrentPage={setCurrentPage} drawer={false} />
            </div>
        </div>
    )
}