import React, {useRef, useState} from 'react';
// import { Button, Card, Form, Container, Alert } from "react-bootstrap";
import "bootstrap/dist/css/bootstrap.min.css";
import {useAuth} from "../context/AuthContext";
import {Link, useHistory} from "react-router-dom";
import { Box, Stack, Heading, FormControl, InputGroup, Input, Button, Alert, AlertIcon } from '@chakra-ui/react';

import UserDataService from "../services/user-data";

export default function Login() {
    const emailRef = useRef();
    const passwordRef = useRef();
    const {login} = useAuth();
    const [error, setError] = useState("");
    const [loading, setLoading] = useState(false);
    const history = useHistory();

    async function handleSubmit(e) {
        e.preventDefault();
        try {
            setError("");
            setLoading(true);
            await login(emailRef.current.value, passwordRef.current.value);
            history.push("/dashboard");
        } catch(err) {
            setError("Failed to sign in");
        }
        setLoading(false);
    }

    return(
    <Box
        alignItems="center"
        paddingTop={{base: "30px", md: "100px", lg: "150px"}}
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
                <Heading size="lg">Log In</Heading>
                {error && <Alert status="error">
                    <AlertIcon />
                    {error}
                </Alert>}
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
                <Button
                    borderRadius={0}
                    type="submit"
                    variant="solid"
                    colorScheme="teal"
                    width="full"
                    onClick={handleSubmit}
                    disabled={loading}
                >
                    Login
                </Button>
                <Box>
                    <Link to="forgot-password">Forgot password?</Link>
                </Box>
                </Stack>
            </Box>
            <Box>
                New to us?{" "}
                <Link to="/signup">
                Sign Up
                </Link>
            </Box>
        </Stack>
    </Box>
    );
}


// <Container className="d-flex align-items-center justify-content-center" style={{minHeight: "100vh"}}>
        //     <div className="w-100" style={{maxWidth: "400px"}}>
        //         <Card>
        //             <Card.Body>
        //                 <h2 className="text-center mb-4">Log In</h2>
        //                 {error && <Alert variant="danger">{error}</Alert>}
        //                 <Form onSubmit={handleSubmit}>
        //                     <Form.Group id="email">
        //                         <Form.Label>Email</Form.Label>
        //                         <Form.Control type="email" ref={emailRef} required />
        //                     </Form.Group>
        //                     <Form.Group id="password">
        //                         <Form.Label>Password</Form.Label>
        //                         <Form.Control type="password" ref={passwordRef} required />
        //                     </Form.Group>
        //                     <Button disabled={loading} className="w-100 mt-3" type="submit">
        //                         Log In
        //                     </Button>
        //                 </Form>
        //                 <div className="w-100 text-center mt-3">
        //                     <Link to="forgot-password">Forgot password?</Link>
        //                 </div>
        //             </Card.Body>
        //         </Card>
        //         <div className="w-100 text-center mt-2">
        //             No account yet? <Link to="/signup">Sign Up</Link> 
        //         </div>  
        //     </div>
        // </Container>

