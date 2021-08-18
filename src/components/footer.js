import { Box, HStack } from "@chakra-ui/react";
import React from "react";
import {Link} from "react-router-dom";
import "../css/footer.css";
import { useTranslation } from 'react-i18next';

const Footer = props => {
    const {t, i18n} = useTranslation();

    return(
        <div className="footer-basic">
            {/*<div className="social"><a href="#"><i className="icon ion-social-instagram"></i></a><a href="#"><i className="icon ion-social-snapchat"></i></a><a href="#"><i className="icon ion-social-twitter"></i></a><a href="#"><i className="icon ion-social-facebook"></i></a></div>*/}
            <ul className="list-inline">
                <li className="list-inline-item"><Link to="/">{t("Home")}</Link></li>
                <li className="list-inline-item"><Link to="/dashboard">{t("Dashboard")}</Link></li>
                <li className="list-inline-item"><a target="_blank" rel="noopener noreferrer" href="/AllgemeineNutzungsbedingungen.pdf">{t("AGB")}</a></li>
                <li className="list-inline-item"><Link to="/impressum">{t("Impressum")}</Link></li>
                <li className="list-inline-item"><Link to="/datenschutz">{t("Datenschutz")}</Link></li>
            </ul>
            <p className="copyright">Trentapp UG (haftungsbeschränkt) © 2021</p>
        </div>
    )
}

export default Footer;

export const ProductsListFooter = props => {
    const {t, i18n} = useTranslation();

    return(
        <Box w="100%">
            <HStack>
            <Box w="50%"></Box>
            <Box w="50%" className="footer-basic">
                {/*<Box className="social"><a href="#"><i className="icon ion-social-instagram"></i></a><a href="#"><i className="icon ion-social-snapchat"></i></a><a href="#"><i className="icon ion-social-twitter"></i></a><a href="#"><i className="icon ion-social-facebook"></i></a></Box>*/}
                <ul className="list-inline">
                    <li className="list-inline-item"><Link to="/">{t("Home")}</Link></li>
                    <li className="list-inline-item"><Link to="/dashboard">{t("Dashboard")}</Link></li>
                    <li className="list-inline-item"><Link to="/about">{t("Über uns")}</Link></li>
                    <li className="list-inline-item"><a target="_blank" rel="noopener noreferrer" href="/AllgemeineNutzungsbedingungen.pdf">{t("AGB")}</a></li>
                    <li className="list-inline-item"><Link to="/impressum">{t("Impressum")}</Link></li>
                    <li className="list-inline-item"><Link to="/datenschutz">{t("Datenschutz")}</Link></li>
                </ul>
                <p className="copyright">Trentapp UG (haftungsbeschränkt) © 2021</p>
            </Box>
            </HStack>
        </Box>
    )
}


