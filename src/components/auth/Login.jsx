/* eslint-disable react/no-unescaped-entities */
/* eslint-disable no-unused-vars */
import { Container, Title, TextInput, PasswordInput, Button, Loader } from '@mantine/core';
import { useNavigate, useLocation } from 'react-router-dom';
import { useRef, useState, useEffect } from 'react';
import useAuth from '../../hooks/useAuth'
import axios from '../../api/axios';

export default function LoginPage() {

    const { setAuth } = useAuth();
    const navigate = useNavigate();
    const location = useLocation();
    const from = location.state?.from?.pathname || "/myskills";
    const [visible, setVisible] = useState(false);

    const handleSignUp = () => {
        navigate('/signup');
    };

    const handleResetPassword = () => {
        navigate('/resetpassword');
    };

    const handleKeyPress = (e) => {
        if (e.key === 'Enter') {
            handleLogIn(e);
        }
    };

    const handleLogIn = async (e) => {
        setVisible(true);
        e.preventDefault();
        try {
            const response = await axios.post('users/login',
                JSON.stringify({
                    email: email,
                    password: password,
                }),
                {
                    headers: {
                        'Content-Type': 'application/json',
                        'Access-Control-Allow-Origin': '*',
                        'Access-Control-Allow-Credentials': 'true'
                    },
                    withCredentials: true
                });

            const name = response?.data?.name;
            const accessToken = response?.data?.access_token;
            const org_name = response?.data?.org_name;
            const hq_address = response?.data?.hq_address;
            const roles = [...response.data.roles];

            console.log('Your access token is:', accessToken);

            setAuth({ name, email, org_name, hq_address, roles, accessToken })

            // console.log(roles);

            navigate(from, { replace: true });
        } catch (err) {
            setVisible(false);
            if (!err?.response) {
                setErrorMessage('No Server Response');
            } else if (err.response?.status === 409) {
                setErrorMessage('Incorrect email or password');
            } else {
                setErrorMessage('Login Failed')
            }
            errorRef.current.focus();
        }
        errorRef.current.focus();
    };

    const userRef = useRef();
    const errorRef = useRef();

    const [email, setEmail] = useState('');
    const [password, setPassword] = useState('');

    const [errorMessage, setErrorMessage] = useState('');

    useEffect(() => {
        userRef.current.focus();
    }, []);

    useEffect(() => {
        setErrorMessage('');
    }, [email, password]);

    return (
        <>
            <div className="h-screen z-0 absolute inset-0">
                <div className="spacer layer1"></div>
                <div className="spacer layer2"></div>
            </div>
            <div className="z-10 flex items-center justify-center min-h-screen min-w-full bg-[#272F32] text-[#272F32] select-none">
                {visible && (
                    <div className="fixed top-1/2 left-1/2 transform -translate-x-1/2 -translate-y-1/2">
                        <Loader size={30} color="red" />
                    </div>
                )}
                {!visible && (
                    <Container className="bg-[#505a5e] z-10 h-[auto] w-[494px] rounded-[20px] p-[30px] text-white">
                        <Title order={1} className="text-5xl text-select-none text-center py-[50px] ">
                            Team Finder
                        </Title>
                        <p ref={errorRef} className={errorMessage ? "errmsg" : "offscreen"}>{errorMessage}</p>
                        <div className="text-xl ">
                            <TextInput
                                label="E-mail Address"
                                placeholder="john.doe@example.com"
                                ref={userRef}
                                value={email}
                                autoComplete='off'
                                onChange={(e) => setEmail(e.target.value)}
                                required
                            />
                            <PasswordInput
                                label="Password"
                                placeholder="Pa$$w0rd123"
                                value={password}
                                onChange={(e) => setPassword(e.target.value)}
                                required
                                onKeyDown={handleKeyPress}
                            />
                        </div>
                        <div className="flex justify-center">
                            <Button variant="filled" size="xl" radius="lg" className="bg-[#FF3D2E]  hover:bg-btn_hover text-white font-bold mt-[50px]"
                                disabled={!email || !password}
                                onClick={handleLogIn} >
                                Log in
                            </Button>
                        </div>
                        <div className="text-lg flex items-center justify-between px-[20px] py-[50px]">
                            <Title order={4} className='text-white'>
                                Or if you don't have an account:
                            </Title>
                            <Button variant="filled" size="lg" radius="lg" className="bg-[#FF3D2E]  hover:bg-btn_hover font-bold text-white"
                                onClick={handleSignUp}>
                                Sign up
                            </Button>
                        </div>
                        <div className="text-lg flex items-center justify-center px-[20px]">
                            <Button variant="filled" size="lg" radius="lg" className=" hover:bg-[#505a5e] hover:text-bg font-bold text-white"
                                onClick={handleResetPassword}>
                                Forgot password?
                            </Button>
                        </div>
                    </Container>)}
            </div>
        </>
    )
}
