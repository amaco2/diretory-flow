import styled from 'styled-components';

import { motion, useScroll, useTransform } from "framer-motion";
import './style/Main.css';
import {
  ArrowBigRight, CheckCheck, Star, ChevronLeft,
  ChevronRight, Clapperboard,
  ChevronDown, FileArchive,
  CalendarX, FileText, UsersIcon
} from 'lucide-react';
import { Link, useNavigate } from 'react-router-dom';
import { useContext, useEffect, useRef, useState } from 'react';
import axio from '../config/axiosConfig';
import { HomeContext, TContext } from '../ThemeContext';
import { IconArrowGuide, IconBrandTeams, IconCapProjecting, IconRobot, IconUsersPlus } from '@tabler/icons-react';
import img_infos from "../UI_ASSET/1767128404958.jpg";
import { AnimatedBloc } from '../Component/Scroll';
import videoMain from '../Ui/videos/istockphoto-2240060367-640_adpp_is.mp4'

// Image d'accueil
const Div_Img_Bg_Main = styled.div`
  width: 100%;
  height: 650px;
  margin-top: 65px;
  position: relative;
  border: none;
  overflow: hidden;

  video {
    position: absolute;
    top: 0;
    left: 0;
    width: 100%;
    height: 100%;
    object-fit: cover;
    // z-index: -1;
  }

  @media screen and (max-width: 480px){
    height: 680px;
  }
    @media (prefers-reduced-motion: reduce) {
    scroll-behavior: auto;
    transition: none !important;
}
`;

/** Bouton d'orientation de redirection de l'utilisateur vers la
 * creation de projet ou de compte si pas deja cree */
const BtnGetStarts = styled.button`
  display: inline-flex;
  align-items: center;
  gap: 12px;
  padding: 14px 28px;
  min-width: 20svw;
  height: 7svw;
  font-size: 1.5rem;
  font-weight: 800;
  border-radius: 15px;
  color: #fff;
  background-color: #000000;
  border: 1px solid #e9f8fa;
  box-shadow: 0 8px 30px rgba(0, 0, 0, 0.45), inset 0 -4px 12px rgba(255,255,255,0.05);
  cursor: pointer;
  transition: transform 180ms ease, box-shadow 180ms ease;
  position: relative;
  overflow: hidden;
  left: 40%;
  top: 40%;

  .arrowRight {
    transform: translateX(0);
    transition: transform 200ms ease;
  }

  &:hover {
    transform: translateY(4px) scale(1.02);
    box-shadow: 0 18px 40px rgba(0, 0, 0, 0.55);
    animation: animate linear 4s infinite; 
  }
    @keyframes animate{
      to{
       opacity: 0.4;
      }
       from{
       opacity: 1;
       }
    }

  &:focus {
    outline: 3px solid rgba(255, 255, 255, 0.14);
    outline-offset: 3px;
  }

  &::before {
    content: '';
    position: absolute;
    left: -40%;
    top: 0;
    width: 40%;
    height: 100%;
    background: linear-gradient(120deg, rgba(255,255,255,0.12), rgba(255,255,255,0.02));
    transform: skewX(-20deg);
    transition: left 600ms ease;
  }

  &:hover::before {
    left: 120%;
  }

  @media screen and (max-width: 960px) {
    min-width: 180px;
    padding: 12px 22px;
    font-size: 1rem;
    left: 20%;
    height: 10svw;
  }

  @media screen and (max-width: 480px) {
    width: 72%;
    min-width: unset;
    padding: 10px 18px;
    font-size: 0.95rem;
    height: 20svw;
  }
`;

/**Améliorer votre productivité et votre influence en production cinématographique grâce à notre application
 * conçue personnalisée rien que pour vous
 */
/**
 * 
 * @returns (ReactElement)
 */
const Check = () => <CheckCheck fill='#006dfcff' size={25} />;

