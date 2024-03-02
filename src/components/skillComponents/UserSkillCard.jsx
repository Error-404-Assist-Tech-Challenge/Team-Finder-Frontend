/* eslint-disable react/prop-types */
/* eslint-disable no-unused-vars */

import { Card, Avatar, Modal, Overlay, Button, Text, Title } from '@mantine/core';
import { useDisclosure } from '@mantine/hooks';
import { useState, useContext } from 'react';
import LevelCircles from './LevelCircles'
import ExperienceCircles from './ExperienceCircles'
import { Context } from '../../App';

export default function UserSkillCard(props) {

    const [isHovering, setIsHovering] = useState(false);
    const [darkMode, setDarkMode] = useContext(Context);
    
    const [opened, { open, close }] = useDisclosure(false);
    return (
        <>
            <div className={`${darkMode && 'dark'}`}>
                <div className="flex flex-wrap">
                    <Modal opened={opened} onClose={close} centered overflow="inside" size={500} className="dark:bg-card_modal text-white select-none" zIndex={1000002}>
                        <div className="flex justify-center">
                            <h1 className="text-3xl font-bold">{props.skills[props.index].skill_name}</h1>
                        </div>
                        <div className="p-3 flex justify-left">
                            <p className="font-bold">Author</p>
                            <p>: {props.skills[props.index].skill_author}</p>
                        </div>
                        <div className="p-3 flex justify-left">
                            <p><span className="font-bold">Description</span>: {props.skills[props.index].skill_description}</p>
                        </div>
                        <div className="p-3 flex justify-left">
                            <p><span className="font-bold">Category</span>: {props.skills[props.index].category_name}</p>
                        </div>
                        <div className="p-3 flex justify-left text-xl">
                            <p>
                                <span className="font-bold">Level: </span>
                                {props.skills[props.index].level == 1 &&
                                    (<span>You are learning C++</span>)}
                                {props.skills[props.index].level == 2 &&
                                    (<span>You know C++</span>)}
                                {props.skills[props.index].level == 3 &&
                                    (<span>You do C++</span>)}
                                {props.skills[props.index].level == 4 &&
                                    (<span>You can help in C++</span>)}
                                {props.skills[props.index].level == 5 &&
                                    (<span>You can teach C++</span>)}
                            </p>
                        </div>
                        <div className="flex justify-center items-center flex-col text-center h-full">
                            <LevelCircles id={props.index} circles={props.skills.level}
                                skills={props.skills} setSkills={props.setSkills} width={20} />
                        </div>
                        <div className="p-3 flex justify-left text-xl">
                            <p>
                                <span className="font-bold">Experience: </span>
                                {props.skills[props.index].experience == 1 &&
                                    (<span>0-6 months</span>)}
                                {props.skills[props.index].experience == 2 &&
                                    (<span>6-12 months</span>)}
                                {props.skills[props.index].experience == 3 &&
                                    (<span>1-2 years</span>)}
                                {props.skills[props.index].experience == 4 &&
                                    (<span>2-4 years</span>)}
                                {props.skills[props.index].experience == 5 &&
                                    (<span>4-7 years</span>)}
                                {props.skills[props.index].experience == 6 &&
                                    (<span>7+ years</span>)}
                            </p>
                        </div>
                        <div className="flex justify-center items-center flex-col text-center h-full">
                            <ExperienceCircles id={props.index} circles={props.skills.level}
                                skills={props.skills} setSkills={props.setSkills} width={20} />
                        </div>
                        <button className="bg-accent text-white hover:bg-btn_hover font-bold px-4 py-2 rounded mx-[10px] my-[10px] mt-[20px]">
                            Add Skill
                        </button>
                        <button className="bg-accent text-white hover:bg-btn_hover font-bold px-4 py-2 rounded mx-[10px] my-[10px] mt-[20px] float-right">
                            Save
                        </button>
                    </Modal>
                    
                    <Card className="flex w-[330px] h-[230px] dark:bg-card_modal mx-[40px] my-[20px] rounded-xl dark:text-darktext text-text select-none font-bold border border-solid border-gray-500"
                        onClick={open} onMouseEnter={() => setIsHovering(true)} onMouseLeave={() => setIsHovering(false)}>
                        <Card.Section className="dark:bg-[#495256]">
                            <Title className="p-4 flex justify-center"> 
                                {props.skills[props.index].skill_name}
                            </Title>
                        </Card.Section>
                        <div className="flex justify-center items-center flex-col text-center h-full">
                            {!isHovering && (
                                <>
                                    <Text>Level:</Text>
                                    <LevelCircles id={props.index} circles={props.skills.level}
                                        skills={props.skills} setSkills={props.setSkills} width={20} />
                                    <Text>Experience:</Text>
                                    <ExperienceCircles id={props.index} circles={props.skills.level}
                                        skills={props.skills} setSkills={props.setSkills} width={20} />
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
