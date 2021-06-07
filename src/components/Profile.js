import React, {useState, useEffect} from 'react';
import {Link} from "react-router-dom";

import UserDataService from "../services/user-data";
//import ProductDataService from "../services/product-data";
import {useAuth} from "../context/AuthContext";

const Profile = props => {
    const initialUserState = {name: "", mail: "", inventory: []}; //later probably replace mail with email
    const [user, setUser] = useState(initialUserState);
    const [error, setError] = useState(""); //Later: replace error to redirect to 404 page
    const {currentUser} = useAuth();

    const getUser = async id => {
        try {
            const response = await UserDataService.get(id);
            setUser(response.data);
        } catch(e) {
            setError("Could not find that user.");
            console.log("Error in Profile.js - getUser: ", e);
        }
    }

    useEffect(() => {
        getUser(props.match.params.id);//user id (uid) in route
    }, [props.match.params.id]);

    return (
        <div>
            {error ? {error} : (
                <div>
                    <p>{user.name}</p>
                    <p>{user.mail}</p>
                    <p>This user has {user.inventory.length} items in his inventory.</p> {/*Later show items of inventory*/}
                    {(currentUser.uid === user.uid) && <Link to="/update-profile">Update Profile</Link>}
                </div>
            )}
        </div>
    )
}

export default Profile;
