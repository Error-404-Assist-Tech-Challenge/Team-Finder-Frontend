/* eslint-disable no-unused-vars */
import GenericHeader from './components/header';
import { ScrollArea } from '@mantine/core';
import { Box, Portal, rem, Table } from '@mantine/core';
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
            <div className='dark:bg-darkcanvas bg-canvas h-screen'>
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
                            <Table className="w-full p-[20px]">
                                <thead>
                                    <tr className="text-xl text-left">
                                        <th className="p-[7px]">Category</th>
                                        <th className="p-[7px]">Name</th>
                                        <th className="p-[7px]">Description</th>
                                        <th className="p-[7px]">Author</th>
                                        <th className="p-[7px]">Departments</th>
                                    </tr>
                                </thead>
                                <tbody>
                                    {organizationSkillsData.map((skill, index) => (
                                        <tr key={index} className="text-left">
                                            <td className="px-[10px] py-[7px]">{skill.category}</td>
                                            <td className="px-[10px] py-[7px]">{skill.name}</td>
                                            <td className="px-[10px] py-[7px]">{skill.description}</td>
                                            <td className="px-[10px] py-[7px]">{skill.author}</td>
                                            <td className="px-[10px] py-[7px]">{skill.departments.join(', ')}</td>
                                        </tr>
                                    ))}
                                </tbody>
                            </Table>
                        </Box>
                    </Portal>
                </ScrollArea>
            </div>
        </div>
    )
}