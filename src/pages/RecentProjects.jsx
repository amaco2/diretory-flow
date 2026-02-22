import React, { useContext, useState } from 'react';
import { useNavigate } from 'react-router-dom';
import styled from 'styled-components';
import { TContext } from '../ThemeContext';
import { ArrowLeft, Plus, FileBarChart, Trash2, ExternalLink } from 'lucide-react';

const Container = styled.section`
    width: 100%;
    min-height: 100vh;
    background: linear-gradient(135deg, #0f1419 0%, #1a1f2e 100%);
    padding: 40px 20px;
    font-family: "Segoe UI", Tahoma, Geneva, Verdana, sans-serif;
`;

const Header = styled.div`
    display: flex;
    justify-content: space-between;
    align-items: center;
    margin-bottom: 40px;
    padding: 25px;
    background: rgba(255, 255, 255, 0.05);
    border: 1px solid rgba(255, 255, 255, 0.1);
    border-radius: 8px;
    backdrop-filter: blur(10px);
    box-shadow: 0 8px 32px rgba(0, 0, 0, 0.3);
`;

const Title = styled.h1`
    color: white;
    font-size: 2.2em;
    margin: 0;
    display: flex;
    align-items: center;
    gap: 15px;
    font-weight: 700;
    letter-spacing: 0.5px;
    animation: slideInLeft 0.6s ease-out;

    @keyframes slideInLeft {
        from {
            opacity: 0;
            transform: translateX(-30px);
        }
        to {
            opacity: 1;
            transform: translateX(0);
        }
    }
`;

const ButtonGroup = styled.div`
    display: flex;
    gap: 12px;
`;

const Button = styled.button`
    display: flex;
    align-items: center;
    gap: 8px;
    padding: 12px 24px;
    border: none;
    border-radius: 6px;
    font-weight: 600;
    cursor: pointer;
    transition: all 0.3s cubic-bezier(0.4, 0, 0.2, 1);
    font-size: 0.95em;

    &.primary {
        background: linear-gradient(135deg, #00d4ff, #0099ff);
        color: white;
        box-shadow: 0 4px 15px rgba(0, 212, 255, 0.3);

        &:hover {
            transform: translateY(-2px);
            box-shadow: 0 8px 25px rgba(0, 212, 255, 0.4);
        }
    }

    &.secondary {
        background: rgba(255, 255, 255, 0.1);
        color: white;
        border: 1px solid rgba(255, 255, 255, 0.2);

        &:hover {
            background: rgba(255, 255, 255, 0.15);
            border-color: rgba(255, 255, 255, 0.3);
        }
    }
`;

const ProjectsGrid = styled.div`
    display: grid;
    grid-template-columns: repeat(auto-fill, minmax(280px, 1fr));
    gap: 20px;
    margin-bottom: 40px;

    @media (max-width: 768px) {
        grid-template-columns: repeat(auto-fill, minmax(200px, 1fr));
        gap: 15px;
    }

    @media (max-width: 480px) {
        grid-template-columns: 1fr;
    }
`;

const ProjectCard = styled.div`
    position: relative;
    background: rgba(255, 255, 255, 0.08);
    border: 1px solid rgba(255, 255, 255, 0.15);
    border-radius: 10px;
    padding: 20px;
    transition: all 0.3s cubic-bezier(0.4, 0, 0.2, 1);
    cursor: pointer;
    overflow: hidden;
    display: flex;
    flex-direction: column;
    gap: 12px;

    &::before {
        content: '';
        position: absolute;
        top: 0;
        left: -100%;
        width: 100%;
        height: 100%;
        background: linear-gradient(90deg, transparent, rgba(255, 255, 255, 0.1), transparent);
        transition: left 0.5s ease;
    }

    &:hover {
        background: rgba(255, 255, 255, 0.12);
        border-color: rgba(0, 212, 255, 0.5);
        transform: translateY(-5px);
        box-shadow: 0 12px 30px rgba(0, 212, 255, 0.2);

        &::before {
            left: 100%;
        }
    }
`;

const ProjectImagePlaceholder = styled.div`
    width: 100%;
    height: 150px;
    background: linear-gradient(135deg, #1e293b 0%, #0f172a 100%);
    border-radius: 8px;
    display: flex;
    align-items: center;
    justify-content: center;
    border: 2px dashed rgba(255, 255, 255, 0.2);
    font-size: 0.9em;
    color: rgba(255, 255, 255, 0.5);
    position: relative;
    overflow: hidden;

    &:hover {
        border-color: rgba(0, 212, 255, 0.5);
    }
`;

const ImageUploadButton = styled.label`
    display: flex;
    align-items: center;
    justify-content: center;
    gap: 6px;
    cursor: pointer;
    transition: all 0.2s ease;

    svg {
        transition: transform 0.2s ease;
    }

    &:hover svg {
        transform: scale(1.15) rotate(90deg);
    }
`;

const ProjectName = styled.h3`
    color: #00d4ff;
    font-size: 1.15em;
    margin: 0;
    font-weight: 600;
    word-break: break-word;
    display: flex;
    align-items: center;
    gap: 8px;
`;

const ProjectMeta = styled.p`
    color: rgba(255, 255, 255, 0.6);
    font-size: 0.85em;
    margin: 0;
    margin-top: auto;
`;

const ProjectActions = styled.div`
    display: flex;
    gap: 8px;
    margin-top: 12px;
    padding-top: 12px;
    border-top: 1px solid rgba(255, 255, 255, 0.1);
`;

