/* eslint-disable react-hooks/exhaustive-deps */
/* eslint-disable no-unused-vars */

import { useState, useEffect, useContext } from 'react';
import { Loader, rem, Card, Modal, Button } from '@mantine/core';
import { useHeadroom, useDisclosure} from '@mantine/hooks';
import { notifications } from '@mantine/notifications';
import { IconCheck } from '@tabler/icons-react';

import { Context } from '../../App';
import LevelCircles from '../skillComponents/LevelCircles';
import ExperienceCircles from '../skillComponents/ExperienceCircles';
import UserSkillCard from '../skillComponents/UserSkillCard';
import useAxiosPrivate from '../../hooks/useAxiosPrivate';

export default function MySkillsPage() {

    const [opened, { open, close }] = useDisclosure(false);

    const axiosPrivate = useAxiosPrivate();
    const [visible, setVisible] = useState(true);
    const [darkMode, setDarkMode] = useContext(Context);
    const pinned = useHeadroom({ fixedAt: 20 });

    const [skills, setSkills] = useState([]);
    const [changed, setChange] = useState(false)

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

    function handleSave() {
        setChange(false);
        const saveSkills = async () => {
            try {
                // const response = await fetch(USER_SKILLS_ENDPOINT, {
                //     method: 'PUT',
                //     headers: {
                //         'Content-Type': 'application/json'
                //     },
                //     body: JSON.stringify(skills)
                // });
                // if (!response.ok) {
                //     throw new Error('Failed to save user skills');
                // }
                // console.log('Skills saved successfully!');
                setChange(false);
            } catch (error) {
                console.error('Error saving user skills:', error);
            }
            finally {
                const id = notifications.show({
                    title: 'Data saved',
                    message: 'Your data has been fetched.',
                    icon: <IconCheck style={{ width: rem(35), height: rem(35) }} />,
                    color: "teal",
                });
            }
        }
        saveSkills();
    }

    function handleAddSkill() { }

    return (
        <div className={`${darkMode && 'dark'}`}>
            <div className='dark:bg-darkcanvas bg-canvas h-auto select-none'>
                {visible && (
                    <div className="fixed top-1/2 left-1/2 transform -translate-x-1/2 -translate-y-1/2">
                        <Loader size={30} color="red" />
                    </div>
                )}
                
                {!visible &&
                    <div className="flex flex-wrap">
                        {skills.map((skill, index) => (
                            <UserSkillCard key={index} name={skill.skill_name} level={skill.level} skills={skills} setSkills={setSkills}/>
                        ))}
                    </div>}

                        {/* <tfoot className="">
                            <tr>
                                <td>
                                    <button className="bg-accent text-white hover:bg-btn_hover font-bold px-4 py-2 rounded mx-[60px] my-[20px]" onClick={handleAddSkill}>Add Skill</button>
                                </td>
                                <td style={{ display: 'flex', justifyContent: 'flex-right' }}>
                                    {changed && (
                                        <button className="bg-accent text-white  hover:bg-btn_hover font-bold px-4 py-2 rounded mx-[60px] my-[20px]" onClick={handleSave}
                                        >
                                            Save
                                        </button>
                                    )}
                                </td>
                            </tr>
                        </tfoot> */}
                    
            </div>
        </div>
    )
}