




// On stock ici le recap des question pooser a l'utilisateur dans <<Summary>>

import { useContext } from "react";
import { ProjectUserContext } from "../../../ThemeContext";
import './Summary.css'

function Summary()
{
    const {
        dataProject,
        setDataProject,
        formatOfProject,
        setFormatOfProject,
        dataStep3,
        setDataStep3,
        dataStep4,
        setDataStep4,
        dataStep5,
        setDataStep5,
        dataStep6,
        setDataStep6
    } = useContext( ProjectUserContext )
    return (
        <div className="summary">
            <div className="header-summary">
                <h1>Recapitulatif des reponses</h1>
            </div>
            <section className="recap-summary">
                <ul>
                    <li>
                        <h2>Titre du projet</h2>
                        <span>{ dataProject?.title_project
                            ? dataProject.title_project :
                            "Pas mentioné" }</span>
                    </li>
                    <li>
                        <h2>Fomat du projet</h2>
                        <span>{ formatOfProject?.format ?
                            formatOfProject.format : "Pas mentioné" }</span>
                    </li>
                    <li>
                        <h2>Durée estimé</h2>
                        <span>{ dataProject?.duree_estimer ? dataProject.duree_estimer : "Pas mentioné" }</span>
                    </li>
                    <li>
                        <h2>Niveau de complexité</h2>
                        <span>{ formatOfProject?.niveau_complexite ? formatOfProject.niveau_complexite : "Pas mentioné" }</span>
                    </li>
                    <li>
                        <h2>Taille estimée de l'équipe</h2>
                        <span>{ dataStep3?.taille_equipe ? dataStep3.taille_equipe : "Pas mentioné" }</span>
                    </li>
                    <li>
                        <h2>Présence du directeur de production</h2>
                        <span>{ dataStep3?.isDirecteurProduction ? dataStep3.isDirecteurProduction : "Pas mentioné" }</span>
                    </li>
                    <li>
                        <h2>Présence du 1er assistant réalisateur</h2>
                        <span>{ dataStep3?.isPremierAD ? dataStep3.isPremierAD : "Pas mentioné" }</span>
                    </li>
                    <li>
                        <h2>
                            Méthode de travaille actuelle
                        </h2>
                        <span>{ dataStep3?.methode_travaille ? dataStep3.methode_travaille : "Pas mentioné" }</span>
                    </li>
                    <li>
                        <h2>Exprience de l'équipe</h2>
                        <span>{ dataStep3?.expEquipe ? dataStep3.expEquipe : "Pas mentioné" }</span>
                    </li>
                    <li>
                        <h2>Date de début estimé</h2>
                        <span>{ dataStep4?.date_Debut ? dataStep4.date_Debut : "Pas mentioné" }</span>
                    </li>
                    <li>
                        <h2>Date de fin estimé</h2>
                        <span>{ dataStep4?.date_Fin ? dataStep4.date_Fin : "Pas mentioné" }</span>
                    </li>
                    <li>
                        <h2>Budget Global estimé</h2>
                        <span>{ dataStep5?.budget ? dataStep5.budget : "Pas mentioné" }</span>
                    </li>
                    <li>
                        <h2> Niveau de risque global</h2>
                        <span>{ dataStep5?.risque ? dataStep5.risque : "Pas mentioné" }</span>
                    </li>
                    <li>
                        <h2>Objectif principale du projet</h2>
                        <span>{ dataStep6?.objectif ? dataStep6.objectif : "Pas mentioné" }</span>
                    </li>
                    <li>
                        <h2>Priorité absolue </h2>
                        <span>{ dataStep6?.priorite ? dataStep6.priorite : "Pas mentioné" }</span>
                    </li>
                    <li>
                        <h2>Autorise-tu l'IA à faire des suggestions ?</h2>
                        <span>{ dataStep6?.autoriserIA ? dataStep6.autoriserIA : "Pas mentioné" }</span>
                    </li>
                </ul>
            </section>
        </div>
    )
}

export default Summary;