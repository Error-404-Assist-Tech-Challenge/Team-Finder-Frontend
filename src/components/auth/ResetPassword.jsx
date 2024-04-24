/* eslint-disable no-unused-vars */
import { useRef, useState, useEffect } from 'react';
import { Container, Title, TextInput, PasswordInput, Button, Loader } from '@mantine/core';
import axios from '../../api/axios';

export default function ResetPassword() {

    const userRef = useRef();
    const errorRef = useRef();

    const [email, setEmail] = useState('');

    const [errorMessage, setErrorMessage] = useState('');

    const handleResetPassword = async (e) => {
        console.log(email)
        try {
            const response = await axios.get(
                'users/password_reset_token',
                {
                    params: {
                        email: email,
                    },

                    headers: {
                        'Content-Type': 'application/json',
                        'Access-Control-Allow-Origin': '*',
                        'Access-Control-Allow-Credentials': 'true'
                    },
                    withCredentials: true
                }
            );
            setErrorMessage('Please check your inbox')
        } catch (err) {
            if (!err?.response) {
                setErrorMessage('No Server Response');
            } else if (err.response?.status === 409) {
                setErrorMessage('Incorrect email');
            } else {
                setErrorMessage('Login Failed')
            }
            errorRef.current.focus();
        }
        errorRef.current.focus();
    };


    return (
        <>
            <div className="h-screen z-0 absolute inset-0">
                <div className="spacer layer1"></div>
                <div className="spacer layer2"></div>
            </div>
            <div className="z-10 flex items-center justify-center min-h-screen min-w-full bg-[#272F32] text-[#272F32] select-none">

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
                    </div>
                    <div className="flex justify-center">
                        <Button variant="filled" size="xl" radius="lg" className="bg-[#FF3D2E]  hover:bg-btn_hover text-white font-bold my-[50px]"
                            disabled={!email}
                            onClick={handleResetPassword} >
                            Reset Password
                        </Button>
                    </div>
                </Container>
            </div>
        </>
    )
}
