import { Eye, EyeOff, CheckCircle, AlertCircle } from 'lucide-react';
import { useState } from 'react';
import styled from 'styled-components';
import bgImgConnexion from './Icon/premium_vector-1683140945544-89a75438d4f5.png';
import { useNavigate, useSearchParams, Link } from 'react-router-dom';
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
  margin-top: 10px;

  @media screen and (max-width: ${ breakPoints.mobile }) {
    font-size: 0.95em;
  }
`;

// Password input with visibility toggle
const PasswordWrapper = styled.div`
  position: relative;
  width: 100%;
  display: flex;
  align-items: center;
`;

const InputPassword = styled.input`
  width: 100%;
  ${ styleGlobalInput };
  border: 1px solid #ddd;
  border-radius: 8px;
  padding: 12px 45px 12px 12px;
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
    padding: 10px 40px 10px 10px;
  }
`;

const EyeButton = styled.button`
  position: absolute;
  right: 12px;
  background: none;
  border: none;
  cursor: pointer;
  color: #666;
  transition: all 0.2s ease;
  display: flex;
  align-items: center;
  justify-content: center;
  padding: 5px;
  border-radius: 4px;

  &:hover {
    color: #0d47a1;
    background-color: rgba(13, 71, 161, 0.1);
  }

  &:focus {
    outline: 2px solid #0d47a1;
    outline-offset: 2px;
  }

  @media screen and (max-width: ${ breakPoints.mobile }) {
    right: 8px;
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

const PasswordRequirements = styled.div`
  margin-top: 15px;
  padding: 12px;
  background-color: rgba(13, 71, 161, 0.05);
  border: 1px solid rgba(13, 71, 161, 0.2);
  border-radius: 8px;
  font-size: 0.9em;
  color: #333;

  h4 {
    margin: 0 0 10px 0;
    color: #0d47a1;
    font-size: 0.95em;
  }

  ul {
    margin: 0;
    padding-left: 20px;

    li {
      margin: 5px 0;
      font-size: 0.9em;
      color: #666;

      &.valid {
        color: #388e3c;
      }

      &.invalid {
        color: #d32f2f;
      }
    }
  }

  @media screen and (max-width: ${ breakPoints.mobile }) {
    font-size: 0.85em;

    h4 {
      font-size: 0.9em;
    }
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

function ResetPassword()
{
    const [ password, setPassword ] = useState( '' );
    const [ confirmPassword, setConfirmPassword ] = useState( '' );
    const [ isSeePassword, setIsSeePassword ] = useState( true );
    const [ isSeeConfirmPassword, setIsSeeConfirmPassword ] = useState( true );
    const [ isLoading, setIsLoading ] = useState( false );
    const [ errorMessage, setErrorMessage ] = useState( '' );
    const [ successMessage, setSuccessMessage ] = useState( '' );
    const [ searchParams ] = useSearchParams();
    const navigate = useNavigate();

    const token = searchParams.get( 'token' );

    // Validation checks
    const hasMinLength = password.length >= 8;
    const hasUpperCase = /[A-Z]/.test( password );
    const hasLowerCase = /[a-z]/.test( password );
    const hasNumber = /[0-9]/.test( password );
    const hasSpecialChar = /[!@#$%^&*]/.test( password );
    const passwordsMatch = password && confirmPassword && password === confirmPassword;

    const handleSubmit = ( event ) =>
    {
        event.preventDefault();
        setErrorMessage( '' );
        setSuccessMessage( '' );

        if ( !token )
        {
            setErrorMessage( 'Lien de réinitialisation invalide. Veuillez redemander un email.' );
            return;
        }

        if ( !password || !confirmPassword )
        {
            setErrorMessage( 'Veuillez remplir tous les champs' );
            return;
        }

        if ( !hasMinLength )
        {
            setErrorMessage( 'Le mot de passe doit contenir au moins 8 caractères' );
            return;
        }

        if ( !passwordsMatch )
        {
            setErrorMessage( 'Les mots de passe ne correspondent pas' );
            return;
        }

        setIsLoading( true );

        // Simuler l'appel API
        setTimeout( () =>
        {
            try
            {
                // Appel API pour réinitialiser le mot de passe
                // await resetPasswordWithToken(token, password);

                setSuccessMessage( 'Votre mot de passe a été réinitialisé avec succès!' );

                // Redirection après 2 secondes
                setTimeout( () =>
                {
                    navigate( '/connexion' );
                }, 2000 );
            } catch ( error )
            {
                setErrorMessage(
                    error.message || 'Erreur lors de la réinitialisation du mot de passe'
                );
                setIsLoading( false );
            }
        }, 1500 );
    };

    if ( !token )
    {
        return (
            <main>
                <DivFormConnexion>
                    <DivWrapperForm>
                        <ErrorMessage role="alert">
                            <AlertCircle size={ 20 } />
                            Lien de réinitialisation invalide ou expiré. Veuillez{ ' ' }
                            <LinkConnexion to="/mot-de-passe-oublie">
                                demander un nouveau lien
                            </LinkConnexion>
                            .
                        </ErrorMessage>
                    </DivWrapperForm>
                </DivFormConnexion>
                <Footer />
            </main>
        );
    }

    return (
        <main>
            <DivFormConnexion>
                <DivWrapperForm>
                    <DivWraper>
                        <DirectoryFlowLogo size={ 50 } color="#0d47a1" />
                        <SpanTextDF>Créer un nouveau mot de passe</SpanTextDF>
                    </DivWraper>

                    <LinkHome to="/" title="Retour à l'accueil">
                        <Homes size={ 30 } color="#0f0f0eff" />
                    </LinkHome>

                    <Label htmlFor="password">
                        Nouveau mot de passe <span style={ { color: '#d32f2f' } }>*</span>
                    </Label>
                    <PasswordWrapper>
                        <InputPassword
                            id="password"
                            placeholder="Entrez votre nouveau mot de passe"
                            type={ isSeePassword ? 'password' : 'text' }
                            maxLength={ 100 }
                            onChange={ ( e ) => setPassword( e.target.value ) }
                            value={ password }
                            disabled={ isLoading }
                            aria-label="Nouveau mot de passe"
                        />
                        <EyeButton
                            type="button"
                            onClick={ () => setIsSeePassword( !isSeePassword ) }
                            disabled={ isLoading }
                            title={ isSeePassword ? 'Afficher le mot de passe' : 'Masquer le mot de passe' }
                            aria-label={ isSeePassword ? 'Afficher le mot de passe' : 'Masquer le mot de passe' }
                        >
                            { isSeePassword ? (
                                <Eye size={ 20 } />
                            ) : (
                                <EyeOff size={ 20 } />
                            ) }
                        </EyeButton>
                    </PasswordWrapper>

                    <Label htmlFor="confirmPassword">
                        Confirmez le mot de passe{ ' ' }
                        <span style={ { color: '#d32f2f' } }>*</span>
                    </Label>
                    <PasswordWrapper>
                        <InputPassword
                            id="confirmPassword"
                            placeholder="Confirmez votre mot de passe"
                            type={ isSeeConfirmPassword ? 'password' : 'text' }
                            maxLength={ 100 }
                            onChange={ ( e ) => setConfirmPassword( e.target.value ) }
                            value={ confirmPassword }
                            disabled={ isLoading }
                            aria-label="Confirmation du mot de passe"
                        />
                        <EyeButton
                            type="button"
                            onClick={ () => setIsSeeConfirmPassword( !isSeeConfirmPassword ) }
                            disabled={ isLoading }
                            title={ isSeeConfirmPassword ? 'Afficher le mot de passe' : 'Masquer le mot de passe' }
                            aria-label={ isSeeConfirmPassword ? 'Afficher le mot de passe' : 'Masquer le mot de passe' }
                        >
                            { isSeeConfirmPassword ? (
                                <Eye size={ 20 } />
                            ) : (
                                <EyeOff size={ 20 } />
                            ) }
                        </EyeButton>
                    </PasswordWrapper>

                    <PasswordRequirements>
                        <h4>📋 Critères du mot de passe:</h4>
                        <ul>
                            <li className={ hasMinLength ? 'valid' : 'invalid' }>
                                ✓ Au moins 8 caractères
                            </li>
                            <li className={ hasUpperCase ? 'valid' : 'invalid' }>
                                ✓ Au moins une majuscule
                            </li>
                            <li className={ hasLowerCase ? 'valid' : 'invalid' }>
                                ✓ Au moins une minuscule
                            </li>
                            <li className={ hasNumber ? 'valid' : 'invalid' }>
                                ✓ Au moins un chiffre
                            </li>
                            <li className={ hasSpecialChar ? 'valid' : 'invalid' }>
                                ✓ Au moins un caractère spécial (!@#$%^&*)
                            </li>
                            <li className={ passwordsMatch ? 'valid' : 'invalid' }>
                                ✓ Les mots de passe correspondent
                            </li>
                        </ul>
                    </PasswordRequirements>

                    <SubmitButton
                        onClick={ handleSubmit }
                        disabled={ isLoading || !passwordsMatch || !hasMinLength }
                        style={ {
                            opacity: isLoading || !passwordsMatch || !hasMinLength ? 0.6 : 1,
                            cursor:
                                isLoading || !passwordsMatch || !hasMinLength
                                    ? 'not-allowed'
                                    : 'pointer',
                        } }
                        aria-busy={ isLoading }
                    >
                        { isLoading ? <Loader /> : 'Réinitialiser le mot de passe' }
                    </SubmitButton>

                    <LinkConnexion to="/connexion">
                        Retour à la connexion
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
                    <LoadingText>Réinitialisation en cours...</LoadingText>
                ) }
            </DivFormConnexion>

            <Footer />
        </main>
    );
}

export default ResetPassword;
