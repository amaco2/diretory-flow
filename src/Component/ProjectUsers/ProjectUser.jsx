import { AlarmClock, BookDashed, Film, ProjectorIcon, Repeat, Text } from "lucide-react"
import { DivfonsScrool } from "../../Ui/ProfilUsers/ComponentsProfil"
import { BtnNextQuest, DivForm, DivFormProjects, InputDate, InputDescription, InputText, InputTypeProductyion } from "./style/styleComponent"
import {Link, Route, Routes} from 'react-router-dom'
import { itemslist } from "./ComponentUser"
import { useEffect, useRef } from "react"
// Importation de notre feuille de style
import './style/ProjectUser.css';

function ProjectUser(){
   
    /** Dans la suite nous declarons des variables qui 
     * font references aux elements du DOM et des fonctions
     * qui appel celle-ci */
    const refDivInpuit = useRef(null);
    const refDivBgImg = useRef(null);
    const description = useRef(null)

// on place un tableau de dependence vide pour charger les donnes pendant chaque rendu 
useEffect(()=>{
        let i = 0;
  const getDivInput = ()=>{
    //  On recupere la <<DIV>> contenant les input ici
    if(refDivInpuit.current){
    return (refDivInpuit.current.querySelectorAll('input[type="radio"]'));
    }
  };
  const getDivBgImg = ()=>{
    if(refDivBgImg.current){
        
       const set =  setInterval(()=>{
        refDivBgImg.current.style.backgroundImage = `url(${itemslist[i].img})`;
        refDivBgImg.current.style.transition = 'all';
        description.current.textContent = itemslist[i].description;
         const get = getDivInput();
         get[i].checked = true ;
         i = (i + 1)% itemslist.length;
        }, 10000)

        return ()=>{
            clearInterval(set)
        }
    }
  }
  getDivBgImg()
},[])

  
    return(
        <div>
            <DivFormProjects>
                <DivfonsScrool>
                    <div className="addImgBg" ref={refDivBgImg}>
                        {/* Ici seront les images */}
                        <p ref={description} className="description">...</p>
                        <div className="input-radio-check" ref={refDivInpuit}>

                    <input type="radio" id="rdio" name="rdio" />
                    <input type="radio" id="rdio" name="rdio" />
                    <input type="radio" id="rdio" name="rdio" />
                    <input type="radio" id="rdio" name="rdio" />
                    <input type="radio" id="rdio" name="rdio" />

                    </div>
                    </div>
                </DivfonsScrool>
            <DivForm>
                <label htmlFor="titre">Titre du projet : <ProjectorIcon color="#00ff00" size={35}/> </label>
                <InputText type="text" id="titre" name="titre"/><br /><br />
                <label htmlFor="date_debut">Date de début : <AlarmClock color="#ff0000" size={25}/> </label>
                <InputDate type="date"/><br /><br />
                <label htmlFor="type_production">Type de production  : <Film size={25}/> </label>
                <InputTypeProductyion>
                <option value="">--------</option>
                <option value="film">Film</option>
                <option value="clip">Clip</option>
                <option value="pub">Pub</option>
                <option value="court_metrage">Court métrage</option>
                </InputTypeProductyion><br /><br />
                <label htmlFor="description">Description : <Text/></label>
                <InputDescription></InputDescription><br /><br />
                <BtnNextQuest>Suivant</BtnNextQuest><br /><br />
                <Link to={'/'}>Accueil</Link>
            </DivForm>
            <Routes>
            </Routes>
            </DivFormProjects>
        </div>
    )
}

export default ProjectUser