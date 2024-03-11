/* eslint-disable react/prop-types */
/* eslint-disable react-hooks/exhaustive-deps */
/* eslint-disable no-unused-vars */

import UserSkillCard from '../skillComponents/UserSkillCard';
import { Button, Modal, Title, Select, rem, Divider, TextInput, Textarea } from '@mantine/core';
import { useDisclosure } from '@mantine/hooks';
import { useState } from 'react';
import LevelCirclesSelected from '../skillComponents/LevelCirclesSelected';
import ExperienceCirclesSelected from '../skillComponents/ExperienceCirclesSelected';
import { useEffect } from 'react';
import useAxiosPrivate from '../../hooks/useAxiosPrivate';
import { IconCheck } from '@tabler/icons-react';
import { notifications } from '@mantine/notifications';


export default function MySkillsComp({ skills, setSkills, unusedSkills, setUnusedSkills, visible, setVisible }) {

    const axiosPrivate = useAxiosPrivate();

    const [opened, { open, close }] = useDisclosure(false);
    const [addedSkill, setAddedSkill] = useState('');
    const [selectedSkillLevel, selectSkillLevel] = useState(1);
    const [selectedSkillExperience, selectSkillExperience] = useState(1);
    const language = unusedSkills.find(lang => lang.value === addedSkill);
    const [changed, setChange] = useState(false)
    const [notification, setNotification] = useState(false);

    const [training, setTraining] = useState('');
    const [course, setCourse] =  useState('');
    const [trainingDescpription, setTrainingDescription] = useState('');
    const [courseDescription, setCourseDescription] =  useState('');

    useEffect(() => {
        setChange(true);
    }, [skills]);

    // Add new skill porposal to user

    const handleAddSkill = async () => {
        close();
        try {
            const response = await axiosPrivate.post('skills/user',
                JSON.stringify({
                    skill_id: addedSkill,
                    level: selectedSkillLevel,
                    experience: selectedSkillExperience
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

            const newUnusedSkills = unusedSkills.filter(skill => skill.value !== addedSkill);
            setUnusedSkills(newUnusedSkills);

            setAddedSkill('')
        } catch (error) {
            console.error('Error fetching unused skills:', error);
        }
        const ild = notifications.show({
            title: 'Skill update proposal saved',
            message: 'Wait for your department manager approval.',
            icon: <IconCheck style={{ width: rem(35), height: rem(35) }} />,
            color: "teal",
            style: { width: 455 },
        })
    }


    return (
        <div>
            <div className="flex flex-wrap justify-center">
                {skills.map((skill, index) => (
                    <UserSkillCard key={index}
                        index={index} skills={skills} setSkills={setSkills} unusedSkills={unusedSkills} setUnusedSkills={setUnusedSkills} visible={visible} setVisible={setVisible} />
                ))}
                <div className="w-[410px] h-[270px] flex justify-center items-center">
                    <Button variant="outline" onClick={open}
                        className={`relative w-[80px] h-[80px] m-[6px] rounded-full p-0 text-accent border-accent border-[5px] hover:text-accent`}>
                        <svg xmlns="http://www.w3.org/2000/svg" className="icon icon-tabler icon-tabler-plus w-full h-full" viewBox="0 0 24 24" strokeWidth="1.5" stroke="currentColor" fill="none" strokeLinecap="round" strokeLinejoin="round">
                            <path stroke="none" d="M0 0h24v24H0z" fill="none" />
                            <path d="M12 5l0 14" />
                            <path d="M5 12l14 0" />
                        </svg>
                    </Button>
                </div>
                <Modal opened={opened} onClose={close} centered overflow="inside" size={1000} className="dark:bg-card_modal text-white select-none" zIndex={1000002}>
                    <div className='flex flex-wrap'>
                        <div className="flex flex-col space-y-4 w-1/2">
                            <div className="flex flex-col justify-center items-center">
                                <Title className="pb-[30px]">Add Skill</Title>
                            </div>
                            <div>
                                <Select
                                    label="Skill"
                                    placeholder="Choose a skill"
                                    data={unusedSkills}
                                    value={addedSkill}
                                    onChange={setAddedSkill}
                                    searchable
                                    size="md"
                                    nothingFoundMessage="Skill does not exist..."
                                    comboboxProps={{ zIndex: 1000000000 }}
                                    className="pb-[30px]" />
                            </div>
                            <div className="p-3 flex justify-left text-xl">
                                <p>
                                    <span className="font-bold">Level: </span>
                                    {addedSkill && (
                                        <span>
                                            {selectedSkillLevel == 1 && `You are learning ${language.label}`}
                                            {selectedSkillLevel == 2 && `You know ${language.label}`}
                                            {selectedSkillLevel == 3 && `You do ${language.label}`}
                                            {selectedSkillLevel == 4 && `You can help in ${language.label}`}
                                            {selectedSkillLevel == 5 && `You can teach ${language.label}`}
                                        </span>
                                    )}
                                    {!addedSkill && (
                                        <span> Please select a skill! </span>
                                    )}
                                </p>
                            </div>
                            <div className="flex justify-center items-center flex-col text-center">
                                <LevelCirclesSelected selectedSkillLevel={selectedSkillLevel} selectSkillLevel={selectSkillLevel} />
                            </div>
                            <div className="p-3 flex justify-left text-xl">
                                <p>
                                    <span className="font-bold">Experience: </span>
                                    {addedSkill && (
                                        <span>
                                            {selectedSkillExperience == 1 && "0-6 months"}
                                            {selectedSkillExperience == 2 && "6-12 months"}
                                            {selectedSkillExperience == 3 && "1-2 years"}
                                            {selectedSkillExperience == 4 && "2-4 years"}
                                            {selectedSkillExperience == 5 && "4-7 years"}
                                            {selectedSkillExperience == 6 && "7+ years"}
                                        </span>
                                    )}
                                    {!addedSkill && (
                                        <span>Please select a skill! </span>
                                    )}

                                </p>
                            </div>
                            <div className="flex justify-center items-center flex-col text-center pb-[20px]">
                                <ExperienceCirclesSelected selectedSkillExperience={selectedSkillExperience} selectSkillExperience={selectSkillExperience} />
                                {addedSkill && (<Button className="bg-accent text-white hover:bg-btn_hover font-bold  py-2 rounded mx-[10px] mt-[30px] mb-[10px] float-right"
                                    onClick={handleAddSkill} style={{ width: '460px' }}>
                                    Add Skill
                                </Button>)}
                            </div>
                        </div>

                        <Divider size="sm" orientation="vertical" className='mx-4' />
                        
                        <div className="flex flex-col items-centre ">
                            <div className="flex flex-col justify-center items-center">
                                <Title className="pb-[30px] ml-[25px]">Skill Endorsements</Title>
                            </div>
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
                        </div>
                    </div>
                </Modal>
            </div>
        </div>

    )
}