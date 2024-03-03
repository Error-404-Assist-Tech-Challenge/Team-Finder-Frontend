/* eslint-disable react-hooks/exhaustive-deps */
/* eslint-disable no-unused-vars */

import { useState, useEffect, useContext } from 'react';
import { Loader, rem, Card, Modal, Button, Select } from '@mantine/core';
import { useHeadroom, useDisclosure } from '@mantine/hooks';
import { notifications } from '@mantine/notifications';
import { IconCheck } from '@tabler/icons-react';
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

    function handleAddSkill() { }

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
                                data={['React', 'Angular', 'Vue', 'Svelte', 'C++', 'Python', 'C#']}
                                searchable
                                size="md"
                                nothingFoundMessage="Skill does not exist..."
                                comboboxProps={{ zIndex: 1000000000 }}
                                className="pb-[30px]" />
                        </div>
                        <div className="p-3 flex justify-left text-xl">
                            <p>
                                <span className="font-bold">Level: </span>
                                {selectSkill && (
                                    <span>
                                        {selectedSkillLevel == 1 && "You are learning C++"}
                                        {selectedSkillLevel == 2 && "You know C++"}
                                        {selectedSkillLevel == 3 && "You do C++"}
                                        {selectedSkillLevel == 4 && "You can help in C++"}
                                        {selectedSkillLevel == 5 && "You can teach C++"}
                                    </span>
                                )}


                            </p>
                        </div>
                        <div className="flex justify-center items-center flex-col text-center">
                            <LevelCirclesSelected selectedSkillLevel={selectedSkillLevel} selectSkillLevel={selectSkillLevel} />
                        </div>
                        <div className="p-3 flex justify-left text-xl">
                            <p>
                                <span className="font-bold">Experience: </span>
                                {selectedSkillExperience == 1 &&
                                    (<span>0-6 months</span>)}
                                {selectedSkillExperience == 2 &&
                                    (<span>6-12 months</span>)}
                                {selectedSkillExperience == 3 &&
                                    (<span>1-2 years</span>)}
                                {selectedSkillExperience == 4 &&
                                    (<span>2-4 years</span>)}
                                {selectedSkillExperience == 5 &&
                                    (<span>4-7 years</span>)}
                                {selectedSkillExperience == 6 &&
                                    (<span>7+ years</span>)}
                            </p>
                        </div>
                        <div className="flex justify-center items-center flex-col text-center">
                            <ExperienceCirclesSelected selectedSkillExperience={selectedSkillExperience} selectSkillExperience={selectSkillExperience} />
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
                                className={`relative w-[80px] h-[80px] m-[6px] rounded-full p-0 text-accent border-accent border-[5px]`}>
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