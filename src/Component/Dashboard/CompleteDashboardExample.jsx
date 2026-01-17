/**
 * EXEMPLE COMPLET: Dashboard avec Toutes les Fonctionnalités
 * 
 * Ce fichier montre comment utiliser ProjectOverview avec toutes
 * les fonctionnalités et améliorations disponibles.
 */

import React, { useState, useEffect } from 'react';
import ProjectOverview from './ProjectOverview';
import
    {
        TimeRangeFilter,
        ExportButtons,
        ProjectAlerts,
        AdditionalStats,
        BudgetComparison,
        RiskAssessment,
        useProjectMetrics,
        formatters,
    } from './EnhancedFeatures';

/**
 * Composant Dashboard Complet
 * 
 * Montre comment intégrer:
 * - Composant principal ProjectOverview
 * - Alertes et risques
 * - Filtres temporels
 * - Exports de données
 * - Statistiques supplémentaires
 * - Comparaison budget
 */
function CompleteDashboard()
{
    const [ projectData, setProjectData ] = useState( null );
    const [ timeRange, setTimeRange ] = useState( 'month' );
    const [ loading, setLoading ] = useState( true );

    // Données mock (à remplacer par API réelle)
    const mockProjectData = {
        projectName: 'Film Documentaire - COP28',
        projectType: 'Documentaire',
        status: 'En Production',
        startDate: '2024-01-15',
        endDate: '2025-03-15',
        budget: 150000,
        budgetUsed: 97500, // 65% utilisé
        teamSize: 12,
        progress: 65,
        phases: {
            preproduction: {
                status: 'Terminée',
                completion: 100,
                tasks: 24,
                completedTasks: 24,
                icon: '🎬',
                color: '#3b82f6',
                badgeBg: '#3b82f6',
            },
            production: {
                status: 'En cours',
                completion: 65,
                tasks: 40,
                completedTasks: 26,
                icon: '📹',
                color: '#f59e0b',
                badgeBg: '#f59e0b',
            },
            postproduction: {
                status: 'À venir',
                completion: 0,
                tasks: 30,
                completedTasks: 0,
                icon: '🎞️',
                color: '#10b981',
                badgeBg: '#10b981',
            },
        },
        teamData: [
            { name: 'Réalisateur', count: 1 },
            { name: 'Producteur', count: 1 },
            { name: 'Chef Opérateur', count: 2 },
            { name: 'Ingénieur Son', count: 1 },
            { name: 'Assistant Production', count: 4 },
            { name: 'Autres', count: 3 },
        ],
        genderData: [
            { name: 'Femmes', value: 5, color: '#ec4899' },
            { name: 'Hommes', value: 7, color: '#3b82f6' },
        ],
        progressData: [
            { phase: 'Pré-prod', completion: 100 },
            { phase: 'Production', completion: 65 },
            { phase: 'Post-prod', completion: 0 },
        ],
        budgetData: [
            { category: 'Équipe', amount: 45000 },
            { category: 'Équipement', amount: 35000 },
            { category: 'Locations', amount: 40000 },
            { category: 'Autre', amount: 30000 },
        ],
        timelineData: [
            { date: 'Sem 1', progress: 10 },
            { date: 'Sem 2', progress: 20 },
            { date: 'Sem 3', progress: 35 },
            { date: 'Sem 4', progress: 45 },
            { date: 'Sem 5', progress: 55 },
            { date: 'Sem 6', progress: 65 },
        ],
    };

    // Simuler le chargement des données
    useEffect( () =>
    {
        const timer = setTimeout( () =>
        {
            setProjectData( mockProjectData );
            setLoading( false );
        }, 500 );

        return () => clearTimeout( timer );
    }, [] );

    // Calculer les métriques
    const metrics = useProjectMetrics( projectData || mockProjectData );

    if ( loading )
    {
        return (
            <div style={ { textAlign: 'center', padding: '50px' } }>
                <div className="spinner"></div>
                <p>Chargement du tableau de bord...</p>
            </div>
        );
    }

    if ( !projectData )
    {
        return <div>Erreur lors du chargement des données</div>;
    }

    return (
        <div style={ { maxWidth: '1600px', margin: '0 auto', padding: '20px' } }>
            {/* ================================ */ }
            {/* 1. ALERTES ET RISQUES */ }
            {/* ================================ */ }
            <section style={ { marginBottom: '40px' } }>
                <ProjectAlerts projectData={ projectData } />
                <RiskAssessment projectData={ projectData } />
            </section>

            {/* ================================ */ }
            {/* 2. FILTRES ET EXPORTS */ }
            {/* ================================ */ }
            <section style={ { marginBottom: '40px' } }>
                <h2 style={ { fontSize: '1.5em', marginBottom: '15px' } }>🔧 Outils</h2>
                <TimeRangeFilter onChange={ setTimeRange } />
                <ExportButtons projectData={ projectData } />
            </section>

            {/* ================================ */ }
            {/* 3. STATISTIQUES SUPPLÉMENTAIRES */ }
            {/* ================================ */ }
            <section style={ { marginBottom: '40px' } }>
                <h2 style={ { fontSize: '1.5em', marginBottom: '15px' } }>📊 Métriques Clés</h2>
                <div style={ {
                    display: 'grid',
                    gridTemplateColumns: 'repeat(auto-fit, minmax(250px, 1fr))',
                    gap: '15px',
                    marginBottom: '20px'
                } }>
                    <MetricCard
                        label="Avancement par Semaine"
                        value={ `${ metrics.avgProgressPerWeek }%` }
                        icon="📈"
                        description="Moyenne de progression"
                    />
                    <MetricCard
                        label="Budget Dépensé"
                        value={ `${ metrics.budgetPercentageUsed }%` }
                        icon="💰"
                        description="du budget total"
                    />
                    <MetricCard
                        label="Productivité Équipe"
                        value={ `${ metrics.teamProductivity }%` }
                        icon="👥"
                        description="par personne"
                    />
                    <MetricCard
                        label="Phases Terminées"
                        value={ metrics.phasesCompleted }
                        icon="✅"
                        description={ `sur ${ Object.keys( projectData.phases ).length }` }
                    />
                </div>
            </section>

            {/* ================================ */ }
            {/* 4. COMPARAISON BUDGET */ }
            {/* ================================ */ }
            <section style={ { marginBottom: '40px' } }>
                <BudgetComparison
                    planned={ projectData.budget }
                    actual={ projectData.budgetUsed }
                />
            </section>

            {/* ================================ */ }
            {/* 5. DASHBOARD PRINCIPAL */ }
            {/* ================================ */ }
            <section style={ { marginBottom: '40px' } }>
                <h2 style={ { fontSize: '1.5em', marginBottom: '15px' } }>📊 Tableau de Bord Complet</h2>
                <ProjectOverview />
            </section>

            {/* ================================ */ }
            {/* 6. NOTES ET RÉSUMÉ */ }
            {/* ================================ */ }
            <section style={ {
                backgroundColor: '#f0f9ff',
                padding: '20px',
                borderRadius: '8px',
                borderLeft: '4px solid #3b82f6'
            } }>
                <h3>📝 Résumé Exécutif</h3>
                <ul style={ { lineHeight: '1.8', color: '#333' } }>
                    <li>✅ Préproduction: <strong>100% complétée</strong></li>
                    <li>🎬 Production: <strong>{ projectData.progress }% en cours</strong> - 26/40 tâches</li>
                    <li>⏰ Planning: <strong>En train de progresse à { metrics.avgProgressPerWeek }% par semaine</strong></li>
                    <li>💰 Budget: <strong>{ metrics.budgetPercentageUsed }% dépensé</strong> - { formatters.currency( projectData.budget - projectData.budgetUsed ) } restant</li>
                    <li>👥 Équipe: <strong>{ projectData.teamSize } personnes</strong> - Équilibre genre bon</li>
                </ul>
            </section>

            {/* ================================ */ }
            {/* 7. CONSEILS PRATIQUES */ }
            {/* ================================ */ }
            <section style={ {
                marginTop: '40px',
                padding: '20px',
                backgroundColor: '#f3f4f6',
                borderRadius: '8px'
            } }>
                <h3>💡 Recommandations</h3>
                <ol style={ { lineHeight: '1.8', color: '#555' } }>
                    <li>La production progresse bien à 65%, maintenir ce rythme</li>
                    <li>Budget à 65% consommé, surveiller les dépenses restantes</li>
                    <li>Préparer l'équipe de postproduction pour démarrer dans 3 semaines</li>
                    <li>L'équilibre de genre est bon, maintenir cette diversité</li>
                    <li>Aucun risque majeur détecté, continuer à cette cadence</li>
                </ol>
            </section>
        </div>
    );
}

