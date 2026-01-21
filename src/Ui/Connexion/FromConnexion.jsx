import { Eye, EyeOff, Mail } from 'lucide-react';
import { useState } from 'react';
import styled from 'styled-components';
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
import DirectoryFlowLogo from '../../Icon/DirectoryFlowLogo';
import { Loader } from '../../App.tsx';
import Footer from './ComponentStyledForm/Footer';
import InfosConnexionSaas from './ComponentStyledForm/InfosConnexionSaas';

const breakPoints = {
  mobile: '768px',
  tablet: '1024px',
  desktop: '1440px',
};

// Main container
const DivFormConnexion = styled.div`
  background-image: url('${ bgImgConnexion }');
  background-repeat: no-repeat;
  background-size: cover;
  background-attachment: fixed;
  background-position: center;
  color: #fff;
  filter: contrast(0.9);
  border: none;
  background-color: #000000ff;
  width: 100%;
  min-height: 100vh;
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: center;
  padding: 40px 20px;

  @media screen and (max-width: ${ breakPoints.mobile }) {
    padding: 30px 15px;
    background-attachment: scroll;
  }
`;

// Form wrapper
const DivWrapperForm = styled.div`
  box-shadow: 0 0 50px #363c3cff;
  border: none;
  border-radius: 10px;
  display: flex;
  background-color: #fff;
  flex-direction: column;
  justify-content: center;
  align-items: center;
  width: 100%;
  max-width: 750px;
  padding: 40px;
  gap: 15px;

  @media screen and (max-width: ${ breakPoints.tablet }) {
    max-width: 100%;
    width: 100%;
    padding: 30px;
  }

  @media screen and (max-width: ${ breakPoints.mobile }) {
    max-width: 100%;
    width: 100%;
    padding: 25px;
    border-radius: 8px;
  }
`;

// Input fields
const InputEmail = styled.input.attrs( {
  type: 'email',
  id: 'email',
  name: 'email',
} )`
  width: 100%;
  ${ styleGlobalInput };
  border: 1px solid #ddd;
  border-radius: 8px;
  padding: 12px;
  font-size: 1em;
  transition: all 0.3s ease;

  &:focus {
    box-shadow: 0 0 8px rgba(13, 71, 161, 0.3);
    border-color: #0d47a1;
  }

  &:hover {
    border-color: #1565c0;
  }

  @media screen and (max-width: ${ breakPoints.mobile }) {
    font-size: 0.95em;
  }
`;

const InputPassword = styled.input.attrs( {
  id: 'password',
  name: 'password',
} )`
  width: 100%;
  ${ styleGlobalInput };
  border: 1px solid #ddd;
  border-radius: 8px;
  padding: 12px;
  font-size: 1em;
  transition: all 0.3s ease;

  &:focus {
    box-shadow: 0 0 8px rgba(13, 71, 161, 0.3);
    border-color: #0d47a1;
  }

  &:hover {
    border-color: #1565c0;
  }

  @media screen and (max-width: ${ breakPoints.mobile }) {
    font-size: 0.95em;
  }
`;

const SpanTextDF = styled.span`
  font-size: 1.5em;
  font-weight: bold;
  color: #000;
  margin-left: 15px;

  @media screen and (max-width: ${ breakPoints.mobile }) {
    font-size: 1.2em;
    margin-left: 10px;
  }
`;

const DivWraper = styled.div`
  display: flex;
  align-items: center;
  justify-content: center;
  gap: 10px;
  width: 100%;
  margin-bottom: 10px;

  @media screen and (max-width: ${ breakPoints.mobile }) {
    flex-direction: column;
    gap: 8px;
  }
`;

const LinkObject = `
  font-weight: 700;
  font-size: 1em;
  text-decoration: none;
  color: #2f08f4ff;
  transition: all 0.3s ease;

  &:hover {
    text-decoration: underline;
  }

  &:focus {
    outline: 2px solid #2f08f4;
    outline-offset: 2px;
  }

  @media screen and (max-width: ${ breakPoints.mobile }) {
    font-size: 0.9em;
  }
`;

const LinkForgetPassword = styled( Link )`
  ${ LinkObject };
`;

const LinkCreateAcount = styled( Link )`
  ${ LinkObject };
`;

const PasswordWrapper = styled.div`
  position: relative;
  width: 100%;
`;

const EyeButton = styled.button`
  position: absolute;
  right: 12px;
  top: 50%;
  transform: translateY(-50%);
  background: none;
  border: none;
  cursor: pointer;
  color: #666;
  padding: 5px;
  display: flex;
  align-items: center;
  justify-content: center;
  transition: all 0.3s ease;

  &:hover {
    color: #0d47a1;
  }

  &:focus {
    outline: 2px solid #0d47a1;
    outline-offset: 2px;
    border-radius: 4px;
  }

  @media screen and (max-width: ${ breakPoints.mobile }) {
    right: 10px;
  }
`;

const Label = styled.label`
  font-weight: 700;
  font-size: 1em;
  color: #000;
  margin-bottom: 5px;
  display: block;

  @media screen and (max-width: ${ breakPoints.mobile }) {
    font-size: 0.95em;
  }
`;

