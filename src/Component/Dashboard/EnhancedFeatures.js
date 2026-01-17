/**
 * Additional Features & Enhancements for ProjectOverview
 * 
 * Ce fichier contient des fonctionnalités supplémentaires que vous pouvez ajouter
 * au composant ProjectOverview pour l'enrichir davantage.
 */

// ============================================
// 1. COMPOSANT POUR FILTRES TEMPORELS
// ============================================

export const TimeRangeFilter = ( { onChange } ) =>
{
    return (
        <div style={ { marginBottom: '20px', display: 'flex', gap: '10px' } }>
            <button onClick={ () => onChange( 'week' ) } style={ buttonStyle }>
                Cette Semaine
            </button>
            <button onClick={ () => onChange( 'month' ) } style={ buttonStyle }>
                Ce Mois
            </button>
            <button onClick={ () => onChange( 'quarter' ) } style={ buttonStyle }>
                Ce Trimestre
            </button>
            <button onClick={ () => onChange( 'all' ) } style={ buttonStyle }>
                Tout
            </button>
        </div>
    );
};

const buttonStyle = {
    padding: '8px 16px',
    borderRadius: '6px',
    border: 'none',
    backgroundColor: '#667eea',
    color: 'white',
    cursor: 'pointer',
    fontWeight: '500',
    transition: 'all 0.3s ease',
};

// ============================================
// 2. COMPOSANT POUR EXPORT DE DONNÉES
// ============================================

export const ExportButtons = ( { projectData } ) =>
{
    const exportToCSV = () =>
    {
        const csv = `
Projet,Statut,Budget,Équipe,Avancement
"${ projectData.projectName }","${ projectData.status }","${ projectData.budget }€","${ projectData.teamSize }","${ projectData.progress }%"
    `.trim();

        const element = document.createElement( 'a' );
        element.setAttribute( 'href', 'data:text/csv;charset=utf-8,' + encodeURIComponent( csv ) );
        element.setAttribute( 'download', `${ projectData.projectName }-data.csv` );
        element.click();
    };

    const exportToJSON = () =>
    {
        const element = document.createElement( 'a' );
        element.setAttribute(
            'href',
            'data:application/json;charset=utf-8,' + encodeURIComponent( JSON.stringify( projectData, null, 2 ) )
        );
        element.setAttribute( 'download', `${ projectData.projectName }-data.json` );
        element.click();
    };

    return (
        <div style={ { marginBottom: '20px', display: 'flex', gap: '10px' } }>
            <button onClick={ exportToCSV } style={ { ...buttonStyle, backgroundColor: '#10b981' } }>
                📊 Exporter CSV
            </button>
            <button onClick={ exportToJSON } style={ { ...buttonStyle, backgroundColor: '#f59e0b' } }>
                📄 Exporter JSON
            </button>
            <button onClick={ () => window.print() } style={ { ...buttonStyle, backgroundColor: '#8b5cf6' } }>
                🖨️ Imprimer
            </button>
        </div>
    );
};

// ============================================
// 3. COMPOSANT POUR ALERTES ET NOTIFICATIONS
// ============================================

export const ProjectAlerts = ( { projectData } ) =>
{
    const alerts = [];

    // Alerte si avancement < 50%
    if ( projectData.progress < 50 )
    {
        alerts.push( {
            type: 'warning',
            message: '⚠️ Le projet est moins de 50% complété. Accélérez le rythme!',
        } );
    }

    // Alerte si budget dépensé > 80%
    if ( projectData.budget < 30000 )
    {
        alerts.push( {
            type: 'danger',
            message: '🚨 Budget restant faible. Attention aux dépenses!',
        } );
    }

    // Alerte si déséquilibre de genre
    const [ women, men ] = projectData.genderData;
    if ( Math.abs( women.value - men.value ) > 5 )
    {
        alerts.push( {
            type: 'info',
            message: '💡 Considérez d\'ajuster la composition de genre de l\'équipe.',
        } );
    }

    // Alerte si post-production pas commencée
    if ( projectData.phases.postproduction.completion === 0 && projectData.progress > 70 )
    {
        alerts.push( {
            type: 'info',
            message: 'ℹ️ Préparez-vous à commencer la postproduction très bientôt.',
        } );
    }

    return (
        <div style={ { marginBottom: '20px' } }>
            { alerts.map( ( alert, index ) => (
                <div
                    key={ index }
                    style={ {
                        padding: '12px 16px',
                        marginBottom: '10px',
                        borderRadius: '6px',
                        backgroundColor:
                            alert.type === 'warning'
                                ? '#fef3c7'
                                : alert.type === 'danger'
                                    ? '#fee2e2'
                                    : '#dbeafe',
                        borderLeft: `4px solid ${ alert.type === 'warning' ? '#f59e0b' : alert.type === 'danger' ? '#ef4444' : '#3b82f6' }`,
                        color: '#333',
                    } }
                >
                    { alert.message }
                </div>
            ) ) }
        </div>
    );
};

