import { Mail, AlertCircle, Eye, EyeOff, ChevronDown, ChevronUp } from 'lucide-react';
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
import { BtnInscription } from '../Button';
import './Connexion.css';
import { registerUser } from './UserConnexion/RegisterUser';
import { Homes, styleGlobalInput } from './ComponentStyledForm/Styled';
import DirectoryFlowLogo from '../../Icon/DirectoryFlowLogo';
import { Loader } from '../../App.tsx';
import Footer from './ComponentStyledForm/Footer';
import PolitiqueConfidentialiteModal from './ComponentStyledForm/PolitiqueConfidentialiteModal';

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
  min-width: 100%;
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: center;
  padding: 40px 20px;

  @media screen and (max-width: ${ breakPoints.mobile }) {
    padding: 30px 15px;
    background-attachment: scroll;
    min-width: 100%;
    width: 100%;
    padding: 25px;
    border-radius: 8px;
  }
     @media screen and (max-width: ${ breakPoints.tablet }) {
    max-width: 100%;
    width: 100vw;
    padding: 30px;
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
  max-width: 950px;
  padding: 40px;
  gap: 15px;

  @media screen and (max-width: ${ breakPoints.tablet }) {
    max-width: 945px;
    width: 100vw;
    padding: 30px;
  }

  @media screen and (max-width: ${ breakPoints.mobile }) {
    max-width: 955px;
    width: 100vw;
    padding: 25px;
    border-radius: 8px;
  }
`;

// Input fields
const InputEmail = styled.input.attrs( {
  type: 'text',
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

const InputNom = styled.input.attrs( {
  type: 'text',
  id: 'nom',
  name: 'nom',
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

const InputPrenom = styled.input.attrs( {
  type: 'text',
  id: 'prenom',
  name: 'prenom',
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
  color: #1900ffff;
  transition: all 0.3s ease;

  &:hover {
    text-decoration: underline;
  }

  &:focus {
    outline: 2px solid #1900ff;
    outline-offset: 2px;
  }

  @media screen and (max-width: ${ breakPoints.mobile }) {
    font-size: 0.9em;
  }
`;

const LinkConnexion = styled( Link )`
  ${ LinkObject };
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

const CheckboxWrapper = styled.div`
  display: flex;
  align-items: flex-start;
  gap: 10px;
  margin: 15px 0;
  padding: 12px;
  background-color: #f5f5f5;
  border-radius: 8px;
  border: 1px solid #ddd;
  transition: all 0.3s ease;

  &:hover {
    background-color: #f0f0f0;
    border-color: #1565c0;
  }

  @media screen and (max-width: ${ breakPoints.mobile }) {
    padding: 10px;
    margin: 12px 0;
  }
`;

const CheckboxInput = styled.input.attrs( {
  type: 'checkbox',
} )`
  width: 20px;
  height: 20px;
  margin-top: 2px;
  cursor: pointer;
  accent-color: #0d47a1;
  flex-shrink: 0;

  &:focus {
    outline: 2px solid #0d47a1;
    outline-offset: 2px;
  }

  @media screen and (max-width: ${ breakPoints.mobile }) {
    width: 18px;
    height: 18px;
  }
`;

const CheckboxLabel = styled.label`
  cursor: pointer;
  font-size: 0.95em;
  color: #333;
  line-height: 1.4;
  flex: 1;

  @media screen and (max-width: ${ breakPoints.mobile }) {
    font-size: 0.9em;
  }
`;

const CheckboxLink = styled.button`
  background: none;
  border: none;
  color: #0d47a1;
  cursor: pointer;
  text-decoration: underline;
  font-weight: 600;
  padding: 0;
  font-size: 0.95em;

  &:hover {
    color: #1565c0;
  }

  &:focus {
    outline: 2px solid #0d47a1;
    outline-offset: 2px;
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

const LoadingText = styled.p`
  text-align: center;
  margin-top: 20px;
  font-size: 1em;
  color: #666;

  @media screen and (max-width: ${ breakPoints.mobile }) {
    font-size: 0.9em;
  }
`;

const RequiredText = styled.span`
  color: #d32f2f;
  font-weight: 700;
`;

const PasswordWrapper = styled.div`
  position: relative;
  width: 100%;
  display: flex;
  align-items: center;
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

const ValidationMessage = styled.div`
  display: flex;
  align-items: center;
  gap: 8px;
  font-size: 0.9em;
  margin-top: 5px;
  padding: 8px 10px;
  border-radius: 6px;
  border: 1px solid;
  transition: all 0.3s ease;

  &.valid {
    color: #388e3c;
    background-color: rgba(56, 142, 60, 0.08);
    border-color: #388e3c;
  }

  &.invalid {
    color: #d32f2f;
    background-color: rgba(211, 47, 47, 0.08);
    border-color: #d32f2f;
  }

  &.warning {
    color: #f57c00;
    background-color: rgba(245, 124, 0, 0.08);
    border-color: #f57c00;
  }

  @media screen and (max-width: ${ breakPoints.mobile }) {
    font-size: 0.85em;
    padding: 6px 8px;
  }
`;

const InformationBoxHeader = styled.button`
  display: flex;
  align-items: center;
  justify-content: space-between;
  width: 100%;
  background: none;
  border: none;
  padding: 0;
  cursor: pointer;
  color: #0d47a1;
  font-size: 0.95em;
  font-weight: 600;
  transition: all 0.3s ease;

  &:hover {
    color: #1565c0;
  }

  &:focus {
    outline: 2px solid #0d47a1;
    outline-offset: 2px;
  }

  @media screen and (max-width: ${ breakPoints.mobile }) {
    font-size: 0.9em;
  }
`;

const InformationBox = styled.div`
  margin-top: 12px;
  padding: 12px;
  background-color: rgba(13, 71, 161, 0.05);
  border: 1px solid rgba(13, 71, 161, 0.2);
  border-radius: 8px;
  font-size: 0.9em;
  color: #333;
  line-height: 1.6;

  h4 {
    margin: 0 0 8px 0;
    color: #0d47a1;
    font-size: 0.95em;
    font-weight: 600;
  }

  ul {
    margin: 0;
    padding-left: 20px;

    li {
      margin: 4px 0;
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
    padding: 10px;

    h4 {
      font-size: 0.9em;
    }

    ul {
      padding-left: 18px;

      li {
        font-size: 0.85em;
      }
    }
  }
`;

function FormInscription()
{
  const [ isLoading, setIsLoading ] = useState( false );
  const [ errorMessage, setErrorMessage ] = useState( '' );
  const [ successMessage, setSuccessMessage ] = useState( '' );
  const [ name, setName ] = useState( '' );
  const [ fullName, setFullName ] = useState( '' );
  const [ email, setEmail ] = useState( '' );
  const [ password, setPassword ] = useState( '' );
  const [ confirmPassword, setConfirmPassword ] = useState( '' );
  const [ isSeePassword, setIsSeePassword ] = useState( true );
  const [ isSeeConfirmPassword, setIsSeeConfirmPassword ] = useState( true );
  const [ acceptesPolitique, setAcceptesPolitique ] = useState( false );
  const [ acceptesNewsletter, setAcceptesNewsletter ] = useState( false );
  const [ isPolitiqueOpen, setIsPolitiqueOpen ] = useState( false );
  const [ showEmailInfo, setShowEmailInfo ] = useState( true );
  const [ showPasswordInfo, setShowPasswordInfo ] = useState( true );
  const navigate = useNavigate();

  // Validations en temps réel
  const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
  const isEmailValid = email !== '' && emailRegex.test( email );

  const hasMinLength = password.length >= 8;
  const hasUpperCase = /[A-Z]/.test( password );
  const hasLowerCase = /[a-z]/.test( password );
  const hasNumber = /[0-9]/.test( password );
  const hasSpecialChar = /[!@#$%^&*]/.test( password );
  const isPasswordValid = hasMinLength && hasUpperCase && hasLowerCase && hasNumber && hasSpecialChar;

  const passwordsMatch = password !== '' && confirmPassword !== '' && password === confirmPassword;
  const isConfirmPasswordValid = passwordsMatch;

  const getEmail = ( event ) =>
  {
    if ( event.target.value !== '' )
    {
      setEmail( event.target.value );
    }
  };

  const getPassword = ( event ) =>
  {
    if ( event.target.value !== '' )
    {
      setPassword( event.target.value );
    }
  };

  const getConfirmPassword = ( event ) =>
  {
    if ( event.target.value !== '' )
    {
      setConfirmPassword( event.target.value );
    }
  };

  const getFirstName = ( event ) =>
  {
    if ( event.target.value !== '' )
    {
      setName( event.target.value );
    }
  };

  const getLastName = ( event ) =>
  {
    if ( event.target.value !== '' )
    {
      setFullName( event.target.value );
    }
  };

  const handleSubmit = ( event ) =>
  {
    event.stopPropagation();
    setErrorMessage( '' );
    setSuccessMessage( '' );

    // Validations
    if ( !name || !fullName || !email || !password || !confirmPassword )
    {
      setErrorMessage( 'Veuillez remplir tous les champs' );
      return;
    }

    if ( !acceptesPolitique )
    {
      setErrorMessage( 'Vous devez accepter la politique de confidentialité' );
      return;
    }

    if ( password.length < 8 )
    {
      setErrorMessage( 'Le mot de passe doit contenir au moins 8 caractères' );
      return;
    }

    if ( password !== confirmPassword )
    {
      setErrorMessage( 'Les mots de passe ne correspondent pas' );
      return;
    }

    // Validation email basique
    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    if ( !emailRegex.test( email ) )
    {
      setErrorMessage( 'Veuillez entrer une adresse email valide' );
      return;
    }

    const fullNameCombined = name + ' ' + fullName;

    registerUser(
      fullNameCombined,
      email,
      password,
      setIsLoading,
      setErrorMessage,
      setSuccessMessage,
      navigate
    );
  };

  return (
    <main>
      <PolitiqueConfidentialiteModal
        isOpen={ isPolitiqueOpen }
        onClose={ () => setIsPolitiqueOpen( false ) }
      />
      <DivFormConnexion>
        <DivWrapperForm>
          <DivWraper>
            <DirectoryFlowLogo size={ 50 } color="#0d47a1" />
            <SpanTextDF>Rejoignez DirectoryFlow</SpanTextDF>
          </DivWraper>

          <LinkHome to="/" title="Retour à l'accueil">
            <Homes size={ 30 } color="#0c0c0cff" />
          </LinkHome>

          <Label htmlFor="nom">
            Prénom <RequiredText>*</RequiredText>
          </Label>
          <InputNom
            placeholder="Ex: Jean"
            required
            maxLength={ 50 }
            onChange={ getFirstName }
            aria-label="Prénom"
          />

          <Label htmlFor="prenom">
            Nom <RequiredText>*</RequiredText>
          </Label>
          <InputPrenom
            placeholder="Ex: Dupont"
            required
            maxLength={ 50 }
            onChange={ getLastName }
            aria-label="Nom"
          />

          <Label htmlFor="email">
            Adresse email <RequiredText>*</RequiredText> <Mail size={ 16 } color="#fd3705ff" />
          </Label>
          <InputEmail
            required
            placeholder="exemple@email.com"
            maxLength={ 100 }
            onChange={ getEmail }
            aria-label="Adresse email"
          />
          { email && (
            <ValidationMessage className={ isEmailValid ? 'valid' : 'invalid' }>
              { isEmailValid ? '✓ Email valide' : '✗ Email invalide' }
            </ValidationMessage>
          ) }

          <InformationBoxHeader
            onClick={ () => setShowEmailInfo( !showEmailInfo ) }
            aria-expanded={ showEmailInfo }
            aria-controls="email-info"
            type="button"
          >
            <span>📧 Format d'email</span>
            { showEmailInfo ? <ChevronUp size={ 18 } /> : <ChevronDown size={ 18 } /> }
          </InformationBoxHeader>

          { showEmailInfo && (
            <InformationBox id="email-info">
              <ul>
                <li>Doit contenir un @ et un domaine (ex: user@example.com)</li>
                <li>Les caractères spéciaux sauf . et - ne sont pas acceptés</li>
              </ul>
            </InformationBox>
          ) }

          <Label htmlFor="password">
            Mot de passe <RequiredText>*</RequiredText>
          </Label>
          <PasswordWrapper>
            <InputPassword
              id="password"
              name="password"
              type={ isSeePassword ? 'password' : 'text' }
              onChange={ getPassword }
              required
              maxLength={ 100 }
              placeholder="Minimum 8 caractères"
              aria-label="Mot de passe"
            />
            <EyeButton
              type="button"
              onClick={ () => setIsSeePassword( !isSeePassword ) }
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

          { password && (
            <ValidationMessage className={ isPasswordValid ? 'valid' : 'invalid' }>
              { isPasswordValid ? '✓ Mot de passe valide' : '✗ Mot de passe faible' }
            </ValidationMessage>
          ) }

          <InformationBoxHeader
            onClick={ () => setShowPasswordInfo( !showPasswordInfo ) }
            aria-expanded={ showPasswordInfo }
            aria-controls="password-info"
            type="button"
          >
            <span>🔐 Critères du mot de passe:</span>
            { showPasswordInfo ? <ChevronUp size={ 18 } /> : <ChevronDown size={ 18 } /> }
          </InformationBoxHeader>

          { showPasswordInfo && (
            <InformationBox id="password-info">
              <ul>
                <li className={ hasMinLength ? 'valid' : 'invalid' }>
                  { hasMinLength ? '✓' : '✗' } Au moins 8 caractères
                </li>
                <li className={ hasUpperCase ? 'valid' : 'invalid' }>
                  { hasUpperCase ? '✓' : '✗' } Au moins une majuscule (A-Z)
                </li>
                <li className={ hasLowerCase ? 'valid' : 'invalid' }>
                  { hasLowerCase ? '✓' : '✗' } Au moins une minuscule (a-z)
                </li>
                <li className={ hasNumber ? 'valid' : 'invalid' }>
                  { hasNumber ? '✓' : '✗' } Au moins un chiffre (0-9)
                </li>
                <li className={ hasSpecialChar ? 'valid' : 'invalid' }>
                  { hasSpecialChar ? '✓' : '✗' } Au moins un caractère spécial (!@#$%^&*)
                </li>
              </ul>
            </InformationBox>
          ) }

          <Label htmlFor="confirmPassword">
            Confirmer le mot de passe <RequiredText>*</RequiredText>
          </Label>
          <PasswordWrapper>
            <InputPassword
              id="confirmPassword"
              name="confirmPassword"
              type={ isSeeConfirmPassword ? 'password' : 'text' }
              onChange={ getConfirmPassword }
              required
              maxLength={ 100 }
              placeholder="Confirmez votre mot de passe"
              aria-label="Confirmation du mot de passe"
            />
            <EyeButton
              type="button"
              onClick={ () => setIsSeeConfirmPassword( !isSeeConfirmPassword ) }
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

          { confirmPassword && (
            <ValidationMessage className={ isConfirmPasswordValid ? 'valid' : 'invalid' }>
              { isConfirmPasswordValid ? '✓ Mots de passe correspondent' : '✗ Mots de passe différents' }
            </ValidationMessage>
          ) }

          <CheckboxWrapper>
            <CheckboxInput
              id="politique"
              checked={ acceptesPolitique }
              onChange={ ( e ) => setAcceptesPolitique( e.target.checked ) }
              aria-label="Accepter la politique de confidentialité"
            />
            <CheckboxLabel htmlFor="politique">
              J'accepte la{ ' ' }
              <CheckboxLink
                onClick={ () => setIsPolitiqueOpen( true ) }
                type="button"
              >
                politique de confidentialité
              </CheckboxLink>{ ' ' }
              et les conditions d'utilisation <RequiredText>*</RequiredText>
            </CheckboxLabel>
          </CheckboxWrapper>

          <CheckboxWrapper>
            <CheckboxInput
              id="newsletter"
              checked={ acceptesNewsletter }
              onChange={ ( e ) => setAcceptesNewsletter( e.target.checked ) }
              aria-label="S'inscrire à la newsletter"
            />
            <CheckboxLabel htmlFor="newsletter">
              Je souhaite recevoir les actualités et offres exclusives de DirectoryFlow
            </CheckboxLabel>
          </CheckboxWrapper>

          <BtnInscription
            disabled={ isLoading || !acceptesPolitique }
            onClick={ handleSubmit }
            style={ {
              opacity: isLoading || !acceptesPolitique ? 0.6 : 1,
              cursor: isLoading || !acceptesPolitique ? 'not-allowed' : 'pointer',
              marginTop: '10px',
            } }
            aria-busy={ isLoading }
          >
            { isLoading ? <Loader /> : 'Créer mon compte' }
          </BtnInscription>

          <LinkConnexion to="/connexion">
            <span style={ { color: '#181616ff', fontWeight: 'bold' } }>
              Vous avez déjà un compte?
            </span>{ ' ' }
            Connectez-vous.
          </LinkConnexion>

          { errorMessage && (
            <ErrorMessage role="alert">
              <AlertCircle size={ 20 } />
              { errorMessage }
            </ErrorMessage>
          ) }

          { successMessage && (
            <SuccessMessage role="status">
              ✓ { successMessage }
            </SuccessMessage> ) }
        </DivWrapperForm>

        { isLoading && <LoadingText>Création de votre compte en cours...</LoadingText> }
      </DivFormConnexion>

      <Footer />
    </main>
  );
}

export default FormInscription;
