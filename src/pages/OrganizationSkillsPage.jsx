/* eslint-disable no-unused-vars */
import GenericHeader from './components/header';
import { ScrollArea } from '@mantine/core';
import { Box, Portal, rem } from '@mantine/core';
import { useHeadroom } from '@mantine/hooks';
import { useContext, useEffect } from 'react';
import { Context } from '../App';
import organizationSkillsData from './fakedb/organizationSkillsData'

export default function OrganizationSkillsPage() {

    const [darkMode, setDarkMode] = useContext(Context);
    const pinned = useHeadroom({ fixedAt: 20 });

    useEffect(() => {

    }, [darkMode]);

    return (
        <div className={`${darkMode && 'dark'}`}>
            <div className='dark:bg-[#272F32] bg-white h-screen'>
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
                                transition: 'transform 200ms ease',
                            }}
                        >
                            <GenericHeader />
                            <div>
                                <table className="w-full">
                                    <thead >
                                        <tr>
                                            <th className="w-[10vh] p-[5px]">Category</th>
                                            <th className="w-[10vh] p-[5px]">Name</th>
                                            <th className="w-[50vh] p-[5px]">Description</th>
                                            <th className="w-[10vh] p-[5px]">Author</th>
                                            <th className="w-[20vh] p-[5px]">Departments</th>
                                        </tr>
                                    </thead>
                                    <tbody>
                                        {organizationSkillsData.map((skill, index) => (
                                            <tr key={index}>
                                                <td>{skill.category}</td>
                                                <td>{skill.name}</td>
                                                <td>{skill.description}</td>
                                                <td>{skill.author}</td>
                                                <td>{skill.departments.join(', ')}</td>
                                            </tr>
                                        ))}
                                    </tbody>
                                </table>
                            </div>
                        </Box>
                    </Portal>
                </ScrollArea>
            </div>
        </div>
    )
}