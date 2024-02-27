import { Container, Title, TextInput, PasswordInput, Button } from '@mantine/core';
import { useNavigate } from 'react-router-dom';

export default function LoginPage() {

    const navigateTo = useNavigate();

    const handleSignUp = () => {
        navigateTo('/');
    };

    const handleLogIn = () =>{
        navigateTo('/myskills');
    };

    return (
        <div className="flex items-center justify-center min-h-screen min-w-full bg-[#272F32] text-[#272F32]">
            <Container className="bg-[#9DBDC6] h-[auto] w-[494px] rounded-[50px]">
                <Title order={1} className="text-5xl text-select-none text-center py-[50px]">
                    Team Finder
                </Title>
                <div className="text-xl">
                    <TextInput
                        label="E-mail Address"
                        placeholder="john.doe@example.com"
                    />
                    <PasswordInput
                        label="Password"
                        placeholder="Pa$$w0rd123"
                    />
                </div>
                <div className="flex justify-center">
                    <Button variant="filled" size="xl" radius="lg" className="bg-[#FF3D2E] mt-[50px]"
                            onClick={handleLogIn}>
                        Log in
                    </Button>
                </div>
                <div className="text-lg flex items-center justify-between px-[20px] py-[50px]">
                    <Title order={4}>
                        Or if you don't have an account: 
                    </Title>
                    <Button variant="filled" size="lg" radius="lg" className="bg-[#FF3D2E]"
                            onClick={handleSignUp}>
                        Sign up
                    </Button>
                </div>
            </Container>
        </div>
    )
}
