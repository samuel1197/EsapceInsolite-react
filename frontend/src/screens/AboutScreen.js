import React from 'react'
import img1 from '../images/cc.png'
import img3 from '../images/profil.png'


export default function AboutScreen() {
    return (
        <div>
            <h2 className="title" >Qui sommes-nous ?</h2>
            <div className="row center">
                <div className='col-2 abt'>
                    <img className="large" src={img1} alt="e"></img>
                </div>
                <div className='col-2 abtp'>
                    <p className="about">Une habitation ou hébergement insolite revient à créer un style d’hébergement hors du commun, 
                    original, atypique qui sortirait dans tous les cas des clichés que les voyageurs trouvent  
                    habituellement dans différents pays du monde.</p>
                    <p className="about">
                    Tout part de petits campings ou certaines personnes allaient passer leurs vacances ou leurs congés 
                    pour changer des habitudes quotidiennes, ça commence avec de simples lieux ouverts à des 
                    campings car à des campings de luxe pour vacanciers. Après le succès de ces campings vacances, les 
                    hébergeurs ont voulu proposer une alternative aux mobil-homes traditionnels et de la demande de  
                    certains clients de vivre quelque chose de différent d'où la venue des hébergements insolites.
                    </p>
                    <p className="about">
                    Depuis le lancement en 1999 de la première chaîne de campings en pleine nature par Philippe et  
                    Céline, les hébergements ont constitué à évoluer jusqu’à aujourd’hui. Les habitations sont devenues  
                    de plus en plus incroyables et diverses, ils peuvent maintenant être proposés selon vos goûts, envies,  
                    l’objectif des vacances et des endroits éducatifs.
                    </p>
                    <p className="about">
                    Voilà pourquoi trois amis passionnés de voyages, natures et de découvertes ont décidé de créer la 
                    société AtypikHouse qui est une société spécialisée dans la location d’habitations insolites pour des 
                    passionnés comme eux ou pour ceux qui veulent juste passer des bons moments.  
                    AtypikHouse permet aux hébergeurs de mettre en lumières leurs hébergements afin d’appeler de la 
                    clientèle et proposer aux clients une diversité d’habitations différentes.</p>
                </div>
            </div>
            <h2 className="title" >Nos Valeurs</h2>
            <div className="row center">
                <div className='col-1 val'>
                    <p className="imgcenter"><img className="icone" src={img3} alt="e"></img></p>
                    <p className="about">
                    Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. Ut enim ad minim veniam, quis nostrud exercitation ullamco laboris nisi ut aliquip ex ea commodo consequat. Duis aute irure dolor in reprehenderit in voluptate velit esse cillum dolore eu fugiat nulla pariatur. Excepteur sint occaecat cupidatat non proident, sunt in culpa qui officia deserunt mollit anim id est laborum</p>
                </div>
                <div className='col-1 val'>
                    <p className="imgcenter"><img className="icone" src={img3} alt="e"></img></p>
                    <p className="about">
                    Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. Ut enim ad minim veniam, quis nostrud exercitation ullamco laboris nisi ut aliquip ex ea commodo consequat. Duis aute irure dolor in reprehenderit in voluptate velit esse cillum dolore eu fugiat nulla pariatur. Excepteur sint occaecat cupidatat non proident, sunt in culpa qui officia deserunt mollit anim id est laborum</p>
                </div>
                <div className='col-1 val'>
                    <p className="imgcenter"><img className="icone" src={img3} alt="e"></img></p>
                    <p className="about">
                    Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. Ut enim ad minim veniam, quis nostrud exercitation ullamco laboris nisi ut aliquip ex ea commodo consequat. Duis aute irure dolor in reprehenderit in voluptate velit esse cillum dolore eu fugiat nulla pariatur. Excepteur sint occaecat cupidatat non proident, sunt in culpa qui officia deserunt mollit anim id est laborum</p>
                </div>
            </div>
        </div>
    )
}
