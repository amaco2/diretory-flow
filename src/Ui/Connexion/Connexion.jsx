// Importation du fichier css depuis <<Connexion.css>>
import "./Connexion.css";
import styled from "styled-components";
import { Link } from "react-router-dom";

const DivFormConnexion = styled.div`
    background-color: #000;
    color: #fff;
    width: 70%;
    height: 300px;
    display: flex;
    flex-direction: column;
    flex-wrap: nowrap;
    align-items: center;
    justify-content: center;`

function Connexion(){
 
    return(
        <div>
        <DivFormConnexion >
           <form action="">
            <p>Mon nouveau formulaire</p>
           </form>
        </DivFormConnexion>
        </div>
    )
}

export default Connexion;