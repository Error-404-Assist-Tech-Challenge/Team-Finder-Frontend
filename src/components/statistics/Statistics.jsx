/* eslint-disable no-unused-vars */
/* eslint-disable react/prop-types */
import React, { useState } from 'react';
import { Modal, Divider, Card } from '@mantine/core';
import { useDisclosure } from '@mantine/hooks';
import { Table } from '@mantine/core';
import PiechartComp from './SkillLevelStat';
import TotalCountStats from '../statistics/TotalCountStats';

export default function StatisticsComp({ index, stat }) {

    const [opened, { open, close }] = useDisclosure(false);

    return (
        <div>
            <Modal opened={opened} onClose={close} centered overflow="inside" size={650} className="dark:bg-card_modal text-white select-none" zIndex={1000002}>
            <div className="flex flex-col">
                <h1 className='text-white font-bold flex flex-col items-center' style={{ fontSize: '3rem' }}>{stat.skill_name}</h1>
                <div className="flex flex-wrap pt-6">
                    <div className="text-white pl-2">
                        <p className="font-bold text-xl p-1 pl-2">Skill levels in your department:</p>
                        <Card className="text-white font-bold">Level 1: {stat.levels[1]} employees</Card>
                        <Card className="text-white font-bold">Level 2: {stat.levels[2]} employees</Card>
                        <Card className="text-white font-bold">Level 3: {stat.levels[3]} employees</Card>
                        <Card className="text-white font-bold">Level 4: {stat.levels[4]} employees</Card>
                        <Card className="text-white font-bold">Level 5: {stat.levels[5]} employees</Card>
                    </div>
                    <div className='mt-6 ml-2 p-1' >
                        <PiechartComp index={index} stats={stat}/>
                    </div>
                </div>
                <Divider size="sm"  />
                <div className='flex items-center'>
                    <p className='font-bold pl-4'>Total {stat.skill_name} employees: {stat.levels[0]}</p>
                    <div className='ml-[125px] mt-4'>
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