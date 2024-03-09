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

    // Adds skill category

    const [isAdding, setIsAdding] = useState(false)
    const [categoryName, setCategoryName] = useState('')

    const handleAddCategory = async () => {
        try {
            const response = await axiosPrivate.post('skills/categories',
                JSON.stringify({
                    name: categoryName
                }),
                {
                    headers: {
                        'Content-Type': 'application/json',
                        'Access-Control-Allow-Origin': '*',
                        'Access-Control-Allow-Credentials': 'true'
                    },
                    withCredentials: true
                });

            console.log('Response:', response.data);

            setSkillCategories(response.data);

        } catch (error) {
            console.error('Error fetching unused skills:', error);
        }
        setIsAdding(false)
        setCategoryName('')
    }


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
                        {visibleLoad && (
                            < div className='flex flex-col w-2/5 items-center justify-center'>
                                <Loader size={30} color="red" />
                            </div>
                        )}
                        {!visibleLoad && (
                            <>
                                {/* Am scos astea ca sa refac new design in drawer */}

                                {/* <div className=" flex flex-wrap justify-center">
                                        <OrganizationCategoriesComp skillCategories={currentPostsCatego} setSkillCategories={setSkillCategories} visible={visibleLoad} setVisible={setVisibleLoad} />
                                        </div>
                                        <div className='dark:bg-darkcanvas bg-canvas flex justify-center items-center mt-auto'>
                                        <PaginationComp totalPosts={skillCategories.length} postsPerPage={postPerPageCatego} currentPage={currentPageCatego} setCurrentPage={setCurrentPageCatego} />
                                    </div> */}

                                <div className="flex justify-center text-white pb-9 select-none">
                                    <Title className="text-4xl">Skill Categories</Title>
                                </div>
                                <div className="flex flex-wrap justify-center">
                                    {skillCategories.map((category, index) => (
                                        <SkillCategoryCard key={index} name={category.label} id={category.value} setSkillCategories={setSkillCategories} visible={visible} setVisible={setVisible} />
                                    ))}
                                </div>
                                <div className="w-full h-[128px] rounded-lg bg-white p-4 my-2 select-none flex items-center justify-center">
                                    {!isAdding && (
                                        <Button variant="outline" onClick={() => setIsAdding(true)}
                                            className={`relative w-[60px] h-[60px] m-[6px] rounded-full p-0 text-accent border-accent border-[5px] hover:text-accent`}>
                                            <svg xmlns="http://www.w3.org/2000/svg" className="icon icon-tabler icon-tabler-plus w-full h-full" viewBox="0 0 24 24" strokeWidth="1.5" stroke="currentColor" fill="none" strokeLinecap="round" strokeLinejoin="round">
                                                <path stroke="none" d="M0 0h24v24H0z" fill="none" />
                                                <path d="M12 5l0 14" />
                                                <path d="M5 12l14 0" />
                                            </svg>
                                        </Button>
                                    )}
                                    {isAdding && (
                                        <div>
                                            <TextInput
                                                placeholder="Skill category name..."
                                                className="h-[52px]"
                                                size="lg"
                                                value={categoryName}
                                                onChange={(event) => setCategoryName(event.currentTarget.value)}
                                            />
                                            <Button className="w-[240px] mr-[5px] bg-accent mt-[10px] text-[18px]" onClick={handleAddCategory}>
                                                Add Skill Category
                                            </Button>
                                        </div>
                                    )}
                                </div>
                            </>
                        )}
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