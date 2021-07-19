import React, {useState} from "react";
import {Card} from "react-bootstrap";
import StarRatings from "react-star-ratings";

import ReviewDataService from "../services/reviews-data";
import AddReview from "./add-review";

const Review = props => {
    const [editMode, setEditMode] = useState(false);

    const deleteReview = async () => {
        try {
            await ReviewDataService.deleteReview(props.review._id, props.user.uid);
            window.location.reload();
        } catch(e) {
            console.log("Failed to delete review: ", e);
        }
    };

    const onEdit = () => {
        setEditMode(true);
    }

    return(
        <>
        {editMode ? (
            <AddReview review={props.review} user={props.user}/>
        ) : (
            <Card>
                <Card.Body>
                    <StarRatings rating={props.review.stars} starRatedColor="rgb(250,200,30)" starDimension="28px" />
                    <h3>{props.review.title}</h3>
                    {props.review.comment && <p>{props.review.comment}</p>}
                    <span>Posted by {props.review.poster.name}</span>
                    {props.user._id === props.review.poster._id && (<>
                        <br/><br/>
                        <button type="button" className="btn btn-primary" onClick={onEdit}>Edit Review</button><br/><br/>
                        <button type="button" className="btn btn-danger" onClick={deleteReview}>Delete Review</button>
                    </>)}
                </Card.Body>
            </Card>
        )}
        </>
    )
}

export default Review;
