import { Button, Title } from '@mantine/core'
import { useNavigate } from 'react-router-dom';

const Unauthorized = () => {

    const navigate = useNavigate();

    return (
        <article className="bg-darkcanvas h-screen flex flex-col items-center justify-center">
            <Title order={1} className="text-white text-5xl select-none text-center mb-[100px]">
                You are <span className="text-accent">unauthorized</span> to view this page
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

export default Unauthorized