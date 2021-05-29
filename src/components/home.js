import {useAuth} from "../context/AuthContext";

const HomePage = props => {
    const {currentUser} = useAuth();

    return(
        <div>
            <h1>Welcome to FairLeih! This is our beautiful homepage.</h1>
            {currentUser && <h3>You are logged in with email {currentUser.email}!</h3>}
        </div>
    );
};

export default HomePage;
