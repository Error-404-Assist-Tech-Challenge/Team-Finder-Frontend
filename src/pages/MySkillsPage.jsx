import GenericHeader from './components/header';
import LevelCircles from './components/skillLevel';
import { ScrollArea } from '@mantine/core';
import { Box, Portal, rem, Text, Button } from '@mantine/core';
import { useHeadroom } from '@mantine/hooks';
import skillsData from './components/skillsData'
import { useState, useEffect } from 'react';

export default function MySkillsPage() {

    const pinned = useHeadroom({ fixedAt: 20 });
    const initialLevels = skillsData.map(skill => skill.level);
    const [skillLevels, setSkillLevels] = useState(initialLevels);
    const [changed, setChange] = useState(false)

    useEffect(() => {
        if (JSON.stringify(skillLevels) !== JSON.stringify(initialLevels)) {
            setChange(true);
        }
    }, [skillLevels]);

    function handleSave() {
        setChange(false);
    }

    return (
        <>
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
                    <div className='bg-[#272F32] h-screen p-[20px]'>
                        <table>
                            <tbody>
                                {skillsData.map((skill, index) => (
                                    <tr key={index}>
                                        <td className="text-white p-[5px] mr-[20px]">{skill.skill}</td>
                                        <td className="pl-[20px]"><LevelCircles id={index} circles={skillLevels[index]}
                                            skillLevels={skillLevels} setSkillLevels={setSkillLevels} /></td>
                                    </tr>
                                ))}
                            </tbody>
                            <div>
                                {changed && <Button variant="outline" color="#FF3D2E" onClick={handleSave}>Save</Button>}
                            </div>
                        </table>
                    </div>
                </Portal>
            </ScrollArea>
        </>
    )
}