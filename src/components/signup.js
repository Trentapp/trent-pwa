import React, {useRef, useState} from 'react';
// import { Button, Card, Form, Container, Alert } from "react-bootstrap";
// import "bootstrap/dist/css/bootstrap.min.css";
import {useAuth} from "../context/AuthContext";
import {Link, useHistory} from "react-router-dom";
import { Popover, InputRightElement, PopoverTrigger, PopoverContent, PopoverArrow, PopoverCloseButton, PopoverBody, Box, Stack, Heading, FormControl, InputGroup, Input, Button, Alert, AlertIcon, HStack, Text, Icon, Divider, useToast, IconButton, InputRightAddon, InputLeftAddon } from '@chakra-ui/react';
import { useTranslation } from 'react-i18next';
import { AiFillApple, AiOutlineGoogle } from "react-icons/ai";

import UserDataService from "../services/user-data";
import { QuestionIcon } from '@chakra-ui/icons';

export default function SignUp() {
    const {t} = useTranslation();
    const toast = useToast();

    const firstNameRef = useRef();
    const lastNameRef = useRef();
    const emailRef = useRef();
    const passwordRef = useRef();
    const passwordConfirmRef = useRef();
    const {signup, googleAuth, appleAuth} = useAuth();
    const [error, setError] = useState("");
    const [loading, setLoading] = useState(false);
    const history = useHistory();


    const signInGoogle = async () => {
        try {
            const res = await googleAuth();
            const response = await UserDataService.get(res.user.uid);
            if (!response.data) {
                await UserDataService.createUser({user: {name: res.user.displayName, mail: res.user.email, uid: res.user.uid}})
            }
            history.push("/account-settings");
            toast({title: "Registrierung Erfolgreich", description: "Bitte gib nun deine Adresse an. (Deine Adresse wird nicht öffentlich gezeigt.)", status: "success", duration: 8000, isClosable: true});
        } catch(e) {
            console.log("Google auth failed: ", e);
        }
    }

    const signInApple = async () => { // I'm not sure if sign in with apple works, I just hope it works like sign in with google
        try {
            const res = await appleAuth();
            console.log("Result from apple auth: ", res);
            const user = await UserDataService.get(res.user.uid);
            if (!user) {
                await UserDataService.createUser({user: {name: res.user.displayName, mail: res.user.email, uid: res.user.uid}})
            }
            history.push("/account-settings");
            toast({title: "Registrierung Erfolgreich", description: "Bitte gib nun deine Adresse an. (Deine Adresse wird nicht öffentlich gezeigt.)", status: "success", duration: 8000, isClosable: true});
        } catch(e) {
            console.log("Apple auth failed: ", e);
        }
    }

    async function handleSubmit(e) {
        e.preventDefault();
        if (passwordRef.current.value !== passwordConfirmRef.current.value){
            return setError("Passwords do not match");
        }
        try {
            setError(""); // I somehow get a warning "state update on unmounted component not possible". Maybe fix later.
            setLoading(true);
            let signupResponse = await signup(emailRef.current.value, passwordRef.current.value);
            await signupResponse.user.sendEmailVerification();
            //firebase user.uid is correct, right? // probably change that below later (pass user directly as body)
            await UserDataService.createUser({user: {firstName: firstNameRef.current.value, lastName: lastNameRef.current.value, mail: emailRef.current.value, uid: signupResponse.user.uid}}) //use Promise.all() or so so that the firebase entry is not created if createUser fails (is that possible?)
            //alert("Awesome! You are one of the first trent users - whoohoo!! Please enter your address and then your inventory. It would also be awesome if you share trent with your friend. And follow us on Instagram @gettrentapp! If you have questions or feedback we would love to hear from you at support@trentapp.com")
            history.push("/account-settings");
            toast({title: "Registrierung Erfolgreich", description: "Bitte gib nun deine Adresse an. (Deine Adresse wird nicht öffentlich gezeigt.)", status: "success", duration: 8000, isClosable: true});
            //window.location.reload();//sometimes does not work properly right away (does not get user fast enough)
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
                <Heading size="lg">{t("signup.Sign Up")}</Heading>
                {error && <Alert status="error">
                    <AlertIcon />
                    {error}
                </Alert>}
                <FormControl>
                    <InputGroup>
                    <HStack>
                        <Input placeholder={t("signup-placeholders.First name")} ref={firstNameRef}/>
                        <Input placeholder={t("signup-placeholders.Last name")} ref={lastNameRef}/>
                    </HStack>
                    </InputGroup>
                </FormControl>
                <FormControl>
                    <InputGroup>
                    <InputLeftAddon children="Deine Uni-Email:"/>
                    <Input type="email" placeholder={t("signup-placeholders.email address")} ref={emailRef} />
                    {/* maybe later improve by using a popover or so (probably with external target, because you cannot nest popover in InputGroup) (update: the problem was most likely that I used bootstrap Popover, not chakra) */}
                    </InputGroup>
                </FormControl>
                <FormControl>
                    <InputGroup>
                    <Input
                        type="password"
                        placeholder={t("signup-placeholders.password")}
                        ref={passwordRef}
                    />
                    </InputGroup>
                </FormControl>
                <FormControl>
                    <InputGroup>
                    <Input
                        type="password"
                        placeholder={t("signup-placeholders.confirm password")}
                        ref={passwordConfirmRef}
                    />
                    </InputGroup>
                </FormControl>
                <Text>{t("signup.By signing up you agree to our ")}<a style={{color: "#2b6cb0"}} target="_blank" rel="noopener noreferrer" href="/AllgemeineNutzungsbedingungen.pdf">{t("signup.Terms and Conditions")}</a> {t("signup.T&Cend")}.</Text>
                <Button
                    borderRadius={0}
                    type="submit"
                    variant="solid"
                    colorScheme="teal"
                    width="full"
                    onClick={handleSubmit}
                    disabled={loading}
                >
                    {t("signup.Sign Up")}
                </Button>
                <HStack>
                    <Divider colorScheme="gray.400" />
                    <Box minW="120px"><Text color="gray.400">or continue with</Text></Box>
                    <Divider colorScheme="gray.400" />
                </HStack>
                <HStack w="100%" alignItems="center" justifyContent="center">
                    <Button onClick={signInGoogle} w="48%"><Icon as={AiOutlineGoogle} /></Button>
                    <Button onClick={signInApple} w="48%"><Icon as={AiFillApple} /></Button>
                </HStack>
                </Stack>
            </Box>
            <HStack>
                <Text>{t("signup.Already have an account? ")}</Text>
                <Link to="/login">
                    <Text fontWeight="bold" color="blue.600">{t("signup.Log In")}</Text>
                </Link>
            </HStack>
        </Stack>
    </Box>
    );
}
