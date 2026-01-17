import React, { useState, useEffect } from 'react';
import
{
    BarChart,
    Bar,
    LineChart,
    Line,
    PieChart,
    Pie,
    Cell,
    XAxis,
    YAxis,
    CartesianGrid,
    Tooltip,
    Legend,
    ResponsiveContainer,
} from 'recharts';
import
{
    Users,
    Calendar,
    Zap,
    TrendingUp,
    CheckCircle,
    AlertCircle,
    Info,
} from 'lucide-react';
import styled from 'styled-components';
import './ProjectOverview.css';

// Styled Components
const DashboardContainer = styled.div`
  width: 100%;
  max-width: 1400px;
  margin: 0 auto;
  padding: 30px 20px;
  background: linear-gradient(135deg, #f5f7fa 0%, #c3cfe2 100%);
  min-height: 100vh;
  font-family: 'Segoe UI', Tahoma, Geneva, Verdana, sans-serif;

  @media (max-width: 768px) {
    padding: 20px 15px;
  }
`;

const HeaderSection = styled.div`
  margin-bottom: 40px;
  padding: 20px;
  background: linear-gradient(135deg, #667eea 0%, #764ba2 100%);
  border-radius: 15px;
  color: white;
  box-shadow: 0 8px 32px rgba(0, 0, 0, 0.1);

  h1 {
    margin: 0 0 10px 0;
    font-size: 2.5em;
    font-weight: 700;

    @media (max-width: 768px) {
      font-size: 1.8em;
    }
  }

  p {
    margin: 5px 0;
    opacity: 0.95;
    font-size: 1.1em;

    @media (max-width: 768px) {
      font-size: 0.95em;
    }
  }
`;

const ProgressContainer = styled.div`
  margin-top: 20px;
  padding-top: 20px;
  border-top: 2px solid rgba(255, 255, 255, 0.3);

  h3 {
    margin: 0 0 15px 0;
    font-size: 1.2em;
    display: flex;
    align-items: center;
    gap: 10px;
  }
`;

const ProgressBar = styled.div`
  width: 100%;
  height: 12px;
  background: rgba(255, 255, 255, 0.3);
  border-radius: 20px;
  overflow: hidden;
  margin-bottom: 10px;

  .progress-fill {
    height: 100%;
    background: linear-gradient(90deg, #4ade80 0%, #22c55e 100%);
    width: ${ ( props ) => props.percentage }%;
    transition: width 0.5s ease;
    border-radius: 20px;
  }
`;

const ProgressText = styled.p`
  margin: 10px 0 0 0;
  font-size: 0.95em;
  opacity: 0.9;

  strong {
    font-weight: 700;
    font-size: 1.2em;
  }
`;

const PhasesContainer = styled.div`
  display: grid;
  grid-template-columns: repeat(auto-fit, minmax(300px, 1fr));
  gap: 25px;
  margin-bottom: 40px;

  @media (max-width: 768px) {
    grid-template-columns: 1fr;
    gap: 20px;
  }
`;

const PhaseCard = styled.div`
  background: white;
  border-radius: 12px;
  padding: 25px;
  box-shadow: 0 4px 15px rgba(0, 0, 0, 0.08);
  border-left: 5px solid ${ ( props ) => props.color };
  transition: transform 0.3s ease, box-shadow 0.3s ease;

  &:hover {
    transform: translateY(-5px);
    box-shadow: 0 8px 25px rgba(0, 0, 0, 0.12);
  }

  h3 {
    margin: 0 0 15px 0;
    font-size: 1.3em;
    color: ${ ( props ) => props.color };
    display: flex;
    align-items: center;
    gap: 10px;
    font-weight: 600;
  }

  .info-item {
    display: flex;
    justify-content: space-between;
    padding: 8px 0;
    border-bottom: 1px solid #f0f0f0;
    font-size: 0.95em;

    &:last-child {
      border-bottom: none;
    }

    label {
      color: #666;
      font-weight: 500;
    }

    value {
      font-weight: 700;
      color: #333;
    }
  }

  .status-badge {
    display: inline-block;
    margin-top: 12px;
    padding: 6px 12px;
    background: ${ ( props ) => props.badgeBg };
    color: white;
    border-radius: 20px;
    font-size: 0.85em;
    font-weight: 600;
  }
`;