// ============================================
// 4. COMPOSANT POUR STATISTIQUES ADDITIONNELLES
// ============================================

export const AdditionalStats = ( { projectData } ) =>
{
    const calculateDaysRemaining = ( endDate ) =>
    {
        const today = new Date();
        const end = new Date( endDate );
        const diffTime = Math.abs( end - today );
        const diffDays = Math.ceil( diffTime / ( 1000 * 60 * 60 * 24 ) );
        return diffDays;
    };

    const budgetPerMember = Math.round( projectData.budget / projectData.teamSize );
    const { tasksPer, Person } = Math.round(
        ( projectData.phases.production.tasks / projectData.teamSize ).toFixed( 1 )
    );
    const daysRemaining = calculateDaysRemaining( projectData.endDate );

    return (
        <div style={ { display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(200px, 1fr))', gap: '15px', marginBottom: '30px' } }>
            <StatBox label="Budget par Personne" value={ `${ budgetPerMember }€` } icon="💰" />
            <StatBox label="Tâches par Personne" value={ { tasksPer, Person } } icon="✅" />
            <StatBox label="Jours Restants" value={ daysRemaining } icon="📅" />
            <StatBox label="Taux de Complétion" value={ `${ projectData.progress }%` } icon="📊" />
        </div>
    );
};

const StatBox = ( { label, value, icon } ) => (
    <div style={ {
        padding: '15px',
        backgroundColor: 'white',
        borderRadius: '8px',
        boxShadow: '0 2px 8px rgba(0,0,0,0.1)',
        textAlign: 'center',
    } }>
        <div style={ { fontSize: '2em', marginBottom: '8px' } }>{ icon }</div>
        <div style={ { color: '#666', fontSize: '0.9em', marginBottom: '5px' } }>{ label }</div>
        <div style={ { fontSize: '1.5em', fontWeight: 'bold', color: '#333' } }>{ value }</div>
    </div>
);

// ============================================
// 5. COMPOSANT POUR COMPARAISON BUDGET
// ============================================

export const BudgetComparison = ( { planned, actual } ) =>
{
    const difference = actual - planned;
    const percentDiff = ( ( difference / planned ) * 100 ).toFixed( 1 );

    return (
        <div style={ {
            padding: '20px',
            backgroundColor: 'white',
            borderRadius: '8px',
            marginBottom: '20px',
            boxShadow: '0 2px 8px rgba(0,0,0,0.1)',
        } }>
            <h3>💵 Comparaison Budget Prévu vs Réel</h3>
            <div style={ { display: 'flex', justifyContent: 'space-around', marginTop: '15px' } }>
                <div>
                    <div style={ { fontSize: '0.9em', color: '#666' } }>Prévu</div>
                    <div style={ { fontSize: '1.8em', fontWeight: 'bold', color: '#667eea' } }>
                        { planned.toLocaleString( 'fr-FR' ) }€
                    </div>
                </div>
                <div>
                    <div style={ { fontSize: '0.9em', color: '#666' } }>Réel</div>
                    <div style={ { fontSize: '1.8em', fontWeight: 'bold', color: '#10b981' } }>
                        { actual.toLocaleString( 'fr-FR' ) }€
                    </div>
                </div>
                <div>
                    <div style={ { fontSize: '0.9em', color: '#666' } }>Écart</div>
                    <div style={ {
                        fontSize: '1.8em',
                        fontWeight: 'bold',
                        color: difference > 0 ? '#ef4444' : '#10b981'
                    } }>
                        { difference > 0 ? '+' : '' }{ difference.toLocaleString( 'fr-FR' ) }€
                    </div>
                    <div style={ { fontSize: '0.85em', color: difference > 0 ? '#ef4444' : '#10b981' } }>
                        ({ percentDiff }%)
                    </div>
                </div>
            </div>
        </div>
    );
};

// ============================================
// 6. COMPOSANT POUR RISQUES DU PROJET
// ============================================

export const RiskAssessment = ( { projectData } ) =>
{
    const risks = [];

    // Analyser les risques
    if ( projectData.progress < 30 && projectData.progress > 10 )
    {
        risks.push( { level: 'medium', title: 'Retard Potentiel', description: 'Le projet ne progresse pas assez vite' } );
    }

    if ( projectData.budget * 0.2 < 50000 )
    {
        risks.push( { level: 'high', title: 'Risque Financier', description: 'Peu de budget restant' } );
    }

    if ( projectData.teamSize < 5 )
    {
        risks.push( { level: 'medium', title: 'Équipe Réduite', description: 'Équipe petite = moins de flexibilité' } );
    }

    return (
        <div style={ {
            padding: '20px',
            backgroundColor: 'white',
            borderRadius: '8px',
            marginBottom: '20px',
            boxShadow: '0 2px 8px rgba(0,0,0,0.1)',
        } }>
            <h3>⚠️ Évaluation des Risques</h3>
            { risks.length === 0 ? (
                <p style={ { color: '#10b981', fontWeight: 'bold' } }>✅ Aucun risque majeur détecté</p>
            ) : (
                <div>
                    { risks.map( ( risk, index ) => (
                        <div
                            key={ index }
                            style={ {
                                padding: '12px',
                                marginBottom: '10px',
                                borderLeft: `4px solid ${ risk.level === 'high' ? '#ef4444' : '#f59e0b' }`,
                                backgroundColor: risk.level === 'high' ? '#fee2e2' : '#fef3c7',
                                borderRadius: '4px',
                            } }
                        >
                            <strong>{ risk.title }</strong>: { risk.description }
                        </div>
                    ) ) }
                </div>
            ) }
        </div>
    );
};

// ============================================
// 7. HOOK PERSONNALISÉ POUR CALCULS
// ============================================

export const useProjectMetrics = ( projectData ) =>
{
    return {
        avgProgressPerWeek: ( projectData.progress / 6 ).toFixed( 1 ), // Assumant 6 semaines
        budgetPercentageUsed: ( ( projectData.budget * 0.65 ) / projectData.budget * 100 ).toFixed( 1 ), // Simulation
        teamProductivity: ( projectData.progress / projectData.teamSize ).toFixed( 1 ), // % par personne
        phasesCompleted: Object.values( projectData.phases ).filter( p => p.completion === 100 ).length,
    };
};

// ============================================
// 8. EXEMPLE D'UTILISATION COMPLET
// ============================================

/*
import ProjectOverview from './ProjectOverview';

function EnhancedDashboard({ projectData }) {
  const [timeRange, setTimeRange] = useState('month');
  const metrics = useProjectMetrics(projectData);

  return (
    <div>
      <ProjectAlerts projectData={projectData} />
      <TimeRangeFilter onChange={setTimeRange} />
      <ExportButtons projectData={projectData} />
      <RiskAssessment projectData={projectData} />
      <AdditionalStats projectData={projectData} />
      <BudgetComparison planned={projectData.budget} actual={projectData.budget * 0.65} />
      <ProjectOverview />
    </div>
  );
}

export default EnhancedDashboard;
*/

// ============================================
// 9. UTILITAIRES DE FORMATAGE
// ============================================

export const formatters = {
    currency: ( value ) => new Intl.NumberFormat( 'fr-FR', {
        style: 'currency',
        currency: 'EUR',
    } ).format( value ),

    percentage: ( value ) => `${ value.toFixed( 1 ) }%`,

    date: ( date ) => new Intl.DateTimeFormat( 'fr-FR', {
        year: 'numeric',
        month: 'long',
        day: 'numeric',
    } ).format( new Date( date ) ),

    number: ( value ) => new Intl.NumberFormat( 'fr-FR' ).format( value ),
};

// ============================================
// 10. CONFIGURATION THEME
// ============================================

export const themeConfig = {
    colors: {
        primary: '#667eea',
        secondary: '#764ba2',
        success: '#10b981',
        warning: '#f59e0b',
        danger: '#ef4444',
        info: '#3b82f6',
    },
    spacing: {
        xs: '8px',
        sm: '12px',
        md: '16px',
        lg: '24px',
        xl: '32px',
    },
    breakpoints: {
        mobile: '768px',
        tablet: '1024px',
        desktop: '1440px',
    },
};

export default {
    TimeRangeFilter,
    ExportButtons,
    ProjectAlerts,
    AdditionalStats,
    BudgetComparison,
    RiskAssessment,
    useProjectMetrics,
    formatters,
    themeConfig,
};
