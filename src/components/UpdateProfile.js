import React, {useRef, useState} from 'react';
import { Button, Card, Form, Container, Alert } from "react-bootstrap";
import "bootstrap/dist/css/bootstrap.min.css";

import {useAuth} from "../context/AuthContext";
import {Link, useHistory} from "react-router-dom";
import UserDataService from "../services/user-data";

export default function UpdateProfile(props) {
    const nameRef = useRef();
    const passwordRef = useRef();
    const passwordConfirmRef = useRef();
    const [streetRef, houseNrRef, zipRef, cityRef, countryRef] = [useRef(), useRef(), useRef(), useRef(), useRef()];
    const {currentUser, updatePassword} = useAuth();
    const [error, setError] = useState("");
    const [loading, setLoading] = useState(false);
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
            if (nameRef.current.value && nameRef.current.value !== user.name) {
                user.name = nameRef.current.value;
                change = true;
            }
            const userAddress = {street: streetRef.current.value, houseNumber: houseNrRef.current.value, zipcode: zipRef.current.value, city: cityRef.current.value, country: countryRef.current.value};
            if (userAddress !== props.user.address){
                user.address = userAddress;
                change = true;
            }
            if (change) {
                await UserDataService.updateUser({user: user});//maybe change that later so user gets passed directly in body
            }
            history.push(`/profile/${props.user._id}`);
        } catch(err) {
            setError("Failed to update profile."); //TODO: sometimes you get bad request 400: credentials too old. Handle it better.
            console.log("Failed to update profile: ", err)
        }
        setLoading(false);
    }

    return(
        <Container className="d-flex align-items-center justify-content-center" style={{minHeight: "100vh"}}>
            <div className="w-100" style={{maxWidth: "400px"}}>
                <Card>
                    <Card.Body>
                        <h2 className="text-center mb-4">Update Profile</h2>
                        {error && <Alert variant="danger">{error}</Alert>}
                        <p>Your email: {props.user.mail}</p>
                        <Form onSubmit={handleSubmit}>
                            <Form.Group id="name">
                                <Form.Label>Name</Form.Label>
                                <Form.Control type="text" ref={nameRef} 
                                defaultValue={props.user.name}/>
                            </Form.Group>
                            <Form.Group id="password">
                                <Form.Label>Password</Form.Label>
                                <Form.Control type="password" ref={passwordRef} 
                                placeholder="Leave blank to leave the same"/>
                            </Form.Group>
                            <Form.Group id="password-confirm">
                                <Form.Label>Confirm Password</Form.Label>
                                <Form.Control type="password" ref={passwordConfirmRef} 
                                placeholder="Leave blank to leave the same"/>
                            </Form.Group>
                            <br/>
                            <Form.Label>Address</Form.Label>
                            <Form.Group id="address">
                                <Form.Label>Street</Form.Label>
                                <Form.Control type="text" ref={streetRef} 
                                defaultValue={props.user.address ? props.user.address.street : ""}/>
                                <Form.Label>House Number</Form.Label>
                                <Form.Control type="text" ref={houseNrRef} 
                                defaultValue={props.user.address ? props.user.address.houseNumber : ""}/>
                                <Form.Label>Zipcode</Form.Label>
                                <Form.Control type="text" ref={zipRef} 
                                defaultValue={props.user.address ? props.user.address.zipcode : ""}/>
                                <Form.Label>City</Form.Label>
                                <Form.Control type="text" ref={cityRef} 
                                defaultValue={props.user.address ? props.user.address.city : ""}/>
                                <Form.Label>Country</Form.Label>
                                <Form.Control type="text" ref={countryRef} 
                                defaultValue={props.user.address ? props.user.address.country : ""}/>
                            </Form.Group>
                            <Button disabled={loading} className="w-100 mt-3" type="submit">
                                Update Profile
                            </Button>
                        </Form>
                    </Card.Body>
                </Card>
                <div className="d-flex justify-content-center align-items-center">
                    <button type="button" className="btn btn-danger text-center mt-2" onClick={deleteAccount}>Delete this account</button>
                </div>
                <div className="w-100 text-center mt-2 mb-5">
                    <Link to="/">Cancel</Link>
                </div> 
            </div>
        </Container>
    );
}

