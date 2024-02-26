/* eslint-disable no-unused-vars */
import GenericHeader from './components/header';
import LevelCircles from './components/skillLevel';
import { ScrollArea } from '@mantine/core';
import { Box, Portal, rem } from '@mantine/core';
import { useHeadroom } from '@mantine/hooks';
import { useState, useEffect } from 'react';
import { useContext } from 'react';
import { Context } from '../App';
import ExperienceCircles from './components/skillExperience';

const USER_ID = 'aaf86aa9-c868-4f9b-b5a0-178aff826b5a'
const USER_SKILLS_ENDPOINT = `https://api-team-finder.koyeb.app/api/user_skills?user_id=${USER_ID}`

export default function MySkillsPage() {

    const [darkMode, setDarkMode] = useContext(Context);
    const pinned = useHeadroom({ fixedAt: 20 });

    const [skills, setSkills] = useState([]);
    const [changed, setChange] = useState(false)

    useEffect(() => {
        fetchUserSkills();
    }, []);

    async function fetchUserSkills() {
        try {
            const response = await fetch(USER_SKILLS_ENDPOINT);
            if (!response.ok) {
                throw new Error('Failed to fetch user skills');
            }
            const data = await response.json();

            console.log(data[0].skill_name);
            setSkills(data);
        } catch (error) {
            console.error('Error fetching user skills:', error);
        }
    }

    useEffect(() => {
        setChange(true);
    }, [skills]);

    useEffect(() => {

    }, [darkMode]);

    function handleSave() {
        setChange(false);
    }

    function handleAddSkill() { }

    return (
        <ScrollArea h={rem(140)}>
            <Portal>
                <Box
                    style={{
                        position: 'fixed',
                        top: 0,
                        left: 0,
                        right: 0,
                        height: rem(60),
                        zIndex: 1000000,
                        transform: `translate3d(0, ${pinned ? 0 : rem(-80)}, 0)`,
                        transition: 'transform 400ms ease',
                    }}
                >
                    <GenericHeader />
                </Box>
                <div className={`${darkMode && 'dark'}`}>
                    <div className='dark:bg-darkcanvas bg-canvas h-screen select-none'>
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
                                        <button className="bg-accent text-white px-4 py-2 rounded mx-[60px] my-[20px]" onClick={handleAddSkill}>Add Skill</button>
                                    </td>
                                    <td>
                                        {changed && <button className="bg-accent text-white px-4 py-2 rounded absolute bottom-[40px] right-[40px]" onClick={handleSave}>Save</button>}
                                    </td>
                                </tr>
                            </tfoot>
                        </table>
                    </div>
                </div>
            </Portal>
        </ScrollArea>
    )
}