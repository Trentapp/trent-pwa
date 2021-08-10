import React, {useRef, useState} from 'react';
import { Box, Stack, Heading, FormControl, InputGroup, Input, Button, FormHelperText, Alert, AlertIcon, HStack, FormLabel } from '@chakra-ui/react';
// import { Button, Card, Form, Container, Alert } from "react-bootstrap";
// import "bootstrap/dist/css/bootstrap.min.css";

import {useAuth} from "../context/AuthContext";
import {Link, useHistory} from "react-router-dom";
import UserDataService from "../services/user-data";
import { Text } from '@chakra-ui/react';

export default function UpdateProfile(props) {
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
        let result = window.confirm("Are you sure you want to delete this account?");
        if (result) {
            try {
                await UserDataService.deleteUser(props.user.uid);
                await currentUser.delete();
                history.push("/");
            } catch (e) {
                console.log("Failed to delete user: ", e);
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
            return setError("Passwords do not match");
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
                await UserDataService.updateUser({user: user});//maybe change that later so user gets passed directly in body
            }
            if (file){
                const fd = fileUploadHandler();
                const blob = new Blob([JSON.stringify({uid: props.user.uid})], {type: "application/json"});
                fd.append("parameters", blob);
                console.log(file, fd);
                await UserDataService.uploadPicture(fd);
            }
            history.push(`/profile/${props.user._id}`);
        } catch(err) {
            setError("Failed to update profile."); //TODO: sometimes you get bad request 400: credentials too old. Handle it better.
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
                <Heading size="lg">Account Settings</Heading>
                {error && <Alert status="error">
                    <AlertIcon />
                    {error}
                </Alert>}
                <Text>Your Email: {props.user.mail}</Text>
                <FormControl>
                    <FormLabel>Name</FormLabel>
                    <InputGroup>
                    <HStack>
                        <Input placeholder="First name" ref={firstNameRef} defaultValue={props.user.firstName}/>
                        <Input placeholder="Last name" ref={lastNameRef} defaultValue={props.user.lastName}/>
                    </HStack>
                    </InputGroup>
                </FormControl>
                <FormControl>
                    <FormLabel>New Password</FormLabel>
                    <InputGroup>
                    <Input
                        type="password"
                        placeholder="leave empty to leave the same"
                        ref={passwordRef}
                    />
                    </InputGroup>
                </FormControl>
                <FormControl>
                    <FormLabel>Confirm New Password</FormLabel>
                    <InputGroup>
                    <Input
                        type="password"
                        placeholder="leave empty to leave the same"
                        ref={passwordConfirmRef}
                    />
                    </InputGroup>
                </FormControl>
                <Box>
                    <Text mt={5}>Address</Text>
                </Box>
                <FormControl mt={4}>
                    <Input placeholder="Street and house number" ref={streetWithNrRef} defaultValue={props.user.address?.streetWithNr}/>
                </FormControl>
                <FormControl mt={4}>
                    <HStack>
                        <Input placeholder="Zipcode" ref={zipRef} defaultValue={props.user.address?.zipcode}/>
                        <Input placeholder="City" ref={cityRef} defaultValue={props.user.address?.city}/>
                    </HStack>
                </FormControl>
                <FormControl mt={4}>
                    <Input type="country" placeholder="Country" ref={countryRef} defaultValue={props.user.address?.country}/>
                </FormControl>
                <FormControl mt={4}>
                    <FormLabel htmlFor="files">Upload profile picture</FormLabel>
                    <input type="file" id="files" name="files" accept="image/*" onChange={onChangePicture}/>
                </FormControl>
                <Button
                    borderRadius={0}
                    type="submit"
                    variant="solid"
                    colorScheme="teal"
                    width="full"
                    onClick={handleSubmit}
                >
                    Update Profile
                </Button>
                </Stack>
            </Box>
        </Stack>
    </Box>
    );
}


        // <Container className="d-flex align-items-center justify-content-center" style={{minHeight: "100vh"}}>
        //     <div className="w-100" style={{maxWidth: "400px"}}>
        //         <Card>
        //             <Card.Body>
        //                 <h2 className="text-center mb-4">Update Profile</h2>
        //                 {error && <Alert variant="danger">{error}</Alert>}
        //                 <p>Your email: {props.user.mail}</p>
        //                 <Form onSubmit={handleSubmit}>
        //                     <Form.Group id="name">
        //                         <Form.Label>Name</Form.Label>
        //                         <Form.Control type="text" ref={nameRef} 
        //                         defaultValue={props.user.name}/>
        //                     </Form.Group>
        //                     <Form.Group id="password">
        //                         <Form.Label>Password</Form.Label>
        //                         <Form.Control type="password" ref={passwordRef} 
        //                         placeholder="Leave blank to leave the same"/>
        //                     </Form.Group>
        //                     <Form.Group id="password-confirm">
        //                         <Form.Label>Confirm Password</Form.Label>
        //                         <Form.Control type="password" ref={passwordConfirmRef} 
        //                         placeholder="Leave blank to leave the same"/>
        //                     </Form.Group>
        //                     <br/>
        //                     <Form.Label>Address</Form.Label>
        //                     <Form.Group id="address">
        //                         <Form.Label>Street</Form.Label>
        //                         <Form.Control type="text" ref={streetRef} 
        //                         defaultValue={props.user.address ? props.user.address.street : ""}/>
        //                         <Form.Label>House Number</Form.Label>
        //                         <Form.Control type="text" ref={houseNrRef} 
        //                         defaultValue={props.user.address ? props.user.address.houseNumber : ""}/>
        //                         <Form.Label>Zipcode</Form.Label>
        //                         <Form.Control type="text" ref={zipRef} 
        //                         defaultValue={props.user.address ? props.user.address.zipcode : ""}/>
        //                         <Form.Label>City</Form.Label>
        //                         <Form.Control type="text" ref={cityRef} 
        //                         defaultValue={props.user.address ? props.user.address.city : ""}/>
        //                         <Form.Label>Country</Form.Label>
        //                         <Form.Control type="text" ref={countryRef} 
        //                         defaultValue={props.user.address ? props.user.address.country : ""}/>
        //                     </Form.Group>
        //                     <label htmlFor="files">Upload profile picture:</label><br/>
        //                     <input type="file" id="files" name="files" accept="image/*" onChange={onChangePicture}/><br/>
        //                     <Button disabled={loading} className="w-100 mt-3" type="submit">
        //                         Update Profile
        //                     </Button>
        //                 </Form>
        //             </Card.Body>
        //         </Card>
        //         <div className="d-flex justify-content-center align-items-center">
        //             <button type="button" className="btn btn-danger text-center mt-2" onClick={deleteAccount}>Delete this account</button>
        //         </div>
        //         <div className="w-100 text-center mt-2 mb-5">
        //             <Link to="/">Cancel</Link>
        //         </div> 
        //     </div>
        // </Container>
