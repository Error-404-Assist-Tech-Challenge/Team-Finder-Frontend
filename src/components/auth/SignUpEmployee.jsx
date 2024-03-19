/* eslint-disable no-unused-vars */
import React, { useRef, useState, useEffect } from 'react';
import { Container, Title, TextInput, PasswordInput, Button, Loader } from '@mantine/core';
import { useNavigate, useParams } from 'react-router-dom';
import axios from '../../api/axios';
import useAuth from '../../hooks/useAuth'

const nameRegex = /^[A-Za-z]+(?:\s+[A-Za-z]+)*$/;
const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@.]+$/;
const passwordRegex = /^(?=.*[a-z])(?=.*[A-Z])(?=.*\d)(?=.*[@$!%*?&])[A-Za-z\d@$!%*?&]{8,}$/;

export default function SignUpEmployeePage() {

    const { setAuth } = useAuth();
    const naviage = useNavigate();
    const { ref_id } = useParams();
    const [visible, setVisible] = useState(false);

    useEffect(() => {
        const checkToken = async (e) => {
            try {
                const response = await axios.get(`organizations/verify_signup_token?id=${ref_id}`,
                    {
                        headers: {
                            'Content-Type': 'application/json',
                            'Access-Control-Allow-Origin': '*',
                            'Access-Control-Allow-Credentials': 'true'
                        },
                        withCredentials: true
                    });

                // console.log(response.data);

                setOrganization(response?.data?.org_name);
                setAddress(response?.data?.hq_address);

            } catch (err) {
                if (!err?.response) {
                    setErrorMessage('No Server Response');
                } else if (err.response?.status === 401) {
                    naviage('/invalid');
                } else {
                    setErrorMessage('Registration Failed')
                }
                console.error(err);
            }
        };

        checkToken();
    }, [])

    const handleLogIn = () => {
        naviage('/login');
    };

    const handleKeyPress = (e) => {
        if (e.key === 'Enter') {
            handleSignUp(e);
        }
    };

    const handleSignUp = async (e) => {

        if (!validName || !validEmail || !validPassword) {
            setErrorMessage('Not valid details')
        }

        e.preventDefault();

        try {
            setVisible(true);
            const response = await axios.post('users/employee',
                JSON.stringify({
                    name: user,
                    email: email,
                    password: password,
                    token: ref_id
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

            // console.log('Your access token is:', accessToken);

            setAuth({ name, email, org_name, hq_address, roles, accessToken })

            naviage('/myskills');
        } catch (err) {
            setVisible(false);
            if (!err?.response) {
                console.error(err);
                setErrorMessage('No Server Response');
            } else if (err.response?.status === 409) {
                setErrorMessage('Email Already Being Used');
            } else {
                setErrorMessage('Registration Failed')
            }
            errorRef.current.focus();
        }
    };

    const userRef = useRef();
    const errorRef = useRef();

    const [user, setUser] = useState('');
    const [validName, setValidName] = useState(false);
    const [userFocus, setUserFocus] = useState(false);
    const [email, setEmail] = useState('');
    const [validEmail, setValidEmail] = useState(false);
    const [emailFocus, setEmailFocus] = useState(false);
    const [password, setPassword] = useState('');
    const [validPassword, setValidPassword] = useState(false);
    const [passwordFocus, setPasswordFocus] = useState(false);
    const [organization, setOrganization] = useState('');
    const [address, setAddress] = useState('');

    const [errorMessage, setErrorMessage] = useState('');

    useEffect(() => {
        if (userRef.current) {
            userRef.current.focus();
        }
    }, [])

    useEffect(() => {
        setValidName(nameRegex.test(user));
    }, [user])
    useEffect(() => {
        setValidEmail(emailRegex.test(email));
    }, [email])
    useEffect(() => {
        setValidPassword(passwordRegex.test(password));
    }, [password])

    useEffect(() => {
        setErrorMessage('');
    }, [user, email, password])

    return (
        <div className="flex items-center justify-center min-h-screen min-w-full bg-[#272F32] text-[#272F32] select-none">
            {visible && (
                <div className="fixed top-1/2 left-1/2 transform -translate-x-1/2 -translate-y-1/2">
                    <Loader size={30} color="red" />
                </div>
            )}
            {!visible && (
                <Container className="bg-[#505a5e] h-[auto] w-[494px] rounded-[20px] text-white px-[30px]">
                    <Title order={1} className="text-5xl text-select-none text-center py-[50px]">
                        Team Finder
                    </Title>
                    <p ref={errorRef} className={errorMessage ? "errmsg" : "offscreen"}>{errorMessage}</p>
                    <div className="text-xl">
                        <TextInput
                            label="Name"
                            placeholder="John Doe"
                            ref={userRef}
                            autoComplete='off'
                            error={(!validName && user) && "Name can only contain letters"}
                            onChange={(e) => setUser(e.target.value)}
                            required
                            onFocus={() => setUserFocus(true)}
                            onBlur={() => setUserFocus(false)}
                        />
                        <TextInput
                            label="E-mail Address"
                            placeholder="john.doe@example.com"
                            autoComplete='off'
                            error={(!validEmail && email) && "Not a valid email"}
                            onChange={(e) => setEmail(e.target.value)}
                            required
                            onFocus={() => setEmailFocus(true)}
                            onBlur={() => setEmailFocus(false)}
                        />
                        <PasswordInput
                            label="Password"
                            placeholder="Pa$$w0rd123"
                            autoComplete='off'
                            error={(!validPassword && password) && "Must have min 8 characters and contain at least a lowercase character, uppercase character, digit, special character (@$!%*?&])"}
                            onChange={(e) => setPassword(e.target.value)}
                            required
                            onFocus={() => setPasswordFocus(true)}
                            onBlur={() => setPasswordFocus(false)}
                        />
                        <TextInput
                            label="Organization Name"
                            value={organization}
                            disabled
                            required

                        />
                        <TextInput
                            label="Headquaters Address"
                            value={address}
                            disabled
                            required

                        />
                    </div>
                    <div className="flex justify-center">
                        <Button variant="filled" size="xl" radius="lg" className="bg-[#FF3D2E]  hover:bg-btn_hover font-bold text-white mt-[50px]"
                            disabled={!validName || !validEmail || !validPassword}
                            onClick={handleSignUp}>
                            Sign Up
                        </Button>
                    </div>
                    <div className="text-lg flex items-center justify-between px-[5px] py-[50px]">
                        <Title order={4}>
                            Or if you already have an account:
                        </Title>
                        <Button variant="filled" size="lg" radius="lg" className="bg-[#FF3D2E]  hover:bg-btn_hover font-bold text-white"
                            onClick={handleLogIn}>
                            Log in
                        </Button>
                    </div>
                </Container>)}
        </div>
    )
}
