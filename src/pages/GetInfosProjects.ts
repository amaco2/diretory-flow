import { useEffect } from "react"
import axio from "../config/axiosConfig"



const getBreakdowns = async (projectId: number) =>
{

    // Recuperation du Depouillement depuis le METHODE <<GET>> de axios
    axio
        .get(`/api/breakdowns/script/${projectId}`)
        .then(response =>
        {
            console.log("Depouillement du projet", response?.data?.data);

            return [response?.data?.data];
        })
        .catch(error =>
        (
            console.error(error?.message || error?.data?.message)
        )
        )
}

const getPhaseOfProject = async (projectId: number) =>
{
    // Recuperation des phase du projet (prepod, prod, postprod)

    axio
        .get(`/api/breakdowns/items/${projectId}`)
        .then(res =>
        {
            console.log("Phase du projet", res?.data?.items);
            if (res?.data?.items) return res?.data?.items;
        })
        .catch(err => console.error(err.message));
}

// Recuperation de depouillment et des phases du projet
const useGetInfosProjects = (projectId: number) =>
{

    // Appel du Breakdowns
    getBreakdowns(projectId);

    // Appel des phases su projet
    getPhaseOfProject(projectId);

}

export { useGetInfosProjects, getBreakdowns, getPhaseOfProject };