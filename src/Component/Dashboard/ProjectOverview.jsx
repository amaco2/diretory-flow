import React, { useState, useEffect } from 'react';
import {
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
import {
Users,
Calendar,
Zap,
TrendingUp,
CheckCircle,
AlertCircle,
Info,
Users2,
Calendar1Icon,
Check,
FileArchive,
TrendingUpDownIcon,
Clipboard,
ClipboardIcon,
} from 'lucide-react';
import styled, { keyframes } from 'styled-components';
import './Dashboard.scss';
import { IconLayoutDashboard, IconMoneybag } from '@tabler/icons-react';

// =============================================
// ANIMATIONS
// =============================================
const fadeInUp = keyframes`
  from {
    opacity: 0;
    transform: translateY(24px);
  }
  to {
    opacity: 1;
    transform: translateY(0);
  }
`;

const shimmer = keyframes`
  0% { background-position: -200% 0; }
  100% { background-position: 200% 0; }
`;

const pulseGlow = keyframes`
  0%, 100% { box-shadow: 0 0 0 0 rgba(0, 212, 255, 0.15); }
  50% { box-shadow: 0 0 24px 4px rgba(0, 212, 255, 0.15); }
`;

const countUp = keyframes`
  from { opacity: 0; transform: scale(0.7); }
  to { opacity: 1; transform: scale(1); }
`;

const progressGrow = keyframes`
  from { width: 0; }
`;

// =============================================
// STYLED COMPONENTS
// =============================================

const DashboardContainer = styled.div`
  width: 100%;
  max-width: 1400px;
  margin: 0 auto;
  padding: 30px 24px;
  min-height: 100vh;
  font-family: 'Inter', 'Segoe UI', Tahoma, Geneva, Verdana, sans-serif;
  color: rgba(255, 255, 255, 0.92);
  background: transparent;

  @media (max-width: 768px) {
    padding: 20px 15px;
  }

  @media (prefers-reduced-motion: reduce) {
    * {
      animation-duration: 0.01ms !important;
      animation-iteration-count: 1 !important;
      transition-duration: 0.01ms !important;
    }
  }
`;

const HeaderSection = styled.div`
  margin-bottom: 36px;
  padding: 28px 32px;
  background: linear-gradient(135deg, #0f1419 0%, #1a2332 50%, #0d2137 100%);
  border-radius: 16px;
  color: white;
  box-shadow: 0 8px 32px rgba(0, 0, 0, 0.3);
  border: 1px solid rgba(255, 255, 255, 0.06);
  position: relative;
  overflow: hidden;
  animation: ${fadeInUp} 0.5s ease-out;

  &::before {
    content: '';
    position: absolute;
    top: 0;
    left: 0;
    right: 0;
    height: 3px;
    background: linear-gradient(90deg, transparent, #00d4ff, #a78bfa, transparent);
    background-size: 200% 100%;
    animation: ${shimmer} 4s linear infinite;
  }

  h1 {
    margin: 0 0 10px 0;
    font-size: 2.2em;
    font-weight: 700;
    color: #fff;
    display: flex;
    align-items: center;
    gap: 12px;

    svg {
      color: #00d4ff;
    }

    @media (max-width: 768px) {
      font-size: 1.6em;
    }
  }

  p {
    margin: 5px 0;
    font-size: 1.05em;
    color: rgba(255, 255, 255, 0.7);

    strong {
      color: #fff;
    }

    @media (max-width: 768px) {
      font-size: 0.92em;
    }
  }
`;

const ProgressContainer = styled.div`
  margin-top: 24px;
  padding-top: 24px;
  border-top: 1px solid rgba(255, 255, 255, 0.1);

  h3 {
    margin: 0 0 14px 0;
    font-size: 1.1em;
    display: flex;
    align-items: center;
    gap: 10px;
    color: rgba(255, 255, 255, 0.85) !important;
    font-weight: 600;

    svg {
      color: #00d4ff;
    }
  }
`;

const ProgressBar = styled.div`
  width: 100%;
  height: 10px;
  background: rgba(255, 255, 255, 0.1);
  border-radius: 20px;
  overflow: hidden;
  margin-bottom: 10px;

  .progress-fill {
    height: 100%;
    background: linear-gradient(90deg, #00d4ff 0%, #34d399 50%, #4ade80 100%);
    width: ${(props) => props.percentage}%;
    transition: width 1s cubic-bezier(0.4, 0, 0.2, 1);
    border-radius: 20px;
    animation: ${progressGrow} 1.2s ease-out;
    position: relative;

    &::after {
      content: '';
      position: absolute;
      top: 0;
      left: 0;
      right: 0;
      bottom: 0;
      background: linear-gradient(90deg, transparent 0%, rgba(255,255,255,0.2) 50%, transparent 100%);
      background-size: 200% 100%;
      animation: ${shimmer} 2s linear infinite;
    }
  }
`;

const ProgressText = styled.p`
  margin: 10px 0 0 0;
  font-size: 0.92em;
  color: rgba(255, 255, 255, 0.6) !important;

  strong {
    font-weight: 700;
    font-size: 1.2em;
    color: #00d4ff !important;
  }
`;

const SectionTitle = styled.h2`
  margin-bottom: 20px;
  font-size: 1.5em;
  color: rgba(255, 255, 255, 0.92);
  display: flex;
  align-items: center;
  gap: 12px;
  font-weight: 700;

  svg {
    color: #00d4ff;
  }
`;

const PhasesContainer = styled.div`
  display: grid;
  grid-template-columns: repeat(auto-fit, minmax(300px, 1fr));
  gap: 20px;
  margin-bottom: 40px;

  @media (max-width: 768px) {
    grid-template-columns: 1fr;
    gap: 16px;
  }
`;

const PhaseCard = styled.div`
  background: rgba(255, 255, 255, 0.04);
  border-radius: 14px;
  padding: 24px;
  border: 1px solid rgba(255, 255, 255, 0.06);
  border-left: 4px solid ${(props) => props.color};
  transition: all 0.35s cubic-bezier(0.4, 0, 0.2, 1);
  backdrop-filter: blur(12px);
  animation: ${fadeInUp} 0.5s ease-out backwards;
  position: relative;
  overflow: hidden;

  &:nth-child(1) { animation-delay: 0ms; }
  &:nth-child(2) { animation-delay: 100ms; }
  &:nth-child(3) { animation-delay: 200ms; }

  &::after {
    content: '';
    position: absolute;
    top: 0;
    right: 0;
    width: 80px;
    height: 80px;
    background: radial-gradient(circle, ${props => props.color}15, transparent 70%);
    pointer-events: none;
  }

  &:hover {
    transform: translateY(-4px);
    box-shadow: 0 12px 32px rgba(0, 0, 0, 0.3);
    border-color: rgba(255, 255, 255, 0.12);
    background: rgba(255, 255, 255, 0.06);
  }

  h3 {
    margin: 0 0 16px 0;
    font-size: 1.15em;
    color: ${(props) => props.color};
    display: flex;
    align-items: center;
    gap: 10px;
    font-weight: 700;

    svg {
      color: ${props => props.color};
    }
  }

  .info-item {
    display: flex;
    justify-content: space-between;
    padding: 10px 0;
    border-bottom: 1px solid rgba(255, 255, 255, 0.06);
    font-size: 0.92em;
    transition: all 0.2s ease;

    &:last-child {
      border-bottom: none;
    }

    &:hover {
      padding-left: 4px;
    }

    label {
      color: rgba(255, 255, 255, 0.5);
      font-weight: 500;
    }

    value {
      font-weight: 700;
      color: rgba(255, 255, 255, 0.85);
    }
  }

  .status-badge {
    display: inline-flex;
    align-items: center;
    gap: 6px;
    margin-top: 14px;
    padding: 6px 14px;
    background: ${(props) => props.badgeBg}22;
    color: ${(props) => props.badgeBg};
    border: 1px solid ${(props) => props.badgeBg}44;
    border-radius: 20px;
    font-size: 0.82em;
    font-weight: 700;
    letter-spacing: 0.3px;
    text-transform: uppercase;
  }
`;

const ChartsContainer = styled.div`
  display: grid;
  grid-template-columns: repeat(auto-fit, minmax(480px, 1fr));
  gap: 24px;
  margin-bottom: 40px;

  @media (max-width: 1024px) {
    grid-template-columns: 1fr;
    gap: 20px;
  }

  @media (max-width: 768px) {
    grid-template-columns: 1fr;
    gap: 16px;
  }
`;

const ChartCard = styled.div`
  background: rgba(255, 255, 255, 0.03);
  border-radius: 14px;
  padding: 24px;
  border: 1px solid rgba(255, 255, 255, 0.06);
  transition: all 0.35s cubic-bezier(0.4, 0, 0.2, 1);
  backdrop-filter: blur(12px);
  animation: ${fadeInUp} 0.5s ease-out backwards;

  &:nth-child(1) { animation-delay: 0ms; }
  &:nth-child(2) { animation-delay: 80ms; }
  &:nth-child(3) { animation-delay: 160ms; }
  &:nth-child(4) { animation-delay: 240ms; }
  &:nth-child(5) { animation-delay: 320ms; }

  &:hover {
    box-shadow: 0 8px 28px rgba(0, 0, 0, 0.25);
    border-color: rgba(255, 255, 255, 0.1);
    background: rgba(255, 255, 255, 0.05);
  }

  h3 {
    margin: 0 0 10px 0;
    font-size: 1.15em;
    color: rgba(255, 255, 255, 0.92);
    display: flex;
    align-items: center;
    gap: 10px;
    font-weight: 700;

    svg {
      color: #00d4ff;
    }
  }

  .chart-description {
    font-size: 0.88em;
    color: rgba(255, 255, 255, 0.5);
    margin-bottom: 16px;
    padding: 10px 14px;
    background: rgba(0, 212, 255, 0.05);
    border-left: 3px solid rgba(0, 212, 255, 0.4);
    border-radius: 0 8px 8px 0;
    display: flex;
    align-items: center;
    gap: 8px;

    .info-icon {
      flex-shrink: 0;
      color: #00d4ff;
    }
  }

  .recharts-responsive-container {
    margin-top: 16px;
  }
`;

const StatsGrid = styled.div`
  display: grid;
  grid-template-columns: repeat(auto-fit, minmax(240px, 1fr));
  gap: 18px;
  margin-bottom: 36px;

  @media (max-width: 768px) {
    grid-template-columns: repeat(auto-fit, minmax(180px, 1fr));
    gap: 14px;
  }
`;

const StatCard = styled.div`
  background: rgba(255, 255, 255, 0.04);
  border-radius: 14px;
  padding: 24px;
  border: 1px solid rgba(255, 255, 255, 0.06);
  text-align: center;
  border-top: 3px solid ${(props) => props.borderColor};
  transition: all 0.35s cubic-bezier(0.4, 0, 0.2, 1);
  backdrop-filter: blur(12px);
  animation: ${fadeInUp} 0.5s ease-out backwards;
  position: relative;
  overflow: hidden;

  &:nth-child(1) { animation-delay: 0ms; }
  &:nth-child(2) { animation-delay: 80ms; }
  &:nth-child(3) { animation-delay: 160ms; }
  &:nth-child(4) { animation-delay: 240ms; }

  &::after {
    content: '';
    position: absolute;
    top: -20px;
    right: -20px;
    width: 80px;
    height: 80px;
    background: radial-gradient(circle, ${props => props.borderColor}12, transparent 70%);
    pointer-events: none;
  }

  &:hover {
    transform: translateY(-4px);
    box-shadow: 0 12px 28px rgba(0, 0, 0, 0.25);
    border-color: rgba(255, 255, 255, 0.1);
    animation: ${pulseGlow} 2s infinite;
  }

  .stat-icon {
    margin-bottom: 12px;
    animation: ${countUp} 0.6s ease-out backwards;
    animation-delay: 0.3s;

    svg {
      filter: drop-shadow(0 0 8px ${props => props.borderColor}40);
    }
  }

  .stat-value {
    font-size: 2.2em;
    font-weight: 800;
    color: ${(props) => props.textColor};
    margin: 10px 0;
    animation: ${countUp} 0.6s ease-out backwards;
    animation-delay: 0.5s;
    letter-spacing: -0.5px;
  }

  .stat-label {
    color: rgba(255, 255, 255, 0.55);
    font-size: 0.9em;
    font-weight: 600;
    letter-spacing: 0.3px;
  }
`;

const InfoBanner = styled.div`
  background: rgba(0, 212, 255, 0.05);
  border: 1px solid rgba(0, 212, 255, 0.15);
  color: white;
  padding: 20px 24px;
  border-radius: 14px;
  margin-bottom: 30px;
  display: flex;
  align-items: flex-start;
  gap: 16px;
  backdrop-filter: blur(12px);
  animation: ${fadeInUp} 0.5s ease-out backwards;
  animation-delay: 100ms;
  transition: all 0.3s ease;

  &:hover {
    border-color: rgba(0, 212, 255, 0.3);
    background: rgba(0, 212, 255, 0.08);
  }

  .icon {
    flex-shrink: 0;
    margin-top: 2px;
    color: #00d4ff;
  }

  .content {
    flex: 1;

    h4 {
      margin: 0 0 8px 0;
      color: rgba(255, 255, 255, 0.92);
      font-size: 1.2em;
      font-weight: 700;
    }

    p {
      margin: 0;
      font-size: 0.95em;
      color: rgba(255, 255, 255, 0.55) !important;
      line-height: 1.6;
    }
  }

  @media (max-width: 768px) {
    flex-direction: column;
    .icon {
      margin-top: 0;
    }
  }
`;

const FooterNote = styled.div`
  text-align: center;
  margin-top: 48px;
  padding: 24px;
  border-top: 1px solid rgba(255, 255, 255, 0.06);
  animation: ${fadeInUp} 0.5s ease-out backwards;
  animation-delay: 400ms;

  p {
    color: rgba(255, 255, 255, 0.35) !important;
    font-size: 0.85em;
    margin: 4px 0;
  }
`;

const LoadingContainer = styled.div`
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: center;
  padding: 80px 20px;
  gap: 20px;
  color: rgba(255, 255, 255, 0.5);
  font-size: 0.95em;
`;

// Custom dark tooltip for Recharts
const CustomTooltipContainer = styled.div`
  background: rgba(15, 20, 25, 0.95);
  border: 1px solid rgba(255, 255, 255, 0.1);
  border-radius: 10px;
  padding: 12px 16px;
  backdrop-filter: blur(12px);
  box-shadow: 0 8px 24px rgba(0, 0, 0, 0.4);

  .label {
    color: rgba(255, 255, 255, 0.7);
    font-size: 0.82em;
    margin-bottom: 6px;
    font-weight: 600;
  }

  .value {
    color: #00d4ff;
    font-size: 1em;
    font-weight: 700;
  }
`;

// =============================================
// Custom Tooltip Component
// =============================================
const CustomTooltip = ({ active, payload, label }) => {
  if (active && payload && payload.length) {
    return (
      <CustomTooltipContainer>
        <div className="label">{label}</div>
        {payload.map((entry, index) => (
          <div key={index} className="value" style={{ color: entry.color || '#00d4ff' }}>
            {entry.name}: {typeof entry.value === 'number' && entry.value > 1000
              ? `${(entry.value / 1000).toFixed(0)}k€`
              : entry.dataKey === 'completion' || entry.dataKey === 'progress'
                ? `${entry.value}%`
                : entry.value}
          </div>
        ))}
      </CustomTooltipContainer>
    );
  }
  return null;
};

// Recharts colors adapted for dark theme
const CHART_COLORS = {
  primary: '#00d4ff',
  secondary: '#a78bfa',
  tertiary: '#34d399',
  quaternary: '#fbbf24',
  grid: 'rgba(255, 255, 255, 0.06)',
  axis: 'rgba(255, 255, 255, 0.3)',
};

// =============================================
// Mock Data Generator
// =============================================
const generateMockData = () => {
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
        color: '#00d4ff',
        badgeBg: '#00d4ff',
      },
      production: {
        status: 'En cours',
        completion: 65,
        tasks: 40,
        completedTasks: 26,
        icon: '📹',
        color: '#fbbf24',
        badgeBg: '#fbbf24',
      },
      postproduction: {
        status: 'À venir',
        completion: 0,
        tasks: 30,
        completedTasks: 0,
        icon: '🎞️',
        color: '#34d399',
        badgeBg: '#34d399',
      },
    },
    teamData: [
      { name: 'Réalisateur', count: 1 },
      { name: 'Producteur', count: 1 },
      { name: 'Chef Opérateur', count: 2 },
      { name: 'Ingénieur Son', count: 1 },
      { name: 'Asst. Production', count: 4 },
      { name: 'Autres', count: 3 },
    ],
    genderData: [
      { name: 'Femmes', value: women, color: '#ec4899' },
      { name: 'Hommes', value: men, color: '#00d4ff' },
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
 * Tableau de bord premium pour visualiser l'état du projet:
 * - Avancement global avec barre de progression animée
 * - Phases du projet (préproduction, production, postproduction)
 * - Statistiques clés avec animations
 * - Graphiques professionnels en dark mode
 */
function ProjectOverview() {
  const [projectData, setProjectData] = useState(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const timer = setTimeout(() => {
      setProjectData(generateMockData());
      setLoading(false);
    }, 500);

    return () => clearTimeout(timer);
  }, []);

  if (loading) {
    return (
      <DashboardContainer>
        <LoadingContainer>
          <div className="spinner"></div>
          <p>Chargement du tableau de bord...</p>
        </LoadingContainer>
      </DashboardContainer>
    );
  }

  if (!projectData) {
    return <div>Erreur lors du chargement des données</div>;
  }

  const { phases, teamData, genderData, progressData, budgetData, timelineData } =
    projectData;

  return (
    <DashboardContainer>
      {/* Header Section */}
      <HeaderSection>
        <h1><IconLayoutDashboard size={36} /> Tableau de Bord</h1>
        <p>
          <strong>{projectData.projectName}</strong> — {projectData.projectType}
        </p>
        <p>Statut : {projectData.status}</p>

        <ProgressContainer>
          <h3>
            <TrendingUp size={20} />
            Avancement Global
          </h3>
          <ProgressBar percentage={projectData.progress}>
            <div className="progress-fill"></div>
          </ProgressBar>
          <ProgressText>
            <strong>{projectData.progress}%</strong> du projet complété
          </ProgressText>
        </ProgressContainer>
      </HeaderSection>

      {/* Info Banner */}
      <InfoBanner>
        <div className="icon">
          <Info size={22} />
        </div>
        <div className="content">
          <h4>Aperçu du Tableau de Bord</h4>
          <p>
            Suivez l'évolution de votre projet en temps réel : composition de l'équipe,
            budget, progression par phase et graphiques détaillés.
          </p>
        </div>
      </InfoBanner>

      {/* Quick Stats */}
      <StatsGrid>
        <StatCard borderColor="#00d4ff" textColor="#00d4ff">
          <div className="stat-icon"><Users2 size={36} color='#00d4ff' /></div>
          <div className="stat-value">{projectData.teamSize}</div>
          <div className="stat-label">Membres de l'équipe</div>
        </StatCard>

        <StatCard borderColor="#fbbf24" textColor="#fbbf24">
          <div className="stat-icon"><IconMoneybag size={36} color="#fbbf24" /></div>
          <div className="stat-value">{(projectData.budget / 1000).toFixed(0)}k€</div>
          <div className="stat-label">Budget Total</div>
        </StatCard>

        <StatCard borderColor="#34d399" textColor="#34d399">
          <div className="stat-icon"><Calendar1Icon size={36} color='#34d399' /></div>
          <div className="stat-value">14</div>
          <div className="stat-label">Semaines Restantes</div>
        </StatCard>

        <StatCard borderColor="#a78bfa" textColor="#a78bfa">
          <div className="stat-icon"><Check size={36} color='#a78bfa' /></div>
          <div className="stat-value">50</div>
          <div className="stat-label">Tâches Complétées</div>
        </StatCard>
      </StatsGrid>

      {/* Phases Section */}
      <SectionTitle>
        <FileArchive size={24} />
        Phases du Projet
      </SectionTitle>
      <PhasesContainer>
        {Object.entries(phases).map(([key, phase]) => (
          <PhaseCard key={key} color={phase.color} badgeBg={phase.badgeBg}>
            <h3>
              <ClipboardIcon size={20} />{key.charAt(0).toUpperCase() + key.slice(1)}
            </h3>
            <div className="info-item">
              <label>Statut</label>
              <value>{phase.status}</value>
            </div>
            <div className="info-item">
              <label>Avancement</label>
              <value>{phase.completion}%</value>
            </div>
            <div className="info-item">
              <label>Tâches</label>
              <value>
                {phase.completedTasks}/{phase.tasks}
              </value>
            </div>
            <span className="status-badge">{phase.status}</span>
          </PhaseCard>
        ))}
      </PhasesContainer>

      {/* Charts Section */}
      <SectionTitle>
        <TrendingUpDownIcon size={24} />
        Statistiques Détaillées
      </SectionTitle>
      <ChartsContainer>
        {/* Chart 1: Team Composition */}
        <ChartCard>
          <h3>
            <Users size={20} />
            Composition de l'Équipe
          </h3>
          <div className="chart-description">
            <AlertCircle size={16} className="info-icon" />
            Répartition des rôles au sein de l'équipe production.
          </div>
          <ResponsiveContainer width="100%" height={300}>
            <BarChart data={teamData}>
              <CartesianGrid strokeDasharray="3 3" stroke={CHART_COLORS.grid} />
              <XAxis
                dataKey="name"
                angle={-45}
                textAnchor="end"
                height={100}
                tick={{ fill: CHART_COLORS.axis, fontSize: 12 }}
                axisLine={{ stroke: CHART_COLORS.grid }}
              />
              <YAxis
                tick={{ fill: CHART_COLORS.axis, fontSize: 12 }}
                axisLine={{ stroke: CHART_COLORS.grid }}
              />
              <Tooltip content={<CustomTooltip />} />
              <Bar dataKey="count" fill={CHART_COLORS.primary} radius={[6, 6, 0, 0]} name="Effectif" />
            </BarChart>
          </ResponsiveContainer>
        </ChartCard>

        {/* Chart 2: Gender Distribution */}
        <ChartCard>
          <h3>
            <Users size={20} />
            Diversité de Genre
          </h3>
          <div className="chart-description">
            <AlertCircle size={16} className="info-icon" />
            Répartition femmes/hommes dans l'équipe.
          </div>
          <ResponsiveContainer width="100%" height={300}>
            <PieChart>
              <Pie
                data={genderData}
                cx="50%"
                cy="50%"
                labelLine={false}
                label={({ name, value }) => `${name}: ${value}`}
                outerRadius={90}
                innerRadius={50}
                fill="#8884d8"
                dataKey="value"
                strokeWidth={2}
                stroke="rgba(15, 20, 25, 0.8)"
              >
                {genderData.map((entry, index) => (
                  <Cell key={`cell-${index}`} fill={entry.color} />
                ))}
              </Pie>
              <Tooltip content={<CustomTooltip />} />
              <Legend
                wrapperStyle={{ color: 'rgba(255,255,255,0.6)', fontSize: '0.9em' }}
              />
            </PieChart>
          </ResponsiveContainer>
        </ChartCard>

        {/* Chart 3: Budget Distribution */}
        <ChartCard>
          <h3>
            <Zap size={20} />
            Distribution du Budget
          </h3>
          <div className="chart-description">
            <AlertCircle size={16} className="info-icon" />
            Ventilation du budget par catégorie.
          </div>
          <ResponsiveContainer width="100%" height={300}>
            <PieChart>
              <Pie
                data={budgetData}
                cx="50%"
                cy="50%"
                labelLine={false}
                label={({ category, amount }) =>
                  `${category}: ${(amount / 1000).toFixed(0)}k€`
                }
                outerRadius={90}
                innerRadius={50}
                fill="#8884d8"
                dataKey="amount"
                strokeWidth={2}
                stroke="rgba(15, 20, 25, 0.8)"
              >
                {budgetData.map((entry, index) => (
                  <Cell
                    key={`cell-${index}`}
                    fill={[CHART_COLORS.primary, CHART_COLORS.quaternary, CHART_COLORS.tertiary, CHART_COLORS.secondary][index]}
                  />
                ))}
              </Pie>
              <Tooltip content={<CustomTooltip />} />
              <Legend
                wrapperStyle={{ color: 'rgba(255,255,255,0.6)', fontSize: '0.9em' }}
              />
            </PieChart>
          </ResponsiveContainer>
        </ChartCard>

        {/* Chart 4: Phase Progress */}
        <ChartCard>
          <h3>
            <Calendar size={20} />
            Progression par Phase
          </h3>
          <div className="chart-description">
            <AlertCircle size={16} className="info-icon" />
            Pourcentage d'avancement pour chaque phase.
          </div>
          <ResponsiveContainer width="100%" height={300}>
            <BarChart data={progressData}>
              <CartesianGrid strokeDasharray="3 3" stroke={CHART_COLORS.grid} />
              <XAxis
                dataKey="phase"
                tick={{ fill: CHART_COLORS.axis, fontSize: 12 }}
                axisLine={{ stroke: CHART_COLORS.grid }}
              />
              <YAxis
                domain={[0, 100]}
                tick={{ fill: CHART_COLORS.axis, fontSize: 12 }}
                axisLine={{ stroke: CHART_COLORS.grid }}
              />
              <Tooltip content={<CustomTooltip />} />
              <Bar dataKey="completion" fill={CHART_COLORS.tertiary} radius={[6, 6, 0, 0]} name="Avancement" />
            </BarChart>
          </ResponsiveContainer>
        </ChartCard>

        {/* Chart 5: Timeline Progress */}
        <ChartCard>
          <h3>
            <TrendingUp size={20} />
            Progression Temporelle
          </h3>
          <div className="chart-description">
            <AlertCircle size={16} className="info-icon" />
            Évolution de l'avancement semaine après semaine.
          </div>
          <ResponsiveContainer width="100%" height={300}>
            <LineChart data={timelineData}>
              <CartesianGrid strokeDasharray="3 3" stroke={CHART_COLORS.grid} />
              <XAxis
                dataKey="date"
                tick={{ fill: CHART_COLORS.axis, fontSize: 12 }}
                axisLine={{ stroke: CHART_COLORS.grid }}
              />
              <YAxis
                domain={[0, 100]}
                tick={{ fill: CHART_COLORS.axis, fontSize: 12 }}
                axisLine={{ stroke: CHART_COLORS.grid }}
              />
              <Tooltip content={<CustomTooltip />} />
              <Legend
                wrapperStyle={{ color: 'rgba(255,255,255,0.6)', fontSize: '0.9em' }}
              />
              <Line
                type="monotone"
                dataKey="progress"
                stroke={CHART_COLORS.primary}
                dot={{ fill: CHART_COLORS.primary, r: 5, strokeWidth: 2, stroke: '#0f1419' }}
                activeDot={{ r: 8, fill: CHART_COLORS.primary, stroke: '#0f1419', strokeWidth: 3 }}
                name="Avancement (%)"
                strokeWidth={3}
              />
            </LineChart>
          </ResponsiveContainer>
        </ChartCard>
      </ChartsContainer>

      {/* Footer Note */}
      <FooterNote>
        <p>
          💡 Ce tableau de bord se met à jour automatiquement avec les données de votre projet.
        </p>
        <p>Dernière mise à jour : {new Date().toLocaleDateString('fr-FR')}</p>
      </FooterNote>
    </DashboardContainer>
  );
}

export default ProjectOverview;
