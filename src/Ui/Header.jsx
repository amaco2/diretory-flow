import
{
  Contact2,
  FileBarChart,
  HelpCircle,
  History,
  Home,
  User2Icon,
  Users2,
  Workflow,
  X,
} from 'lucide-react';
import styled from 'styled-components';
// Importation des fichier contenant les dimension des <<MediaQuery>>
import { breakPoint } from './MediaQuery/MediaQuery.jsx';
// Importation de l'icone personnalisée de directoryflow
import './style/Header.css';
import { href, Link } from 'react-router-dom';
import { useContext, useState } from 'react';
import { HomeContext, TContext } from '../ThemeContext.jsx';
import ProfilUser from './ProfilUsers/ProfilsUser.jsx';
import
{
  getInitials,
  stringToColor,
} from '../Component/ProjectUsers/style/styleComponent.jsx';
import { IconUsers } from '@tabler/icons-react';
import { Burger } from '@mantine/core';
import DirectoryFlowLogo from '../Icon/DirectoryFlowLogo.jsx';
import { label } from 'framer-motion/client';

/* Creation du logo DirectoryFlow personnalisé */

const LogoWrapper = styled.div`
  display: flex;
  align-items: center;
  gap: 0.8rem;
`;
// Bouton de connextion et d'inscription dans directoryFlow

const styleBtn_Connexion_Instription = `
                                    border: none;
                                    border-radius: 5px;
                                    width: 100px;
                                    height: 30px;
                                    cursor: pointer;
                                    font-weight: bold;
                                    margin-top: 30px;
                                    position: relative;
                                    left: -30px;
                                    font-size: 1em;
                                    @media screen and (max-width: ${ breakPoint.tablet }){
                                      display: none;
                                    }
                                    `;
const BtnInscription = styled.button`
  ${ styleBtn_Connexion_Instription };
  background-color: #05cdfa;
  color: #fff;
  margin-left: 8px;
  &:hover {
    background-color: purple;
    color: #fff;
  }
`;
const BtnConnexion = styled.button`
  ${ styleBtn_Connexion_Instription };
  background-color: #0cf963;
  color: #fff;
  &:hover {
    background-color: #000;
    color: #fff;
    border: 1px solid #ec4f11ff;
  }
`;
// Creation du text <<Directory-Flow>> depuis un span dans styled component

const SpanTextDF = styled.span`
  font-size: 1.7em;
  font-weight: bold;
  color: rgb(0, 157, 255);
  @media screen and (max-width: ${ breakPoint.mobile }) {
    font-size: 1.2em;
  }
`;

// Creation de l'icone connexion apres la desaction des boutons deja present

const IconUser = styled( Users2 )`
  display: none;
  margin-top: 18px;
  cursor: pointer;
  margin-left: -30px;
  @media screen and (max-width: ${ breakPoint.tablet }) {
    display: block;
  }
  @media sreen and (max-width: ${ breakPoint.mobile }) {
    fill: red;
    width: 30px;
  }
`;
// Fonction pour checker le hidden du header

function Headers()
{
  const { isConnect } = useContext( TContext );
  const { iconeUser, setIconeUser } = useContext( TContext );
  const intialUser = getInitials( iconeUser );
  const bgColor = stringToColor( iconeUser );
  const [ mobileMenuOpen, setMobileMenuOpen ] = useState( false );

  // cette constante a pour principal role d'afficher la liste des projets d'un utilisateur
  const { isShowProject, setIsShowProject } = useContext( HomeContext );

  const navMenuItems = [
    { label: 'Accueil', icon: Home, href: '/' },
    { label: 'Contact', icon: Contact2, href: '#' },
    { label: 'Aide', icon: HelpCircle, href: '#' },
    { label: 'Workflow', icon: Workflow, href: '#' },
    { label: 'Historique', icon: History, href: '#' },
    isConnect ? { label: "Projet", icon: FileBarChart, href: '#' } : ''
  ];

  // Cette sert a affucher liste des projets recent de l'iutilisateur
  const handleShowProject = ( e ) =>
  {
    e.stopPropagation();
    e.preventDefault();

    if ( isShowProject )
    {
      setIsShowProject( o => !o );
    }
  }

  return (
    <div>
      <header className='header'>
        <div className='navbar--header'>
          <div className='navbar--header__logo-df'>
            <DirectoryFlowLogo size={ 60 } color="#0d47a1" />
            <SpanTextDF className='icon-text1 flex:true'>
              Directory-Flow
            </SpanTextDF>
          </div>

          {/* Desktop Navigation */ }
          <nav className='navbar--header__nav-desktop'>
            { navMenuItems.map( ( item ) =>
            {
              const Icon = item.icon;
              return (
                <Link key={ item.label } to={ item.href } className='nav-item' onClick={ ( e ) =>
                {
                  item.label === 'Projet' ? handleShowProject( e ) : '';
                } }>
                  <Icon size={ 22 } color={ bgColor } />
                  <span >{ item.label }</span>
                </Link>
              );
            } ) }
          </nav>

          {/* Mobile Burger Button */ }
          <button
            className='navbar--header__burger-btn'
            onClick={ () => setMobileMenuOpen( !mobileMenuOpen ) }
            aria-label={ mobileMenuOpen ? 'Fermer le menu' : 'Ouvrir le menu' }
          >
            { mobileMenuOpen ? (
              <X size={ 28 } color='#333' />
            ) : (
              <Burger size='sm' opened={ mobileMenuOpen } />
            ) }
          </button>

          <div className='navbar--header__connexion-backend'>
            { isConnect === true ? (
              <ProfilUser />
            ) : (
              <div>
                <Link to={ '/connexion' }>
                  <BtnConnexion>Connexion</BtnConnexion>
                </Link>
                <Link to={ '/inscription' }>
                  <BtnInscription>Inscription</BtnInscription>
                </Link>
                <Link to={ '/connexion' }>
                  <IconUser color='#ffff' size={ 40 } />
                </Link>
              </div>
            ) }
          </div>
        </div>

        {/* Mobile Navigation Menu */ }
        { mobileMenuOpen && (
          <nav className='navbar--header__nav-mobile'>
            { navMenuItems.map( ( item ) =>
            {
              const Icon = item.icon;
              return (
                <Link
                  key={ item.label }
                  to={ item.href }
                  className='nav-item-mobile'
                  onClick={ () => setMobileMenuOpen( false ) }
                >
                  <Icon size={ 20 } color={ bgColor } />
                  <span>{ item.label }</span>
                </Link>
              );
            } ) }
          </nav>
        ) }
      </header>
    </div>
  );
}

export default Headers;
