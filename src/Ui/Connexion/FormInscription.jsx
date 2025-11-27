import { HandCoins, HandFist, Mail } from "lucide-react";
import {useEffect, useState } from "react"
import styled from "styled-components";
import bgImgConnexion from './Icon/irham-setyaki-k1V4pRaLjAU-unsplash.jpg'
import iconDirectoryFlow from './Icon/iconedf.jpg';
import { breakPoint, media, mediaQueryInput } from "../MediaQuery/MediaQuery";
import { Link } from "react-router-dom";
import { BtnInscription } from "../Button";
import './Connexion.css'
import { registerUser } from "./UserConnexion/RegisterUser";
import { Homes, styleGlobalInput } from "./ComponentStyledForm/Styled";


// stockage de la hauteur et de la largeur de la fenetre d'affichege

const innerWidth = window.innerWidth;

// divsion des infos UI 
const DivFormConnexion = styled.div`
   position: absolute;
    background-image: url("${bgImgConnexion}");
    background-repeat: no-repeat;
    background-size: cover;
    background-position:center ;
    mix-blend-mode: difference;
    color:#fff;
    filter: contrast(0.9);
  z-index:999;
  border: none;
  box-shadow: 1px 5px 100px 10000px #000;
  background-color: #000000ff;
  width: 100%;
  // color:#fff;
  font-weight: bold;
  border-radius: 10px;
  height: 100%;
  display: flex;
  flex-direction: column;
  align-items: center;
  // left: ${innerWidth/95}svw;
  top: -0.1svh;
   ${media.mobile('width:100%')})
  `;
// <<Input>> des donnees de l'UI
  const InputEmail = styled.input.attrs({type: 'text', id: 'email', name:'email'})`
    left: -10px;
    border: none;
    ${styleGlobalInput};
    width: 30svw;
    border-radius: 8px;
    &:focus {
    box-shadow: 0 0 10px #000;
    };
    ${mediaQueryInput}
  `
  const InputNom = styled.input.attrs({type: 'text', id: 'nom', name:'nom'})`
    left: -10px;
    width: 30svw;
    ${styleGlobalInput};
    border: none;
    border-radius: 8px;
    &:focus {
    box-shadow: 0 0 10px #000;
    };
    ${mediaQueryInput}
  `
  const InputPrenom = styled.input.attrs({type: 'text', id: 'prenom', name:'prenom'})`
    left: -10px;
    width: 30svw;
   ${styleGlobalInput}
    border: none;
    border-radius: 8px;
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
  const InputPassword= styled.input.attrs({type: 'password', id: 'password', name:'password'})`
    left: -10px;
    width: 30svw;
    ${styleGlobalInput};
    border: none;
    border-radius: 8px;
    &:focus{
    box-shadow: 0 0 10px #000;
    };
    ${mediaQueryInput}
  `;
  // Creation du text <<Directory-Flow>> depuis un span dans styled component
  
  const SpanTextDF = styled.span`
                         font-size: 1.8em;
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
    box-shadow: 0 0 50px #768cabff;
    border: none;
    // backgorund-color: #fff;
    color: #fff;
    border-radius: 10px;
    display:flex;
    flex-direction: column;
    justify-content: center;
    align-items: center;
    width: 80vw;
    height: 78svh;

  `;
  // Lien en cas d'oublie du mot de passe
  const LinkObject = `
 position: relative;
 top: 10px;
 font-weight: 700;
 font-size: 1.4em;
 text-decoration: none;
 color: #1900ffff;
  &: hover{
     text-decoration: underline;
  };
  @media screen and (max-width: ${breakPoint.desktop}){
    width: 250px;
    font-size: 1.2em;
    text-align: center;
  }
  @media screen and (max-width: ${breakPoint.mobile}){
    width: 200px;
    font-size: 1.1em;
    text-align: center;
  }`
const LinkConnexion = styled(Link)`${LinkObject};
  `;
function FormInscription(){
    //  Declaration du state permetant de recuperer les infos de connexion lde l'utilisateur
      const [isLoading, setIsLoading] =useState(false)
      const [name, setName] = useState();
      const [fullName, setFullName] = useState();
      const [email, setEmail] = useState();
      const [password, setPassword] = useState();

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
      const getfirstName = (event)=>{
        event.preventDefault();
        if(event.target.value !== ""){
            setName(event.target.value);
        }
      }
      const getLastName = (event)=>{
        event.preventDefault();
        if(event.target.value !== ""){
            setFullName(event.target.value);
        }
      }
      

    return(
        <div>
            {/* On wrap les elements dans une <<div>> creee avec styled component */}
            <DivFormConnexion>
              <DivWraper>
                <ImgLgoHeader src={iconDirectoryFlow}/><SpanTextDF>DirectoryFlow(Inscription)</SpanTextDF><br />
                </DivWraper><br /><br />
                <DivWrapperForm>
                <Link to={"/"}><Homes size={30} color="#0c0c0cff" /></Link><br />
                <label htmlFor="nom">Nom</label>
                <InputNom placeholder="Ex: Jhon" required size={50} maxLength={50} onChange={getfirstName} /><br />
                <label htmlFor="prenom">prenom</label>
                <InputPrenom placeholder="Ex: Doe" required size={50} maxLength={50} onChange={getLastName}/><br />
                <label htmlFor="email">Adresse e-mail <Mail size={30} color="#fd3705ff"/></label>
                <InputEmail required placeholder="EX: Jhondoe@gmail.com" maxLength={50} onChange={getEmail}/><br />
                <label htmlFor="password">Mot de passe </label>
                <InputPassword onChange={getPassword} required maxLength={50}/>
                <BtnInscription onClick={(event)=>{
                    event.stopPropagation();
                        setName(name + " " + fullName);
                    console.log(name, email, password);
                    registerUser(name, email, password, setIsLoading);
                }}>Connexion</BtnInscription>
                <LinkConnexion to={'/connexion'}><span style={{color: '#181616ff', fontWeight: "bold", fontSize: ".8em"}}>Vous avez déja un compte?</span> Connectez-vous.</LinkConnexion>
                </DivWrapperForm>
                {isLoading? <p>Chargement....</p>: null}
            </DivFormConnexion>
        </div>
    )
}

export default FormInscription;