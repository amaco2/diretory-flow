import { ClapperboardIcon, Eye, EyeOff, Mail } from 'lucide-react';
import { useContext, useState } from 'react';
import styled from 'styled-components';
import iconDirectoryFlow from './Icon/iconedf.jpg';
import bgImgConnexion from './Icon/premium_vector-1683140945544-89a75438d4f5.png';
import
{
  breakPoint,
  media,
  mediaQueryForm,
  mediaQueryInput,
} from '../MediaQuery/MediaQuery';
import { Link, useNavigate } from 'react-router-dom';
import { BtnConnexion } from '../Button';
import { Homes, styleGlobalInput } from './ComponentStyledForm/Styled';
import { useAxioToLogin } from './UserConnexion/LoginUser';
import { TContext } from '../../ThemeContext';

// stockage de la hauteur et de la largeur de la fenetre d'affichege

const innerWidth = window.innerWidth;

// divsion des infos UI
const DivFormConnexion = styled.div`
  position: absolute;
  z-index: 999;
  font-family: 'Open Sans';
  background-image: url('${ bgImgConnexion }');
  background-repeat: no-repeat;
  background-size: cover;
  // background-position-x: -100px;
  // mix-blend-mode: difference;
  color: #fff;
  filter: contrast(0.9);
  border: none;
  font-weight: bold;
  width: 100%;
  height: 100%;
  display: flex;
  flex-direction: column;
  align-items: center;
  top: 0;
  ${ media.mobile( 'width:100%' ) })
`;

// Input des donnees de l'UI
const InputEmail = styled.input.attrs( {
  type: 'text',
  id: 'email',
  name: 'email',
} )`
  left: -10px;
  width: 30svw;
  ${ styleGlobalInput };
  border-radius: 10px;
  &:focus {
    box-shadow: 0 0 10px #000;
  }
  ${ mediaQueryInput }
`;
/* Creation de l'element HTML <<img>> via st
yledComponent qui servira de logo pour le HEADER*/

const ImgLgoHeader = styled( ClapperboardIcon )`
  object-fit: cover;
  width: 50px;
  height: 50px;
  border-radius: 50px;
  margin-top: 30px;
`;
// Input des donnees de l'UI
const InputPassword = styled.input.attrs( { id: 'password', name: 'password' } )`
  left: -10px;
  width: 30svw;
  ${ styleGlobalInput };
  border-radius: 10px;
  &:focus {
    box-shadow: 0 0 10px #000;
  }
  ${ mediaQueryInput }
`;
// Creation du text <<Directory-Flow>> depuis un span dans styled component

const SpanTextDF = styled.span`
  font-size: 1.5em;
  font-weight: bold;
  margin-top: 50px;
  color: #000;
  margin-left: 5px;
  @media screen and (max-width: ${ breakPoint.mobile }) {
    font-size: 1.2em;
  }
`;
const DivWraper = styled.div`
  display: flex;
  margin-left: -3svw;
`;

const DivWrapperForm = styled.div`
  box-shadow: 0 0 50px #363c3cff;
  border: none;
  border-radius: 10px;
  display: flex;
  position: absolute;
  top: 5svw;
  background-color: #fff;
  flex-direction: column;
  justify-content: center;
  align-items: center;
  width: 40vw;
  height: 75svh;
  ${ mediaQueryForm }
`;
// Lien en cas d'oublie du mot de passe
const LinkObject = `
  position: relative;
 top: 10px;
 font-weight: bold;
 font-size: 1.4em;
 text-decoration: none;
 color: #2f08f4ff;
  &: hover{
     text-decoration: underline;
  };
  @media screen and (max-width: ${ breakPoint.desktop }){
    width: 250px;
    font-size: 1.2em;
    text-align: center;
  };
    @media screen and (max-width: ${ breakPoint.mobile }){
    width: 170px;
    font-size: 1.1em;
    text-align: center;
  }`;
