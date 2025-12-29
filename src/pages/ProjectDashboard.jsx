import { Outlet, useParams } from "react-router-dom";
import ProjectLayout from "../layout/ProjectLayout";
import { useState } from "react";
import { DashboardContext } from "../ThemeContext";

function ProjectDashboar()
{
    const { projectid } = useParams();

    console.log( projectid.split( ":" ) )
    const ID_Project = projectid.split( ":" );

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