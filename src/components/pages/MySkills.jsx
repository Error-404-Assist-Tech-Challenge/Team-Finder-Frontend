/* eslint-disable react-hooks/exhaustive-deps */
/* eslint-disable no-unused-vars */

import { useState, useEffect, useContext } from 'react';
import { Loader, rem, Card, Modal, Button } from '@mantine/core';
import { useHeadroom, useDisclosure } from '@mantine/hooks';
import { notifications } from '@mantine/notifications';
import { IconCheck } from '@tabler/icons-react';
import { Context } from '../../App';
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
                {!visible &&
                    <div className="flex flex-wrap">
                        {skills.map((skill, index) => (
                            <UserSkillCard key={index}
                                index={index} skills={skills} setSkills={setSkills} />
                        ))}
                        <div className="w-[410px] h-[270px] flex justify-center items-center">
                            <Button variant="outline"
                                className={`relative w-[100px] h-[100px] m-[6px] rounded-full p-0 text-accent border-accent border-[6px] text-9xl`}>
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