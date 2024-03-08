/* eslint-disable react/prop-types */
/* eslint-disable react-hooks/exhaustive-deps */
/* eslint-disable react/no-unescaped-entities */
/* eslint-disable no-unused-vars */

import { useState } from 'react';
import { Loader, Button, Checkbox, Modal, TextInput, Title, Textarea, Text, Select } from '@mantine/core';
import { useDisclosure } from '@mantine/hooks';
import useAxiosPrivate from '../../hooks/useAxiosPrivate';
import { SkillCard } from '../skillComponents/SkillCard';


export default function OrganizationSkillsComp({ skills, skillCategories, setSkills, }) {

    const axiosPrivate = useAxiosPrivate();

    const [openedSkills, { open: openSkills, close: closeSkills }] = useDisclosure(false);
    const [skillName, setSkillName] = useState('')
    const [skillDescription, setSkillDescription] = useState('')
    const [skillCategory, setSkillCategory] = useState('')
    const [visible, setVisible] = useState(false);

    const [categoryFilter, setCategoryFilter] = useState('')
    const [authorFilter, setAuthorFilter] = useState(false)
    const [departmentFilter, setDepartmentFilter] = useState(false)

    const handleAddSkill = async () => {
        closeSkills();
        setVisible(true);
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
        setVisible(false)
    }

    const filteredSkills = skills.filter(skill => {
        if (departmentFilter && !skill.is_department_managed) {
            return false;
        }
        if (categoryFilter && skill.category_id !== categoryFilter) {
            return false;
        }
        if (authorFilter && !skill.is_authored) {
            return false;
        }
        return true;
    });


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
            <div className="w-full flex justify-center text-white pb-5" >
                <Title size="45">Skills</Title>
            </div>

            <div className="flex items-center justify-between my-5 w-full">
                <div className="w-1/3 flex justify-center">
                    <Checkbox className="text-white mx-10" label="Skills in my department" size="xl"
                        checked={departmentFilter}
                        onChange={(event) => setDepartmentFilter(event.currentTarget.checked)} />
                </div>
                <div className="w-1/3 flex justify-center">
                    <Select
                        placeholder="Select a category"
                        data={skillCategories}
                        value={categoryFilter}
                        onChange={setCategoryFilter}
                        searchable
                        size="md"
                        nothingFoundMessage="Category does not exist..."
                        comboboxProps={{ zIndex: 1000000000 }}
                        className="mx-5" />
                </div>
                <div className="w-1/3 flex justify-center">
                    <Checkbox className="text-white mx-10" label="Skills created by me" size="xl"
                        checked={authorFilter}
                        onChange={(event) => setAuthorFilter(event.currentTarget.checked)} />
                </div>
            </div >

            {visible && (
                <div className="fixed top-1/2 left-1/2 transform -translate-x-1/2 -translate-y-1/2 w-3/5">
                    <Loader size={30} color="red" />
                </div>
            )
            }
            {
                !visible && (
                    <>
                        <div className='flex flex-wrap justify-center'>
                            {filteredSkills.map((skill, index) => (
                                <SkillCard key={index} skill={skill} skillCategories={skillCategories} setSkills={setSkills} visible={visible} setVisible={setVisible} />
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
                        </div>
                    </>
                )
            }
        </>
    )
}