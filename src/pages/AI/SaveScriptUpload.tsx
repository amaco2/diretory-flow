import { ArrowRight } from "lucide-react";
import { useRef, useState, type ChangeEvent, type ReactElement } from "react";
import { Link, useNavigate } from "react-router-dom";
import styled from "styled-components";
import './style/SaveScript.css';
import axio from "../../config/axiosConfig";

// Global style BTN
const globalStyleBtn = `
      width: 10vw;
      height: 40px;
      border: none;
      cursor: pointer;
      border-radius: 15px;
      font-weight: bold;
      transition: 0.3s all ease;
      `
// const button de sauvegarde
const BtnSaveUpload = styled.button`
     ${globalStyleBtn}
     background: linear-gradient(360deg, #00aaeb, #00ffeb);
     color: #fff;

     &:hover{
     transform: translateX(-1px);
     margin-top: -3px;  
     box-shadow: 0 -5px 10px #304d4b;
     }
`
const BtnRemoveUpload = styled.button`
       ${globalStyleBtn}
       background: linear-gradient(360deg, #ff0000, #ff9500);

     &:hover{
     margin-top: 3px;  
     box-shadow: 0 5px 10px #935d13;
     }
`
const saveScript = async (projectId: number, aiResult: any, navigate: any) =>
{
    if (!aiResult)
    {
        console.error("Aucun texte à sauvegarder.");
        return;
    }
    try
    {
        console.log(aiResult)
        const response = await axio.post(`/api/breakdowns/ai/${projectId}`,
            { projectId, aiResult }
        );
        console.log(response?.data)

        // Redirection vers la page d'extraction après succès
        setTimeout(() =>
        {
            navigate(`../depouillement-extraction`);
        }, 500);

    } catch (error: any)
    {
        console.error(error.response?.data?.message || error.message || "Erreur inconue")
    }
}
const handleClick = (projectId: number, aiOuput: any, navigate: any) =>
{
    // Appel de la fonction de sauvegarde de donnees
    saveScript(projectId, aiOuput, navigate)
}
const SaveScriptUpload = ({ aiOuput, URL_version, setCheckHandlesending, projectId, checkHandlesending }: Record<string, any>): ReactElement =>
{
    // extrait du deouillement
    const sliceSrciptUpload: Array<Object> = aiOuput;
    const object: string | null | Object = localStorage.getItem("aiOutput");
    const [checkHandlesend, setCheckHandleSend] = useState<boolean>(checkHandlesending)
    const navigate = useNavigate();
    // ref
    const setDialogue = useRef<any>(null);

    if (setDialogue.current || checkHandlesend)
    {
        setDialogue.current.showModal();
    } if (checkHandlesend === false && setDialogue.current)
    {
        setDialogue.current.close();
    }


    return (
        <dialog className="div-save-script" ref={setDialogue}>
            <div className="div-save-script--text">
                <p>
                    Félicitation votre depouillement c'est <em>Terminé</em> avec succè! <b>Veuillez le sauvegarder</b> pour la suite
                    du projet ou le consulter ici <Link to={''}>{URL_version}</Link> au risque de perdre
                    ses informations.
                </p>
                <div className="div-save-script-btn">
                    <BtnRemoveUpload onClick={(e) =>
                    {
                        e.stopPropagation();
                        // console.log("localstorage :", ((localStorage.getItem("aiOutput"))));
                        setCheckHandleSend(o => !o);
                    }}>Annuler</BtnRemoveUpload>
                    <BtnSaveUpload
                        onClick={(e) =>
                        {
                            e.stopPropagation();
                            if (projectId && aiOuput)
                            {
                                console.log(aiOuput);
                                handleClick(projectId, aiOuput, navigate);
                            }


                        }}>Sauvegarder</BtnSaveUpload>
                </div>
            </div>
        </dialog >
    )
}

export default SaveScriptUpload;