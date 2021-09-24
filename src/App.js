import React, { useState, useEffect } from "react";
import { Switch, Route, useHistory, useLocation } from "react-router-dom";
import "./css/styles.css";
import { Box } from "@chakra-ui/react";

import LandingPage from "./components/landing-page";
import Header from "./components/Header";
import Dashboard from "./components/dashboard";
import SignUp from "./components/signup";
import LogIn from "./components/login";
import ForgotPassword from "./components/ForgotPassword";
import AccountSettings from "./components/AccountSettings";
import NotFound from "./components/NotFound";
import PrivateRoute from "./components/PrivateRoute";
import LoggedOutRoute from "./components/LoggedOutRoute";
import Chat from "./components/chat";
import Footer, { ProductsListFooter } from "./components/footer";
import Inventory from "./components/Inventory";
// import About from "./components/about";
import Impressum from "./components/impressum";
import Datenschutz from "./components/datenschutz";
import CreatePost from "./components/createPost";

import { useAuth } from "./context/AuthContext";
import UserDataService from "./services/user-data";
import ChatsList from "./components/ChatsList";
import TransactionList from "./components/TransactionList";
import FeedbackButton from "./components/FeedbackButton";

function App() {

  const { currentUser, logout } = useAuth();
  const history = useHistory();
  const [user, setUser] = useState({ name: "", address: { street: "", houseNumber: "", zipcode: "", city: "", country: "" } });
  const location = useLocation();

  async function handleLogout() {
    try {
      await logout();
      history.push("/landing-page");
      window.location.reload();
    } catch (e) {
      console.log("Failed to log out");
    }
  }

  useEffect(() => {
    async function getUser() {
      try {
        const response = await UserDataService.get(currentUser.uid);
        if (user){
          setUser(response.data);
        }
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
    <Box className="wrapper flex-shrink-0">
    {location.pathname !== '/landing-page' && (location.pathname !== '/' || user?._id) && <FeedbackButton />}
    <Header user={user} handleLogout={handleLogout}/>
      <Box>
        <Switch>
          <Route exact path={["/", "/landing-page"]} 
            render={(props) => (<LandingPage {...props} user={user} />)} />
          <Route exact path={["/dashboard"]} 
            render={(props) => (<Dashboard {...props} user={user} />)} />
          <PrivateRoute path="/inventory" component={Inventory} user={user} />
          <PrivateRoute path="/borrow" component={CreatePost} user={user} />
          <PrivateRoute path="/editPost/:id" component={CreatePost} user={user} />
          <LoggedOutRoute path="/signup" component={SignUp} user={user}/>
          <LoggedOutRoute path="/login" component={LogIn} user={user}/>
          <LoggedOutRoute path="/forgot-password" component={ForgotPassword} user={user}/>
          <PrivateRoute path="/account-settings" component={AccountSettings} user={user}/>
          <PrivateRoute exact path="/chats" component={ChatsList} user={user}/>
          <PrivateRoute path="/chats/:id" component={Chat} user={user} />
          <PrivateRoute path="/transactions" component={TransactionList} user={user} />
          <Route path="/impressum" component={Impressum} />
          <Route path="/datenschutz" component={Datenschutz} />
          <Route path="*" component={NotFound} />
        </Switch>
        <Box className="push"></Box>
        </Box>
    </Box>
    <footer key={location.pathname} className="footer">{location.pathname === "/products" ? <ProductsListFooter/> : <Footer />}</footer>
    </>
  );
}

export default App;
