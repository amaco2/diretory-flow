import {Clapperboard, User2Icon} from 'lucide-react';
import styled from 'styled-components';
// Importation des fichier contenant les dimension des <<MediaQuery>>
import { breakPoint, media } from './MediaQuery/MediaQuery.jsx';
// Importation de l'icone de directoryflow pour le header
import iconDirectoryFlow from '../Ui/Connexion/Icon/irham-setyaki-k1V4pRaLjAU-unsplash.jpg';
import './style/Header.css';
import { isCookie, Link } from 'react-router-dom';
import { useContext } from 'react';
import {TContext }from '../ThemeContext.jsx';
import ProfilUser from './ProfilUsers/ProfilsUser.jsx';



/* Creation de l'element HTML <<img>> via st
yledComponent qui servira de logo pour le HEADER*/

const ImgLgoHeader = styled(Clapperboard)`
                      object-fit: cover;
                      // border-radius: 50px;
                      `
// Bouton de connextion et d'inscription dans directoryFlow

const styleBtn_Connexion_Instription = `
                                    border: none;
                                    border-radius: 5px;
                                    width: 100px;
                                    height: 30px;
                                    cursor: pointer;
                                    font-weight: bold;
                                    margin-top: 30px;
                                    position: relative;
                                    left: -30px;
                                    font-size: 1em;
                                    @media screen and (max-width: ${breakPoint.tablet}){
                                      display: none;
                                    }
                                    `;
const BtnInscription = styled.button`
                                  ${styleBtn_Connexion_Instription};
                                  background-color: #05CDFA;
                                  color: #fff;
                                  margin-left: 8px;
                                   &:hover {
                                     background-color: purple;
                                    color: #fff
                                  };
                                 `;
const BtnConnexion = styled.button`
                            ${styleBtn_Connexion_Instription};
                            background-color: #0CF963;
                            color: #fff;
                             &:hover {
                                     background-color: #000;
                                     color: #fff;
                                     border: 1px solid #ec4f11ff;
                                  };
                            `
// Creation du text <<Directory-Flow>> depuis un span dans styled component

const SpanTextDF = styled.span`
                       font-size: 1.7em;
                       font-weight: bold;
                       color: #161616ff;
                       @media screen and (max-width: ${breakPoint.mobile}){
                              font-size: 1.2em;
                       }`;

// Creation de l'icone connexion apres la desaction des boutons deja present

const IconUser = styled(User2Icon)`
               display: none;
               margin-top: 18px;
               cursor: pointer;
               margin-left: -30px;
             @media screen and (max-width: ${breakPoint.tablet}){
               display: block;
             };
               @media sreen and (max-width: ${breakPoint.mobile}){
               fill: red;
               width: 30px;
               }`;
// Fonction pour checker le hidden du header


function Headers(){ 
  const {isConnect} = useContext(TContext);
   return(
    <div>
      <header className='header'>
         <div className="navbar--header">
            <div className="navbar--header__logo-df">
              <ImgLgoHeader fill='#419aa4ff' color="#fff" size={70}/><SpanTextDF className='icon-text1 flex:true'>Directory-Flow</SpanTextDF>
            </div>
            <div className="navbar--header__connexion-backend">
              {isConnect? <ProfilUser/>:<div>
               <Link to={"/connexion"}><BtnConnexion>Connexion</BtnConnexion></Link>
               <Link to={'/inscription'}><BtnInscription>Inscription</BtnInscription></Link>
               <Link to={'/connexion'}><IconUser fill='#000' color='#ffff' size={50}/></Link></div>}
            </div>
         </div>
      </header>
    </div>
   )
}

export default Headers;