const LinkForgetPassword = styled( Link )`
  ${ LinkObject };
`;
// Lien pour la creation du compte
const LinkCreateAcount = styled( Link )`
  ${ LinkObject }
`;
// Span for see or not see password
const SpamSeeOrNotSee = styled.span`
  cursor: pointer;
  position: relative;
  // z-index: 888;
  left: 13svw;
  border: none;
  margin: 0;
  padding: 0;
  top: -33px;
  @media screen and (max-width: ${ breakPoint.desktop }) {
    left: 22svw;
  }
`;
function FormConnexion()
{
  // On accede a l'etat de connexion de l'utilisateur pour le rediriger vers le menu principale
  const { isConnect } = useContext( TContext );
  //  State pour afficher ou cacher le mot de passe
  const [ isSeePassword, setIsSeePassword ] = useState( true );
  const [ isSeeEye, setIsSeeEye ] = useState( false );
  //  Declaration du state permetant de recuperer les infos de connexion lde l'utilisateur
  const [ email, setEmail ] = useState( '' ); // On laisse vide pour eviter d'avoir les email par defaut
  const [ password, setPassword ] = useState( '' );

  // Configuration de la naviagation
  const naviagte = useNavigate();

  /** Les fonction suivante recupere les valeurs des in
    puts pour les envoyer au backend et faire l'authentificatiion*/
  const getEmail = ( event ) =>
  {
    event.preventDefault();
    if ( event.target.value !== '' )
    {
      setEmail( event.target.value );
    } else
    {
      console.log( 'Se champ est obligatoire' );
    }
  };
  const getPassword = ( event ) =>
  {
    event.preventDefault();
    if ( event.target.value !== '' )
    {
      setPassword( event.target.value );
    }
  };

  return (
    <div>
      {/* On wrap les elements dans une <<div>> creee avec styled component */ }
      <DivFormConnexion>
        <DivWrapperForm>
          <DivWraper>
            <ImgLgoHeader color='#7ecef5ff' />
            <SpanTextDF>DirectoryFlow</SpanTextDF>
            <br />
          </DivWraper>
          <br />
          <Link to={ '/' }>
            <Homes size={ 30 } color='#0f0f0eff' />
          </Link>
          <br />
          <label htmlFor='email'>
            Adresse e-mail <Mail size={ 15 } color='4ffd05ff' />
          </label>
          <InputEmail
            placeholder='EX: Jhondoe@gmail.com'
            maxLength={ 50 }
            onChange={ ( event ) =>
            {
              event.preventDefault();
              getEmail( event );
            } }
          />
          <br />
          <label htmlFor='password'>Mot de passe </label>

          <InputPassword
            type={ isSeePassword ? 'password' : 'text' }
            maxLength={ 50 }
            onChange={ ( event ) =>
            {
              event.preventDefault();
              getPassword( event );
              if ( event.target.value !== '' )
              {
                setIsSeeEye( true );
              } else
              {
                setIsSeeEye( false );
              }
            } }
          />
          <SpamSeeOrNotSee hidden={ isSeeEye ? false : true }>
            { isSeePassword ? (
              <EyeOff
                onClick={ () => setIsSeePassword( false ) }
                color='#0d0d0dff'
              />
            ) : (
              <Eye
                onClick={ () =>
                {
                  setIsSeePassword( true );
                } }
                color='#0f0e0eff'
              />
            ) }
          </SpamSeeOrNotSee>
          <LinkForgetPassword>Mot de passe Oublié?</LinkForgetPassword>

          <BtnConnexion
            onClick={ ( event ) =>
            {
              event.stopPropagation();
              useAxioToLogin( email || nul, password || null );
              setIsSeeEye( false );
              naviagte( '../' );
            } }
          >
            Connexion
          </BtnConnexion>
          <LinkCreateAcount to={ '/inscription' }>
            <span
              style={ {
                color: '#242222ff',
                fontWeight: 'bold',
                fontSize: '0.9em',
              } }
            >
              Vous n'avez pas de compte?
            </span>
            Céez en un.
          </LinkCreateAcount>
        </DivWrapperForm>
      </DivFormConnexion>
    </div>
  );
}

export default FormConnexion;