const ChartsContainer = styled.div`
  display: grid;
  grid-template-columns: repeat(auto-fit, minmax(500px, 1fr));
  gap: 30px;
  margin-bottom: 40px;

  @media (max-width: 1024px) {
    grid-template-columns: 1fr;
    gap: 25px;
  }

  @media (max-width: 768px) {
    grid-template-columns: 1fr;
    gap: 20px;
  }
`;

const ChartCard = styled.div`
  background: white;
  border-radius: 12px;
  padding: 25px;
  box-shadow: 0 4px 15px rgba(0, 0, 0, 0.08);
  transition: transform 0.3s ease, box-shadow 0.3s ease;

  &:hover {
    box-shadow: 0 8px 25px rgba(0, 0, 0, 0.12);
  }

  h3 {
    margin: 0 0 10px 0;
    font-size: 1.3em;
    color: #333;
    display: flex;
    align-items: center;
    gap: 10px;
    font-weight: 600;
  }

  .chart-description {
    font-size: 0.9em;
    color: #666;
    margin-bottom: 15px;
    padding: 10px;
    background: #f8f9fa;
    border-left: 3px solid #667eea;
    border-radius: 4px;
    display: flex;
    align-items: center;
    gap: 8px;

    .info-icon {
      flex-shrink: 0;
      color: #667eea;
    }
  }

  .recharts-responsive-container {
    margin-top: 20px;
  }
`;

const StatsGrid = styled.div`
  display: grid;
  grid-template-columns: repeat(auto-fit, minmax(250px, 1fr));
  gap: 20px;
  margin-bottom: 40px;

  @media (max-width: 768px) {
    grid-template-columns: repeat(auto-fit, minmax(200px, 1fr));
    gap: 15px;
  }
`;

const StatCard = styled.div`
  background: white;
  border-radius: 12px;
  padding: 20px;
  box-shadow: 0 4px 15px rgba(0, 0, 0, 0.08);
  text-align: center;
  border-top: 3px solid ${ ( props ) => props.borderColor };
  transition: transform 0.3s ease;

  &:hover {
    transform: translateY(-3px);
  }

  .stat-icon {
    font-size: 2.5em;
    margin-bottom: 10px;
  }

  .stat-value {
    font-size: 2em;
    font-weight: 700;
    color: ${ ( props ) => props.textColor };
    margin: 10px 0;
  }

  .stat-label {
    color: #666;
    font-size: 0.95em;
    font-weight: 500;
  }
`;

const InfoBanner = styled.div`
  background: linear-gradient(135deg, #667eea 0%, #764ba2 100%);
  color: white;
  padding: 20px;
  border-radius: 12px;
  margin-bottom: 30px;
  display: flex;
  align-items: flex-start;
  gap: 15px;
  box-shadow: 0 4px 15px rgba(0, 0, 0, 0.1);

  .icon {
    flex-shrink: 0;
    margin-top: 2px;
  }

  .content {
    flex: 1;

    h4 {
      margin: 0 0 8px 0;
      font-size: 1.1em;
      font-weight: 600;
    }

    p {
      margin: 0;
      font-size: 0.95em;
      opacity: 0.95;
    }
  }

  @media (max-width: 768px) {
    flex-direction: column;

    .icon {
      margin-top: 0;
    }
  }
`;

