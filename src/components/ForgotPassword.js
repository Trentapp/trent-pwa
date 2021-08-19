import React, {useRef, useState} from 'react';
import { Button, Box, Stack, Heading, FormControl, InputGroup , Input, Text, HStack, Alert, AlertIcon} from '@chakra-ui/react';
import {useAuth} from "../context/AuthContext";
import {Link} from "react-router-dom";
import { useTranslation } from 'react-i18next';

export default function ForgotPassword() {
    const {t} = useTranslation();

    const emailRef = useRef();
    const {resetPassword} = useAuth();
    const [error, setError] = useState("");
    const [message, setMessage] = useState("");
    const [loading, setLoading] = useState(false);

    async function handleSubmit(e) {
        e.preventDefault();
        try {
            setMessage("");
            setError("");
            setLoading(true);
            await resetPassword(emailRef.current.value);
            setMessage("Change your Inbox for further instructions.")
        } catch(err) {
            setError("Failed to send reset password email");
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
                <Heading size="lg">{t("Reset Password")}</Heading>
                {error && <Alert status="error">
                    <AlertIcon />
                    {error}
                </Alert>}
                {message && <Alert status="success">
                    <AlertIcon />
                    {message}
                </Alert>}
                <FormControl>
                    <InputGroup>
                    <Input type="email" placeholder={t("login-placeholders.email address")} ref={emailRef} />
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
                    {t("Reset Password")}
                </Button>
                <Box>
                    <Link to="/login"><Text fontWeight="bold" color="blue.600">{t("login.Log In")}</Text></Link>
                </Box>
                </Stack>
            </Box>
            <HStack>
                <Text>{t("login.New to us? ")}</Text>
                <Link to="/signup">
                    <Text fontWeight="bold" color="blue.600">{t("login.Sign Up")}</Text>
                </Link>
            </HStack>
        </Stack>
    </Box>
    );
}

