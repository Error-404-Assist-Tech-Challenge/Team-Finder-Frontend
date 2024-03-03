/* eslint-disable react-hooks/exhaustive-deps */
/* eslint-disable no-unused-vars */

import { useState, useEffect, useContext } from 'react';
import { Loader, rem, Card, Modal, Button, Select } from '@mantine/core';
import { useHeadroom, useDisclosure } from '@mantine/hooks';
import { Context } from '../../App';
import UserSkillCard from '../skillComponents/UserSkillCard';
import useAxiosPrivate from '../../hooks/useAxiosPrivate';
import ExperienceCirclesSelected from '../skillComponents/ExperienceCirclesSelected';
import LevelCirclesSelected from '../skillComponents/LevelCirclesSelected';

export default function MySkillsPage() {

    const [opened, { open, close }] = useDisclosure(false);
    const axiosPrivate = useAxiosPrivate();
    const [visible, setVisible] = useState(true);
    const [darkMode, setDarkMode] = useContext(Context);
    const pinned = useHeadroom({ fixedAt: 20 });
    const [skills, setSkills] = useState([]);
    const [changed, setChange] = useState(false)

    const [selectedSkill, selectSkill] = useState('');
    const [selectedSkillLevel, selectSkillLevel] = useState(1);
    const [selectedSkillExperience, selectSkillExperience] = useState(1);

    const [unusedSkills, setUnusedSkills] = useState([]);
    const [addedSkill, setAddedSkill] = useState('');

    // GET USER SKILL

    useEffect(() => {
        let isMounted = true;
        const controller = new AbortController();
        const fetchUserSkills = async () => {
            try {
                const response = await axiosPrivate.get('skills/user', {
                    signal: controller.signal
                });
                console.log('My Skills:', response.data);
                isMounted && setSkills(response.data);
                setVisible(false);
            } catch (error) {
                console.error('Error fetching user skills:', error);
            } finally {
                isMounted = false;
                controller.abort();
                const timeout = 200;
                setTimeout(() => {
                    setVisible(false);
                }, timeout);
            }
        }
        fetchUserSkills();
        return () => {
            isMounted = false;
            controller.abort();
        }
    }, []);


    // GET UNUSED USER SKILLS

    useEffect(() => {
        let isMounted = true;
        const controller = new AbortController();
        const fetchUnusedSkills = async () => {
            try {
                const response = await axiosPrivate.get('organizations/skills/unused', {
                    signal: controller.signal
                });
                console.log('My Unused Skills:', response.data);
                isMounted && setUnusedSkills(response.data);
            } catch (error) {
                console.error('Error fetching unused skills:', error);
            }
        }
        fetchUnusedSkills();
        return () => {
            isMounted = false;
            controller.abort();
        }
    }, []);

    // Add new skill to user
    const handleAddSkill = async () => {
        try {
            const response = await axiosPrivate.post('skills/user',
                JSON.stringify({
                    skill_id: addedSkill,
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
        } catch (error) {
            console.error('Error fetching unused skills:', error);
        }
        close();
    }

    useEffect(() => {
        setChange(true);
    }, [skills]);

    useEffect(() => {
    }, [darkMode]);
    
    // const id = notifications.show({
    // title: 'Data saved',
    // message: 'Your data has been fetched.',
    // icon: <IconCheck style={{ width: rem(35), height: rem(35) }} />,
    // color: "teal",


    return (
        <div className={`${darkMode && 'dark'}`}>
            <div className='dark:bg-darkcanvas bg-canvas h-auto select-none'>
                {visible && (
                    <div className="fixed top-1/2 left-1/2 transform -translate-x-1/2 -translate-y-1/2">
                        <Loader size={30} color="red" />
                    </div>
                )}
                <Modal opened={opened} onClose={close} centered overflow="inside" size={500} className="dark:bg-card_modal text-white select-none" zIndex={1000002}>
                    <div className="flex flex-col space-y-4 h-[400px]">
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
                                        {selectedSkillLevel == 1 && "You are learning C++"}
                                        {selectedSkillLevel == 2 && "You know C++"}
                                        {selectedSkillLevel == 3 && "You do C++"}
                                        {selectedSkillLevel == 4 && "You can help in C++"}
                                        {selectedSkillLevel == 5 && "You can teach C++"}
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
                        <div className="flex justify-center items-center flex-col text-center">
                            <ExperienceCirclesSelected selectedSkillExperience={selectedSkillExperience} selectSkillExperience={selectSkillExperience} />
                        {addedSkill && (<Button className="bg-accent text-white hover:bg-btn_hover font-bold  py-2 rounded mx-[10px] mt-[10px]  float-right"
                            onClick={handleAddSkill} style={{width: '460px'}}>
                            Add Skill
                        </Button>)}
                        </div>
                    </div>
                </Modal>
                {!visible &&
                    <div className="flex flex-wrap">
                        {skills.map((skill, index) => (
                            <UserSkillCard key={index}
                                index={index} skills={skills} setSkills={setSkills} />
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
                    </div>}
            </div>
        </div>
    )
}