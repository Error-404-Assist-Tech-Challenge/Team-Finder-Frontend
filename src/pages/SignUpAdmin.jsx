/* eslint-disable no-unused-vars */
import React, { useRef, useState, useEffect} from 'react';
import { Container, Title, TextInput, PasswordInput, Button } from '@mantine/core';
import { useNavigate } from 'react-router-dom';
import { faCheck, faTimes, faInfoCircle } from '@fortawesome/free-solid-svg-icons';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';

const nameRegex = /^[A-Za-z]+(?:\s+[A-Za-z]+)*$/;
const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
const passwordRegex = /^(?=.*[a-z])(?=.*[A-Z])(?=.*\d)(?=.*[@$!%*?&])[A-Za-z\d@$!%*?&]{8,}$/;
const organizationRegex = /^[A-Za-z0-9\s\-.,&'()]+$/;
const addressRegex = /^[A-Za-z0-9\s\-.,&'()]+$/;

export default function SignUpAdminPage() {
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
    const [succes, setSucces] = useState(false)

    useEffect(() => {
        if (userRef.current) {
            userRef.current.focus();
        }
    }, [])

    useEffect (() => {
        const result = nameRegex.test(user);
        console.log(result);
        console.log(user);
        setValidName(result);
    }, [user])

    useEffect (() => {
        const result = emailRegex.test(email);
        console.log(result);
        console.log(email);
        setValidName(result);
    }, [email])

    useEffect (() => {
        const result = passwordRegex.test(password);
        console.log(result);
        console.log(password);
        setValidName(result);
    }, [password])

    useEffect (() => {
        const result = organizationRegex.test(organization);
        console.log(result);
        console.log(organization);
        setValidName(result);
    }, [organization])

    useEffect (() => {
        const result = addressRegex.test(organization);
        console.log(result);
        console.log(organization);
        setValidName(result);
    }, [organization])

    useEffect(() => {
        setErrorMessage('')
    }, [user, email, password, organization, address])


    const navigateTo = useNavigate();
    const handleLogIn = () => {
        navigateTo('/login');
    };
    const handleSignUp = () => {
        navigateTo('/myskills');
    };

    return (
        <div className="flex items-center justify-center min-h-screen min-w-full bg-[#272F32] text-[#272F32] select-none">
            <p ref={errorRef} className={errorMessage ? "errorMessage" : "offscreen"} aria-live="assertive">
                {errorMessage}
            </p>
            <Container className="bg-[#9DBDC6] h-[auto] w-[494px] rounded-[50px]">
                <Title order={1} className="text-5xl text-select-none text-center py-[50px]">
                Team Finder
                </Title>
                <div className="text-xl">
                    <TextInput
                        label="Name"
                        placeholder="John Doe"
                        ref={userRef}
                        autoComplete='off'
                        onChange={(e) => setUser(e.target.value)}
                        required
                        onFocus={() => setUserFocus(true)}
                        onBlur={() => setUserFocus}
                    />
                    <p></p>
                    <TextInput
                        label="E-mail Address"
                        placeholder="john.doe@example.com"
                    />
                    <PasswordInput
                        label="Password"
                        placeholder="Pa$$w0rd123"
                    />
                    <TextInput
                        label="Organization Name"
                        placeholder="ABC Corporation"
                    />
                    <TextInput
                        label="Headquaters Address"
                        placeholder="123 Main Street, Cityville, State, 12345"
                    />
                </div>
                <div className="flex justify-center">
                    <Button variant="filled" size="xl" radius="lg" className="bg-[#FF3D2E] mt-[50px]"
                            onClick={handleSignUp}>
                        Sign Up
                    </Button>
                </div>
                <div className="text-lg flex items-center justify-between px-[20px] py-[50px]">
                    <Title order={4}>
                        Or if you already have an account: 
                    </Title>
                    <Button variant="filled" size="lg" radius="lg" className="bg-[#FF3D2E]"
                            onClick={handleLogIn}>
                        Log in
                    </Button>
                </div>
            </Container>
        </div>
    )
}
