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

export default function   OrganizationSkillsComp({skills, skillCategories, setSkills,}) {

    const axiosPrivate = useAxiosPrivate();

    const [openedSkills, { open: openSkills, close: closeSkills }] = useDisclosure(false);
    const [skillName, setSkillName] = useState('')
    const [skillDescription, setSkillDescription] = useState('')
    const [skillCategory, setSkillCategory] = useState('')

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

            setSkillName('');
            setSkillDescription('');
            setSkillCategory('');

        } catch (error) {
            console.error('Error fetching unused skills:', error);
        }

        closeSkills();
    }


    return (
        <>
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
            <div className="w-full flex justify-center text-white pb-5" size="2xl">
                <Title>Skills</Title>
            </div>
            {skills.map((skill, index) => (
                <SkillCard key={index} skill={skill} skillCategories={skillCategories} setSkills={setSkills} />
            ))}
            <div className='dark:bg-darkcanvas bg-darkcanvas'>
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
        </>
    )
}