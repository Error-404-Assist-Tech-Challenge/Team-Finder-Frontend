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
            <Modal opened={opened} onClose={close} centered overflow="inside" size={500} className="dark:bg-card_modal text-white select-none" zIndex={1000002}>
                <table>
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
                <PiechartComp index={index} stats={stat} />
                <TotalCountStats index={index} stats={stat} />

            </Modal>
            <div className="rounded-lg w-[200px] h-[80px] bg-card_modal rounded-xl text-white select-none font-bold mx-[30px] my-[20px]"
                onClick={open} style={{ display: 'flex', alignItems: 'center', justifyContent: 'center' }}>
                <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'center', height: '100%' }}>
                    <h1 className='text-white' style={{ fontSize: '1.5rem', textAlign: 'center' }}>{stat.skill_name}</h1>
                </div>
            </div>
        </div>
    )
}