import { useNavigate } from 'react-router-dom';
import { Button, Title } from '@mantine/core'

const Welcome = () => {

    const navigate = useNavigate();

    return (
        <article className="bg-darkcanvas h-screen flex flex-col items-center justify-center">
            <Title order={1} className="text-white text-5xl select-none text-center mb-[100px]">
                Welcome to <span className="text-accent">Team Finder</span>
            </Title>
            <div className="flex space-x">
                <Button variant="filled" size="xl" radius="lg" className="bg-accent mx-[50px]"
                    onClick={() => navigate('/login')}>
                    Log in
                </Button>
                <Button variant="filled" size="xl" radius="lg" className="bg-accent mx-[50px]"
                    onClick={() => navigate('/signup')}>
                    Sign up
                </Button>
            </div>
        </article>
    )
}

export default Welcome