/* eslint-disable react/prop-types */
/* eslint-disable no-unused-vars */

import { Card, Avatar, Modal, Overlay, Button, Text, Title, rem } from '@mantine/core';
import { useDisclosure } from '@mantine/hooks';
import { useState, useContext, useEffect } from 'react';
import LevelCirclesCard from './LevelCirclesCard'
import LevelCirclesModal from './LevelCirclesModal'
import ExperienceCirclesCard from './ExperienceCirclesCard'
import ExperienceCirclesModal from './ExperienceCirclesModal'
import { Context } from '../../App';
import useAxiosPrivate from '../../hooks/useAxiosPrivate';
import { modals } from '@mantine/modals';
import { notifications } from '@mantine/notifications';
import { IconCheck } from '@tabler/icons-react';

export default function UserSkillCard(props) {

    const [isHovering, setIsHovering] = useState(false);
    const [darkMode, setDarkMode] = useContext(Context);
    const [opened, { open, close }] = useDisclosure(false);
    const [confirm, { proceed, cancel }] = useDisclosure(false);

    const axiosPrivate = useAxiosPrivate();

    function handleSave() {
        console.log(JSON.stringify({
            skill_id: props.skills[props.index].skill_id,
            level: props.skills[props.index].level,
            experience: props.skills[props.index].experience
        }))
        close();
        // try {
        //     const response = await axiosPrivate.put('skills/users',
        //         JSON.stringify({
        //             skill_id: props.skills[props.index].skill_id,
        //             level: props.skills[props.index].level,
        //             experience: props.skills[props.index].experience
        //         }),
        //         {
        //             headers: {
        //                 'Content-Type': 'application/json',
        //                 'Access-Control-Allow-Origin': '*',
        //                 'Access-Control-Allow-Credentials': 'true'
        //             },
        //             withCredentials: true
        //         });
        //     console.log('Respons:', response.data);
        // } catch (error) {
        //     console.error('Error saving my skill:', error);
        // }
    }

    // Remove user skill

    const handleRemoveSkill = async () => {
        try {
            const skillId = props.skills[props.index].skill_id;
            const response = await axiosPrivate.delete('skills/user', {
                headers: {
                    'Content-Type': 'application/json',
                    'Access-Control-Allow-Origin': '*',
                    'Access-Control-Allow-Credentials': 'true'
                },
                data: {
                    skill_id: skillId
                },
                withCredentials: true
            });
            console.log('Response:', response.data);
            window.location.reload();
        } catch (error) {
            console.error('Error deleting user skills:', error);
        }
        close();
    }


    const openModal = () => modals.openConfirmModal({
        children: (
            <Text className="text-white font-bold text-xl mb-[30px] ">
                Are you sure you want to remove this skill?
            </Text>
        ),
        labels: { confirm: 'Confirm', cancel: 'Cancel' },
        confirmProps: { color: 'red' },
        onConfirm: () => { handleRemoveSkill() },
        zIndex: 1000003,
    });
    //   useEffect(() => {
    //     const ild = notifications.show({
    //         title: 'Data saved',
    //         message: 'Your data has been fetched.',
    //         icon: <IconCheck style={{ width: rem(35), height: rem(35) }} />,
    //         color: "teal",
    //     });
    // }, [showNot]);

    return (
        <>
            <div className={`${darkMode && 'dark'}`}>
                <div className="flex flex-wrap">
                    <Modal opened={opened} onClose={close} centered overflow="inside" size={500} className="dark:bg-card_modal text-white select-none" zIndex={1000002}>
                        <div className="flex justify-center">
                            <h1 className="text-4xl font-bold">{props.skills[props.index].skill_name}</h1>
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
                        <hr className="my-[20px]"></hr>
                        <div className="p-3 flex justify-left text-xl">
                            <p>
                                <span className="font-bold">Level: </span>
                                {props.skills[props.index].level == 1 &&
                                    (<span>You are learning {props.skills[props.index].skill_name}</span>)}
                                {props.skills[props.index].level == 2 &&
                                    (<span>You know{props.skills[props.index].skill_name}</span>)}
                                {props.skills[props.index].level == 3 &&
                                    (<span>You do {props.skills[props.index].skill_name}</span>)}
                                {props.skills[props.index].level == 4 &&
                                    (<span>You can help in {props.skills[props.index].skill_name}</span>)}
                                {props.skills[props.index].level == 5 &&
                                    (<span>You can teach {props.skills[props.index].skill_name}</span>)}
                            </p>
                        </div>
                        <div className="flex justify-center items-center flex-col text-center h-full">
                            <LevelCirclesModal id={props.index} circles={props.skills.level}
                                skills={props.skills} setSkills={props.setSkills} />
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
                            <ExperienceCirclesModal id={props.index} circles={props.skills.level}
                                skills={props.skills} setSkills={props.setSkills} />
                        </div>
                        <div className="p-[10px]">
                            <Button className="bg-accent text-white hover:bg-btn_hover font-bold px-4 py-2 rounded mx-[10px] my-[10px] mt-[20px]"
                                onClick={openModal}>
                                Remove Skill
                            </Button>
                            <Button className="bg-accent text-white hover:bg-btn_hover font-bold px-4 py-2 rounded mx-[10px] my-[10px] mt-[20px] float-right"
                                onClick={handleSave}>
                                Request change
                            </Button>
                        </div>
                    </Modal>

                    <Card className="flex w-[330px] h-[230px] dark:bg-card_modal mx-[40px] my-[20px] rounded-xl dark:text-darktext text-text select-none font-bold"
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
                                    <LevelCirclesCard id={props.index} circles={props.skills.level}
                                        skills={props.skills} setSkills={props.setSkills} />
                                    <Text>Experience:</Text>
                                    <ExperienceCirclesCard id={props.index} circles={props.skills.level}
                                        skills={props.skills} setSkills={props.setSkills} />
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