const ActionButton = styled.button`
    flex: 1;
    padding: 8px 12px;
    background: rgba(0, 212, 255, 0.1);
    border: 1px solid rgba(0, 212, 255, 0.3);
    border-radius: 6px;
    color: #00d4ff;
    cursor: pointer;
    font-size: 0.8em;
    font-weight: 600;
    transition: all 0.2s ease;
    display: flex;
    align-items: center;
    justify-content: center;
    gap: 6px;

    &:hover {
        background: rgba(0, 212, 255, 0.2);
        border-color: rgba(0, 212, 255, 0.6);
    }

    &.danger {
        background: rgba(255, 59, 48, 0.1);
        border-color: rgba(255, 59, 48, 0.3);
        color: #ff3b30;

        &:hover {
            background: rgba(255, 59, 48, 0.2);
            border-color: rgba(255, 59, 48, 0.6);
        }
    }
`;

const EmptyState = styled.div`
    text-align: center;
    padding: 60px 20px;
    color: rgba(255, 255, 255, 0.6);

    svg {
        margin-bottom: 20px;
        opacity: 0.5;
    }

    h2 {
        color: white;
        font-size: 1.5em;
        margin: 20px 0;
    }

    p {
        font-size: 1em;
        margin: 10px 0;
    }
`;

const HiddenFileInput = styled.input`
    display: none;
`;

const RecentProjects = () => {
    const navigate = useNavigate();
    const { projectId = [] } = useContext(TContext);
    const [projects, setProjects] = useState(projectId || []);
    const [projectImages, setProjectImages] = useState({});

    const handleGoBack = () => {
        navigate(-1);
    };

    const handleCreateProject = () => {
        navigate('/projects');
    };

    const handleOpenProject = (projectId) => {
        navigate(`/project/${projectId.id || projectId}`);
    };

    const handleImageUpload = (e, projectId) => {
        e.stopPropagation();
        const file = e.target.files?.[0];
        if (file) {
            const reader = new FileReader();
            reader.onload = (evt) => {
                setProjectImages(prev => ({
                    ...prev,
                    [projectId]: evt.target?.result
                }));
            };
            reader.readAsDataURL(file);
        }
    };

    const handleDeleteProject = (e, projectId) => {
        e.stopPropagation();
        if (window.confirm('Êtes-vous sûr de vouloir supprimer ce projet ?')) {
            setProjects(prev => prev.filter(p => (p.id || p) !== projectId));
        }
    };

    return (
        <Container>
            <Header>
                <Title>
                    <FileBarChart size={36} />
                    Tous les Projets
                </Title>
                <ButtonGroup>
                    <Button className="secondary" onClick={handleGoBack}>
                        <ArrowLeft size={18} />
                        Retour
                    </Button>
                    <Button className="primary" onClick={handleCreateProject}>
                        <Plus size={18} />
                        Nouveau Projet
                    </Button>
                </ButtonGroup>
            </Header>

            {projects && projects.length > 0 ? (
                <ProjectsGrid>
                    {projects.map((project, idx) => {
                        const projectKey = project.id || project;
                        const projectImage = projectImages[projectKey];

                        return (
                            <ProjectCard
                                key={projectKey || idx}
                            >
                                <ProjectImagePlaceholder>
                                    {projectImage ? (
                                        <img
                                            src={projectImage}
                                            alt="Projet"
                                            style={{
                                                width: '100%',
                                                height: '100%',
                                                objectFit: 'cover',
                                                borderRadius: '6px'
                                            }}
                                        />
                                    ) : (
                                        <ImageUploadButton onClick={(e) => {
                                            e.stopPropagation();
                                            document.getElementById(`upload-${projectKey}`).click();
                                        }}>
                                            <Plus size={20} />
                                            Ajouter image
                                        </ImageUploadButton>
                                    )}
                                </ProjectImagePlaceholder>
                                <HiddenFileInput
                                    id={`upload-${projectKey}`}
                                    type="file"
                                    accept="image/*"
                                    onChange={(e) => handleImageUpload(e, projectKey)}
                                />
                                <ProjectName>
                                    {project.name || project.title || `Projet ${idx + 1}`}
                                </ProjectName>
                                <ProjectMeta>
                                    ID: {projectKey}
                                </ProjectMeta>
                                <ProjectActions>
                                    <ActionButton onClick={(e) => {
                                        e.stopPropagation();
                                        handleOpenProject(project);
                                    }}>
                                        <ExternalLink size={14} />
                                        Ouvrir
                                    </ActionButton>
                                    <ActionButton
                                        className="danger"
                                        onClick={(e) => handleDeleteProject(e, projectKey)}
                                    >
                                        <Trash2 size={14} />
                                        Supprimer
                                    </ActionButton>
                                </ProjectActions>
                            </ProjectCard>
                        );
                    })}
                </ProjectsGrid>
            ) : (
                <EmptyState>
                    <FileBarChart size={64} />
                    <h2>Aucun projet trouvé</h2>
                    <p>Commencez par créer votre premier projet.</p>
                    <Button
                        className="primary"
                        onClick={handleCreateProject}
                        style={{ marginTop: '20px' }}
                    >
                        <Plus size={18} />
                        Créer un projet
                    </Button>
                </EmptyState>
            )}
        </Container>
    );
};

export default RecentProjects;
