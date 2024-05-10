/* eslint-disable react/no-unescaped-entities */
/* eslint-disable no-unused-vars */
import { Container, Title, TextInput, PasswordInput, Button, Loader } from '@mantine/core';
import { useNavigate, useLocation, useParams } from 'react-router-dom';
import { useRef, useState, useEffect } from 'react';
import useAuth from '../../hooks/useAuth'
import axios from '../../api/axios';

const passwordRegex = /^(?=.*[a-z])(?=.*[A-Z])(?=.*\d)(?=.*[@$!%*?&])[A-Za-z\d@$!%*?&]{8,}$/;


export default function NewPassword() {

    const { setAuth } = useAuth();
    const navigate = useNavigate();
    const location = useLocation();
    const { ref_id } = useParams();
    const from = location.state?.from?.pathname || "/myskills";
    const [visible, setVisible] = useState(false);

    useEffect(() => {
        const checkToken = async (e) => {
            try {
                const response = await axios.get(`users/verify_password_reset_token?token=${ref_id}`,
                    {
                        headers: {
                            'Content-Type': 'application/json',
                            'Access-Control-Allow-Origin': '*',
                            'Access-Control-Allow-Credentials': 'true'
                        },
                        withCredentials: true
                    });
                console.log(response)
                setEmail(response?.data?.email);
            } catch (err) {
                if (!err?.response) {
                    setErrorMessage('No Server Response');
                } else if (err.response?.status === 401) {
                    navigate('/invalid');
                } else {
                    setErrorMessage('Reset Password Failed')
                }
                console.error(err);
            }
        };
        checkToken();
    }, [])

    const handleKeyPress = (e) => {
        if (e.key === 'Enter') {
            handleLogInWithNewPassword(e);
        }
    };

    const handleLogInWithNewPassword = async (e) => {
        setVisible(true);
        e.preventDefault();
        try {
            const response = await axios.put('users/reset_password',
                JSON.stringify({
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
    const [validPassword, setValidPassword] = useState(false);
    const [passwordFocus, setPasswordFocus] = useState(false);
    const [errorMessage, setErrorMessage] = useState('');

    useEffect(() => {
        setValidPassword(passwordRegex.test(password));
    }, [password])


    useEffect(() => {
        userRef.current.focus();
    }, []);

    useEffect(() => {
        setErrorMessage('');
    }, [password]);

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
                                required
                                disabled
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
                        </div>
                        <div className="flex justify-center">
                            <Button variant="filled" size="xl" radius="lg" className="bg-[#FF3D2E]  hover:bg-btn_hover text-white font-bold mt-[50px]"
                                disabled={!validPassword}
                                onClick={handleLogInWithNewPassword} >
                                Set new password
                            </Button>
                        </div>
                    </Container>)}
            </div>
        </>
    )
}
