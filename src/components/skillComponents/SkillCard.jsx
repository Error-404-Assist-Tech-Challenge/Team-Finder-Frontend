/* eslint-disable react/prop-types */
import { Card, Text } from '@mantine/core';
import { useDisclosure } from '@mantine/hooks';
import { Modal, Button } from '@mantine/core';

export const SkillCard = ({ skill }) => {

    const [opened, { open, close }] = useDisclosure(false);

    return (
        <div>
            <Modal opened={opened} onClose={close} centered overflow="inside" className="bg-.m-1b7284a3.m-b5489c3c text-white rounded-modal">
                <div style={{ display: 'flex', justifyContent: 'center' }}>
                    <h1 style={{ fontSize: '2rem', fontWeight: 'bold' }}>{skill.name}</h1>
                </div>
                <div className="pt-4" style={{ display: 'flex', justifyContent: 'left', }}>
                    <p style={{ fontWeight: 'bold' }}>Author</p>
                    <p>:  {skill.author_name}</p>
                </div>
                <div className="pt-4" style={{ display: 'flex', justifyContent: 'left' }}>
                    <p>
                        <span className="font-bold">Description</span>: {skill.description}
                    </p>
                </div>
                <div className="pt-4" style={{ display: 'flex', justifyContent: 'left' }}>
                    <p>
                        <span className="font-bold">Category</span>: {skill.category_name}
                    </p>
                </div>
                <div className="pt-4" style={{ display: 'flex', justifyContent: 'left' }}>
                    <p>
                        <span className="font-bold">Departments</span>: {skill.dept_name.join(', ')}
                    </p>
                </div>
                <div className="pt-4" style={{ display: 'flex', justifyContent: 'right' }}>
                    <Button className="bg-accent text-white hover:bg-btn_hover font-bold rounded ">Edit skill</Button>
                </div>
            </Modal>

            <Card variant="filled" onClick={open}
                className="bg-graybg hover:bg-btn_hover w-[250px] h-[154px] mx-[40px] font-bold text-white">
                <Card.Section className="bg-[#495256] p-3 text-2xl  flex justify-center items-center">
                    {skill.name}
                </Card.Section>
                <Text>

                </Text>
            </Card>
        </div>
    )
}
