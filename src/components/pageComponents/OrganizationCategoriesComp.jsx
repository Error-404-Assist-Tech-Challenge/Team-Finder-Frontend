/* eslint-disable react/prop-types */
/* eslint-disable react-hooks/exhaustive-deps */
/* eslint-disable react/no-unescaped-entities */
/* eslint-disable no-unused-vars */

import { useState } from 'react';
import { Loader, Button, TextInput, Title } from '@mantine/core';
import useAxiosPrivate from '../../hooks/useAxiosPrivate';
import { SkillCategoryCard } from '../skillComponents/SkillCategoryCard';

export default function OrganizationCategoriesComp({ skillCategories, setSkillCategories, visibleLoad, visible, setVisible }) {

    const axiosPrivate = useAxiosPrivate();

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

            // console.log('Response:', response.data);

            setSkillCategories(response.data);

        } catch (error) {
            console.error('Error fetching unused skills:', error);
        }
        setIsAdding(false)
        setCategoryName('')
    }



    return (
        <>
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
                            <SkillCategoryCard key={index} name={category.label} id={category.value} is_used={category.is_used} setSkillCategories={setSkillCategories} visible={visible} setVisible={setVisible} />
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
        </>
    )
}