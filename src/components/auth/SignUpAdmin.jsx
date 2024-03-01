/* eslint-disable no-unused-vars */
import React, { useRef, useState, useEffect } from 'react';
import { Container, Title, TextInput, PasswordInput, Button } from '@mantine/core';
import { useNavigate } from 'react-router-dom';
import axios from '../../api/axios';
import useAuth from '../../hooks/useAuth'

const nameRegex = /^[A-Za-z]+(?:\s+[A-Za-z]+)*$/;
const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@.]+$/;
const passwordRegex = /^(?=.*[a-z])(?=.*[A-Z])(?=.*\d)(?=.*[@$!%*?&])[A-Za-z\d@$!%*?&]{8,}$/;
const organizationRegex = /^[A-Za-z0-9\s\-.,&'()]+$/;
const addressRegex = /^[A-Za-z0-9\s\-.,&'()]+$/;

export default function SignUpAdminPage() {

    const { setAuth } = useAuth();

    const navigateTo = useNavigate();
    const handleLogIn = () => {
        navigateTo('/login');
    };
    const handleSignUp = async (e) => {
        e.preventDefault();

        try {
            const response = await axios.post('/users/admin',
                JSON.stringify({
                    name: user,
                    email: email,
                    password: password,
                    org_name: organization,
                    hq_address: address,
                }),
                {
                    headers: {
                        'Content-Type': 'application/json',
                        'Access-Control-Allow-Origin': '*',
                        'Access-Control-Allow-Credentials': 'true'
                    },
                    withCredentials: true
                });

            console.log('Your token is:', response.data.access_token);

            const name = response?.data?.name;
            const accessToken = response?.data?.access_token;
            const organization = response?.data?.org_name;
            const address = response?.data?.hq_address;
            const roles = [...response.data.roles];

            console.log('Your access token is:', accessToken);

            setAuth({ name, email, organization, address, roles, accessToken })
            
            navigateTo('/myskills');
        } catch (err) {
            if (!err?.response) {
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
    const [validOrganization, setValidOrganization] = useState(false);
    const [organizationFocus, setOrganizationFocus] = useState(false);
    const [address, setAddress] = useState('');
    const [validAddress, setValidAddress] = useState(false);
    const [addressFocus, setAddressFocus] = useState(false);

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
        setValidOrganization(organizationRegex.test(organization));
    }, [organization])

    useEffect(() => {
        setValidAddress(addressRegex.test(address));
    }, [address])

    useEffect(() => {
        setErrorMessage('');
    }, [user, email, password, organization, address])

    return (
        <div className="flex items-center justify-center min-h-screen min-w-full bg-[#272F32] text-[#272F32] select-none">
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
                        placeholder="ABC Corporation"
                        autoComplete='off'
                        error={(!validOrganization && organization) && "Organization Name can only contain letters, digits and certain punctuation"}
                        onChange={(e) => setOrganization(e.target.value)}
                        required
                        onFocus={() => setOrganizationFocus(true)}
                        onBlur={() => setOrganizationFocus(false)}
                    />
                    <TextInput
                        label="Headquaters Address"
                        placeholder="123 Main Street, Cityville, State, 12345"
                        autoComplete='off'
                        error={(!validAddress && address) && "Headquaters Address can only contain letters, digits and certain punctuation"}
                        onChange={(e) => setAddress(e.target.value)}
                        required
                        onFocus={() => setAddressFocus(true)}
                        onBlur={() => setAddressFocus(false)}
                    />
                </div>
                <div className="flex justify-center">
                    <Button variant="filled" size="xl" radius="lg" className="bg-[#FF3D2E]  hover:bg-btn_hover font-bold text-white mt-[50px]"
                        disabled={!validName || !validAddress || !validPassword || !validOrganization || !validAddress}
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
            </Container>
        </div>
    )
}
