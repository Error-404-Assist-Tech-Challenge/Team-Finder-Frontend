/* eslint-disable react-hooks/exhaustive-deps */
/* eslint-disable react/no-unescaped-entities */
/* eslint-disable no-unused-vars */

import { useContext, useEffect, useState } from 'react';
import { Table, Loader, Button, Divider } from '@mantine/core';
import { useHeadroom } from '@mantine/hooks';

import { Context } from '../../App';
import useAxiosPrivate from '../../hooks/useAxiosPrivate';
import { SkillCard } from '../skillComponents/SkillCard';

export default function OrganizationSkillsPage() {

    const axiosPrivate = useAxiosPrivate();
    const [darkMode, setDarkMode] = useContext(Context);
    const pinned = useHeadroom({ fixedAt: 20 });

    const [visible, setVisible] = useState(true);

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
                setVisible(false);
            } catch (error) {
                console.error('Error fetching organization skills:', error);
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
            {visible && (
                <div className="fixed top-1/2 left-1/2 transform -translate-x-1/2 -translate-y-1/2">
                    <Loader size={30} color="red" />
                </div>
            )}
            {!visible && (<>
                <div className='bg-darkcanvas select-none h-auto w-full py-[30px] flex'>
                    <div className="w-2/3 flex flex-wrap">
                        {skills.map((skill, index) => (
                            <SkillCard key={index} skill={skill} />
                        ))}
                        <div className='dark:bg-darkcanvas bg-darkcanvas'></div>
                        <div className="w-[320px] h-[224px] flex justify-center items-center">
                            <Button variant="outline"
                                className={`relative w-[80px] h-[80px] m-[6px] rounded-full p-0 text-accent border-accent border-[5px] hover:text-accent`}>
                                <svg xmlns="http://www.w3.org/2000/svg" className="icon icon-tabler icon-tabler-plus w-full h-full" viewBox="0 0 24 24" strokeWidth="1.5" stroke="currentColor" fill="none" strokeLinecap="round" strokeLinejoin="round">
                                    <path stroke="none" d="M0 0h24v24H0z" fill="none" />
                                    <path d="M12 5l0 14" />
                                    <path d="M5 12l14 0" />
                                </svg>
                            </Button>
                        </div>
                    </div>
                    <div className="w-1/3 flex flex-wrap">
                        <Divider orientation="vertical" />
                        
                    </div>
                </div>
            </>)}

        </div>
    )
}