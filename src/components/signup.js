import React, {useRef, useState} from 'react';
// import { Button, Card, Form, Container, Alert } from "react-bootstrap";
// import "bootstrap/dist/css/bootstrap.min.css";
import {useAuth} from "../context/AuthContext";
import {Link, useHistory} from "react-router-dom";
import { Box, Stack, Heading, FormControl, InputGroup, Input, Button, Alert, AlertIcon, HStack, Text } from '@chakra-ui/react';


import UserDataService from "../services/user-data";

export default function SignUp() {
    const firstNameRef = useRef();
    const lastNameRef = useRef();
    const emailRef = useRef();
    const passwordRef = useRef();
    const passwordConfirmRef = useRef();
    const {signup} = useAuth();
    const [error, setError] = useState("");
    const [loading, setLoading] = useState(false);
    const history = useHistory();

    async function handleSubmit(e) {
        e.preventDefault();
        if (passwordRef.current.value !== passwordConfirmRef.current.value){
            return setError("Passwords do not match");
        }
        try {
            setError(""); // I somehow get a warning "state update on unmounted component not possible". Maybe fix later.
            setLoading(true);
            const signupResponse = await signup(emailRef.current.value, passwordRef.current.value);
            console.log("firebase response: ", signupResponse);
            //firebase user.uid is correct, right? // probably change that below later (pass user directly as body)
            await UserDataService.createUser({user: {firstName: firstNameRef.current.value, lastName: lastNameRef.current.value, mail: emailRef.current.value, uid: signupResponse.user.uid}}) //use Promise.all() or so so that the firebase entry is not created if createUser fails (is that possible?)
            alert("Awesome! You are one of the first trent users - whoohoo!! As this is still a beta renting is not available yet. However we would really appreciate if you already posted some products and spread the word about trent. If you have questions or feedback we would love to hear from you at support@trentapp.com")
            history.push("/dashboard");
            window.location.reload();
        } catch(err) {
            setError("Failed to create an account");
            console.log("Failed to create account: ", err);
        }
        setLoading(false);
    }

    return(
        <Box
        alignItems="center"
        paddingTop={{base: "30px", md: "50px", lg: "80px"}}
    >
        <Stack
            flexDir="column"
            mb="2"
            justifyContent="center"
            alignItems="center"
            textAlign="center"
        >
            <Box minW={{ base: "300px", md: "468px" }} maxW="520px">
                <Stack
                spacing={4}
                p="1rem"
                backgroundColor="whiteAlpha.900"
                borderRadius="xl"
                boxShadow="md"
                border="1px"
                borderColor="gray.400"
                >
                <Heading size="lg">Sign Up</Heading>
                {error && <Alert status="error">
                    <AlertIcon />
                    {error}
                </Alert>}
                <FormControl>
                    <InputGroup>
                    <HStack>
                        <Input placeholder="First name" ref={firstNameRef}/>
                        <Input placeholder="Last name" ref={lastNameRef}/>
                    </HStack>
                    </InputGroup>
                </FormControl>
                <FormControl>
                    <InputGroup>
                    <Input type="email" placeholder="email address" ref={emailRef} />
                    </InputGroup>
                </FormControl>
                <FormControl>
                    <InputGroup>
                    <Input
                        type="password"
                        placeholder="password"
                        ref={passwordRef}
                    />
                    </InputGroup>
                </FormControl>
                <FormControl>
                    <InputGroup>
                    <Input
                        type="password"
                        placeholder="confirm password"
                        ref={passwordConfirmRef}
                    />
                    </InputGroup>
                </FormControl>
                <Text>By signing up you agree to our <a style={{color: "#2b6cb0"}} target="_blank" rel="noopener noreferrer" href="/AllgemeineNutzungsbedingungen.pdf">Terms and Conditions</a>.</Text>
                <Button
                    borderRadius={0}
                    type="submit"
                    variant="solid"
                    colorScheme="teal"
                    width="full"
                    onClick={handleSubmit}
                    disabled={loading}
                >
                    Sign Up
                </Button>
                </Stack>
            </Box>
            <HStack>
                <Text>Already have an account?{" "}</Text>
                <Link to="/login">
                    <Text fontWeight="bold" color="blue.600">Log In</Text>
                </Link>
            </HStack>
        </Stack>
    </Box>
    );
}
