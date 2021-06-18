import React, {useState, useEffect} from "react";
import {Card} from "react-bootstrap";
import StarRatings from "react-star-ratings";

import UserDataService from "../services/user-data";
import ReviewDataService from "../services/reviews-data";

const Review = props => {
    const [username, setUsername] = useState("");//maybe later also profile pic

    const deleteReview = async () => {
        try {
            await ReviewDataService.deleteReview(props.review._id);
            window.location.reload();
        } catch(e) {
            console.log("Failed to delete review: ", e);
        }
    };

    useEffect(() => {
        async function getUsername() {
            try {
                const response = await UserDataService.get(props.review.posterId);
                setUsername(response.data.name);
            } catch(e){
                console.log("Error in getUsername: ", e);
                setUsername("<user not found>");
            }
        }
        getUsername();
    }, [props.review.posterId]);

    return(
        <Card>
            <Card.Body>
                <StarRatings rating={props.review.stars} starRatedColor="rgb(250,200,30)" starDimension="28px" />
                <h3>{props.review.title}</h3>
                {props.review.comment && <p>{props.review.comment}</p>}
                <span>Posted by {username}</span>
                {props.currentUser.uid === props.review.posterId && (<>
                    <p>Edit Review</p>
                    <button type="button" className="btn btn-danger" onClick={deleteReview}>Delete Review</button>
                </>)}
            </Card.Body>
        </Card>
    )
}

export default Review;
