import React, {useRef, useState} from 'react';
import { Button, Card, Form, Container, Alert } from "react-bootstrap";
import "bootstrap/dist/css/bootstrap.min.css";
import {useAuth} from "../context/AuthContext";
import {Link, useHistory} from "react-router-dom";

export default function UpdateProfile() {
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
            history.push("/");
        } catch(err) {
            setError("Failed to update profile."); //TODO: sometimes you get bad request 400: credentials too old. Handle it better.
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
                        <p>Your email: {currentUser.email}</p>
                        <Form onSubmit={handleSubmit}>
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

