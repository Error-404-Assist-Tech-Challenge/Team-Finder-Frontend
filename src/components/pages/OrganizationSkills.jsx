/* eslint-disable react-hooks/exhaustive-deps */
/* eslint-disable react/no-unescaped-entities */
/* eslint-disable no-unused-vars */

import { useContext, useEffect, useState } from 'react';
import { Table, Loader } from '@mantine/core';
import { useHeadroom } from '@mantine/hooks';

import { Context } from '../../App';
import useAxiosPrivate from '../../hooks/useAxiosPrivate';
import { SkillCard } from '../skillComponents/SkillCard';

export default function OrganizationSkillsPage() {

    const axiosPrivate = useAxiosPrivate();
    const [darkMode, setDarkMode] = useContext(Context);
    const pinned = useHeadroom({ fixedAt: 20 });

    const [visible, setVisible] = useState(false);

    useEffect(() => {

    }, [darkMode]);

    const [skills, setSkills] = useState([]);

    useEffect(() => {
        let isMounted = true;
        const controller = new AbortController();

        const getSkills = async () => {
            try {
                const response = await axiosPrivate.get('organizations/skills', {
                    signal: controller.signal,
                    withCredentials: true
                });
                console.log('Skills:', response.data);
                isMounted && setSkills(response.data);
            } catch (error) {
                console.error('Error fetching organization skills:', error);
            }
            finally {
                const timeout = 200;
                setTimeout(() => {
                    setVisible(true);
                }, timeout);
            }
        }

        getSkills();

        return () => {
            isMounted = false;
            controller.abort();
        }
    }, [])


    return (
        <div className={`${darkMode && 'dark'}`}>
            {!visible && (
                <div className="fixed top-1/2 left-1/2 transform -translate-x-1/2 -translate-y-1/2">
                    <Loader size={30} color="red" />
                </div>
            )}
            {visible && (<>
                <div className='dark:bg-darkcanvas bg-canvas select-none h-auto py-[30px] flex'>
                    {skills.map((skill, index) => (
                        <SkillCard key={index} skill={skill} />
                    ))}
                </div>
                <div className='dark:bg-darkcanvas bg-canvas h-screen'></div>
            </>)}
        </div>
    )
}