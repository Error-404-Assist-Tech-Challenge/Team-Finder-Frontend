/* eslint-disable no-unused-vars */
/* eslint-disable react/prop-types */
import React, { useState } from 'react';
import { Modal, Divider } from '@mantine/core';
import { useDisclosure } from '@mantine/hooks';
import { Table } from '@mantine/core';
import PiechartComp from './SkillLevelStat';
import TotalCountStats from '../statistics/TotalCountStats';

export default function StatisticsComp({ index, stat }) {

    const [opened, { open, close }] = useDisclosure(false);

    return (
        <div>
            <Modal opened={opened} onClose={close} centered overflow="inside" size={840} className="dark:bg-card_modal text-white select-none" zIndex={1000002}>
                <div className="flex flex-col">
                    <h1 className='text-white font-bold flex flex-col items-center' style={{ fontSize: '2rem' }}>{stat.skill_name}</h1>
                    <div className="flex flex-row justify-between">
                        <table style={{ borderCollapse: 'separate', borderSpacing: '12px' }} className='mt-4'>
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
                            <tbody style={{ textAlign: 'center' }}>
                                <tr>
                                    <td style={{ fontWeight: 'bold' }}>{stat.levels[1]}</td>
                                    <td style={{ fontWeight: 'bold' }}>{stat.levels[2]}</td>
                                    <td style={{ fontWeight: 'bold' }}>{stat.levels[3]}</td>
                                    <td style={{ fontWeight: 'bold' }}>{stat.levels[4]}</td>
                                    <td style={{ fontWeight: 'bold' }}>{stat.levels[5]}</td>
                                    <td style={{ fontWeight: 'bold' }}>{stat.levels[0]}</td>
                                </tr>
                            </tbody>
                        </table>
                        <p className='font-bold mt-[27px] mr-[100px]'>Total {stat.skill_name} employees: {stat.levels[0]}</p>
                    </div>
                    <div className='flex flex-row justify-center'>
                        <div className='flex-grow-0 mr-4'>
                            <PiechartComp index={index} stats={stat}/>
                        </div>
                        <Divider size="sm" orientation="vertical" />
                        <div className='flex-grow-0'>
                            <TotalCountStats index={index} stats={stat}/>
                        </div>
                    </div>
                </div>
            </Modal>
            
            <div className="rounded-lg w-[200px] h-[80px] bg-card_modal rounded-xl text-white select-none font-bold mx-[30px] my-[20px]"
                onClick={open} style={{ display: 'flex', alignItems: 'center', justifyContent: 'center', cursor: 'pointer' }}>
                <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'center', height: '50%' }}>
                    <h1 className='text-white' style={{ fontSize: '1.5rem', textAlign: 'center' }}>{stat.skill_name}</h1>
                </div>
            </div>
        </div>
    )
}