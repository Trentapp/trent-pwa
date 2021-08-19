import React, {useRef, useState} from 'react';
import { useTranslation } from 'react-i18next';

import {useAuth} from "../context/AuthContext";
import {Link, useHistory} from "react-router-dom";
import { Box, Stack, Heading, FormControl, InputGroup, Input, Button, Alert, AlertIcon, Text, HStack } from '@chakra-ui/react';


export default function Login() {
    const {t, i18n} = useTranslation();

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
                <Heading size="lg">{t("login.Log In")}</Heading>
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
                    {t("login.Login")}
                </Button>
                <Box>
                    <Link to="forgot-password">Forgot password?</Link>
                </Box>
                </Stack>
            </Box>
            <HStack>
                <Text>New to us?{" "}</Text>
                <Link to="/signup">
                    <Text fontWeight="bold" color="blue.600">{t("login.Sign Up")}</Text>
                </Link>
            </HStack>
        </Stack>
    </Box>
    );
}

