import React from "react";
import {Switch, Route, Link} from "react-router-dom";
import "bootstrap/dist/css/bootstrap.min.css";
import {Button} from "react-bootstrap";

import HomePage from "./components/home";
import ProductsList from "./components/products-list";
import Product from "./components/product";
import AddProduct from "./components/add-product";
import SignUp from "./components/signup";
import LogIn from "./components/login";
import ForgotPassword from "./components/ForgotPassword";
import UpdateProfile from "./components/UpdateProfile";
import Profile from "./components/Profile";

import PrivateRoute from "./components/PrivateRoute"; // not used or tested yet, but useful for when we create a profile page later
import { useAuth } from "./context/AuthContext";

function App() {
  const {currentUser, logout} = useAuth();

  async function handleLogout() {
    try {
      await logout();
    } catch(e) {
      console.log("Failed to log out");
    }
  }

  return (
    <div>
      <nav className="navbar navbar-expand navbar-dark bg-dark">
        <Link to={"/"} className="navbar-brand">
          FairLeih
        </Link> 
        <div className="navbar-nav mr-auto">
          <li className="nav-item">
            <Link to={"/products"} className="nav-link">
              Search Products
            </Link>
          </li>
          <li className="nav-item">
            <Link to={"/products/create"} className="nav-link">
              Add a product
            </Link>
          </li>
        </div>
        <div className="navbar-nav ml-auto"> {/*somehow not aligning to the right, but I will care for that later*/}
          {currentUser ? (
            <>
              <li className="nav-item">
                <Link to={`/profile/${currentUser.id}`} className="nav-link">
                  Profile
                </Link> {/* Somehow this does not align correctly, but I should not care about it now, because I will probably change it anyway*/}
              </li>
              <li className="nav-item">
                <Button variant="link" className="nav-link" onClick={handleLogout}>
                  Log Out
                </Button>
              </li>
            </>
          ) : (
            <>
              <li className="nav-item">
                <Link to={"/signup"} className="nav-link">
                  Sign Up
                </Link>
              </li>
              <li className="nav-item">
                <Link to={"/login"} className="nav-link">
                  Log In
                </Link>
              </li>
            </>
          )}
        </div>
      </nav>

      <div className="container mt-3">
        <Switch>
          <Route exact path="/" component={HomePage} />
          <Route exact path="/products"
            render={(props) => (<ProductsList {...props}/>)} /> {/* I think it actually should not be rendered (just included as component), but it is just a test for now */}
          <Route path="/products/product/:id"
            render={(props) => (<Product {...props} />)} />
          <Route exact path="/products/create"
            render={(props) => (<AddProduct {...props} />)} />
          <Route exact path="/products/update/:id"
            render={(props) => (<AddProduct {...props} productIdToUpdate={props.match.params.id} />)} />
          <Route path="/signup" component={SignUp} />
          <Route path="/login" component={LogIn} />
          <Route path="/forgot-password" component={ForgotPassword} />
          <Route path="/profile/:id"
            render={(props) => (<Profile {...props} />)} />
          <PrivateRoute path="/update-profile" component={UpdateProfile} />
        </Switch>
      </div>
    </div>
  );
}

export default App;
