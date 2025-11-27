import { Eye, EyeOff, Home, Mail } from "lucide-react";
import {useState } from "react"
import styled from "styled-components";
import iconDirectoryFlow from './Icon/iconedf.jpg';
import bgImgConnexion from './Icon/irham-setyaki-k1V4pRaLjAU-unsplash.jpg'
import { breakPoint, media, mediaQueryInput } from "../MediaQuery/MediaQuery";
import { Link } from "react-router-dom";
import { BtnConnexion } from "../Button";
import { Homes, styleGlobalInput } from "./ComponentStyledForm/Styled";
import { useAxioToLogin } from "./UserConnexion/LoginUser";



// stockage de la hauteur et de la largeur de la fenetre d'affichege

const innerWidth = window.innerWidth;

// divsion des infos UI 
const DivFormConnexion = styled.div`
  position: absolute;
  z-index: 999;
  background-image: url("${bgImgConnexion}");
  background-repeat: no-repeat;
  background-size: cover;
  background-position:center ;
  mix-blend-mode: difference;
  color:#fff;
  filter: contrast(0.9); 
  border: none;
  font-weight: bold;
  width: 100%;
  height: 100%;
  display: flex;
  flex-direction: column;
  align-items: center;
  top: 0;
   ${media.mobile('width:100%')})
  `;

// Input des donnees de l'UI
  const InputEmail = styled.input.attrs({type: 'text', id: 'email', name:'email'})`
    left: -10px;
    width: 30svw;
    ${styleGlobalInput};
    border-radius: 10px;
    &:focus {
    box-shadow: 0 0 10px #000;
    };
        ${mediaQueryInput}
  `
  /* Creation de l'element HTML <<img>> via st
yledComponent qui servira de logo pour le HEADER*/

const ImgLgoHeader = styled.img`
                      object-fit: cover;
                      width: 60px;
                      height: 60px;
                      border-radius: 50px;
                      margin-top: 30px;
                      `;
// Input des donnees de l'UI
  const InputPassword= styled.input.attrs({id: 'password', name:'password'})`
    left: -10px;
    width: 30svw;
    ${styleGlobalInput};
    border-radius: 10px;
    &:focus{
    box-shadow: 0 0 10px #000;
    };
        ${mediaQueryInput}
  `;
  // Creation du text <<Directory-Flow>> depuis un span dans styled component
  
  const SpanTextDF = styled.span`
                         font-size: 1.9em;
                         font-weight: bold;
                         margin-top: 50px;
                         color: #000;
                         margin-left: 5px;
                         @media screen and (max-width: ${breakPoint.mobile}){
                                font-size: 1.2em;
                         }`;
  const DivWraper = styled.div`
  display: flex;
  margin-left: -15svw;
  `;

  const DivWrapperForm = styled.div`
    box-shadow: 0 0 18px #299da7ff;
    border: none;
    border-radius: 10px;
    display:flex;
    flex-direction: column;
    justify-content: center;
    align-items: center;
    width: 80vw;
    height: 75svh;
  `;
  // Lien en cas d'oublie du mot de passe
  const LinkObject = `
  position: relative;
 top: 10px;
 font-weight: bold;
 font-size: 1.4em;
 text-decoration: none;
 color: #2f08f4ff;
  &: hover{
     text-decoration: underline;
  };
  @media screen and (max-width: ${breakPoint.desktop}){
    width: 250px;
    font-size: 1.2em;
    text-align: center;
  };
    @media screen and (max-width: ${breakPoint.mobile}){
    width: 170px;
    font-size: 1.1em;
    text-align: center;
  }`;
const LinkForgetPassword = styled(Link)`${LinkObject};
  `;
  // Lien pour la creation du compte
  const LinkCreateAcount = styled(Link)`${LinkObject}
  `;
// Span for see or not see password
const SpamSeeOrNotSee = styled.span`
  cursor: pointer;
  position: relative;
  // z-index: 888;
  left: 13svw;
  border: none;
  margin: 0;
  padding: 0;
  top: -33px;
  @media screen and (max-width: ${breakPoint.desktop}){
   left: 22svw
  };
 `
function FormConnexion(){
  //  State pour afficher ou cacher le mot de passe
  const [isSeePassword, setIsSeePassword] = useState(true);
  const [isSeeEye, setIsSeeEye] = useState(false);
    //  Declaration du state permetant de recuperer les infos de connexion lde l'utilisateur
    const [email, setEmail] = useState(''); // On laisse vide pour eviter d'avoir les email par defaut
    const [password, setPassword] = useState('');

    /** Les fonction suivante recupere les valeurs des in
    puts pour les envoyer au backend et faire l'authentificatiion*/
       const getEmail = (event)=>{
        event.preventDefault();
        if(event.target.value !== ""){
        setEmail(event.target.value);
        }else{
            console.log("Se champ est obligatoire")
        }
      } ;
      const getPassword = (event)=>{
        event.preventDefault();
        if(event.target.value !== ""){
            setPassword(event.target.value);
        }
      }

    return(
        <div>
            {/* On wrap les elements dans une <<div>> creee avec styled component */}
            <DivFormConnexion>
              <DivWraper>
                <ImgLgoHeader src={iconDirectoryFlow}/><SpanTextDF>DirectoryFlow(Connexion)</SpanTextDF><br />
                </DivWraper><br /><br />
                <DivWrapperForm>
                <Link to={"/"}><Homes size={30} color="#0f0f0eff" /></Link><br />
                <label htmlFor="email">Adresse e-mail <Mail size={15} color="4ffd05ff"/></label>
                <InputEmail placeholder="EX: Jhondoe@gmail.com" maxLength={50}
                onChange={(event)=>{
                  event.preventDefault();
                  getEmail(event) 
                }}/><br />
                <label htmlFor="password">Mot de passe </label>

                <InputPassword type={isSeePassword?"password":"text"} maxLength={50} onChange={(event)=>{
                    event.preventDefault();
                    getPassword(event);
                  setIsSeeEye(true)}}/>
                <SpamSeeOrNotSee hidden={isSeeEye? false: true}>{isSeePassword?
                  <EyeOff onClick={()=>setIsSeePassword(false)} color="#fff"/>:
                  <Eye onClick={()=> {setIsSeePassword(true)}} color="#fff"/>}</SpamSeeOrNotSee>
                <LinkForgetPassword>Mot de passe Oublié?</LinkForgetPassword>

                <BtnConnexion onClick={(event)=>{
                  event.stopPropagation();
                  useAxioToLogin(email||null, password || null);
                  setIsSeeEye(false)
                }}>Connexion</BtnConnexion>
                <LinkCreateAcount to={'/inscription'}><span style={{color: '#242222ff', fontWeight: "bold", fontSize: "0.9em"}}>Vous n'avez pas de compte?</span>Céez en un.</LinkCreateAcount>
                </DivWrapperForm>
            </DivFormConnexion>
        </div>
    )
}

export default FormConnexion;