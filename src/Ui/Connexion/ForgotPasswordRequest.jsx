import { Mail, CheckCircle, AlertCircle } from 'lucide-react';
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
import { Homes, styleGlobalInput } from './ComponentStyledForm/Styled';
import DirectoryFlowLogo from '../../Icon/DirectoryFlowLogo';
import { Loader } from '../../App.tsx';
import Footer from './ComponentStyledForm/Footer';

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
  max-width: 450px;
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

const SubmitButton = styled.button`
  width: 100%;
  padding: 12px 20px;
  background: linear-gradient(135deg, #0d47a1 0%, #1565c0 100%);
  color: white;
  border: none;
  border-radius: 8px;
  font-size: 1em;
  font-weight: 700;
  cursor: pointer;
  transition: all 0.3s ease;
  margin-top: 10px;

  &:hover:not(:disabled) {
    transform: translateY(-2px);
    box-shadow: 0 5px 15px rgba(13, 71, 161, 0.3);
  }

  &:focus {
    outline: 2px solid #0d47a1;
    outline-offset: 2px;
  }

  &:disabled {
    opacity: 0.6;
    cursor: not-allowed;
  }

  @media screen and (max-width: ${ breakPoints.mobile }) {
    font-size: 0.95em;
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

const LinkConnexion = styled( Link )`
  ${ LinkObject };
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

const SuccessMessage = styled.div`
  display: flex;
  align-items: center;
  gap: 10px;
  color: #388e3c;
  margin-top: 15px;
  padding: 12px;
  background-color: rgba(56, 142, 60, 0.1);
  border: 1px solid #388e3c;
  border-radius: 8px;
  font-size: 0.95em;

  @media screen and (max-width: ${ breakPoints.mobile }) {
    font-size: 0.9em;
    padding: 10px;
  }
`;

const InfoMessage = styled.div`
  display: flex;
  align-items: flex-start;
  gap: 10px;
  color: #1565c0;
  margin-top: 15px;
  padding: 12px;
  background-color: rgba(21, 101, 192, 0.1);
  border: 1px solid #1565c0;
  border-radius: 8px;
  font-size: 0.95em;
  line-height: 1.5;

  @media screen and (max-width: ${ breakPoints.mobile }) {
    font-size: 0.9em;
    padding: 10px;
  }
`;

const LoadingText = styled.p`
  text-align: center;
  margin-top: 20px;
  font-size: 1em;
  color: #666;

  @media screen and (max-width: ${ breakPoints.mobile }) {
    font-size: 0.9em;
  }
`;

function ForgotPasswordRequest()
{
    const [ email, setEmail ] = useState( '' );
    const [ isLoading, setIsLoading ] = useState( false );
    const [ errorMessage, setErrorMessage ] = useState( '' );
    const [ successMessage, setSuccessMessage ] = useState( '' );
    const [ isRequestSent, setIsRequestSent ] = useState( false );
    const navigate = useNavigate();

    const handleSubmit = ( event ) =>
    {
        event.preventDefault();
        setErrorMessage( '' );
        setSuccessMessage( '' );

        if ( !email )
        {
            setErrorMessage( 'Veuillez entrer votre adresse email' );
            return;
        }

        const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
        if ( !emailRegex.test( email ) )
        {
            setErrorMessage( 'Veuillez entrer une adresse email valide' );
            return;
        }

        setIsLoading( true );

        // Simuler l'envoi de l'email
        setTimeout( () =>
        {
            try
            {
                // Appel API pour envoyer l'email de réinitialisation
                // await resetPassword(email);

                setSuccessMessage(
                    `Un email de réinitialisation a été envoyé à ${ email }`
                );
                setIsRequestSent( true );
                setIsLoading( false );

                // Redirection après 3 secondes
                setTimeout( () =>
                {
                    navigate( '/connexion' );
                }, 3000 );
            } catch ( error )
            {
                setErrorMessage(
                    error.message || 'Erreur lors de la demande de réinitialisation'
                );
                setIsLoading( false );
            }
        }, 1500 );
    };

    return (
        <main>
            <DivFormConnexion>
                <DivWrapperForm>
                    <DivWraper>
                        <DirectoryFlowLogo size={ 50 } color="#0d47a1" />
                        <SpanTextDF>Réinitialiser le mot de passe</SpanTextDF>
                    </DivWraper>

                    <LinkHome to="/" title="Retour à l'accueil">
                        <Homes size={ 30 } color="#0f0f0eff" />
                    </LinkHome>

                    <InfoMessage>
                        💡 Entrez votre adresse email. Nous vous enverrons un lien pour
                        réinitialiser votre mot de passe.
                    </InfoMessage>

                    <Label htmlFor="email">
                        Adresse email <span style={ { color: '#d32f2f' } }>*</span>{ ' ' }
                        <Mail size={ 16 } color="#fd3705ff" />
                    </Label>
                    <InputEmail
                        placeholder="exemple@email.com"
                        maxLength={ 100 }
                        onChange={ ( e ) => setEmail( e.target.value ) }
                        value={ email }
                        disabled={ isRequestSent }
                        aria-label="Adresse email"
                    />

                    <SubmitButton
                        onClick={ handleSubmit }
                        disabled={ isLoading || isRequestSent }
                        style={ {
                            opacity: isLoading || isRequestSent ? 0.6 : 1,
                            cursor: isLoading || isRequestSent ? 'not-allowed' : 'pointer',
                        } }
                        aria-busy={ isLoading }
                    >
                        { isLoading ? <Loader /> : 'Envoyer l\'email' }
                    </SubmitButton>

                    <LinkConnexion to="/connexion">
                        <span style={ { color: '#181616ff', fontWeight: 'bold' } }>
                            Vous vous souvenez?
                        </span>{ ' ' }
                        Se connecter.
                    </LinkConnexion>

                    { errorMessage && (
                        <ErrorMessage role="alert">
                            <AlertCircle size={ 20 } />
                            { errorMessage }
                        </ErrorMessage>
                    ) }

                    { successMessage && (
                        <SuccessMessage role="status">
                            <CheckCircle size={ 20 } />
                            { successMessage }
                        </SuccessMessage>
                    ) }
                </DivWrapperForm>

                { isLoading && (
                    <LoadingText>Envoi de l'email en cours...</LoadingText>
                ) }
            </DivFormConnexion>

            <Footer />
        </main>
    );
}

export default ForgotPasswordRequest;
