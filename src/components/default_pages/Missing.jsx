/* eslint-disable no-unused-vars */
import { Button, Title } from '@mantine/core'
import { useNavigate } from 'react-router-dom';

const Missing = () => {

    const navigate = useNavigate();

    return (
        <article className="bg-darkcanvas h-screen flex flex-col items-center justify-center">
            <Title order={1} className="text-white text-5xl select-none text-center">
                Error 404: <span className="text-accent">Page Not Found</span>
            </Title>
            <p className="text-gray-500 text-sm my-2 mr-[220px]">Get it? :)</p>
            <div className="flex space-x">
                <Button variant="filled" size="xl" radius="lg" className="bg-accent mt-[50px]"
                    onClick={() => navigate('/')}>
                    Get back to safety
                </Button>
            </div>
        </article>
    )
}

export default Missing