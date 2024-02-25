import GenericHeader from './components/header';
import { ScrollArea } from '@mantine/core';
import { Box, Portal, rem, Text } from '@mantine/core';
import { useHeadroom } from '@mantine/hooks';

export default function MyProjectsPage() {
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
                        transition: 'transform 200ms ease',
                        }}
                    >
                    <GenericHeader/ >
                </Box>
                <div className='bg-[#272F32] h-screen'>
                    <h1 className='text-white'>My Projects1</h1>
                    <h1 className='text-white'>My Projects2</h1>
                    <h1 className='text-white'>My Projects3</h1>
                    <h1 className='text-white'>My Projects4</h1>
                    <h1 className='text-white'>My Projects5</h1>
                    <h1 className='text-white'>My Projects6</h1>
                    <h1 className='text-white'>My Projects7</h1>
                    <h1 className='text-white'>My Projects8</h1>
                    <h1 className='text-white'>My Projects9</h1>
                    <h1 className='text-white'>My Projects0</h1>
                </div>
            </Portal>
        </ScrollArea>
        </>
    )
}