import React from 'react';
import logo from '../images/espaceInsolite.png';

export default function MentionLegalScreen() {
    return (
        <div>
            <div className="mllogo"><img className="mllogob" src={logo} alt="logo"></img></div>
            <div>
                <p>Identification de l'éditeur et de l'hébergeur du site</p>

                <p>Le site http://www.AtypikHouse.com est édité par AtypikHouse (projet étudiant)</p>

                <p>AtypikHouse est une SARL au capital de 10 000 €</p>

                <p>Entreprise immatriculée au RCS de OISE sous le numéro 123456789</p>

                <p>Le siège social se situe au : 7 places hôtel de ville, 60350 Oise</p>

                <p>N° de TVA intracommunautaire : 123453555324</p>

                <p>Directeur de la publication : Martins Vieira, étudiant de AtypikHouse ( projet étudiant) SARL, joignable au 0650297996 ou à l'adresse espaceinsolite21@gmail.com</p>

                <p>Le site est hébergé par X. Les informations concernant la collecte et le traitement des données personnelles (politique et déclaration) sont fournies dans la charte de données personnelles du site.</p>
            </div>
        </div>
    )
}
