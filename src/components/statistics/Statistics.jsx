import React, { useState } from 'react';
import { Modal, Divider } from '@mantine/core';
import { useDisclosure } from '@mantine/hooks';
import { Table } from '@mantine/core';
import PiechartComp from './SkillLevelStat';
import TotalCountStats from '../statistics/TotalCountStats';

export default function StatisticsComp({index, stat}){
    
    const [opened, {open, close}] = useDisclosure(false);

    return(
        <>
            <Modal opened={opened} onClose={close} centered overflow="inside" size={820} className="dark:bg-card_modal text-white select-none" zIndex={1000002}>
                <div style={{ textAlign: 'center' }} className=" font-bold " >
                    <h1 style={{ fontSize: '2em' }}>{stat.skill_name} Stats</h1></div>
                    <div className='flex flex-wrap'>
                    <table style={{ borderCollapse: 'separate', borderSpacing: '10px' }} className='mt-[40px]'>
                        <thead>
                            <tr>
                                <th>Level 1</th>
                                <th>Level 2</th>
                                <th>Level 3</th>
                                <th>Level 4</th>
                                <th>Level 5</th>
                                <th>Total</th>
                            </tr>
                        </thead>
                        <tbody>
                            <tr>
                                <td>{stat.levels[1]}</td>
                                <td>{stat.levels[2]}</td>
                                <td>{stat.levels[3]}</td>
                                <td>{stat.levels[4]}</td>
                                <td>{stat.levels[5]}</td>
                                <td>{stat.levels[0]}</td>
                            </tr>
                        </tbody>
                    </table>
                    <table style={{ borderCollapse: 'separate', borderSpacing: '10px' }} className='mt-[40px] mx-[90px]'>
                        <thead>
                            <tr>
                                <th>Total nr of employees: {stat.levels[0]}</th>
                            </tr>
                        </thead>
                        <tbody>
                            <tr>
                                <td></td>
                            </tr>
                        </tbody>
                    </table>
                </div>
                <div className='flex flex-row'>
                    <div className='flex-grow-0'>
                        <PiechartComp index={index} stats={stat}/>
                    </div>
                    <Divider orientation="vertical" />
                    <div className='flex-grow-0'>
                        
                        <TotalCountStats index={index} stats={stat}/>
                    </div>
                </div>
            </Modal>
            <div className="rounded-lg w-[200px] h-[80px] bg-card_modal rounded-xl text-white select-none font-bold mx-[30px] my-[20px]" 
                onClick={open} style={{ display: 'flex', alignItems: 'center', justifyContent: 'center' }}>
                <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'center', height: '100%' }}>
                    <h1 className='text-white' style={{ fontSize: '1.5rem', textAlign: 'center' }}>{stat.skill_name}</h1>
                </div>
            </div>
        </>
    )
}