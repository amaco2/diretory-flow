import { Outlet, useParams } from "react-router-dom";
import ProjectLayout from "../layout/ProjectLayout";
import { useEffect, useState } from "react";
import { DashboardContext } from "../ThemeContext";
import { useGetInfosProjects } from "./GetInfosProjects";

function ProjectDashboar()
{
    const { projectid } = useParams();

    const ID_Project = projectid.split( ":" )[ 0 ];

    const [ formatOfProject, setFormatOfProject ] = useState(
        {
            format: '',
            duree_estimer: '',
            mode_diffusion: '',
            niveau_complexite: '',
            tournage_prevu: '',
            existance_scenario: '',
        }
    )
    const [ dataStep3, setDataStep3 ] = useState(
        {
            taille_equipe: '',
            isDirecteurProduction: '',
            isPremierAD: '',
            methode_travaille: '',
            expEquipe: '',
            outil_utilise: '',
        }
    )

    const [ dataStep4, setDataStep4 ] = useState(
        {
            date_Debut: "",
            date_Fin: "",
            nbr_Jour_tournage: '',
            contrainte: '',
            niveauPression: '',
            flexibilitePlanning: '',
        }
    )

    const [ dataStep5, setDataStep5 ] = useState(
        {
            satusEquipe: '',
            budget: '',
            materiel: '',
            tele_travail: '',
            nbr_Lieux_Principaux: '',
            risque: '',
        }
    );

    const [ dataStep6, setDataStep6 ] = useState(
        {
            objectif: '',
            crainte: '',
            blockage: '',
            priorite: '',
            attente: '',
            autoriserIA: '',
        }
    )

    /**
     * Appel des items du projet (phases, script ou breakdowns) 
     * pour la gestion conforme de pahse du  projet celon un
     *  depouillemnt precis concernant un projet
     * L'appel par UseEfect sera fait pour le partage des donne du parent a l'enfant via useContext
     */

    useEffect( () =>
    {
        useGetInfosProjects( ID_Project );
    } )
    return (
        <DashboardContext.Provider value={ {
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
        } }>
            <ProjectLayout>
                <Outlet context={ { ID_Project } } />
            </ProjectLayout>
        </DashboardContext.Provider>
    )
}

export default ProjectDashboar;