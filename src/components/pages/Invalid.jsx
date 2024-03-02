import { Button, Title } from '@mantine/core'
import { useNavigate } from 'react-router-dom';

const Invalid = () => {

    const navigate = useNavigate();

    return (
        <article className="bg-darkcanvas h-screen flex flex-col items-center justify-center">
            <Title order={1} className="text-white text-5xl select-none text-center mb-[100px]">
                Your link <span className="text-accent">invalid</span> or <span className="text-accent">expired</span>
            </Title>
            <div className="flex space-x">
                <Button variant="filled" size="xl" radius="lg" className="bg-accent mx-[50px]"
                    onClick={() => navigate('/login')}>
                    Go back
                </Button>
            </div>
        </article>
    )
}

export default Invalid