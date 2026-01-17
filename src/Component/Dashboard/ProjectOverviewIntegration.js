/**
 * Integration Guide for ProjectOverview with Real Data
 * 
 * Ce fichier montre comment intégrer le composant ProjectOverview
 * avec de vraies données provenant de votre backend/API
 */

import { useOutletContext } from "react-router-dom";
import { useContext, useEffect, useState } from "react";
import { DashboardContext } from "../../ThemeContext";
import axio from "../../config/axiosConfig";

/**
 * Exemple d'intégration avec vraies données
 * À utiliser comme template pour votre implémentation
 */

export const ProjectOverviewIntegration = () =>
{
    const { ID_Project } = useOutletContext();
    const {
        formatOfProject,
        dataStep3,
        dataStep4,
        dataStep5,
        dataStep6,
    } = useContext( DashboardContext );

    const [ projectData, setProjectData ] = useState( null );
    const [ loading, setLoading ] = useState( true );

    useEffect( () =>
    {
        /**
         * Récupérer les données du projet depuis votre API
         * 
         * Structure attendue:
         * {
         *   projectName: string,
         *   projectType: string,
         *   status: string,
         *   budget: number,
         *   teamSize: number,
         *   progress: number,
         *   phases: object,
         *   teamData: array,
         *   genderData: array,
         *   budgetData: array,
         *   timelineData: array
         * }
         */

        // Exemple 1: Appel API direct
        // axio.get(`/api/projects/${ID_Project}`)
        //   .then(res => {
        //     const formattedData = transformApiDataToComponentFormat(res.data);
        //     setProjectData(formattedData);
        //   })
        //   .catch(error => console.error('Erreur:', error))
        //   .finally(() => setLoading(false));

        // Exemple 2: Utiliser les données du contexte du dashboard
        const transformedData = {
            projectName: formatOfProject.format || 'Projet',
            projectType: formatOfProject.format || 'Film',
            teamSize: dataStep3.taille_equipe || 0,
            budget: dataStep5.budget || 0,
            // ... transformer les autres données
        };

        // setProjectData(transformedData);
        // setLoading(false);
    }, [ ID_Project ] );

    if ( loading ) return <div>Chargement...</div>;
    if ( !projectData ) return <div>Aucune donnée</div>;

    return (
        // <ProjectOverview data={projectData} />
        <div>Intégration à faire</div>
    );
};

/**
 * Fonction helper pour transformer les données de l'API
 * 
 * Adaptez cette fonction selon votre structure API réelle
 */
export const transformApiDataToComponentFormat = ( apiData ) =>
{
    return {
        projectName: apiData.name || 'Projet sans nom',
        projectType: apiData.type || 'Non spécifié',
        status: apiData.status || 'Nouveau',
        budget: apiData.budget || 0,
        teamSize: apiData.team?.length || 0,
        progress: calculateProgress( apiData.tasks ),
        phases: {
            preproduction: {
                status: apiData.phases?.preproduction?.status || 'À venir',
                completion: apiData.phases?.preproduction?.completion || 0,
                tasks: apiData.phases?.preproduction?.taskCount || 0,
                completedTasks: apiData.phases?.preproduction?.completedCount || 0,
                icon: '🎬',
                color: '#3b82f6',
                badgeBg: '#3b82f6',
            },
            production: {
                status: apiData.phases?.production?.status || 'À venir',
                completion: apiData.phases?.production?.completion || 0,
                tasks: apiData.phases?.production?.taskCount || 0,
                completedTasks: apiData.phases?.production?.completedCount || 0,
                icon: '📹',
                color: '#f59e0b',
                badgeBg: '#f59e0b',
            },
            postproduction: {
                status: apiData.phases?.postproduction?.status || 'À venir',
                completion: apiData.phases?.postproduction?.completion || 0,
                tasks: apiData.phases?.postproduction?.taskCount || 0,
                completedTasks: apiData.phases?.postproduction?.completedCount || 0,
                icon: '🎞️',
                color: '#10b981',
                badgeBg: '#10b981',
            },
        },
        // Transformer les données d'équipe
        teamData: apiData.team?.map( member => ( {
            name: member.role || member.position,
            count: countByRole( apiData.team, member.role ),
        } ) ) || [],

        // Données de genre
        genderData: [
            {
                name: 'Femmes',
                value: apiData.team?.filter( m => m.gender === 'female' ).length || 0,
                color: '#ec4899',
            },
            {
                name: 'Hommes',
                value: apiData.team?.filter( m => m.gender === 'male' ).length || 0,
                color: '#3b82f6',
            },
        ],

        // Données de budget
        budgetData: apiData.budget?.breakdown || [
            { category: 'Équipe', amount: 0 },
            { category: 'Équipement', amount: 0 },
            { category: 'Locations', amount: 0 },
            { category: 'Autre', amount: 0 },
        ],

        // Données de progression temporelle
        timelineData: generateTimelineData( apiData.startDate, apiData.tasks ),
    };
};

/**
 * Calculer le pourcentage global du projet
 */
function calculateProgress( tasks )
{
    if ( !tasks || tasks.length === 0 ) return 0;
    const completed = tasks.filter( t => t.completed ).length;
    return Math.round( ( completed / tasks.length ) * 100 );
}

/**
 * Compter le nombre de membres par rôle
 */
function countByRole( team, role )
{
    return team.filter( member => member.role === role ).length;
}

/**
 * Générer les données de progression temporelle
 */
function generateTimelineData( startDate, tasks )
{
    // Générer des points de données semaine après semaine
    // basés sur les tâches complétées
    const weeks = [];
    const start = new Date( startDate );

    for ( let i = 0; i < 6; i++ )
    {
        const weekDate = new Date( start );
        weekDate.setDate( weekDate.getDate() + i * 7 );

        // Calculer le pourcentage de tâches complétées jusqu'à cette semaine
        const completedByWeek = tasks.filter( t =>
            new Date( t.completedDate ) <= weekDate
        ).length;

        weeks.push( {
            date: `Sem ${ i + 1 }`,
            progress: Math.round( ( completedByWeek / tasks.length ) * 100 ),
        } );
    }

    return weeks;
}

/**
 * Exemple de structure API attendue:
 * 
 * GET /api/projects/:projectId
 * {
 *   id: 1,
 *   name: "Mon Projet",
 *   type: "Film",
 *   status: "En Production",
 *   budget: 150000,
 *   startDate: "2024-01-15",
 *   endDate: "2025-03-15",
 *   team: [
 *     { id: 1, name: "Alice", role: "Réalisateur", gender: "female" },
 *     { id: 2, name: "Bob", role: "Producteur", gender: "male" },
 *     ...
 *   ],
 *   tasks: [
 *     { id: 1, title: "Tâche 1", completed: true, completedDate: "2024-01-20" },
 *     ...
 *   ],
 *   phases: {
 *     preproduction: {
 *       status: "Terminée",
 *       completion: 100,
 *       taskCount: 24,
 *       completedCount: 24
 *     },
 *     production: {
 *       status: "En cours",
 *       completion: 65,
 *       taskCount: 40,
 *       completedCount: 26
 *     },
 *     postproduction: {
 *       status: "À venir",
 *       completion: 0,
 *       taskCount: 30,
 *       completedCount: 0
 *     }
 *   },
 *   budget: {
 *     breakdown: [
 *       { category: "Équipe", amount: 45000 },
 *       { category: "Équipement", amount: 35000 },
 *       { category: "Locations", amount: 40000 },
 *       { category: "Autre", amount: 30000 }
 *     ]
 *   }
 * }
 */

export default ProjectOverviewIntegration;
