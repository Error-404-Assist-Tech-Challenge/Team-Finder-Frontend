/* eslint-disable react-hooks/exhaustive-deps */
/* eslint-disable react/no-unescaped-entities */
/* eslint-disable no-unused-vars */

import { useContext, useEffect, useState } from 'react';
import { Loader, Divider } from '@mantine/core';
import { useHeadroom, useDisclosure } from '@mantine/hooks';
import { Context } from '../../App';
import useAxiosPrivate from '../../hooks/useAxiosPrivate';
import OrganizationSkillsComp from '../pageComponents/OrganizationSkillsComp';
import PaginationComp from '../pageComponents/Pagination';
import OrganizationCategoriesComp from '../pageComponents/OrganizationCategoriesComp';

export default function OrganizationSkillsPage() {

    const axiosPrivate = useAxiosPrivate();
    const [darkMode, setDarkMode] = useContext(Context);
    const pinned = useHeadroom({ fixedAt: 20 });
    const [visible, setVisible] = useState(true);
    const [visibleLoad, setVisibleLoad] = useState(false);

    const [skills, setSkills] = useState([]);
    const [skillCategories, setSkillCategories] = useState([])

    const [currentPage, setCurrentPage] = useState(1);
    const [postPerPage, setPostPerPage] = useState(9);

    const lastPostIndex = currentPage * postPerPage;
    const firstPostIndex = lastPostIndex - postPerPage;
    const currentPosts = skills.slice(firstPostIndex, lastPostIndex);


    const [currentPageCatego, setCurrentPageCatego] = useState(1);
    const [postPerPageCatego, setPostPerPageVatego] = useState(17);

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
                    <div className='bg-darkcanvas select-none h-auto min-h-screen w-full py-[30px] flex'>
                        <div className='flex flex-wrap justify-center w-3/5'>
                            <div className='w-full'>
                                <OrganizationSkillsComp skills={currentPosts} skillCategories={skillCategories} setSkills={setSkills} />
                            </div>
                            <div className='dark:bg-darkcanvas bg-canvas flex justify-center items-center mt-auto w-3/5'>
                                <PaginationComp totalPosts={skills.length} postsPerPage={postPerPage} currentPage={currentPage} setCurrentPage={setCurrentPage} />
                            </div>
                        </div>
                        <Divider orientation="vertical" />
                        <div className='flex flex-col w-2/5 items-center justify-center'>
                            {visibleLoad && (
                                <div className=''>
                                    <Loader size={30} color="red" />
                                </div>
                            )}
                            {!visibleLoad && (<>
                                <div className=" flex flex-wrap justify-center">
                                    <OrganizationCategoriesComp skillCategories={currentPostsCatego} setSkillCategories={setSkillCategories} visible={visibleLoad} setVisible={setVisibleLoad} />
                                </div>
                                <div className='dark:bg-darkcanvas bg-canvas flex justify-center items-center mt-auto'>
                                    <PaginationComp totalPosts={skillCategories.length} postsPerPage={postPerPageCatego} currentPage={currentPageCatego} setCurrentPage={setCurrentPageCatego} />
                                </div></>)}
                        </div>
                    </div>
                </>)}
            </div>
        </section>
    )
}