// Mock Data Generator
const generateMockData = () =>
{
    const projectProgress = 65;
    const members = 12;
    const women = 5;
    const men = 7;

    return {
        projectName: 'Nom du Projet',
        projectType: 'Film Documentaire',
        status: 'En Production',
        startDate: '2024-01-15',
        endDate: '2025-03-15',
        budget: 150000,
        teamSize: members,
        progress: projectProgress,
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
            { name: 'Femmes', value: women, color: '#ec4899' },
            { name: 'Hommes', value: men, color: '#3b82f6' },
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
};

/**
 * ProjectOverview Component
 * 
 * Composant de tableau de bord complet pour visualiser:
 * - L'état d'avancement du projet
 * - Les trois phases du projet (préproduction, production, postproduction)
 * - Les statistiques de l'équipe
 * - Graphiques professionnels et modernes
 * - Composition de l'équipe par genre
 * - Distribution du budget
 * - Progression temporelle
 */
function ProjectOverview()
{
    const [ projectData, setProjectData ] = useState( null );
    const [ loading, setLoading ] = useState( true );

    useEffect( () =>
    {
        // Simuler le chargement des données
        const timer = setTimeout( () =>
        {
            setProjectData( generateMockData() );
            setLoading( false );
        }, 500 );

        return () => clearTimeout( timer );
    }, [] );

    if ( loading )
    {
        return (
            <DashboardContainer>
                <div style={ { textAlign: 'center', padding: '50px' } }>
                    <div className="spinner"></div>
                    <p>Chargement du tableau de bord...</p>
                </div>
            </DashboardContainer>
        );
    }

    if ( !projectData )
    {
        return <div>Erreur lors du chargement des données</div>;
    }

    const { phases, teamData, genderData, progressData, budgetData, timelineData } =
        projectData;

    return (
        <DashboardContainer>
            {/* Header Section */ }
            <HeaderSection>
                <h1>📊 Tableau de Bord du Projet</h1>
                <p>
                    <strong>{ projectData.projectName }</strong> - { projectData.projectType }
                </p>
                <p>Statut: { projectData.status }</p>

                <ProgressContainer>
                    <h3>
                        <TrendingUp size={ 20 } />
                        Avancement Global du Projet
                    </h3>
                    <ProgressBar percentage={ projectData.progress }>
                        <div className="progress-fill"></div>
                    </ProgressBar>
                    <ProgressText>
                        <strong>{ projectData.progress }%</strong> du projet complété
                    </ProgressText>
                </ProgressContainer>
            </HeaderSection>

            {/* Info Banner */ }
            <InfoBanner>
                <div className="icon">
                    <Info size={ 24 } />
                </div>
                <div className="content">
                    <h4>Aperçu du Tableau de Bord</h4>
                    <p>
                        Ce tableau de bord vous permet de suivre l'évolution de votre projet en
                        temps réel. Vous trouverez des graphiques détaillés sur la composition
                        de votre équipe, votre budget et la progression par phase.
                    </p>
                </div>
            </InfoBanner>

            {/* Quick Stats */ }
            <StatsGrid>
                <StatCard borderColor="#667eea" textColor="#667eea">
                    <div className="stat-icon">👥</div>
                    <div className="stat-value">{ projectData.teamSize }</div>
                    <div className="stat-label">Membres de l'équipe</div>
                </StatCard>

                <StatCard borderColor="#f59e0b" textColor="#f59e0b">
                    <div className="stat-icon">💰</div>
                    <div className="stat-value">{ ( projectData.budget / 1000 ).toFixed( 0 ) }k€</div>
                    <div className="stat-label">Budget Total</div>
                </StatCard>

                <StatCard borderColor="#10b981" textColor="#10b981">
                    <div className="stat-icon">📅</div>
                    <div className="stat-value">14</div>
                    <div className="stat-label">Semaines Restantes</div>
                </StatCard>

                <StatCard borderColor="#8b5cf6" textColor="#8b5cf6">
                    <div className="stat-icon">✅</div>
                    <div className="stat-value">50</div>
                    <div className="stat-label">Tâches Complétées</div>
                </StatCard>
            </StatsGrid>

            {/* Phases Section */ }
            <h2 style={ { marginBottom: '20px', fontSize: '1.8em', color: '#333' } }>
                📌 Phases du Projet
            </h2>
            <PhasesContainer>
                { Object.entries( phases ).map( ( [ key, phase ] ) => (
                    <PhaseCard key={ key } color={ phase.color } badgeBg={ phase.badgeBg }>
                        <h3>
                            { phase.icon } { key.charAt( 0 ).toUpperCase() + key.slice( 1 ) }
                        </h3>
                        <div className="info-item">
                            <label>Statut:</label>
                            <value>{ phase.status }</value>
                        </div>
                        <div className="info-item">
                            <label>Avancement:</label>
                            <value>{ phase.completion }%</value>
                        </div>
                        <div className="info-item">
                            <label>Tâches:</label>
                            <value>
                                { phase.completedTasks }/{ phase.tasks }
                            </value>
                        </div>
                        <span className="status-badge">{ phase.status }</span>
                    </PhaseCard>
                ) ) }
            </PhasesContainer>

            {/* Charts Section */ }
            <h2 style={ { marginBottom: '20px', fontSize: '1.8em', color: '#333' } }>
                📈 Statistiques Détaillées
            </h2>
            <ChartsContainer>
                {/* Chart 1: Team Composition */ }
                <ChartCard>
                    <h3>
                        <Users size={ 20 } />
                        Composition de l'Équipe
                    </h3>
                    <div className="chart-description">
                        <AlertCircle size={ 16 } className="info-icon" />
                        Répartition des rôles et responsabilités au sein de votre équipe
                        production.
                    </div>
                    <ResponsiveContainer width="100%" height={ 300 }>
                        <BarChart data={ teamData }>
                            <CartesianGrid strokeDasharray="3 3" stroke="#e5e7eb" />
                            <XAxis dataKey="name" angle={ -45 } textAnchor="end" height={ 100 } />
                            <YAxis />
                            <Tooltip
                                contentStyle={ {
                                    background: '#fff',
                                    border: '1px solid #ccc',
                                    borderRadius: '8px',
                                } }
                            />
                            <Bar dataKey="count" fill="#667eea" radius={ [ 8, 8, 0, 0 ] } />
                        </BarChart>
                    </ResponsiveContainer>
                </ChartCard>

                {/* Chart 2: Gender Distribution */ }
                <ChartCard>
                    <h3>
                        <Users size={ 20 } />
                        Diversité de Genre
                    </h3>
                    <div className="chart-description">
                        <AlertCircle size={ 16 } className="info-icon" />
                        Répartition femmes/hommes dans l'équipe pour promouvoir l'égalité.
                    </div>
                    <ResponsiveContainer width="100%" height={ 300 }>
                        <PieChart>
                            <Pie
                                data={ genderData }
                                cx="50%"
                                cy="50%"
                                labelLine={ false }
                                label={ ( { name, value } ) => `${ name }: ${ value }` }
                                outerRadius={ 80 }
                                fill="#8884d8"
                                dataKey="value"
                            >
                                { genderData.map( ( entry, index ) => (
                                    <Cell key={ `cell-${ index }` } fill={ entry.color } />
                                ) ) }
                            </Pie>
                            <Tooltip
                                contentStyle={ {
                                    background: '#fff',
                                    border: '1px solid #ccc',
                                    borderRadius: '8px',
                                } }
                            />
                            <Legend />
                        </PieChart>
                    </ResponsiveContainer>
                </ChartCard>

                {/* Chart 3: Budget Distribution */ }
                <ChartCard>
                    <h3>
                        <Zap size={ 20 } />
                        Distribution du Budget
                    </h3>
                    <div className="chart-description">
                        <AlertCircle size={ 16 } className="info-icon" />
                        Ventilation du budget par catégorie pour un meilleur suivi financier.
                    </div>
                    <ResponsiveContainer width="100%" height={ 300 }>
                        <PieChart>
                            <Pie
                                data={ budgetData }
                                cx="50%"
                                cy="50%"
                                labelLine={ false }
                                label={ ( { category, amount } ) =>
                                    `${ category }: ${ ( amount / 1000 ).toFixed( 0 ) }k€`
                                }
                                outerRadius={ 80 }
                                fill="#8884d8"
                                dataKey="amount"
                            >
                                { budgetData.map( ( entry, index ) => (
                                    <Cell
                                        key={ `cell-${ index }` }
                                        fill={ [ '#667eea', '#f59e0b', '#10b981', '#8b5cf6' ][ index ] }
                                    />
                                ) ) }
                            </Pie>
                            <Tooltip
                                formatter={ ( value ) => `${ ( value / 1000 ).toFixed( 0 ) }k€` }
                                contentStyle={ {
                                    background: '#fff',
                                    border: '1px solid #ccc',
                                    borderRadius: '8px',
                                } }
                            />
                            <Legend />
                        </PieChart>
                    </ResponsiveContainer>
                </ChartCard>

                {/* Chart 4: Phase Progress */ }
                <ChartCard>
                    <h3>
                        <Calendar size={ 20 } />
                        Progression par Phase
                    </h3>
                    <div className="chart-description">
                        <AlertCircle size={ 16 } className="info-icon" />
                        Suivi du pourcentage d'avancement pour chaque phase du projet.
                    </div>
                    <ResponsiveContainer width="100%" height={ 300 }>
                        <BarChart data={ progressData }>
                            <CartesianGrid strokeDasharray="3 3" stroke="#e5e7eb" />
                            <XAxis dataKey="phase" />
                            <YAxis domain={ [ 0, 100 ] } />
                            <Tooltip
                                formatter={ ( value ) => `${ value }%` }
                                contentStyle={ {
                                    background: '#fff',
                                    border: '1px solid #ccc',
                                    borderRadius: '8px',
                                } }
                            />
                            <Bar dataKey="completion" fill="#10b981" radius={ [ 8, 8, 0, 0 ] } />
                        </BarChart>
                    </ResponsiveContainer>
                </ChartCard>

                {/* Chart 5: Timeline Progress */ }
                <ChartCard>
                    <h3>
                        <TrendingUp size={ 20 } />
                        Progression Temporelle
                    </h3>
                    <div className="chart-description">
                        <AlertCircle size={ 16 } className="info-icon" />
                        Évolution de l'avancement du projet semaine après semaine.
                    </div>
                    <ResponsiveContainer width="100%" height={ 300 }>
                        <LineChart data={ timelineData }>
                            <CartesianGrid strokeDasharray="3 3" stroke="#e5e7eb" />
                            <XAxis dataKey="date" />
                            <YAxis domain={ [ 0, 100 ] } />
                            <Tooltip
                                formatter={ ( value ) => `${ value }%` }
                                contentStyle={ {
                                    background: '#fff',
                                    border: '1px solid #ccc',
                                    borderRadius: '8px',
                                } }
                            />
                            <Legend />
                            <Line
                                type="monotone"
                                dataKey="progress"
                                stroke="#667eea"
                                dot={ { fill: '#667eea', r: 5 } }
                                activeDot={ { r: 7 } }
                                name="Avancement (%)"
                                strokeWidth={ 3 }
                            />
                        </LineChart>
                    </ResponsiveContainer>
                </ChartCard>
            </ChartsContainer>

            {/* Footer Note */ }
            <div
                style={ {
                    textAlign: 'center',
                    color: '#666',
                    fontSize: '0.9em',
                    marginTop: '40px',
                } }
            >
                <p>
                    💡 Ce tableau de bord se met à jour automatiquement avec les données de votre
                    projet.
                </p>
                <p>Dernière mise à jour: { new Date().toLocaleDateString( 'fr-FR' ) || new Date().toLocaleDateString( 'en-EN' ) }</p>
            </div>
        </DashboardContainer>
    );
}

export default ProjectOverview;
