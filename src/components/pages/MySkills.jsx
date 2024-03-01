/* eslint-disable react-hooks/exhaustive-deps */
/* eslint-disable no-unused-vars */
import LevelCircles from '../skillComponents/LevelCircles';
import { Loader } from '@mantine/core';
import { useHeadroom, useDisclosure } from '@mantine/hooks';
import { useState, useEffect } from 'react';
import { useContext } from 'react';
import { Context } from '../../App';
import ExperienceCircles from '../skillComponents/ExperienceCircles';
import { notifications } from '@mantine/notifications';
import { Button, rem } from '@mantine/core';
import { IconCheck } from '@tabler/icons-react';
import useAxiosPrivate from '../../hooks/useAxiosPrivate';
import UserSkillCard from '../skillComponents/UserSkillCard';

export default function MySkillsPage() {

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
                < UserSkillCard />
                {!visible &&
                    <table>
                        <thead>
                            <tr>
                                <th className="dark:text-darktext text-text text-xl p-5 mr-20">Skill</th>
                                <th className="dark:text-darktext text-text text-xl p-5 mr-20">Level</th>
                                <th className="dark:text-darktext text-text text-xl p-5 mr-20">Experience</th>
                            </tr>
                        </thead>
                        <tbody>
                            {skills.map((skill, index) => (
                                <tr key={index}>
                                    <td className="dark:text-darktext text-text text-lg px-[60px] py-[7px]">{skill.skill_name}</td>
                                    <td className="px-[60px]"><LevelCircles id={index} circles={skill.level}
                                        skills={skills} setSkills={setSkills} /></td>
                                    <td className="px-[60px]"><ExperienceCircles id={index} circles={skill.experience}
                                        skills={skills} setSkills={setSkills} /></td>
                                </tr>
                            ))}
                        </tbody>
                        <tfoot className="">
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
                        </tfoot>
                    </table>}
            </div>
        </div>
    )
}