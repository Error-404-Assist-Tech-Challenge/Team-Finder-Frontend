/* eslint-disable react/prop-types */
/* eslint-disable no-unused-vars */

import { Card, Avatar, Modal, Button, Text, Title, TextInput, Textarea, Divider } from '@mantine/core';
import { useDisclosure } from '@mantine/hooks';
import { useState, useContext, useEffect } from 'react';
import LevelCirclesCard from './LevelCirclesCard'
import LevelCirclesModal from './LevelCirclesModal'
import ExperienceCirclesCard from './ExperienceCirclesCard'
import ExperienceCirclesModal from './ExperienceCirclesModal'
import { Context } from '../../App';
import useAxiosPrivate from '../../hooks/useAxiosPrivate';
import { modals } from '@mantine/modals';
import { notifications } from '@mantine/notifications';
import { IconCheck } from '@tabler/icons-react';

export default function UserSkillCard(props) {

    const [isHovering, setIsHovering] = useState(false);
    const [darkMode, setDarkMode] = useContext(Context);
    const [opened, { open, close }] = useDisclosure(false);

    const [currentLevel, setCurrentLevel] = useState(props.skills[props.index].level)
    const [currentExperience, setCurrentExperience] = useState(props.skills[props.index].experience)

    const [training, setTraining] = useState('');
    const [course, setCourse] =  useState('');
    const [trainingDescpription, setTrainingDescription] = useState('');
    const [courseDescription, setCourseDescription] =  useState('');

    const [editEndorsment, setEditEndorsement] = useState(false);

    const axiosPrivate = useAxiosPrivate();

    const handleOpen = () => {
        setCurrentLevel(props.skills[props.index].level);
        setCurrentExperience(props.skills[props.index].experience)
        open();
    }

    const handleSave = async () => {
        close();
        props.setVisible(true);
        try {
            const response = await axiosPrivate.put('skills/user',
                JSON.stringify({
                    skill_id: props.skills[props.index].skill_id,
                    level: currentLevel,
                    experience: currentExperience
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

            props.setSkills(response.data);
        } catch (error) {
            console.error('Error saving my skill:', error);
        }
        props.setVisible(false);
    }

    // Remove user skill

    const handleRemoveSkill = async () => {
        close();
        props.setVisible(true);
        try {
            const skillId = props.skills[props.index].skill_id;
            const skillName = props.skills[props.index].skill_name;
            const response = await axiosPrivate.delete('skills/user', {
                headers: {
                    'Content-Type': 'application/json',
                    'Access-Control-Allow-Origin': '*',
                    'Access-Control-Allow-Credentials': 'true'
                },
                data: {
                    skill_id: skillId
                },
                withCredentials: true
            });
            console.log('Response:', response.data);

            props.setSkills(response.data);

            const newUnusedSkills = [...props.unusedSkills, { label: skillName, value: skillId }];
            props.setUnusedSkills(newUnusedSkills)

        } catch (error) {
            console.error('Error deleting user skills:', error);
        }
        props.setVisible(false);
    }


    const openDeleteModal = () =>
        modals.openConfirmModal({
            title: 'Delete skill',
            centered: true,
            children: (
                <Text size="sm">
                    Are you sure you want to delete this skill? This action is destructive and you will have
                    to contact support to restore your data.
                </Text>
            ),
            labels: { confirm: 'Delete skill', cancel: "No don't delete it" },
            confirmProps: { color: 'red' },
            onCancel: () => console.log('Cancel'),
            onConfirm: () => console.log(handleRemoveSkill()),
            zIndex:10000002,
        });

    const handleEditEndorsment = async () => {
        setEditEndorsement(true)
    }

    return (
        <>
            <div className={`${darkMode && 'dark'}`}>
                <div className="flex flex-wrap">
                    <Modal opened={opened} onClose={close} centered overflow="inside" size={1000} className="dark:bg-card_modal text-white select-none" zIndex={1000002}>
                        <div className='flex flex-wrap'>
                            <div className='w-1/2 h-full'>
                                <div className="flex justify-center ">
                                    <h1 className="text-4xl font-bold">{props.skills[props.index].skill_name}</h1>
                                </div>
                                <div className="p-3 flex justify-left">
                                    <p className="font-bold">Author</p>
                                    <p>: {props.skills[props.index].skill_author}</p>
                                </div>
                                <div className="p-3 flex justify-left">
                                    <p><span className="font-bold">Description</span>: {props.skills[props.index].skill_description}</p>
                                </div>
                                <div className="p-3 flex justify-left">
                                    <p><span className="font-bold">Category</span>: {props.skills[props.index].category_name}</p>
                                </div>
                                <hr className="my-[20px]"></hr>
                                <div className="p-3 flex justify-left text-xl">
                                    <p>
                                        <span className="font-bold">Level: </span>
                                        {props.skills[props.index].level == 1 &&
                                            (<span>You are learning {props.skills[props.index].skill_name}</span>)}
                                        {props.skills[props.index].level == 2 &&
                                            (<span>You know {props.skills[props.index].skill_name}</span>)}
                                        {props.skills[props.index].level == 3 &&
                                            (<span>You do {props.skills[props.index].skill_name}</span>)}
                                        {props.skills[props.index].level == 4 &&
                                            (<span>You can help in {props.skills[props.index].skill_name}</span>)}
                                        {props.skills[props.index].level == 5 &&
                                            (<span>You can teach {props.skills[props.index].skill_name}</span>)}
                                    </p>
                                </div>
                                <div className="flex justify-center items-center flex-col text-center h-full">
                                    <LevelCirclesModal id={props.index} setCurrentLevel={setCurrentLevel} currentLevel={currentLevel} />
                                </div>
                                <div className="p-3 flex justify-left text-xl">
                                    <p>
                                        <span className="font-bold">Experience: </span>
                                        {props.skills[props.index].experience == 1 &&
                                            (<span>0-6 months</span>)}
                                        {props.skills[props.index].experience == 2 &&
                                            (<span>6-12 months</span>)}
                                        {props.skills[props.index].experience == 3 &&
                                            (<span>1-2 years</span>)}
                                        {props.skills[props.index].experience == 4 &&
                                            (<span>2-4 years</span>)}
                                        {props.skills[props.index].experience == 5 &&
                                            (<span>4-7 years</span>)}
                                        {props.skills[props.index].experience == 6 &&
                                            (<span>7+ years</span>)}
                                    </p>
                                </div>
                                <div className="flex justify-center items-center flex-col text-center h-full">
                                    <ExperienceCirclesModal id={props.index} setCurrentExperience={setCurrentExperience} currentExperience={currentExperience} />
                                </div>
                                <div className="p-[10px]">
                                    <Button className="bg-accent text-white hover:bg-btn_hover font-bold px-4 py-2 rounded mx-[10px] mt-[30px]"
                                        onClick={openDeleteModal}>
                                        Remove Skill
                                    </Button>
                                    <Button className="bg-accent text-white hover:bg-btn_hover font-bold px-4 py-2 rounded mx-[10px] mt-[30px] float-right"
                                        onClick={handleSave}>
                                        Save (Request)
                                    </Button>
                                </div>
                            </div>
                            <Divider size="sm" orientation="vertical" className='mx-4' />
                            <div className="flex flex-col items-centre">
                                <div className="flex flex-col justify-center items-center">
                                    <Title className="pb-[30px] ml-[25px]">Skill Endorsements</Title>
                                </div>
                                {editEndorsment &&(
                                    <>
                                        < TextInput
                                            label="Training Name (optional)"
                                            placeholder="Training name..."
                                            size="md"
                                            value={training}
                                            onChange={(event) => setTraining(event.currentTarget.value)}
                                            className=" py-[15px] w-[450px]"
                                        />
                                        <Textarea
                                            label="Training Description (optional)"
                                            placeholder="Training description..."
                                            value={trainingDescpription}
                                            onChange={(event) => setTrainingDescription(event.currentTarget.value)}
                                            className=" py-[15px]"

                                        />
                                        < TextInput
                                            label="Course Name (optional)"
                                            placeholder="Course name..."
                                            size="md"
                                            value={course}
                                            onChange={(event) => setCourse(event.currentTarget.value)}
                                            className=" py-[15px]"
                                        />
                                        <Textarea
                                            label="Course Description (optional)"
                                            placeholder="Course description..."
                                            value={courseDescription}
                                            onChange={(event) => setCourseDescription(event.currentTarget.value)}
                                            className=" py-[15px]"

                                        />
                                    </>
                                )}
                                {!editEndorsment &&(
                                    <>
                                        <h1 className='text-white'>Training endorsement: </h1>
                                        <h1 className='text-white'>Training endorsement description: </h1>
                                        <h1 className='text-white'>Course endorsement: </h1>
                                        <h1 className='text-white'>Course endorsement description: </h1>
                                    </>
                                )}
                                <div className="p-[10px] fixed bottom-0 right-0">
                                    <Button className="bg-accent text-white hover:bg-btn_hover font-bold px-4 py-2 rounded mx-[10px] my-[10px] mt-[20px] mb-[15px]"
                                        onClick={handleEditEndorsment}>
                                        Edit Endorsement
                                    </Button>
                                    <Button className="bg-accent text-white hover:bg-btn_hover font-bold px-4 py-2 rounded mx-[10px] my-[10px] mt-[20px] ml-[130px] mb-[15px] float-right"
                                        onClick={handleSave}>
                                        Save Endorsement
                                    </Button>
                                </div>
                            </div>
                        </div>
                    </Modal>

                    <Card className="flex w-[330px] h-[230px] dark:bg-card_modal mx-[40px] my-[20px] rounded-xl dark:text-darktext text-text select-none font-bold"
                        onClick={handleOpen} onMouseEnter={() => setIsHovering(true)} onMouseLeave={() => setIsHovering(false)}>
                        <Card.Section className="dark:bg-[#495256]">
                            <Title className="p-4 flex justify-center">
                                {props.skills[props.index].skill_name}
                            </Title>
                        </Card.Section>
                        <div className="flex justify-center items-center flex-col text-center h-full">
                            {!isHovering && (
                                <>
                                    <Text>Level:</Text>
                                    <LevelCirclesCard id={props.index} circles={props.skills.level}
                                        skills={props.skills} setSkills={props.setSkills} />
                                    <Text>Experience:</Text>
                                    <ExperienceCirclesCard id={props.index} circles={props.skills.level}
                                        skills={props.skills} setSkills={props.setSkills} />
                                </>
                            )}
                            {isHovering && <Text className="text-xl">Click to see more!</Text>}
                        </div>
                    </Card>
                </div>
            </div>
        </>
    )
}
