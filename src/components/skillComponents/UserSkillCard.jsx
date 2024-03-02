/* eslint-disable no-unused-vars */

import { Card, Avatar, Modal, Badge, Button } from '@mantine/core';
import { useDisclosure } from '@mantine/hooks';

import LevelCircles from './LevelCircles'
import ExperienceCircles from './ExperienceCircles'

export default function UserSkillCard(props) {
  const [opened, { open, close }] = useDisclosure(false);
  return (
    <>
      <div className="flex flex-wrap">                   
            <Card className="flex w-[301px] h-[230px] bg-[#505A5E] rounded-xl dark:text-darktext text-text select-none font-bold" onClick={open}>
                <div className="pt-4 flex justify-center">
                    {props.name}
                </div>
                <div className="pt-4 flex justify-left">
                    <p>L</p>
                    {/* <LevelCircles id={props.key} circle={props.level} skills={props.skills} setSkills={props.setSkills}/> */}
                </div>
                <div className="pt-4 flex justify-left">
                    <p>E:</p>
                    {/* <ExperienceCircles id={index} circles={skill.experience} skills={skills} setSkills={setSkills} /> */}
                </div>
            </Card>
            <Modal opened={opened} onClose={close} centered overflow="inside" className="bg-graybg text-white select-none">
                <div className="flex justify-center">
                    <h1 className="text-3xl font-bold">{props.name}</h1>
                </div>
                <div className="flex justify- p-6">
                    <p>Level:</p>
                </div>
                <div className="pt-4 flex justify-start">
                    {/* <LevelCircles id={props.key} circle={props.level} skills={props.skills} setSkills={props.setSkills}/> */}
                </div>

                <div className="flex justify- p-6">
                    <p>Experience:</p>
                </div>
                <div className="pt-4 flex justify-start">
                    {/* <ExperienceCircles id={index} circles={skill.experience} skills={skills} setSkills={setSkills} /> */}                                       
                </div>
                {/* <button className="bg-accent text-white hover:bg-btn_hover font-bold px-4 py-2 rounded mx-[60px] my-[20px]" onClick={handleAddSkill}>Add Skill</button>
                {changed && (
                <button className="bg-accent text-white  hover:bg-btn_hover font-bold px-4 py-2 rounded mx-[60px] my-[20px]" onClick={handleSave}
                >
                    Save
                </button>
                    )} */}
            </Modal>
        </div>
    </>
  )
}
