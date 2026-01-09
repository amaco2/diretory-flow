import { ArrowRight } from "lucide-react";
import type { ChangeEvent, ReactElement } from "react";
import { Link } from "react-router-dom";
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
      `
// const button de sauvegarde
const BtnSaveUpload = styled.button`
     ${globalStyleBtn}
     background: linear-gradient(360deg, #000000ff);
     color: #fff;
     transition: 0.4s ease;

     &:hover{
     margin-top: -3px;  
     }
`
const BtnRemoveUpload = styled.button`
       ${globalStyleBtn}
       background: linear-gradient(360deg, #ff0000);
        transition: 0.4s ease;

     &:hover{
     margin-top: 3px;  
     }
`
const saveScript = async (projectId: number, aiResult: any) =>
{
    if (!aiResult.longText)
    {
        console.error("Aucun texte à sauvegarder.");
        return;
    }
    aiResult = aiResult.longText;
    try
    {
        const response = await axio.post(`/api/breakdowns/ai/${projectId}`,
            { projectId, aiResult }
        );
        console.log(response?.data)
    } catch (error: any)
    {
        error.response?.data?.message || error.message || "Erreur inconue"
    }
}
const handleClick = (projectId: number, aiOuput: any) =>
{
    // Appel de la fonction de sauvegarde de donnees
    saveScript(projectId, aiOuput)
}
const SaveScriptUpload = ({ aiOuput, URL_version, checkHandlesending, projectId }: Record<string, any>): ReactElement =>
{
    // extrait du deouillement
    const sliceSrciptUpload: Array<Object> = aiOuput;
    console.log(aiOuput);
    return (
        <div className="div-save-script">
            <div className="div-save-script--text">
                <p>
                    depouillement Terminé! veuillez le sauvegarder pour la suite
                    du projet ou le consulter ici <ArrowRight /> <Link to={''}>{URL_version}</Link> au risque de perdre
                    ces information.
                </p>
                <div className="div-save-script-btn">
                    <BtnRemoveUpload onClick={(e) =>
                    {
                        e.stopPropagation();
                        checkHandlesending(() => !true);
                    }}>Annuler</BtnRemoveUpload>
                    <BtnSaveUpload
                        onClick={(e) =>
                        {
                            e.stopPropagation();
                            if (projectId && aiOuput)
                            {
                                handleClick(projectId, aiOuput);
                            }
                        }}>Sauvegarder</BtnSaveUpload>
                </div>
            </div>
        </div >
    )
}

export default SaveScriptUpload;