const tab_infos_service = [
  {
    fonctionnalite: "Gestion des équipes",
  },
  {
    fonctionnalite: "Planning & tableau de tâches",
  },
  {
    fonctionnalite: "Feuilles de services",
  },
  {
    fonctionnalite: "Chat d'équipe",
  },
  {
    fonctionnalite: "IA de dépouillement",
  },
  {
    fonctionnalite: "IA de gestion & d'organisation de tâches",
  },
  {
    fonctionnalite: "Workflow assisté"
  }
];

// Composant Témoignages
function Testimonials() {
  const testimonials = [
    {
      name: "Marie Dupont",
      role: "Productrice de films",
      review: "DirectoryFlow a révolutionné notre façon de travailler. L'IA nous fait gagner des heures sur le dépouillement !",
      rating: 5
    },
    {
      name: "Jean Martin",
      role: "Réalisateur",
      review: "La collaboration en équipe est intuitive et efficace. Un outil indispensable pour nos projets audiovisuels.",
      rating: 5
    },
    {
      name: "Sophie Leroy",
      role: "Chef de projet",
      review: "Grâce à DirectoryFlow, notre productivité a augmenté de 30%. Organisation parfaite et chat intégré.",
      rating: 5
    }
  ];

  return (
    <motion.section
      initial={{ opacity: 0 }}
      whileInView={{ opacity: 1 }}
      viewport={{ once: true, margin: "-50px" }}
      transition={{ duration: 0.6 }}
      id="testimonials" aria-labelledby="testimonials-title" className="testimonials">
      <h2 id="testimonials-title">Témoignages de nos utilisateurs</h2>
      <div className="testimonials-grid">
        {testimonials.map((testimonial, index) => (
          <motion.div
            initial={{ opacity: 0, y: 30 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true, margin: "-50px" }}
            transition={{ duration: 0.5, delay: index * 0.2 }}
            key={index} className="testimonial-card">
            <div className="rating">
              {[...Array(testimonial.rating)].map((_, i) => (
                <Star key={i} fill="#00ffb7" color='#00ffb7' size={20} />
              ))}
            </div>
            <p className="review">"{testimonial.review}"</p>
            <div className="author">
              <strong>{testimonial.name}</strong>
              <span>{testimonial.role}</span>
            </div>
          </motion.div>
        ))}
      </div>
    </motion.section>
  );
}

// Composant Appel à l'action
function CallToAction() {
  const { isConnect } = useContext(TContext);

  return (
    <motion.section
      initial={{ opacity: 0, scale: 0.95 }}
      whileInView={{ opacity: 1, scale: 1 }}
      viewport={{ once: true, margin: "-50px" }}
      transition={{ duration: 0.5 }}
      id="cta" aria-labelledby="cta-title" className="cta">
      <h2 id="cta-title">Prêt à révolutionner votre production audiovisuelle ?</h2>
      <p>Rejoignez des milliers de professionnels qui utilisent DirectoryFlow pour créer des projets exceptionnels.</p>
      <Link to={isConnect ? 'projects' : 'connexion'}>
        <motion.button
          whileHover={{ scale: 1.05 }}
          whileTap={{ scale: 0.95 }}
          className="cta-button">
          <ArrowBigRight className='arrowRight' />
          Commencer maintenant
        </motion.button>
      </Link>
    </motion.section>
  );
}

// Composant Pied de page
function Footer() {
  return (
    <motion.footer
      initial={{ opacity: 0, y: 40 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true }}
      transition={{ duration: 0.7 }}
      role="contentinfo" className="footer">
      <div className="footer-content">
        <div className="footer-section">
          <h3>DirectoryFlow</h3>
          <p>La plateforme IA de gestion de production audiovisuelle.</p>
        </div>
        <div className="footer-section">
          <h3>Liens utiles</h3>
          <ul>
            <li><Link to="/about">À propos</Link></li>
            <li><Link to="/pricing">Tarifs</Link></li>
            <li><Link to="/contact">Contact</Link></li>
            <li><Link to="/support">Support</Link></li>
          </ul>
        </div>
        <div className="footer-section">
          <h3>Contact</h3>
          <p>Email: contact@directoryflow.com</p>
          <p>Tél: +237 659 582 556</p>
        </div>
        {/* run ollama <<ollama run gpt-oss:120b-cloud>> */}
        <div className="footer-section">
          <h3>Suivez-nous</h3>
          <div className="social-links">
            <a href="#" aria-label="Facebook">Facebook</a>
            <a href="#" aria-label="Twitter">Twitter</a>
            <a href="#" aria-label="LinkedIn">LinkedIn</a>
            <a href="#" aria-label="Instagram">Instagram</a>
          </div>
        </div>
      </div>
      <div className="footer-bottom">
        <p>&copy; 2026 DirectoryFlow. Tous droits réservés.</p>
      </div>
    </motion.footer>
  );
}


