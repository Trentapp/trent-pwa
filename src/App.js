import React from "react";
import {Switch, Route, Link} from "react-router-dom";
import "bootstrap/dist/css/bootstrap.min.css";

import HomePage from "./components/home";
import ProductsList from "./components/products-list";
import Product from "./components/product";
import AddProduct from "./components/add-product";

function App() {
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
        <div className="navbar-nav mr-auto">
          <li className="nav-item">
            <Link to={"/products/create"} className="nav-link">
              Add a product
            </Link>
          </li>
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
        </Switch>
      </div>
    </div>
  );
}

export default App;
