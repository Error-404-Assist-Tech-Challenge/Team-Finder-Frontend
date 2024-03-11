/* eslint-disable react-hooks/exhaustive-deps */
/* eslint-disable react/no-unescaped-entities */
/* eslint-disable no-unused-vars */

import { useContext, useEffect, useState } from 'react';
import { Loader, Divider, Drawer, Button, Title, TextInput } from '@mantine/core';
import { useHeadroom, useDisclosure } from '@mantine/hooks';
import { Context } from '../../App';
import useAxiosPrivate from '../../hooks/useAxiosPrivate';
import OrganizationSkillsComp from '../pageComponents/OrganizationSkillsComp';
import PaginationComp from '../pageComponents/Pagination';
import { SkillCategoryCard } from '../skillComponents/SkillCategoryCard';
import OrganizationCategoriesComp from '../pageComponents/OrganizationCategoriesComp';
import useAuth from '../../hooks/useAuth';

export default function OrganizationSkillsPage() {

    const { auth } = useAuth();

    const axiosPrivate = useAxiosPrivate();
    const [darkMode, setDarkMode] = useContext(Context);
    const pinned = useHeadroom({ fixedAt: 20 });
    const [visible, setVisible] = useState(true);
    const [visibleLoad, setVisibleLoad] = useState(false);
    const [opened, { open, close }] = useDisclosure(false);

    const [skills, setSkills] = useState([]);
    const [skillCategories, setSkillCategories] = useState([])


    const [currentPage, setCurrentPage] = useState(1);
    const [postPerPage, setPostPerPage] = useState(9);

    const lastPostIndex = currentPage * postPerPage;
    const firstPostIndex = lastPostIndex - postPerPage;
    const currentPosts = skills.slice(firstPostIndex, lastPostIndex);

    const [currentPageCatego, setCurrentPageCatego] = useState(1);
    const [postPerPageCatego, setPostPerPageVatego] = useState(5);

    const lastPostIndexCatego = currentPageCatego * postPerPageCatego;
    const firstPostIndexCatego = lastPostIndexCatego - postPerPageCatego;
    const currentPostsCatego = skillCategories.slice(firstPostIndexCatego, lastPostIndexCatego);


    useEffect(() => {
    }, [darkMode]);

    useEffect(() => {
        let isMounted = true;
        const controller = new AbortController();

        const getSkills = async () => {
            try {
                const response = await axiosPrivate.get('organizations/skills', {
                    signal: controller.signal,
                    headers: {
                        'Content-Type': 'application/json',
                        'Access-Control-Allow-Origin': '*',
                        'Access-Control-Allow-Credentials': 'true'
                    },
                    withCredentials: true
                });
                console.log('Skills:', response.data);
                isMounted && setSkills(response.data);
                setVisible(false);
            } catch (error) {
                console.error('Error fetching organization skills:', error);
            }
        }

        getSkills();

        return () => {
            isMounted = false;
            controller.abort();
        }
    }, [])

    useEffect(() => {
        let isMounted = true;
        const controller = new AbortController();

        const getSkillCategories = async () => {
            try {
                const response = await axiosPrivate.get('skills/categories', {
                    signal: controller.signal,
                    headers: {
                        'Content-Type': 'application/json',
                        'Access-Control-Allow-Origin': '*',
                        'Access-Control-Allow-Credentials': 'true'
                    },
                    withCredentials: true
                });
                console.log('Skill Categories:', response.data);
                isMounted && setSkillCategories(response.data);
            } catch (error) {
                console.error('Error fetching organization skill categories:', error);
            }
        }

        getSkillCategories();

        return () => {
            isMounted = false;
            controller.abort();
        }
    }, [])

    return (
        <section className={`${darkMode && 'dark'}`}>
            <div className='dark:bg-darkcanvas bg-canvas h-auto min-h-screen select-none'>
                {visible && (
                    <div className="fixed top-1/2 left-1/2 transform -translate-x-1/2 -translate-y-1/2">
                        <Loader size={30} color="red" />
                    </div>
                )}
                {!visible && (<>
                    <div className='bg-darkcanvas select-none h-auto min-h-screen w-full py-[30px] flex flex-wrap justify-center'>
                        <div className='w-full'>
                            <OrganizationSkillsComp skills={currentPosts} skillCategories={skillCategories} setSkills={setSkills} />
                        </div>
                        <div className='dark:bg-darkcanvas bg-canvas flex justify-center items-center mt-auto w-3/5'>
                            <PaginationComp totalPosts={skills.length} postsPerPage={postPerPage} currentPage={currentPage} setCurrentPage={setCurrentPage} drawer={false} />
                        </div>
                    </div>
                    <Divider orientation="vertical" />
                    <Drawer offset={8} radius="md" opened={opened} onClose={close} position="right" zIndex="1000000">
                        <OrganizationCategoriesComp skillCategories={currentPostsCatego} setSkillCategories={setSkillCategories}
                            visibleLoad={visibleLoad} setVisibleLoad={setVisibleLoad} visible={visible} setVisible={setVisible} />
                        <div className='flex justify-center items-center'>
                            <PaginationComp totalPosts={skillCategories.length} postsPerPage={postPerPageCatego}
                                currentPage={currentPageCatego} setCurrentPage={setCurrentPageCatego} drawer={true} />
                        </div>
                    </Drawer>
                    {auth?.roles.includes("dept_manager") && (
                        <div className="fixed bottom-9 right-9">
                            <Button size="lg" className="bg-accent text-white font-bold py-2 px-4 text-lg rounded" onClick={() => { /*getSkillCategories();*/ open(); }}>
                                Skill Categories
                            </Button>
                        </div>
                    )}
                </>)}
            </div>
        </section >
    )
}