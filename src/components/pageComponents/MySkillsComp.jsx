/* eslint-disable react/prop-types */
/* eslint-disable react-hooks/exhaustive-deps */
/* eslint-disable no-unused-vars */

import UserSkillCard from '../skillComponents/UserSkillCard';
import { Button, Modal, Title, Select, rem, Divider, TextInput, Textarea, Drawer } from '@mantine/core';
import { useDisclosure } from '@mantine/hooks';
import { useState } from 'react';
import LevelCirclesSelected from '../skillComponents/LevelCirclesSelected';
import ExperienceCirclesSelected from '../skillComponents/ExperienceCirclesSelected';
import { useEffect } from 'react';
import useAxiosPrivate from '../../hooks/useAxiosPrivate';
import { IconCheck } from '@tabler/icons-react';
import { notifications } from '@mantine/notifications';
import SkillUpgradeCard from '../skillComponents/SkillUpgradeCard';


export default function MySkillsComp({ skills, setSkills, unusedSkills, setUnusedSkills, visible, setVisible }) {

    const axiosPrivate = useAxiosPrivate();

    const [opened, { open, close }] = useDisclosure(false);
    const [openedDrawer, { open: openDrawer, close: closeDrawer }] = useDisclosure(false);
    const [addedSkill, setAddedSkill] = useState('');
    const [selectedSkillLevel, selectSkillLevel] = useState(1);
    const [selectedSkillExperience, selectSkillExperience] = useState(1);
    const language = unusedSkills.find(lang => lang.value === addedSkill);
    const [changed, setChange] = useState(false)
    const [notification, setNotification] = useState(false);

    const [endorsement, setEndorsement] = useState('')
    const [training, setTraining] = useState('');
    const [course, setCourse] = useState('');
    const [trainingDescpription, setTrainingDescription] = useState('');
    const [courseDescription, setCourseDescription] = useState('');

    const [userProjects, setUserProjects] = useState({});
    const [projectsList, setProjectsList] = useState([]);

    const [endorsementsList, setEndorsementList] = useState([]);

    useEffect(() => {
        setChange(true);
    }, [skills]);

    // Add new skill porposal to user

    const handleAddSkill = async () => {
        close();
        try {
            if (endorsementsList[0].endorsement == '') {
                const response = await axiosPrivate.post('skills/user',
                    JSON.stringify({
                        skill_id: addedSkill,
                        level: selectedSkillLevel,
                        experience: selectedSkillExperience,
                        endorsements: null,
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
            }
            else {
                const response = await axiosPrivate.post('skills/user',

                    JSON.stringify({
                        skill_id: addedSkill,
                        level: selectedSkillLevel,
                        experience: selectedSkillExperience,
                        endorsements: endorsementsList,
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
            }

            const newUnusedSkills = unusedSkills.filter(skill => skill.value !== addedSkill);
            setUnusedSkills(newUnusedSkills);

            setAddedSkill('')
            setEndorsement('')
            setTraining('')
            setTrainingDescription('')

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
    useEffect(() => {

        // Update the endorsementsList when endorsement, training, or course changes
        setEndorsementList([
            {
                type: endorsement,
                endorsement: endorsement === 'Training' ? training : course,
                description: endorsement === 'Training' ? trainingDescpription : courseDescription,
                proj_id: ""
            }
        ]);
    }, [endorsement, training, course, trainingDescpription, courseDescription]);

    // GET user projects
    useEffect(() => {
        let isMounted = true;
        const controller = new AbortController();

        const getUserProjects = async () => {
            try {
                const response = await axiosPrivate.get('projects/user', {
                    signal: controller.signal,
                    withCredentials: true
                });
                console.log('Users projects:', response.data);
                isMounted && setUserProjects(response.data)
            } catch (error) {
                console.error('Error fetching department members:', error);
            }
        }

        getUserProjects();

        return () => {
            isMounted = false;
            controller.abort();
        }
    }, [])

    let list = []

    if (userProjects && userProjects.active && Array.isArray(userProjects.active) && userProjects.past && Array.isArray(userProjects.past)) {
        for (let i = 0; i < userProjects.active.length; i++) {
            list[i] = { value: userProjects.active[i].id, label: userProjects.active[i].project_name };
        }
        for (let i = 0; i < userProjects.past.length; i++) {
            list.push({ value: userProjects.past[i].id, label: userProjects.past[i].project_name });
        }
        console.log("Lista projects:", list);
    } else {
        console.error("userProjects or userProjects.active is not defined or is not an array");
    }


    return (
        <div>
            <div className="flex flex-wrap justify-center">



                {skills.map((skill, index) => (
                    <UserSkillCard key={index} index={index} skills={skills} setSkills={setSkills} unusedSkills={unusedSkills} setUnusedSkills={setUnusedSkills}
                        visible={visible} setVisible={setVisible} endorsementsList={skill.skill_endorsements} setEndorsementList={setEndorsementList} list={list} />
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

                <div className="fixed bottom-9 right-9">
                    <Button size="lg" className="bg-accent text-white font-bold py-2 px-4 text-lg rounded" onClick={() => { /*getSkillCategories();*/ openDrawer() }}>
                        Skill Upgrade Proposals
                    </Button>
                </div>

                <Drawer offset={8} radius="md" opened={openedDrawer} onClose={closeDrawer} position="right" zIndex="1000000">
                    <div className="flex justify-center text-white pb-9 select-none">
                        <Title className="text-3xl">Skill Upgrade Proposals</Title>
                    </div>
                    <div className="flex flex-wrap justify-center">
                        {skills.map(skill => (
                            <SkillUpgradeCard key={skill.skill_id} skill_name={skill.skill_name} level={3} experience={4} />
                        ))}
                    </div>
                </Drawer>


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
                            </div>
                        </div>

                        <Divider size="sm" orientation="vertical" className='mx-4' />

                        <div className="flex flex-col items-centre ">
                            <div className="flex flex-col justify-center items-center">
                                <Title className="pb-[30px] ml-[25px]">Skill Endorsements</Title>
                            </div>
                            <Select data={['Training', 'Course', 'Project']}
                                value={endorsement}
                                onChange={setEndorsement}
                                comboboxProps={{ zIndex: 1000000000 }}
                                label="Endorsement"
                                placeholder="Choose an edorsement"
                                className=" py-[15px] w-[450px]" />

                            {endorsement === 'Training' && (
                                <>
                                    < TextInput
                                        label="Training Name"
                                        placeholder="Training name..."
                                        size="md"
                                        value={training}
                                        onChange={(event) => setTraining(event.currentTarget.value)}
                                        className=" py-[15px] w-[450px]"
                                    />
                                    <Textarea
                                        label="Training Description "
                                        placeholder="Training description..."
                                        value={trainingDescpription}
                                        onChange={(event) => setTrainingDescription(event.currentTarget.value)}
                                        className=" py-[15px]"

                                    />
                                </>
                            )}
                            {endorsement === 'Course' && (
                                <>
                                    < TextInput
                                        label="Course Name"
                                        placeholder="Course name..."
                                        size="md"
                                        value={course}
                                        onChange={(event) => setCourse(event.currentTarget.value)}
                                        className=" py-[15px] w-[450px]"
                                    />
                                    <Textarea
                                        label="Course Description"
                                        placeholder="Course description..."
                                        value={courseDescription}
                                        onChange={(event) => setCourseDescription(event.currentTarget.value)}
                                        className=" py-[15px]"
                                    />
                                </>
                            )}
                            {endorsement === 'Project' && (
                                <>
                                    <Select data={list}
                                        value={endorsement}
                                        onChange={setEndorsement}
                                        comboboxProps={{ zIndex: 1000000000 }}
                                        label="Endorsement"
                                        placeholder="Choose an edorsement"
                                        className=" py-[15px] w-[450px]" />
                                </>
                            )}
                        </div>
                    </div>
                    <div className="flex justify-center items-center pb-[20px]">
                        {addedSkill && (
                            <Button
                                className="bg-accent text-white hover:bg-btn_hover font-bold py-2 rounded mx-[10px] mt-[30px] mb-[10px]"
                                onClick={handleAddSkill}
                                style={{ width: '460px' }}
                            >
                                Add Skill
                            </Button>
                        )}
                    </div>
                </Modal>
            </div>
        </div>

    )
}