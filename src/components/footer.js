import React from "react";
import {Link} from "react-router-dom";
import "../css/footer.css";

const Footer = props => {
    return(
        <div className="footer-basic">
            <footer>
                {/*<div class="social"><a href="#"><i class="icon ion-social-instagram"></i></a><a href="#"><i class="icon ion-social-snapchat"></i></a><a href="#"><i class="icon ion-social-twitter"></i></a><a href="#"><i class="icon ion-social-facebook"></i></a></div>*/}
                <ul class="list-inline">
                    <li class="list-inline-item"><Link to="/">Home</Link></li>
                    <li class="list-inline-item"><Link to="/dashboard">Dashboard</Link></li>
                    <li class="list-inline-item"><Link to="/about">Über uns</Link></li>
                    <li class="list-inline-item"><Link to="/terms">AGB</Link></li>
                    <li class="list-inline-item"><Link to="/impressum">Impressum</Link></li>
                    <li class="list-inline-item"><Link to="/datenschutz">Datenschutz</Link></li>
                </ul>
                <p class="copyright">Trent © 2021</p>
            </footer>
        </div>
    )
}

export default Footer;
