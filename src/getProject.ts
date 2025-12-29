import { useEffect, type ReactElement } from "react";
import axio from "./config/axiosConfig";


const useAllProjects = (setProjectId: Function, setWasProject: Function) =>
{
    // useEffect(() =>
    // {
    axio.get("/api/projects/")
        .then((res) =>
        {
            // Stockage de L'ID de l'utilisateur pour les relation entre les donneess
            setProjectId(res.data.dataProjects);
            // Validation de l'existance d'au moins un projet
            setWasProject(true);
        })
        .catch((error) =>
        {
            // L'utilisateur n'a pas de projet
            setWasProject(false);

            // Gestion des erreurs <<AXIOS>>
            console.error('Erreur axios :', error.response?.data || error.message);
        })

    // })
}

export { useAllProjects };