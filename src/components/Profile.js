import React, {useState, useEffect} from 'react';
import {Link} from "react-router-dom";

import UserDataService from "../services/user-data";
import ReviewDataService from "../services/reviews-data";
//import ProductDataService from "../services/product-data";
import {useAuth} from "../context/AuthContext";
import AddReview from "./add-review";
import Review from "./Review";

const Profile = props => {
    const initialUserState = {name: "", mail: "", inventory: []}; //later probably replace mail with email
    const [user, setUser] = useState(initialUserState);
    const [reviews, setReviews] = useState([]);
    const [error, setError] = useState(""); //Later: replace error to redirect to 404 page
    const [openReview, setOpenReview] = useState(true); //later set default to false and make check in the beginning if a transaction between the users exist, but no review yet
    const {currentUser} = useAuth();

    useEffect(() => {
        const getUser = async id => {
            try {
                const response = await UserDataService.get(id);
                setUser(response.data);
            } catch(e) {
                setError("Could not find that user.");
                console.log("Error in Profile.js - getUser: ", e);
            }
        };
        const getReviews = async uid => {
            try {
                const response = await ReviewDataService.findByUser(uid);
                setReviews(response.data);
            } catch(e) {
                console.log("Error in Profile.js - getReviews: ", e);
            }
        };
        getUser(props.match.params.id);//user id (uid) in route
        getReviews(props.match.params.id);
    }, [props.match.params.id]);

    return (
        <div>
            {error ? {error} : (
                <div>
                    <p>{user.name}</p>
                    <p>{user.mail}</p>
                    <p>This user has {user.inventory.length} items in his inventory.</p> {/*Later show items of inventory*/}
                    {(currentUser.uid === user.uid) && <Link to="/update-profile">Update Profile</Link>}
                    <br/><br/>

                    {openReview && <AddReview posterId={currentUser.uid} ratedUserId={props.match.params.id}/>}
                    <h2>Reviews</h2>
                    {reviews.map(review => <Review review={review} currentUser={currentUser} key={review._id}/>)}
                </div>
            )}
        </div>
    )
}

export default Profile;
