import React from "react";
import {Link} from "react-router-dom";
import "../css/footer.css";

const Footer = props => {
    return(
        <div className="footer-basic">
            {/*<div className="social"><a href="#"><i className="icon ion-social-instagram"></i></a><a href="#"><i className="icon ion-social-snapchat"></i></a><a href="#"><i className="icon ion-social-twitter"></i></a><a href="#"><i className="icon ion-social-facebook"></i></a></div>*/}
            <ul className="list-inline">
                <li className="list-inline-item"><Link to="/">Home</Link></li>
                <li className="list-inline-item"><Link to="/dashboard">Dashboard</Link></li>
                <li className="list-inline-item"><Link to="/about">Über uns</Link></li>
                <li className="list-inline-item"><Link to="/terms">AGB</Link></li>
                <li className="list-inline-item"><Link to="/impressum">Impressum</Link></li>
                <li className="list-inline-item"><Link to="/datenschutz">Datenschutz</Link></li>
            </ul>
            <p className="copyright">Trent © 2021</p>
        </div>
    )
}

export default Footer;
