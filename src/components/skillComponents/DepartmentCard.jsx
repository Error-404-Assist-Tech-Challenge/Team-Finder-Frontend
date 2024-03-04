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
                        <div className="p-3 flex justify-left" style={{ fontSize: '1.5rem' }}>
                            <p className="font-bold">Leader</p>
                            <p>: {props.leader}</p>
                        </div>
                        <div className="p-3 flex justify-left" style={{ fontSize: '1.5rem' }}>
                            <p className="font-bold">Members</p>
                            {props.members.length > 0 ? (
                                        <div>
                                            {props.members.map((member, index) => (
                                                <p key={index}>: {member}, </p>
                                            ))}
                                        </div>
                                    ) : (
                                        <div > 
                                            <p>: Missing</p>
                                        </div>
                                    )}
                        </div>
                        <div className="p-[10px]">
                            <Button className="bg-accent text-white hover:bg-btn_hover font-bold px-4 py-2 rounded mx-[10px] my-[10px] mt-[20px]">
                                Remove Skill
                            </Button>
                            <Button className="bg-accent text-white hover:bg-btn_hover font-bold px-4 py-2 rounded mx-[10px] my-[10px] mt-[20px] float-right">
                                Edit skill
                            </Button>
                        </div>
                    </Modal>
                    <Card onClick={open} className="flex w-[330px] h-[230px] dark:bg-card_modal mx-[40px] my-[20px] rounded-xl dark:text-darktext text-text select-none font-bold border border-solid border-gray-500"
                        onMouseEnter={() => setIsHovering(true)} onMouseLeave={() => setIsHovering(false)}>
                        <Card.Section className="dark:bg-[#495256]">
                            <Title className="p-4 flex justify-center">
                                {props.name}
                            </Title>
                        </Card.Section>
                        <div className="flex justify-center items-center flex-col text-center h-full">
                            {!isHovering && (
                                <>
                                    {props.members.length > 0 ? (
                                        <div className="p-3 flex justify-left" style={{ fontSize: '1.5rem' }}>
                                            <p className="font-bold">Members</p>
                                            {props.members.map((member, index) => (
                                                <p key={index}>: {member}, </p>
                                            ))}
                                        </div>
                                    ) : (
                                        <div className="p-3 flex justify-left" style={{ fontSize: '1.5rem' }}> 
                                            <p>Missing</p>
                                        </div>
                                    )}
                                </>
                            )}
                            {isHovering && <Text className="text-xl">Click to see more!</Text>}
                        </div>
                    </Card>
                </div>
            </div>
        </>
    )
}