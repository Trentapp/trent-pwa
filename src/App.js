import React, { useState, useEffect } from "react";
import { Switch, Route, useHistory } from "react-router-dom";
import "bootstrap/dist/css/bootstrap.min.css";
import "./css/styles.css";

import LandingPage from "./components/landing-page";
import Header from "./components/Header";
import Dashboard from "./components/dashboard";
import ProductsList from "./components/products-list";
import Product from "./components/product";
import AddProduct from "./components/add-product";
import SignUp from "./components/signup";
import LogIn from "./components/login";
import ForgotPassword from "./components/ForgotPassword";
import AccountSettings from "./components/AccountSettings";
import Profile from "./components/Profile";
import NotFound from "./components/NotFound";
import PrivateRoute from "./components/PrivateRoute";
import LoggedOutRoute from "./components/LoggedOutRoute";
import Chat from "./components/chat";
import Footer, { ProductsListFooter } from "./components/footer";
import About from "./components/about";
import Impressum from "./components/impressum";
import Datenschutz from "./components/datenschutz";

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
      window.location.reload();
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
    <>
    {window.location.pathname !== '/landing-page' && (window.location.pathname !== '/' || user._id) && <Header user={user} handleLogout={handleLogout}/>}
    <div className="wrapper flex-shrink-0">
      <Switch>
        <Route exact path="/products"
          render={(props) => (<ProductsList {...props} inventory={false} />)} /> {/* I think it actually should not be rendered (just included as component), but it is just a test for now */}
        <Route exact path={["/", "/landing-page"]} 
          render={(props) => (<LandingPage {...props} user={user} />)} />
        <Route exact path={["/dashboard"]} 
          render={(props) => (<Dashboard {...props} user={user} />)} />
        <Route exact path="/about" component={About} />
        <PrivateRoute exact path="/inventory"
          component={ProductsList} inventory={true} user={user}/>
        <Route path={["/products/product/:id", "/product/:id"]}
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
        <PrivateRoute path="/account-settings" component={AccountSettings} user={user}/>
        <PrivateRoute path="/chats/:id" component={Chat} user={user} />
        <Route path="/impressum" component={Impressum} />
        <Route path="/datenschutz" component={Datenschutz} />
        <Route path="*" component={NotFound} />
      </Switch>
      <div className="push"></div>
    </div>
    <footer className="footer">{window.location.pathname === "/products" ? <ProductsListFooter/> : <Footer />}</footer>
    </>
  );
}

export default App;
