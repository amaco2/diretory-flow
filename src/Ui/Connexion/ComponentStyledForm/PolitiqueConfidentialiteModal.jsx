import styled from 'styled-components';
import { X } from 'lucide-react';

const breakPoints = {
    mobile: '768px',
    tablet: '1024px',
};

const ModalOverlay = styled.div`
  position: fixed;
  top: 0;
  left: 0;
  right: 0;
  bottom: 0;
  background-color: rgba(0, 0, 0, 0.7);
  display: flex;
  align-items: center;
  justify-content: center;
  z-index: 2000;
  padding: 20px;

  @media (max-width: ${ breakPoints.mobile }) {
    padding: 15px;
  }
`;

const ModalContent = styled.div`
  background: white;
  border-radius: 12px;
  max-width: 600px;
  width: 100%;
  max-height: 80vh;
  overflow-y: auto;
  box-shadow: 0 10px 40px rgba(0, 0, 0, 0.3);
  animation: slideUp 0.3s ease-out;

  @keyframes slideUp {
    from {
      transform: translateY(50px);
      opacity: 0;
    }
    to {
      transform: translateY(0);
      opacity: 1;
    }
  }

  @media (max-width: ${ breakPoints.mobile }) {
    max-height: 90vh;
  }
`;

const ModalHeader = styled.div`
  display: flex;
  justify-content: space-between;
  align-items: center;
  padding: 20px;
  border-bottom: 1px solid #e0e0e0;
  position: sticky;
  top: 0;
  background: linear-gradient(135deg, #0d47a1 0%, #1565c0 100%);
  color: white;

  @media (max-width: ${ breakPoints.mobile }) {
    padding: 15px;
  }
`;

const ModalTitle = styled.h2`
  margin: 0;
  font-size: 1.5em;
  font-weight: 700;

  @media (max-width: ${ breakPoints.mobile }) {
    font-size: 1.2em;
  }
`;

const CloseButton = styled.button`
  background: none;
  border: none;
  color: white;
  cursor: pointer;
  padding: 5px;
  display: flex;
  align-items: center;
  justify-content: center;
  transition: transform 0.2s ease;

  &:hover {
    transform: scale(1.1);
  }

  &:focus {
    outline: 2px solid rgba(255, 255, 255, 0.5);
    outline-offset: 2px;
    border-radius: 4px;
  }
`;

const ModalBody = styled.div`
  padding: 30px;
  color: #333;
  line-height: 1.7;

  @media (max-width: ${ breakPoints.mobile }) {
    padding: 20px;
  }

  h3 {
    color: #0d47a1;
    margin-top: 20px;
    margin-bottom: 10px;
    font-size: 1.1em;

    &:first-child {
      margin-top: 0;
    }

    @media (max-width: ${ breakPoints.mobile }) {
      font-size: 1em;
    }
  }

  p {
    margin: 0 0 15px 0;
    font-size: 0.95em;

    @media (max-width: ${ breakPoints.mobile }) {
      font-size: 0.9em;
    }
  }

  ul {
    margin: 15px 0;
    padding-left: 20px;

    li {
      margin-bottom: 8px;
      font-size: 0.95em;

      @media (max-width: ${ breakPoints.mobile }) {
        font-size: 0.9em;
      }
    }
  }
`;

function PolitiqueConfidentialiteModal( { isOpen, onClose } )
{
    if ( !isOpen ) return null;

    return (
        <ModalOverlay onClick={ onClose } role="dialog" aria-labelledby="politique-title" aria-modal="true">
            <ModalContent onClick={ ( e ) => e.stopPropagation() }>
                <ModalHeader>
                    <ModalTitle id="politique-title">Politique de Confidentialité</ModalTitle>
                    <CloseButton onClick={ onClose } aria-label="Fermer la modale">
                        <X size={ 24 } />
                    </CloseButton>
                </ModalHeader>
                <ModalBody>
                    <h3>1. Introduction</h3>
                    <p>
                        DirectoryFlow (« nous », « notre ») s'engage à protéger votre vie privée.
                        Cette politique explique comment nous collectons, utilisons et protégeons vos données personnelles.
                    </p>

                    <h3>2. Données que Nous Collectons</h3>
                    <p>Nous collectons les informations suivantes :</p>
                    <ul>
                        <li><strong>Informations d'identification :</strong> Nom, prénom, adresse email</li>
                        <li><strong>Informations de compte :</strong> Mot de passe (crypté), préférences</li>
                        <li><strong>Données de projet :</strong> Contenu, fichiers, collaborateurs</li>
                        <li><strong>Données d'utilisation :</strong> Actions, accès, dispositif utilisé</li>
                        <li><strong>Données de facturation :</strong> Méthode de paiement, factures</li>
                    </ul>

                    <h3>3. Comment Nous Utilisons Vos Données</h3>
                    <p>Vos données sont utilisées pour :</p>
                    <ul>
                        <li>Fournir et améliorer nos services</li>
                        <li>Authentifier votre compte et assurer la sécurité</li>
                        <li>Traiter les paiements et facturations</li>
                        <li>Envoyer des communications importantes</li>
                        <li>Conformité légale et prévention des fraudes</li>
                    </ul>

                    <h3>4. Partage de Vos Données</h3>
                    <p>
                        Nous ne vendons jamais vos données personnelles. Nous pouvons partager vos données avec :
                    </p>
                    <ul>
                        <li><strong>Collaborateurs :</strong> Si vous les invitez à votre projet</li>
                        <li><strong>Fournisseurs de services :</strong> Pour hébergement, paiements, analytics</li>
                        <li><strong>Autorités légales :</strong> Si légalement requis</li>
                    </ul>

                    <h3>5. Sécurité de Vos Données</h3>
                    <p>
                        Nous utilisons le chiffrement SSL/TLS, le hachage des mots de passe (bcrypt),
                        et des serveurs sécurisés. Cependant, aucune transmission Internet n'est 100% sûre.
                    </p>

                    <h3>6. Vos Droits</h3>
                    <p>Vous avez le droit de :</p>
                    <ul>
                        <li>Accéder à vos données personnelles</li>
                        <li>Corriger ou supprimer vos données</li>
                        <li>Obtenir une copie de vos données (portabilité)</li>
                        <li>Retirer votre consentement à tout moment</li>
                        <li>Contacter notre Délégué à la Protection des Données</li>
                    </ul>

                    <h3>7. Conservation des Données</h3>
                    <p>
                        Nous conservons vos données aussi longtemps que nécessaire pour fournir nos services.
                        Vous pouvez demander la suppression à tout moment (sauf obligations légales).
                    </p>

                    <h3>8. Modifications de Cette Politique</h3>
                    <p>
                        Nous pouvons mettre à jour cette politique. Les modifications importantes seront
                        communiquées par email ou notification sur votre compte.
                    </p>

                    <h3>9. Nous Contacter</h3>
                    <p>
                        Pour des questions sur cette politique, contactez-nous à : <br />
                        <strong>Email :</strong> privacy@directoryflow.com <br />
                        <strong>Adresse :</strong> Paris, France
                    </p>

                    <p style={ { marginTop: '30px', fontSize: '0.85em', color: '#666' } }>
                        Dernière mise à jour : Janvier 2026
                    </p>
                </ModalBody>
            </ModalContent>
        </ModalOverlay>
    );
}

export default PolitiqueConfidentialiteModal;
