/* eslint-disable react/prop-types */
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

export default function OrganizationCategoriesComp({ name, id, skillCategories, setSkillCategories, visible, setVisible}) {

    const axiosPrivate = useAxiosPrivate();

    const [openedCategories, { open: openCategories, close: closeCategories }] = useDisclosure(false);
    const [categoryName, setCategoryName] = useState('')

    const handleAddCategory = async () => {
        closeCategories();
        setVisible(true);
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
        setVisible(false);
    }


    return (
        <>
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
                            comboboxprops={{ zIndex: 1000000000 }}
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
            <div className="w-full flex justify-center text-white pb-5" size="2xl">
                <Title>Skill Categories</Title>
            </div>
            {skillCategories.map((category, index) => (
                <SkillCategoryCard key={index} name={category.label} id={category.value} setSkillCategories={setSkillCategories} visible={visible} setVisible={setVisible} />
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
        </>
    )
}