const ErrorMessage = styled.div`
  display: flex;
  align-items: center;
  gap: 10px;
  color: #d32f2f;
  margin-top: 15px;
  padding: 12px;
  background-color: rgba(211, 47, 47, 0.1);
  border: 1px solid #d32f2f;
  border-radius: 8px;
  font-size: 0.95em;

  @media screen and (max-width: ${ breakPoints.mobile }) {
    font-size: 0.9em;
    padding: 10px;
  }
`;

const LinkHome = styled( Link )`
  display: inline-flex;
  align-items: center;
  justify-content: center;
  margin-bottom: 10px;
  transition: transform 0.2s ease;

  &:hover {
    transform: scale(1.1);
  }

  &:focus {
    outline: 2px solid #0d47a1;
    outline-offset: 2px;
    border-radius: 4px;
  }
`;

const RequiredText = styled.span`
  color: #d32f2f;
  font-weight: 700;
`;

function FormConnexion()
{
  const [ isSeePassword, setIsSeePassword ] = useState( true );
  const [ email, setEmail ] = useState( '' );
  const [ password, setPassword ] = useState( '' );
  const [ isLoading, setIsLoading ] = useState( false );
  const [ errorMessage, setErrorMessage ] = useState( '' );
  const navigate = useNavigate();

  const getEmail = ( event ) =>
  {
    if ( event.target.value !== '' )
    {
      setEmail( event.target.value );
    } else
    {
      setEmail( '' );
    }
  };

  const getPassword = ( event ) =>
  {
    if ( event.target.value !== '' )
    {
      setPassword( event.target.value );
    } else
    {
      setPassword( '' );
    }
  };

  const handleSubmit = ( event ) =>
  {
    event.stopPropagation();
    setErrorMessage( '' );

    if ( !email || !password )
    {
      setErrorMessage( 'Veuillez remplir tous les champs' );
      return;
    }

    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    if ( !emailRegex.test( email ) )
    {
      setErrorMessage( 'Veuillez entrer une adresse email valide' );
      return;
    }

    setIsLoading( true );
    useAxioToLogin( email, password )
      .then( ( response ) =>
      {
        setIsLoading( false );
        navigate( '../' );
      } )
      .catch( ( error ) =>
      {
        setIsLoading( false );
        setErrorMessage(
          error.response?.data?.message || 'Erreur de connexion. Veuillez réessayer.'
        );
      } );
  };

  return (
    <main>
      <DivFormConnexion>
        <DivWrapperForm>
          <DivWraper>
            <DirectoryFlowLogo size={ 50 } color="#0d47a1" />
            <SpanTextDF>Connectez-vous</SpanTextDF>
          </DivWraper>

          <LinkHome to="/" title="Retour à l'accueil">
            <Homes size={ 30 } color="#0f0f0eff" />
          </LinkHome>

          <InfosConnexionSaas />

          <Label htmlFor="email">
            Adresse email <RequiredText>*</RequiredText>{ ' ' }
            <Mail size={ 16 } color="4ffd05ff" />
          </Label>
          <InputEmail
            placeholder="exemple@email.com"
            maxLength={ 100 }
            onChange={ getEmail }
            aria-label="Adresse email"
          />

          <Label htmlFor="password">
            Mot de passe <RequiredText>*</RequiredText>
          </Label>
          <PasswordWrapper>
            <InputPassword
              type={ isSeePassword ? 'password' : 'text' }
              maxLength={ 100 }
              onChange={ getPassword }
              placeholder="Votre mot de passe"
              aria-label="Mot de passe"
            />
            <EyeButton
              type="button"
              onClick={ () => setIsSeePassword( !isSeePassword ) }
              aria-label={ isSeePassword ? 'Afficher le mot de passe' : 'Masquer le mot de passe' }
            >
              { isSeePassword ? (
                <EyeOff size={ 20 } />
              ) : (
                <Eye size={ 20 } />
              ) }
            </EyeButton>
          </PasswordWrapper>

          <LinkForgetPassword to="/mot-de-passe-oublie">
            Mot de passe oublié?
          </LinkForgetPassword>

          <BtnConnexion
            disabled={ isLoading }
            onClick={ handleSubmit }
            style={ {
              opacity: isLoading ? 0.6 : 1,
              cursor: isLoading ? 'not-allowed' : 'pointer',
              marginTop: '10px',
            } }
            aria-busy={ isLoading }
          >
            { isLoading ? <Loader /> : 'Se Connecter' }
          </BtnConnexion>

          <LinkCreateAcount to="/inscription">
            <span style={ { color: '#242222ff', fontWeight: 'bold' } }>
              Pas de compte?
            </span>{ ' ' }
            Créez-en un maintenant.
          </LinkCreateAcount>

          { errorMessage && (
            <ErrorMessage role="alert">
              ⚠️ { errorMessage }
            </ErrorMessage>
          ) }
        </DivWrapperForm>
      </DivFormConnexion>

      <Footer />
    </main>
  );
}

export default FormConnexion;
