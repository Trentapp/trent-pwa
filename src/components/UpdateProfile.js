import React, {useEffect, useRef, useState} from 'react';
import { Button, Card, Form, Container, Alert } from "react-bootstrap";
import "bootstrap/dist/css/bootstrap.min.css";

import {useAuth} from "../context/AuthContext";
import {Link, useHistory} from "react-router-dom";
import UserDataService from "../services/user-data";

export default function UpdateProfile() {
    const [user, setUser] = useState({name: ""});
    const nameRef = useRef();
    const passwordRef = useRef();
    const passwordConfirmRef = useRef();
    const {currentUser, updatePassword} = useAuth();
    const [error, setError] = useState("");
    const [loading, setLoading] = useState(false);
    const history = useHistory();

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
            if (nameRef.current.value && nameRef.current.value !== user.name) {
                // update user is to be implemented in the backend
                console.log("that functionality does not work yet. You want to change your name to: ", nameRef.current.value);
            }
            history.push(`/profile/${currentUser.uid}`);
        } catch(err) {
            setError("Failed to update profile."); //TODO: sometimes you get bad request 400: credentials too old. Handle it better.
        }
        setLoading(false);
    }

    useEffect(() => {
        async function getUser() {
            try {
                const response = await UserDataService.get(currentUser.uid);
                setUser(response.data);
            } catch (err) {
                setError("Could not get current user data.");
                console.log("error trying to get user: ", err);
            }            
        }
        getUser();
    }, [currentUser.uid]);

    return(
        <Container className="d-flex align-items-center justify-content-center" style={{minHeight: "100vh"}}>
            <div className="w-100" style={{maxWidth: "400px"}}>
                <Card>
                    <Card.Body>
                        <h2 className="text-center mb-4">Update Profile</h2>
                        {error && <Alert variant="danger">{error}</Alert>}
                        <p>Your email: {currentUser.email}</p>
                        <Form onSubmit={handleSubmit}>
                            <Form.Group id="name">
                                <Form.Label>Name</Form.Label>
                                <Form.Control type="text" ref={nameRef} 
                                defaultValue={user.name}/>
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
                            <Button disabled={loading} className="w-100 mt-3" type="submit">
                                Update Profile
                            </Button>
                        </Form>
                    </Card.Body>
                </Card>
                <div className="w-100 text-center mt-2">
                    <Link to="/">Cancel</Link>
                </div> 
            </div>
        </Container>
    );
}

