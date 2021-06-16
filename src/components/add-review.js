import React, {useRef, useState} from "react";
import {Card, Form, Button, Alert} from "react-bootstrap";
import StarRatings from "react-star-ratings";

import ReviewDataService from "../services/reviews-data";

// The review form is to be integrated into the bottom of the profile page for now
const AddReview = props => {
    const [error, setError] = useState("");
    const [loading, setLoading] = useState(false);
    const [rating, setRating] = useState(4);
    const titleRef = useRef();
    const commentRef = useRef();

    const onChangeRating = newRating => {
        setRating(newRating);
    }

    async function handleSubmit(e) {
        e.preventDefault();
        try {
            setError("");
            setLoading(true);
            const review = {stars: rating, title: titleRef.current.value, comment: commentRef.current.value, posterId: props.posterId, ratedUserId: props.ratedUserId};
            await ReviewDataService.createReview(review);
        } catch(err) {
            setError("Failed to add review");
        }
        setLoading(false);
    }

    return (
        <Card>
            <Card.Body>
                <h2 className="text-center mb-4">Add Review</h2>
                {error && <Alert variant="danger">{error}</Alert>}
                <Form onSubmit={handleSubmit}>
                    <Form.Group id="rating" className="mb-2">
                        <Form.Label>Rating</Form.Label>
                        <br/>
                        <StarRatings rating={rating} changeRating={onChangeRating} starRatedColor="rgb(250,200,30)" starDimension="35px"/>
                    </Form.Group>
                    <Form.Group id="title">
                        <Form.Label>Title</Form.Label>
                        <Form.Control type="text" ref={titleRef} required />
                    </Form.Group>
                    <Form.Group id="comment">
                        <Form.Label>Comment</Form.Label>
                        <Form.Control type="text" ref={commentRef} />
                    </Form.Group>
                    <Button disabled={loading} className="w-100 mt-3" type="submit">
                        Submit
                    </Button>
                </Form>
            </Card.Body>
        </Card>
    );
}

export default AddReview;

