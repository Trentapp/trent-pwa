import React from 'react';
import {Link} from "react-router-dom";

const Profile = props => {
    // use props.match.params.id to access user id
    return (
        <div>
            <p>This will become the profile page.</p>
            <Link to="/update-profile">Update Profile</Link> {/*only show this when currentUser.Id = userId (from Profile)*/}
        </div>
    )
}

export default Profile;
