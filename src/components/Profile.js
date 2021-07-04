import React, {useState, useEffect} from 'react';
import {Link} from "react-router-dom";
import StarRatings from "react-star-ratings";

import UserDataService from "../services/user-data";
import ReviewDataService from "../services/reviews-data";
import TransactionDataService from "../services/transaction-data";
import AddReview from "./add-review";
import Review from "./Review";

const Profile = props => {
    const initialUserState = {name: "", mail: "", inventory: []}; //later probably replace mail with email
    const [profileUser, setProfileUser] = useState(initialUserState);
    const [reviews, setReviews] = useState([]);
    const [error, setError] = useState(""); //Later: replace error to redirect to 404 page
    const [openReview, setOpenReview] = useState(false); //later set default to false and make check in the beginning if a transaction between the users exist, but no review yet

    useEffect(() => {
        const getUser = async id => {
            try {
                const response = await UserDataService.getProfile(id);
                setProfileUser(response.data);
            } catch(e) {
                setError("Could not find that user.");
                console.log("Error in Profile.js - getUser: ", e);
            }
        };
        const getReviews = async id => {
            try {
                const response = await ReviewDataService.findByUser(id);
                setReviews(response.data);
            } catch(e) {
                console.log("Error in Profile.js - getReviews: ", e);
            }
        };
        const checkIfOpenReview = async (userId, profileUserId) => { //this section is not well tested yet. It decide when a user is allowed to leave a review for the profileUser
            try {
                const response = await ReviewDataService.findByUser(profileUserId);
                const revs = response.data;
                const revsOfUser = revs.filter(rev => rev.posterId === props.user._id);
                if (revsOfUser.length === 0){
                    const pastTransactions = await TransactionDataService.findPastTransactions(profileUserId);
                    const acceptedTransactionsWithUser = pastTransactions.filter(transaction => (transaction.granted === 2 && (transaction.borrower._id === props.user._id || transaction.lender._id === props.user._id)));
                    if (acceptedTransactionsWithUser.length >= 1) {
                        setOpenReview(true);
                    }
                }
            } catch(e) {
                console.log("Error in Profile.js - checkOpenReview: ", e);
            }
        }
        getUser(props.match.params.id);//_id of user in route
        getReviews(props.match.params.id);
        if (props.user._id){
            checkIfOpenReview(props.user._id, props.match.params.id);
        }
    }, [props.match.params.id, props.user._id]);

    return (
        <div>
            {error ? error : (
                <div>
                    <p>{profileUser.name}</p>
                    <p>{profileUser.mail}</p>
                    {profileUser.rating && <p>Rating: {profileUser.rating}: <StarRatings rating={profileUser.rating} starRatedColor="rgb(250,200,30)" starDimension="28px" />
                    </p>}
                    <p>This user has {profileUser.inventory.length} items in his inventory.</p> {/*Later show items of inventory*/}
                    {(props.user._id === profileUser._id) && <Link to="/update-profile">Update Profile</Link>}
                    <br/><br/>

                    {openReview && <AddReview ratedUserId={props.match.params.id} user={props.user}/>}
                    <h2>Reviews</h2>
                    {reviews.map(review => <Review review={review} user={props.user} key={review._id}/>)}
                </div>
            )}
        </div>
    )
}

export default Profile;
