import Home from "./Component/Home.jsx";
import {BrowserRouter as Router, Routes, Route} from 'react-router-dom';
import FormConnexion from "./Ui/Connexion/FromConnexion.jsx";
import FormInscription from "./Ui/Connexion/FormInscription.jsx";
import { useEffect, useState } from "react";
import axios from "axios";
import {TContext} from "./ThemeContext.jsx";
import styled from "styled-components";
import ProjectUser from "./Component/ProjectUsers/ProjectUser.jsx";

const HiddenProfil = styled.section`
 position: absolute;
 width: 100%;
 height:100%;
 z-index: 10;
 top:0;
 background-color: #334d517b;`
function WrapperComponent(){
    // Etat de connexion de l'utilisateur 
    const [isConnect, setIsConnect] = useState(false);
    const [iconeUser, setIconeUser] = useState();
    // Activation et desactivation du profil utilisateur
    const [isShowProfil, setIsShowProfil] = useState(true);
    // Connextion en utlisant les cookies
    useEffect(()=>{
        axios.get("http://localhost:5000/api/auth/me",{
            withCredentials: true
        })
             .then(res =>{
             setIconeUser(res.data.message.email);
              setIsConnect(true);
             })
             .catch((error)=>{
                setIsConnect(false)
                console.error(error);
             })
    },[iconeUser]);
    console.log(isConnect);
    return(
        <div>
        <TContext.Provider value={{isConnect,isShowProfil, setIsShowProfil, iconeUser, setIconeUser}}>
            <HiddenProfil onClick={(event)=>{
                event.stopPropagation();
                setIsShowProfil(true)
            }} hidden={isShowProfil?true:false} ></HiddenProfil>
            <Routes>
                <Route path="/connexion" element={<FormConnexion />}/>
                <Route path="/inscription" element={<FormInscription />}/>
                <Route path="/projects" element={<ProjectUser/>} />
                <Route index={<Home/>} path="/" element={<Home />} />
            </Routes>
        </TContext.Provider>
        </div>
    )
}

export default WrapperComponent;