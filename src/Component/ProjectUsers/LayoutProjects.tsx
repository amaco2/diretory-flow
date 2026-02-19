import { Link, useNavigate } from "react-router-dom";
import "./style/LayoutProjects.css";
import { Footer } from "../../Ui/Main";
import { ArrowLeft, Clapperboard, ClipboardCopy, FileArchive, TrendingUp, UserRoundPlus } from "lucide-react";

function LayoutProject()
{
    const navigate = useNavigate();
    const color = '#fff';
    const size = 38;
    return (
        <div className="layout-projects-container">
            {/* Header */}
            <header className="projects-header">
                <ArrowLeft size={35} onClick={() => navigate('/')} cursor={'pointer'} />
                <div className="header-content">
                    <h1>Mes Projets</h1>
                    <p className="header-subtitle">Créez et gérez vos projets audiovisuels</p>
                </div>
            </header>

            {/* Main Content */}
            <main className="projects-main">
                <div className="projects-welcome">
                    {/* Empty State */}
                    <section className="empty-state">
                        <div className="empty-state-icon"><FileArchive size={60} color={color} /></div>
                        <h2>Bienvenue dans DirectoryFlow</h2>
                        <p className="empty-state-description">
                            Vous n'avez pas encore de projets. Créez votre premier projet pour commencer
                            à organiser votre production audiovisuelle.
                        </p>

                        {/* Guide Steps */}
                        <div className="guide-steps">
                            <div className="guide-step">
                                <div className="step-number">1</div>
                                <div className="step-content">
                                    <h3>Créer un Projet</h3>
                                    <p>Cliquez sur "Nouveau Projet" et remplissez les informations</p>
                                </div>
                            </div>

                            <div className="step-arrow">→</div>

                            <div className="guide-step">
                                <div className="step-number">2</div>
                                <div className="step-content">
                                    <h3>Configurer</h3>
                                    <p>Définissez le type, le statut et la description</p>
                                </div>
                            </div>

                            <div className="step-arrow">→</div>

                            <div className="guide-step">
                                <div className="step-number">3</div>
                                <div className="step-content">
                                    <h3>Gérer</h3>
                                    <p>Utilisez le Kanban pour suivre votre production</p>
                                </div>
                            </div>
                        </div>

                        {/* CTA Button */}
                        <Link to="./createproject" className="create-project-btn">
                            <span className="btn-icon">✨</span>
                            Créer un Nouveau Projet
                        </Link>
                    </section>

                    {/* Info Cards */}
                    <section className="info-cards">
                        <div className="info-card">
                            <div className="card-icon"><Clapperboard size={size} color={color

                            } /></div>
                            <h4>Production Audiovisuelle</h4>
                            <p>Organisez vos tournages, montage et post-production</p>
                        </div>

                        <div className="info-card">
                            <div className="card-icon"><UserRoundPlus color={color} size={size} /></div>
                            <h4>Collaboration</h4>
                            <p>Invitez vos collaborateurs et travaillez ensemble</p>
                        </div>

                        <div className="info-card">
                            <div className="card-icon"><TrendingUp color={color} size={size} /></div>
                            <h4>Kanban Intuitif</h4>
                            <p>Suivez la progression de votre projet en temps réel</p>
                        </div>

                        <div className="info-card">
                            <div className="card-icon">⚡</div>
                            <h4>Productivité</h4>
                            <p>Augmentez votre efficacité avec nos outils</p>
                        </div>
                    </section>
                </div>
            </main>

            {/* Footer Hint */}
            <footer className="projects-footer">
                <p>💡 <strong>Conseil :</strong> Vous pouvez créer plusieurs projets et les gérer indépendamment.</p>
            </footer>

            <Footer />
        </div>
    );
}

export { LayoutProject };