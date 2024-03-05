/* eslint-disable react/prop-types */
/* eslint-disable no-unused-vars */
import { Modal, Card, Title, Text, Button } from '@mantine/core';
import React, { useContext, useState } from 'react';
import { Context } from '../../App';
import { useDisclosure } from '@mantine/hooks';

export default function DepartmentCard(props) {

    const [darkMode, setDarkMode] = useContext(Context);
    const [opened, { open, close }] = useDisclosure(false);
    const [isHovering, setIsHovering] = useState(false);


    return (
        <>
            <div className={`${darkMode && 'dark'}`}>
                <div className="flex flex-wrap">
                    <Modal opened={opened} onClose={close} centered overflow="inside" size={500} className="dark:bg-card_modal text-white select-none" zIndex={1000002}>
                        <div className="flex justify-center">
                            <h1 className="text-4xl font-bold mb-[30px]">{props.name} Department</h1>
                        </div>
                        <div className="pt-4 flex justify-lef text-xl">
                            {props.leader && (
                                <p><span className="font-bold">Manager</span>: {props.leader}</p>)}
                            {!props.leader && (
                                <p><span className="font-bold text-2">Manager</span>: Department has no manager</p>)}
                        </div>
                        <div className="pt-4 flex justify-left text-xl">
                            {props.members.length != 0 && (
                                <p><span className="font-bold">Members</span>: {props.members.join(', ')}</p>)}
                            {props.members.length == 0 && (
                                <p><span className="font-bold">Members</span>: Department has no members</p>)}
                        </div>
                        <div className="p-[10px]">
                            <Button className="bg-accent text-white hover:bg-btn_hover font-bold px-4 py-2 rounded mx-[10px] my-[10px] mt-[20px]">
                                Remove Department
                            </Button>
                            <Button className="bg-accent text-white hover:bg-btn_hover font-bold px-4 py-2 rounded mx-[10px] my-[10px] mt-[20px] float-right">
                                Edit Department
                            </Button>
                        </div>
                    </Modal>
                    <Card onClick={open} className="flex w-[240px] h-[184px] dark:bg-card_modal mx-[40px] my-[20px] rounded-xl dark:text-darktext text-text select-none font-bold"
                        onMouseEnter={() => setIsHovering(true)} onMouseLeave={() => setIsHovering(false)}>
                        <Card.Section className="dark:bg-[#495256]">
                            <Title className="p-4 flex justify-center  text-3xl">
                                {props.name}
                            </Title>
                        </Card.Section>
                        <div className="flex justify-center items-center flex-col text-center h-full">
                            <div className="p-4">
                                <Text className="text-[16px]">
                                    {!isHovering && props.leader && `Manager: ${props.leader}`}
                                    {!isHovering && !props.leader.length && "Department has no manager"}
                                    {isHovering && <Text className="text-xl">Click to see more!</Text>}
                                </Text>
                            </div>
                        </div>
                    </Card>
                </div >
            </div >
        </>
    )
}