function InfoLayout() {
  // Stockage des  images dans getImage
  const getImage = import.meta.glob("../UI_ASSET/*.{jpg,jpeg,png}", { eager: true });
  console.log(getImage);
  const entries = Object.entries(getImage).sort((a, b) => a[0].localeCompare(b[0])).slice(2);
  const images = entries.map(([k, v]) => v.default || v);
  images.pop()
  const captions = entries.map(([k]) => {
    const name = k.split('/').pop()?.replace(/\.[^/.]+$/, '') || 'Image';
    const pretty = name.replace(/[-_]/g, ' ').replace(/\b\w/g, (c) => c.toUpperCase());
    return `${pretty} — Production cinématographique`;
  });
  const { scrollY } = useScroll();

  const opacity = useTransform(scrollY, [300, 850], [1, 2]);
  const y = useTransform(scrollY, [300, 850], [50, 1]);
  const ref = useRef(null);

  const { scrollYProgress } = useScroll({
    target: ref,
    offset: ["start end", "end start"],
  });

  // Déplacement lent de l’image
  const z = useTransform(scrollYProgress, [0, 1], ["-15%", "15%"]);

  return (
    <section
      className="main--intro__image-slides"
      ref={ref}>
      {
        images.map((src, index) =>
        (
          <figure className="image-slides-contenair" key={index}>
            <img src={src} alt={captions[index]} />
            <figcaption className="image-info-card">
              <h3>{captions[index]}</h3>
              <p className="image-tagline">{`Capturez l'essence de ${captions[index].split(' — ')[0]} et structurez votre production.`}</p>
              <p className="image-rationale"><strong>Rationnel :</strong> {`Cette image illustre une scène/type de production qui aide à définir le ton, les ressources et les étapes nécessaires.`}</p>
              <p className="image-logic"><strong>Usage :</strong> {`Utilisez cette référence pour créer les tâches, assigner l'équipe et planifier les livrables.`}</p>
            </figcaption>
          </figure>
        ))
      }
    </section>
  )
}

