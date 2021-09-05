import React, {useRef, useState} from 'react';
import { Box, Stack, Heading, FormControl, InputGroup, Input, Button, Alert, AlertIcon, HStack, FormLabel, Center, Flex } from '@chakra-ui/react';
// import { Button, Card, Form, Container, Alert } from "react-bootstrap";
// import "bootstrap/dist/css/bootstrap.min.css";

import {useAuth} from "../context/AuthContext";
import { useHistory} from "react-router-dom";
import UserDataService from "../services/user-data";
import { Text } from '@chakra-ui/react';
import { useTranslation } from 'react-i18next';

export default function UpdateProfile(props) {
    const {t} = useTranslation();

    const firstNameRef = useRef();
    const lastNameRef = useRef();
    const passwordRef = useRef();
    const passwordConfirmRef = useRef();
    const [streetWithNrRef, zipRef, cityRef, countryRef] = [useRef(), useRef(), useRef(), useRef()];
    const {currentUser, updatePassword} = useAuth();
    const [error, setError] = useState("");
    const [loading, setLoading] = useState(false);
    const [file, setFile] = useState();
    const history = useHistory();

    async function deleteAccount() {
        let result = window.confirm(t("account-settings.delete.certain"));
        if (result) {
            try {
                await currentUser.delete();
                await UserDataService.deleteUser(props.user.uid);
                history.push("/");
            } catch (e) {
                console.log("Failed to delete user: ", e);
                if (e?.code === "auth/requires-recent-login") {
                    alert("Deleting user requires recent authentication. Log out and in and then try again.")
                }
            }
        }
    }

    const onChangePicture = e => {
        setFile(e.target.files[0]);
    }

    //TODO: add a validity check to only upload .jpg and .png images
    const fileUploadHandler = () => {
        let fd = new FormData();
        fd.append("image", file);
        return fd;
    }

    async function handleSubmit(e) {
        e.preventDefault();
        if (passwordRef.current.value !== passwordConfirmRef.current.value){
            return setError(t("account-settings.error.passw-match"));
        }
        try {
            setError("");
            setLoading(true);
            if (passwordRef.current.value){
                await updatePassword(passwordRef.current.value);
            } // Note: Later when there are multiple update options I should use Promises and only update if they all succeed (?)
            let change = false;
            const user = props.user;
            if (firstNameRef.current.value !== props.user.firstName) {
                user.firstName = firstNameRef.current.value;
                change = true;
            }
            if (lastNameRef.current.value !== props.user.lastName) {
                user.lastName = lastNameRef.current.value;
                change = true;
            }
            const userAddress = {streetWithNr: streetWithNrRef.current.value, zipcode: zipRef.current.value, city: cityRef.current.value, country: countryRef.current.value};
            if (userAddress !== props.user.address){
                user.address = userAddress;
                change = true;
            }
            if (change) {
                await UserDataService.updateUser({user: {...user, picture: null, inventory: []}});//maybe change that later so user gets passed directly in body
            }
            if (file){
                const fd = fileUploadHandler();
                const blob = new Blob([JSON.stringify({uid: props.user.uid})], {type: "application/json"});
                fd.append("parameters", blob);
                await UserDataService.uploadPicture(fd);
            }
            history.push(`/profile/${props.user._id}`);
        } catch(err) {
            setError(t("account-settings.error.general")); //TODO: sometimes you get bad request 400: credentials too old. Handle it better.
            console.log("Failed to update profile: ", err)
        }
        setLoading(false);
    }

    return(
        <Box
        alignItems="center"
        paddingTop={3}
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
                <Heading size="lg">{t("account-settings.heading")}</Heading>
                {error && <Alert status="error">
                    <AlertIcon />
                    {error}
                </Alert>}
                <Text>{t("account-settings.mail", {mail: props.user.mail})}</Text>
                <FormControl>
                    <FormLabel>Name</FormLabel>
                    <InputGroup>
                    <HStack>
                        <Input placeholder={t("account-settings.firstname")} ref={firstNameRef} defaultValue={props.user.firstName}/>
                        <Input placeholder={t("account-settings.lastname")} ref={lastNameRef} defaultValue={props.user.lastName}/>
                    </HStack>
                    </InputGroup>
                </FormControl>
                <FormControl>
                    <FormLabel>{t("account-settings.new-pw")}</FormLabel>
                    <InputGroup>
                    <Input
                        type="password"
                        placeholder={t("account-settings.leave-empty")}
                        ref={passwordRef}
                    />
                    </InputGroup>
                </FormControl>
                <FormControl>
                    <FormLabel>{t("account-settings.confirm-pw")}</FormLabel>
                    <InputGroup>
                    <Input
                        type="password"
                        placeholder={t("account-settings.leave-empty")}
                        ref={passwordConfirmRef}
                    />
                    </InputGroup>
                </FormControl>
                <Flex text-align="left">
                    <Text mt={4}>{t("address.head")}</Text>
                </Flex>
                <FormControl mt={3}>
                    <Input placeholder={t("address.street")} ref={streetWithNrRef} defaultValue={props.user.address?.streetWithNr}/>
                </FormControl>
                <FormControl mt={4}>
                    <HStack>
                        <Input placeholder={t("address.zip")} ref={zipRef} defaultValue={props.user.address?.zipcode}/>
                        <Input placeholder={t("address.city")} ref={cityRef} defaultValue={props.user.address?.city}/>
                    </HStack>
                </FormControl>
                <FormControl mt={4}>
                    <Input type="country" placeholder={t("address.country")} ref={countryRef} defaultValue={props.user.address?.country}/>
                </FormControl>
                <FormControl mt={4}>
                    <FormLabel htmlFor="files">{t("account-settings.upload-prof-pic")}</FormLabel>
                    <input type="file" id="files" name="files" accept="image/*" onChange={onChangePicture}/>
                </FormControl>
                <Button
                    disabled={loading}
                    type="submit"
                    variant="solid"
                    colorScheme="teal"
                    width="full"
                    onClick={handleSubmit}
                >
                    {t("account-settings.update")}
                </Button>
                </Stack>
                <Center><Button w="100%" marginTop={3} mx={4} onClick={deleteAccount} colorScheme="red">{t("account-settings.Delete Account")}</Button></Center>
            </Box>
        </Stack>
    </Box>
    );
}


