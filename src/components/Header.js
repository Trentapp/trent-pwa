import React from 'react';
import {Link} from "react-router-dom";
import {Button} from "react-bootstrap";

export default function Header(props) {
    return (
        <nav className="navbar navbar-expand navbar-dark bg-dark">
        <Link to={"/"} className="navbar-brand" style={{marginLeft: "30px"}}>
          TRENT
        </Link>
        <div className="navbar-nav mr-auto">
          <li className="nav-item">
            <Link to={"/products"} className="nav-link">
              Search Products
            </Link>
          </li>
        </div>
        <div className="navbar-nav ml-auto"> {/*somehow not aligning to the right, but I will care for that later*/}
          {props.user._id ? (
            <>
              {/*<li className="nav-item">
                <Link to={"/inventory"} className="nav-link">
                  Inventory
                </Link>
              </li>*/}
              <li className="nav-item">
                <Link to={"/products/create"} className="nav-link">
                  Add a product
                </Link>
              </li>
              <li className="nav-item">
                <Link to={`/profile/${props.user._id}`} className="nav-link">
                  Your Profile
                </Link> {/* Somehow this does not align correctly, but I should not care about it now, because I will probably change it anyway*/}
              </li>
              <li className="nav-item">
                <Button variant="link" className="nav-link" onClick={props.handleLogout}>
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
    )
}