// Component ProjectCard: manages thumbnail preview and upload to backend
function ProjectCard({ project }) {
  const [preview, setPreview] = useState(project.thumbnail || null);
  const [uploading, setUploading] = useState(false);
  const inputRef = useRef(null);

  const handleFileChange = async (e) => {
    const file = e.target.files && e.target.files[0];
    if (!file) return;
    // preview locally
    const url = URL.createObjectURL(file);
    setPreview(url);

    // upload to backend
    try {
      setUploading(true);
      const form = new FormData();
      form.append('thumbnail', file);
      const res = await axio.post(`/api/projects/${project.id}/thumbnail`, form, {
        headers: { 'Content-Type': 'multipart/form-data' },
      });
      // expected response contains url
      if (res?.data?.url) setPreview(res.data.url);
    } catch (err) {
      console.error('Upload error', err);
      // keep local preview but you could show error to user
    } finally {
      setUploading(false);
    }
  };

  return (
    <article className="project-card" key={project.id}>
      <div className="project-card-media">
        {preview ? (
          <img className="project-thumbnail" src={preview} alt={`${project.name} thumbnail`} />
        ) : (
          <div className="project-media-upload">
            <label className="upload-label">
              <input
                ref={inputRef}
                type="file"
                accept="image/*"
                className="upload-input"
                onChange={handleFileChange}
              />
              <button type="button" className="upload-btn">Ajouter une image</button>
            </label>
          </div>
        )}
      </div>
      <div className="project-card-body">
        <h3 className="project-card-title">{project.name}</h3>
        <p className="project-card-desc">{project.description || 'Aucun descriptif disponible — ajoutez une courte description pour mieux organiser votre projet.'}</p>
        <div className="project-card-meta">
          <span className="project-id">ID: {project.id}</span>
          <Link to={`/project/${project.id}`} className="project-cta">Ouvrir</Link>
        </div>
        {uploading && <small>Envoi de l'image…</small>}
      </div>
    </article>
  );
}

function FunctionalityHome() {
  return (
    <AnimatedBloc
      id="functionalities" aria-labelledby="functionalities-title" className='main--intro'>
      <div className="contenair-sass">
        <div className='main-infos'>
          <div className="h2-main-contenair">
            <h2 id="functionalities-title">Les fonctionnalités principales</h2>
          </div>
          <ul>
            {tab_infos_service.map((itemslist, index) => {
              return <li key={index}><Check />{itemslist.fonctionnalite}</li>
            })}
          </ul>
        </div>
        <div className='img-infos'>
          <img src={img_infos} alt="Présentation des fonctionnalités de DirectoryFlow pour la gestion de projets audiovisuels" />
        </div>
        <div className='main--intro__exemple'>
          <h2>Laissez-vous guider <IconArrowGuide /></h2>
          <p>Produisez sans limite et soyez toujours plus créatif. Film, série, pub,
            court métrage... Découvrez la nouvelle expérience immersive et automatisée de
            flux de travail. Grâce à notre application, vous serez toujours plus créatif
            et en avance sur la concurrence. Vous serez suivi de la pré-production à la post-production
            dans une harmonie et une structure cohérente et logique. Remplissez le formulaire
            après la création de votre projet pour rendre notre IA plus efficace et plus apte à
            vous accompagner.</p>

          <InfoLayout />

        </div>
      </div>
    </AnimatedBloc>
  );
}

// Composant Carousel
function Carousel() {
  const [currentIndex, setCurrentIndex] = useState(0);
  const modules = import.meta.glob('./CarroselHome/*.{jpg,jpeg,png}', { eager: true });
  const entries = Object.entries(modules).sort((a, b) => a[0].localeCompare(b[0])).slice(0, 3);
  const images = entries.map(([k, v]) => v.default || v);
  const nextSlide = () => {
    setCurrentIndex((prevIndex) => (prevIndex + 1) % images.length);
  };

  const prevSlide = () => {
    setCurrentIndex((prevIndex) => (prevIndex - 1) % images.length);
  };

  useEffect(() => {
    if (images.length === 0) return;
    const id = setInterval(() => {
      setCurrentIndex((i) => (i + 1) % images.length)
    }, 5000)

    return () => clearInterval(id)
  }, [currentIndex, images.length])

  return (
    <motion.section
      initial={{ opacity: 0 }}
      animate={{ opacity: 1, calcMode: 2 }}
      exit={{ opacity: 0 }}
      transition={{ duration: 0.3 }}

      id="carousel" aria-labelledby="carousel-title" className="carousel">
      <h2 id="carousel-title">Découvrez nos projets audiovisuels</h2>
      <div className="carousel-containers">
        <button className="carousel-btn prev" onClick={prevSlide} aria-label="Image précédente">
          <ChevronLeft size={24} />
        </button>
        {images.map((src, idx) => (
          <div key={idx} className={"carousel-slides" + (idx === currentIndex ? ' active' : '')}>
            <img src={src} alt={`Production cinématographique ${idx + 1}`} id='img' />
          </div>
        ))}
        <button className="carousel-btn next" onClick={nextSlide} aria-label="Image suivante">
          <ChevronRight size={24} />
        </button>
      </div>
      <div className="carousel-indicators">
        {images.map((_, index) => (
          <button
            key={index}
            className={`indicator ${index === currentIndex ? 'active' : ''}`}
            onClick={() => setCurrentIndex(index)}
            aria-label={`Aller à l'image ${index + 1}`}
          />
        ))}
      </div>
    </motion.section>
  );
}

// =============================================
// PROBLEMS SOLVED SECTION (Premium Redesign)
// =============================================
const ProblemsSection = styled.section`
  padding: 80px 20px;
  background: linear-gradient(180deg, #0d131f 0%, #050a12 100%);
  position: relative;
  overflow: hidden;

  &::before {
    content: '';
    position: absolute;
    top: 0;
    left: 0;
    right: 0;
    height: 1px;
    background: linear-gradient(90deg, transparent, rgba(0, 212, 255, 0.3), transparent);
  }
`;

const SectionHeader = styled.div`
  text-align: center;
  margin-bottom: 60px;

  h2 {
    font-size: 2.5rem;
    color: #fff;
    margin-bottom: 16px;
    font-family: -apple-system, BlinkMacSystemFont, 'Segoe UI', Roboto, Helvetica, Arial, sans-serif;
    letter-spacing: -0.5px;
    font-weight: 800;
    
    span {
      color: #00d4ff;
    }
  }

  p {
    color: rgba(255, 255, 255, 0.55);
    font-size: 1.1rem;
    max-width: 600px;
    margin: 0 auto;
    line-height: 1.6;
  }
`;

const ProblemsGrid = styled.div`
  display: grid;
  grid-template-columns: repeat(auto-fit, minmax(260px, 1fr));
  gap: 30px;
  max-width: 1200px;
  margin: 0 auto;
`;

const ProblemCard = styled(motion.article)`
  background: rgba(255, 255, 255, 0.02);
  border: 1px solid rgba(255, 255, 255, 0.05);
  border-radius: 24px;
  padding: 40px 30px;
  text-align: center;
  backdrop-filter: blur(10px);
  position: relative;
  overflow: hidden;
  transition: all 0.4s cubic-bezier(0.4, 0, 0.2, 1);

  &::before {
    content: '';
    position: absolute;
    top: -50%;
    left: -50%;
    width: 200%;
    height: 200%;
    background: radial-gradient(circle, rgba(0, 212, 255, 0.08) 0%, transparent 70%);
    opacity: 0;
    transition: opacity 0.4s ease;
    pointer-events: none;
  }

  &:hover {
    transform: translateY(-8px);
    border-color: rgba(0, 212, 255, 0.3);
    box-shadow: 0 20px 40px rgba(0, 0, 0, 0.4);
    background: rgba(255, 255, 255, 0.04);

    &::before {
      opacity: 1;
    }

    .icon-wrapper {
      transform: scale(1.1) translateY(-5px);
      background: rgba(0, 212, 255, 0.1);
      border-color: rgba(0, 212, 255, 0.4);
      
      svg {
        filter: drop-shadow(0 0 12px rgba(0, 212, 255, 0.6));
      }
    }
  }

  h3 {
    color: #fff;
    font-size: 1.25rem;
    margin-bottom: 12px;
    position: relative;
    font-weight: 600;
  }

  p {
    color: rgba(255, 255, 255, 0.55);
    font-size: 0.95rem;
    line-height: 1.6;
    margin: 0;
    position: relative;
  }
`;

const IconWrapper = styled.div`
  width: 72px;
  height: 72px;
  margin: 0 auto 24px;
  background: rgba(255, 255, 255, 0.03);
  border: 1px solid rgba(255, 255, 255, 0.08);
  border-radius: 20px;
  display: flex;
  align-items: center;
  justify-content: center;
  transition: all 0.4s cubic-bezier(0.4, 0, 0.2, 1);

  svg {
    color: #00d4ff;
    transition: all 0.4s ease;
  }
`;

function Main() {
  /**
   * @param {isConnect} Stockage de l'etat de connexion de l'utilisateur pour decider de se reidrection en
   * fonction de si <<isConnect>> est a <<true> ou <<false>>
   * @Component
   * @example
   * <Link to={isConnect?"projects":"connexion"}>
   */
  const { isConnect } = useContext(TContext);
  const { isShowProject, setIsShowProject } = useContext(HomeContext);
  const { wasProject, setWasProject, projectId, } = useContext(TContext);
  const navigate = useNavigate();

  const handleShowProject = (e) => {
    e.preventDefault();
    if (!isShowProject) {
      setIsShowProject(o => !o);
    }
  }
  const handelHiddenProject = (e) => {
    e.preventDefault();
    if (isShowProject) {
      setIsShowProject(p => !p);
    }
  }
  return (
    <motion.main
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      exit={{ opacity: 0 }}
      transition={{ duration: 0.3 }}
      role="main">
      <header>
        <Div_Img_Bg_Main>
          <video autoPlay muted loop>
            <source src={videoMain} type="video/mp4" />
            Your browser does not support the video tag.
          </video>
          <BtnGetStarts onClick={(e) => {
            e.stopPropagation();
            navigate(isConnect ? 'projects' : 'connexion');
          }} aria-label="Démarrer l'aventure">
            <Clapperboard size={30} className='arrowRight' />
            Démarrer l'aventure
          </BtnGetStarts>
        </Div_Img_Bg_Main>
      </header>

      <motion.section
        initial={{ opacity: 0, y: 30 }}
        whileInView={{ opacity: 1, y: 0 }}
        viewport={{ once: true, margin: "-50px" }}
        transition={{ duration: 0.6 }}
        id="platform-description" aria-labelledby="platform-description-title">
        <h2 id="platform-description-title"><IconRobot size={35} color="#00d5ff" />Plateforme IA de gestion de production audiovisuelle</h2>
        <p>Planifiez, organisez et collaborez efficacement sur vos projets audiovisuels.</p>
      </motion.section>

      {/* <FunctionalityHome /> */}

      <Carousel />

      <ProblemsSection id="problems-solved" aria-labelledby="problems-solved-title">
        <SectionHeader>
          <h2 id="problems-solved-title">Problèmes <span>résolus</span></h2>
          <p>DirectoryFlow élimine les frictions de votre processus de production en automatisant et centralisant vos tâches les plus fastidieuses.</p>
        </SectionHeader>

        <ProblemsGrid>
          <ProblemCard
            initial={{ opacity: 0, y: 30 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true, margin: "-50px" }}
            transition={{ duration: 0.5, delay: 0.1 }}
          >
            <IconWrapper className="icon-wrapper">
              <UsersIcon size={32} strokeWidth={1.5} />
            </IconWrapper>
            <h3>Gestion complexe</h3>
            <p>Fini les emails dispersés. Centralisez la communication et l'assignation de votre équipe au même endroit.</p>
          </ProblemCard>

          <ProblemCard
            initial={{ opacity: 0, y: 30 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true, margin: "-50px" }}
            transition={{ duration: 0.5, delay: 0.2 }}
          >
            <IconWrapper className="icon-wrapper">
              <CalendarX size={32} strokeWidth={1.5} />
            </IconWrapper>
            <h3>Planning inefficace</h3>
            <p>Notre ligne du temps visuelle et notre vue Kanban préviennent les conflits et optimisent vos journées de tournage.</p>
          </ProblemCard>

          <ProblemCard
            initial={{ opacity: 0, y: 30 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true, margin: "-50px" }}
            transition={{ duration: 0.5, delay: 0.3 }}
          >
            <IconWrapper className="icon-wrapper">
              <IconUsersPlus size={32} stroke={1.5} />
            </IconWrapper>
            <h3>Manque de collaboration</h3>
            <p>Travaillez de manière synchronisée avec tous les départements grâce aux documents partagés en temps réel.</p>
          </ProblemCard>

          <ProblemCard
            initial={{ opacity: 0, y: 30 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true, margin: "-50px" }}
            transition={{ duration: 0.5, delay: 0.4 }}
          >
            <IconWrapper className="icon-wrapper">
              <FileText size={32} strokeWidth={1.5} />
            </IconWrapper>
            <h3>Tâches manuelles</h3>
            <p>Notre IA génère automatiquement vos feuilles de service et décompose vos scénarios en quelques secondes.</p>
          </ProblemCard>
        </ProblemsGrid>
      </ProblemsSection>

      <Testimonials />
      <CallToAction />
      <Footer />
    </motion.main >
  );
}

export default Main;
export { Footer };
