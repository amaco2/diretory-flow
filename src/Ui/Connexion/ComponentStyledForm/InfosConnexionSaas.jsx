import styled from 'styled-components';
import { CheckCircle, Zap, Shield, Users } from 'lucide-react';

const breakPoints = {
    mobile: '768px',
    tablet: '1024px',
};

const InfoContainer = styled.div`
  display: flex;
  flex-direction: column;
  gap: 20px;
  padding: 20px;
  background: linear-gradient(135deg, rgba(13, 71, 161, 0.05) 0%, rgba(21, 101, 192, 0.05) 100%);
  border-radius: 10px;
  margin-bottom: 20px;

  @media (max-width: ${ breakPoints.mobile }) {
    padding: 15px;
    gap: 15px;
  }
`;

const FeatureItem = styled.div`
  display: flex;
  align-items: flex-start;
  gap: 12px;
  padding: 10px 0;

  @media (max-width: ${ breakPoints.mobile }) {
    gap: 10px;
  }
`;

const IconWrapper = styled.div`
  display: flex;
  align-items: center;
  justify-content: center;
  min-width: 30px;
  height: 30px;
  background: linear-gradient(135deg, #0d47a1 0%, #1565c0 100%);
  border-radius: 50%;
  color: white;
  flex-shrink: 0;

  @media (max-width: ${ breakPoints.mobile }) {
    min-width: 28px;
    height: 28px;
  }
`;

const FeatureText = styled.div`
  display: flex;
  flex-direction: column;
  gap: 2px;

  strong {
    color: #0d47a1;
    font-size: 0.95em;

    @media (max-width: ${ breakPoints.mobile }) {
      font-size: 0.9em;
    }
  }

  span {
    color: #666;
    font-size: 0.85em;

    @media (max-width: ${ breakPoints.mobile }) {
      font-size: 0.8em;
    }
  }
`;

const SecurityBadge = styled.div`
  display: flex;
  align-items: center;
  gap: 8px;
  padding: 8px 12px;
  background-color: rgba(76, 175, 80, 0.15);
  border: 1px solid rgba(76, 175, 80, 0.3);
  border-radius: 6px;
  color: #2e7d32;
  font-size: 0.85em;
  font-weight: 600;

  @media (max-width: ${ breakPoints.mobile }) {
    font-size: 0.8em;
    padding: 6px 10px;
  }
`;

const Title = styled.h3`
  margin: 0 0 10px 0;
  color: #0d47a1;
  font-size: 1.1em;
  font-weight: 700;

  @media (max-width: ${ breakPoints.mobile }) {
    font-size: 1em;
  }
`;

function InfosConnexionSaas()
{
    return (
        <InfoContainer role="region" aria-label="Informations sur DirectoryFlow">
            <Title>✨ Pourquoi Choisir DirectoryFlow?</Title>

            <FeatureItem>
                <IconWrapper>
                    <Zap size={ 16 } />
                </IconWrapper>
                <FeatureText>
                    <strong>Rapide & Performant</strong>
                    <span>Interface ultrarapide optimisée pour votre workflow</span>
                </FeatureText>
            </FeatureItem>

            <FeatureItem>
                <IconWrapper>
                    <Users size={ 16 } />
                </IconWrapper>
                <FeatureText>
                    <strong>Collaboration en Temps Réel</strong>
                    <span>Travaillez avec votre équipe sans limites géographiques</span>
                </FeatureText>
            </FeatureItem>

            <FeatureItem>
                <IconWrapper>
                    <Shield size={ 16 } />
                </IconWrapper>
                <FeatureText>
                    <strong>Sécurité Professionnelle</strong>
                    <span>Chiffrement SSL/TLS et conformité RGPD garantis</span>
                </FeatureText>
            </FeatureItem>

            <FeatureItem>
                <IconWrapper>
                    <CheckCircle size={ 16 } />
                </IconWrapper>
                <FeatureText>
                    <strong>Support 24/7</strong>
                    <span>Équipe dédiée prête à vous aider à tout moment</span>
                </FeatureText>
            </FeatureItem>

            <SecurityBadge>
                🔒 Données sécurisées - Conforme RGPD &amp; ISO 27001
            </SecurityBadge>
        </InfoContainer>
    );
}

export default InfosConnexionSaas;
