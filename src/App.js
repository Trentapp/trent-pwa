import React, { useState, useEffect } from "react";
import { Switch, Route, Link, useHistory } from "react-router-dom";
import "bootstrap/dist/css/bootstrap.min.css";
import { Button } from "react-bootstrap";

import HomePage from "./components/home";
import ProductsList from "./components/products-list";
import Product from "./components/product";
import AddProduct from "./components/add-product";
import SignUp from "./components/signup";
import LogIn from "./components/login";
import ForgotPassword from "./components/ForgotPassword";
import UpdateProfile from "./components/UpdateProfile";
import Profile from "./components/Profile";
import NotFound from "./components/NotFound";
import PrivateRoute from "./components/PrivateRoute";
import LoggedOutRoute from "./components/LoggedOutRoute";

import { useAuth } from "./context/AuthContext";
import UserDataService from "./services/user-data";

function App() {
  const { currentUser, logout } = useAuth();
  const history = useHistory();
  const [user, setUser] = useState({ name: "", address: { street: "", houseNumber: "", zipcode: "", city: "", country: "" } });

  async function handleLogout() {
    try {
      await logout();
      history.push("/");
    } catch (e) {
      console.log("Failed to log out");
    }
  }

  useEffect(() => {
    async function getUser() {
      try {
        const response = await UserDataService.get(currentUser.uid);
        setUser(response.data);
      } catch (err) {
        console.log("error trying to get user: ", err);
      }
    }
    if (currentUser){
      getUser();
    }
  }, [currentUser]);

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
        </div>
        <div className="navbar-nav ml-auto"> {/*somehow not aligning to the right, but I will care for that later*/}
          {user._id ? (
            <>
              <li className="nav-item">
                <Link to={"/inventory"} className="nav-link">
                  Inventory
                </Link>
              </li>
              <li className="nav-item">
                <Link to={"/products/create"} className="nav-link">
                  Add a product
                </Link>
              </li>
              <li className="nav-item">
                <Link to={`/profile/${user._id}`} className="nav-link">
                  Your Profile
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
            render={(props) => (<ProductsList {...props} inventory={false} />)} /> {/* I think it actually should not be rendered (just included as component), but it is just a test for now */}
          <PrivateRoute exact path="/inventory"
            component={ProductsList} inventory={true} user={user}/>
          <Route path="/products/product/:id"
            render={(props) => (<Product {...props} user={user}/>)} />
          <PrivateRoute exact path="/products/create"
            component={AddProduct} user={user}/>
          <PrivateRoute exact path="/products/update/:id"
            component={AddProduct} user={user}/>
          <LoggedOutRoute path="/signup" component={SignUp} user={user}/>
          <LoggedOutRoute path="/login" component={LogIn} user={user}/>
          <LoggedOutRoute path="/forgot-password" component={ForgotPassword} user={user}/>
          <Route path="/profile/:id"
            render={(props) => (<Profile {...props} user={user}/>)} />
          <PrivateRoute path="/update-profile" component={UpdateProfile} user={user}/>
          <Route path="*" component={NotFound} />
        </Switch>
      </div>
    </div>
  );
}

export default App;
