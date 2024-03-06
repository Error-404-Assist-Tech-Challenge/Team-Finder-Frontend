/* eslint-disable react-hooks/exhaustive-deps */
/* eslint-disable react/no-unescaped-entities */
/* eslint-disable no-unused-vars */

import { useContext, useEffect, useState } from 'react';
import { Table, Loader, Button, Divider, Modal, TextInput, Title, Textarea, Select } from '@mantine/core';
import { useHeadroom, useDisclosure } from '@mantine/hooks';

import { Context } from '../../App';
import useAxiosPrivate from '../../hooks/useAxiosPrivate';
import { SkillCard } from '../skillComponents/SkillCard';
import { SkillCategoryCard } from '../skillComponents/SkillCategoryCard';

export default function OrganizationSkillsPage() {

    const axiosPrivate = useAxiosPrivate();
    const [darkMode, setDarkMode] = useContext(Context);
    const pinned = useHeadroom({ fixedAt: 20 });
    const [visible, setVisible] = useState(true);

    const [skills, setSkills] = useState([]);
    const [skillCategories, setSkillCategories] = useState([])

    const [openedSkills, { open: openSkills, close: closeSkills }] = useDisclosure(false);
    const [openedCategories, { open: openCategories, close: closeCategories }] = useDisclosure(false);

    const [categoryName, setCategoryName] = useState('')
    const [skillName, setSkillName] = useState('')
    const [skillDescription, setSkillDescription] = useState('')
    const [skillCategory, setSkillCategory] = useState('')

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

    const handleAddSkill = async () => {
        try {
            const response = await axiosPrivate.post('organizations/skills',
                JSON.stringify({
                    name: skillName,
                    description: skillDescription,
                    category_id: skillCategory
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

            setSkills(response.data);

        } catch (error) {
            console.error('Error fetching unused skills:', error);
        }

        closeSkills();
    }

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

        closeCategories();
    }



    return (
        <section className={`${darkMode && 'dark'}`}>
            <Modal opened={openedSkills} onClose={closeSkills} centered overflow="inside" size={500} className="dark:bg-card_modal text-white select-none" zIndex={1000002}>
                <div className="flex justify-center">
                    <Title className="pb-[20px]">Create Skill</Title>
                </div>
                <TextInput
                    label="Skill Name"
                    placeholder="Skill name..."
                    size="md"
                    value={skillName}
                    onChange={(event) => setSkillName(event.currentTarget.value)}
                    className=" py-[15px]"
                />
                <Textarea
                    label="Skill Description"
                    placeholder="Skill description..."
                    value={skillDescription}
                    onChange={(event) => setSkillDescription(event.currentTarget.value)}
                    className=" py-[15px]"

                />
                <Select
                    label="Skill Category"
                    allowDeselect={false}
                    placeholder="Select a category"
                    data={skillCategories}
                    value={skillCategory}
                    onChange={setSkillCategory}
                    searchable
                    size="md"
                    nothingFoundMessage="Category does not exist..."
                    comboboxProps={{ zIndex: 1000000000 }}
                    className="py-[15px]" />
                {skillName && skillDescription && skillCategory &&
                    (<Button onClick={handleAddSkill}
                        className="bg-accent text-white hover:bg-btn_hover font-bold px-4 py-2 rounded mx-[10px] my-[10px] mt-[20px]">
                        Create Skill
                    </Button>)}
            </Modal>


            <Modal opened={openedCategories} onClose={closeCategories} centered overflow="inside" size={500} className="dark:bg-card_modal text-white select-none" zIndex={1000002}>
                <div className="flex flex-col space-y-4 ">
                    <div className="flex flex-col justify-center items-center">
                        <Title className="pb-[30px]">Add Skill Category</Title>
                    </div>
                    <div>
                        <TextInput
                            label="Skill Category Name"
                            placeholder="Skill category name..."
                            value={categoryName}
                            onChange={(event) => setCategoryName(event.currentTarget.value)}
                            comboboxProps={{ zIndex: 1000000000 }}
                            className="pb-[30px]" />
                    </div>
                    <div className="flex justify-center items-center flex-col text-center pb-[20px]">
                        {categoryName && (<Button className="bg-accent text-white hover:bg-btn_hover font-bold  py-2 rounded mx-[10px] mt-[30px] mb-[10px] float-right"
                            onClick={handleAddCategory} style={{ width: '460px' }}>
                            Add Skill
                        </Button>)}
                    </div>
                </div>
            </Modal>

            {visible && (
                <div className="fixed top-1/2 left-1/2 transform -translate-x-1/2 -translate-y-1/2">
                    <Loader size={30} color="red" />
                </div>
            )}
            {!visible && (<>
                <div className='bg-darkcanvas select-none h-auto w-full py-[30px] flex'>
                    <div className="w-3/5 flex flex-wrap justify-center">
                        <div className="w-full flex justify-center text-white pb-5" size="2xl">
                            <Title>Skills</Title>
                        </div>
                        {skills.map((skill, index) => (
                            <SkillCard key={index} skill={skill} skillCategories={skillCategories} setSkills={setSkills} />
                        ))}
                        <div className='dark:bg-darkcanvas bg-darkcanvas'></div>
                        <div className="w-[320px] h-[224px] flex justify-center items-center">
                            <Button variant="outline" onClick={openSkills}
                                className={`relative w-[80px] h-[80px] m-[6px] rounded-full p-0 text-accent border-accent border-[5px] hover:text-accent`}>
                                <svg xmlns="http://www.w3.org/2000/svg" className="icon icon-tabler icon-tabler-plus w-full h-full" viewBox="0 0 24 24" strokeWidth="1.5" stroke="currentColor" fill="none" strokeLinecap="round" strokeLinejoin="round">
                                    <path stroke="none" d="M0 0h24v24H0z" fill="none" />
                                    <path d="M12 5l0 14" />
                                    <path d="M5 12l14 0" />
                                </svg>
                            </Button>
                        </div>
                    </div>
                    <Divider orientation="vertical" />
                    <div className="w-2/5 flex flex-wrap justify-center">
                        <div className="w-full flex justify-center text-white pb-5" size="2xl">
                            <Title>Skill Categories</Title>
                        </div>
                        {skillCategories.map((category, index) => (
                            <SkillCategoryCard key={index} name={category.label} id={category.value} setSkillCategories={setSkillCategories} />
                        ))}
                        <div className="w-[200px] h-[66px] ml-[30px] mt-[20px] flex justify-center items-center">
                            <Button variant="outline" onClick={openCategories}
                                className={`relative w-[60px] h-[60px] rounded-full p-0 text-accent border-accent border-[4px] hover:text-accent`}>
                                <svg xmlns="http://www.w3.org/2000/svg" className="icon icon-tabler icon-tabler-plus w-full h-full" viewBox="0 0 24 24" strokeWidth="1.5" stroke="currentColor" fill="none" strokeLinecap="round" strokeLinejoin="round">
                                    <path stroke="none" d="M0 0h24v24H0z" fill="none" />
                                    <path d="M12 5l0 14" />
                                    <path d="M5 12l14 0" />
                                </svg>
                            </Button>
                        </div>
                    </div>
                </div>
            </>)}
        </section>
    )
}