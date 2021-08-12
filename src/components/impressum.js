import { Container, Heading } from "@chakra-ui/react";
import React from "react";

const Impressum = props => {
    return(
        <Container maxW="container.lg">
            <Heading>Impressum</Heading>
            <Heading size="lg">Angaben gemäß § 5 TMG</Heading>
            <p>Trent UG (haftungsbeschränkt)<br />
            Virchowstraße 88<br />
            80805 München</p>
            <p><strong>Vertreten durch:</strong><br />
            Fynn Kiwitt<br />
            Simon Skade</p>
            <Heading size="lg">Kontakt</Heading>
            <p>Telefon: +49 176 42680695<br />
            E-Mail: info@trentapp.com</p>
            <Heading size="lg">EU-Streitschlichtung</Heading>
            <p>Die Europäische Kommission stellt eine Plattform zur Online-Streitbeilegung (OS) bereit: <a
            href="https://ec.europa.eu/consumers/odr/" target="_blank" rel="noopener
            noreferrer">https://ec.europa.eu/consumers/odr/</a>.<br /> Unsere E-Mail-Adresse finden Sie oben im
            Impressum.</p>
            <Heading size="lg">Verbraucherstreitbeilegung/Universalschlichtungsstelle</Heading>
            <p>Wir sind nicht bereit oder verpflichtet, an Streitbeilegungsverfahren vor einer Verbraucherschlichtungsstelle
            teilzunehmen.</p>
            <p>Quelle: <a href="https://www.e-recht24.de">eRecht24</a></p>
        </Container>
    )
}

export default Impressum;
