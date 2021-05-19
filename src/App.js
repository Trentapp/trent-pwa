import React from "react";
import {Switch, Route, Link} from "react-router-dom";
import './App.css';
import "bootstrap/dist/css/bootstrap.min.css";

import HomePage from "./components/home";
import ProductsList from "./components/products-list";

function App() {
  return (
    <div>
      <nav className="navbar navbar-expand navbar-dark bg-dark">
        <a href="/" className="navbar-brand">
          FairLeih
        </a> {/* If I leave a homepage, that is not a separate landing page, I should replace the <a>-Link with <Link> for faster loading */}
        <div className="navbar-nav mr-auto">
          <li className="nav-item">
            <Link to={"/products"} className="nav-link">
              Search Products
            </Link>
          </li>
        </div>
      </nav>

      <div className="container mt-3">
        <Switch>
          <Route exact path="/" component={HomePage} />
          <Route path="/products"
            render={(props) => (<ProductsList {...props}/>)} /> {/* I think it actually should not be rendered (just included as component), but it is just a test for now */}
        </Switch>
      </div>
    </div>
  );
}

export default App;
