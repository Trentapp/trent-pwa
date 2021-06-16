import React, {useState} from "react";
import {Card} from "react-bootstrap";
import StarRatings from "react-star-ratings";

import UserDataService from "../services/user-data";

const Review = props => {
    const [username, setUsername] = useState("");//maybe later also profile pic

    useEffect(() => {
        async function getUsername() {
            try {
                const user = await UserDataService.get(props.review.posterId);
                setUsername(user.name);
            } catch(e){
                console.log("Error in getUsername: ", e);
                setUsername("<user not found>");
            }
        }
        getUsername();
    }, []);

    return(
        <Card>
            <Card.Body>
                <StarRatings rating={props.review.stars} starRatedColor="rgb(250,200,30)" starDimension="28px" />
                <h3>{props.review.title}</h3>
                {props.review.comment && <p>{props.review.comment}</p>}
                <span>Posted by {username}</span>
            </Card.Body>
        </Card>
    )
}

export default Review;
