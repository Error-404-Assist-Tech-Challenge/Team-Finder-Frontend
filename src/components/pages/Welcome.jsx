import { useNavigate } from 'react-router-dom';
import { Button, Title } from '@mantine/core'

const Welcome = () => {

    const navigate = useNavigate();

    return (
        <>
            <div className=" z-0 absolute inset-0">
                <div className="spacer layer1"></div>
                <div className="spacer layer2"></div>
            </div>
            <article className="h-screen flex flex-col items-center justify-center relative">
                {/* Content */}
                <Title order={1} className="text-white text-5xl select-none text-center mb-[100px] relative z-10">
                    Welcome to <span className="text-accent">Team Finder</span>
                </Title>
                <div className="flex space-x z-10">
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
        </>

    )
}

export default Welcome