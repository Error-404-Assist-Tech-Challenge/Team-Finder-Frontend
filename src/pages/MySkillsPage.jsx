import GenericHeader from './components/header';
import { ScrollArea } from '@mantine/core';
import { Box, Portal, rem, Text, Button } from '@mantine/core';
import { useHeadroom } from '@mantine/hooks';


export default function MySkillsPage() {

    const pinned = useHeadroom({ fixedAt: 20 });
    
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
                    <GenericHeader/ >
                </Box>
                <div className='bg-[#272F32] h-screen'>
                    <h1 className='text-white'>My Skills1</h1>
                    <h1 className='text-white'>My Skills2</h1>
                    <h1 className='text-white'>My Skills3</h1>
                    <h1 className='text-white'>My Skills4</h1>
                    <h1 className='text-white'>My Skills5</h1>
                    <h1 className='text-white'>My Skills6</h1>
                    <h1 className='text-white'>My Skills7</h1>
                    <h1 className='text-white'>My Skills8</h1>
                    <h1 className='text-white'>My Skills9</h1>
                    <h1 className='text-white'>My Skills0</h1>
                </div>
            </Portal>
        </ScrollArea>
        </>
    )
}