/**
 * Composant Card pour les Métriques
 */
function MetricCard( { label, value, icon, description } )
{
    return (
        <div style={ {
            padding: '20px',
            backgroundColor: 'white',
            borderRadius: '8px',
            boxShadow: '0 2px 8px rgba(0,0,0,0.1)',
            textAlign: 'center',
            border: '1px solid #e5e7eb'
        } }>
            <div style={ { fontSize: '2em', marginBottom: '10px' } }>{ icon }</div>
            <div style={ { fontSize: '0.85em', color: '#666', marginBottom: '8px' } }>
                { label }
            </div>
            <div style={ { fontSize: '2em', fontWeight: 'bold', color: '#667eea', marginBottom: '5px' } }>
                { value }
            </div>
            <div style={ { fontSize: '0.8em', color: '#999' } }>
                { description }
            </div>
        </div>
    );
}

// ============================================
// ÉTAPES D'INTÉGRATION
// ============================================

/*
1. Installer les dépendances:
   npm install recharts

2. Importer le composant:
   import CompleteDashboard from '@/Component/Dashboard/CompleteDashboardExample';

3. Utiliser dans votre route:
   <Route path="/project/:projectid" element={<CompleteDashboard />} />

4. Remplacer les données mockées par vos API:
   - Utiliser useEffect pour fetch les données réelles
   - Transformer les données avec transformApiDataToComponentFormat()
   - Passer les données à ProjectOverview

5. Tester:
   - Vérifier tous les graphiques
   - Tester la responsivité
   - Vérifier les alertes
   - Tester les exports

6. Déployer:
   - S'assurer que recharts est dans package.json
   - Vérifier les permissions CORS pour l'API
   - Tester en production
*/

// ============================================
// CUSTOMISATION
// ============================================

/*
Pour personnaliser le dashboard:

1. Modifier les couleurs:
   Éditer themeConfig.colors dans EnhancedFeatures.js

2. Ajouter plus de graphiques:
   Duplicater une ChartCard dans ProjectOverview.jsx

3. Ajouter plus de filtres:
   Ajouter des options à TimeRangeFilter

4. Modifier les alertes:
   Éditer la logique dans ProjectAlerts

5. Ajouter des exports:
   Modifier ExportButtons pour ajouter PDF, Excel, etc.
*/

export default CompleteDashboard;
