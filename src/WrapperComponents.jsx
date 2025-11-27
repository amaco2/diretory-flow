import Home from "./Component/Home.jsx";
import {BrowserRouter as Router, Routes, Route} from 'react-router-dom';
import FormConnexion from "./Ui/Connexion/FromConnexion.jsx";
import FormInscription from "./Ui/Connexion/FormInscription.jsx";
import { useEffect, useState } from "react";
import axios from "axios";
function WrapperComponent(){
    // Etat de connexion de l'utilisateur 
    const [isConnect, setIsConnect] = useState(false);
    // Connextion en utlisant les cookies
    useEffect(()=>{
        axios.get("http://localhost:5000/api/auth/me",{
            withCredentials: true
        })
             .then(res =>{
             console.log(res.data);
             !isConnect? setIsConnect(true): setIsConnect(false);
             })
             .catch((error)=>{
                console.error(error);
             })
    },[]);
    console.log(isConnect);
    return(
        <div>
            <Routes>
                <Route path="/connexion" element={<FormConnexion />}/>
                <Route path="/inscription" element={<FormInscription />}/>
                <Route index={<Home/>} path="/" element={<Home />} />
            </Routes>
        </div>
    )
}

export default WrapperComponent;