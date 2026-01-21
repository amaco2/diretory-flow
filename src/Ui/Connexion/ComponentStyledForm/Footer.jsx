import styled from 'styled-components';
import { Link } from 'react-router-dom';
import { Mail, Phone, MapPin, Facebook, Twitter, Linkedin } from 'lucide-react';

// Breakpoints pour responsive
const breakPoints = {
    mobile: '768px',
    tablet: '1024px',
    desktop: '1440px',
};

const FooterContainer = styled.footer`
  background: linear-gradient(135deg, #0d47a1 0%, #1565c0 100%);
  color: #ffffff;
  margin-top: auto;
  width: 100%;
  padding: 40px 20px;
  font-family: 'Open Sans', sans-serif;

  @media (max-width: ${ breakPoints.mobile }) {
    padding: 30px 15px;
  }
`;

const FooterContent = styled.div`
  max-width: 1200px;
  margin: 0 auto;
  display: grid;
  grid-template-columns: repeat(4, 1fr);
  gap: 40px;

  @media (max-width: ${ breakPoints.tablet }) {
    grid-template-columns: repeat(2, 1fr);
    gap: 30px;
  }

  @media (max-width: ${ breakPoints.mobile }) {
    grid-template-columns: 1fr;
    gap: 20px;
  }
`;

const FooterSection = styled.div`
  display: flex;
  flex-direction: column;
  gap: 15px;

  h3 {
    font-size: 1.2em;
    font-weight: 700;
    margin-bottom: 10px;
    color: #ffffff;
    border-bottom: 2px solid rgba(255, 255, 255, 0.3);
    padding-bottom: 8px;

    @media (max-width: ${ breakPoints.mobile }) {
      font-size: 1em;
    }
  }
`;

const FooterLink = styled( Link )`
  color: rgba(255, 255, 255, 0.85);
  text-decoration: none;
  font-size: 0.95em;
  transition: all 0.3s ease;
  display: flex;
  align-items: center;
  gap: 8px;

  &:hover {
    color: #ffffff;
    padding-left: 5px;
    text-decoration: underline;
  }

  @media (max-width: ${ breakPoints.mobile }) {
    font-size: 0.9em;
  }
`;

const ContactInfo = styled.div`
  display: flex;
  align-items: center;
  gap: 10px;
  color: rgba(255, 255, 255, 0.85);
  font-size: 0.95em;
  transition: all 0.3s ease;

  &:hover {
    color: #ffffff;
  }

  @media (max-width: ${ breakPoints.mobile }) {
    font-size: 0.9em;
  }
`;

const SocialLinks = styled.div`
  display: flex;
  gap: 15px;
  margin-top: 10px;

  @media (max-width: ${ breakPoints.mobile }) {
    gap: 10px;
  }
`;

const SocialLink = styled.a`
  display: flex;
  align-items: center;
  justify-content: center;
  width: 40px;
  height: 40px;
  border-radius: 50%;
  background-color: rgba(255, 255, 255, 0.15);
  color: #ffffff;
  transition: all 0.3s ease;
  text-decoration: none;

  &:hover {
    background-color: rgba(255, 255, 255, 0.25);
    transform: translateY(-3px);
  }

  @media (max-width: ${ breakPoints.mobile }) {
    width: 36px;
    height: 36px;
  }
`;

const FooterBottom = styled.div`
  max-width: 1200px;
  margin: 40px auto 0;
  padding: 20px 0;
  border-top: 1px solid rgba(255, 255, 255, 0.2);
  display: flex;
  justify-content: space-between;
  align-items: center;
  flex-wrap: wrap;
  gap: 20px;

  @media (max-width: ${ breakPoints.mobile }) {
    flex-direction: column;
    text-align: center;
    gap: 15px;
    margin: 30px auto 0;
  }
`;

const Copyright = styled.p`
  font-size: 0.9em;
  color: rgba(255, 255, 255, 0.75);
  margin: 0;

  @media (max-width: ${ breakPoints.mobile }) {
    font-size: 0.85em;
  }
`;

const LegalLinks = styled.div`
  display: flex;
  gap: 20px;

  @media (max-width: ${ breakPoints.mobile }) {
    flex-direction: column;
    gap: 10px;
  }
`;

const LegalLink = styled( Link )`
  color: rgba(255, 255, 255, 0.75);
  text-decoration: none;
  font-size: 0.9em;
  transition: all 0.3s ease;

  &:hover {
    color: #ffffff;
    text-decoration: underline;
  }

  @media (max-width: ${ breakPoints.mobile }) {
    font-size: 0.85em;
  }
`;

const Badge = styled.span`
  display: inline-block;
  background-color: rgba(255, 255, 255, 0.2);
  color: #ffffff;
  padding: 4px 12px;
  border-radius: 20px;
  font-size: 0.85em;
  font-weight: 600;
  margin-left: 8px;

  @media (max-width: ${ breakPoints.mobile }) {
    font-size: 0.8em;
    padding: 3px 10px;
  }
`;

function Footer()
{
    const currentYear = new Date().getFullYear();

    return (
        <FooterContainer role="contentinfo" itemScope itemType="https://schema.org/Organization">
            <FooterContent>
                {/* À Propos */ }
                <FooterSection>
                    <h3>À Propos</h3>
                    <p style={ { fontSize: '0.95em', lineHeight: '1.6', margin: 0 } }>
                        DirectoryFlow est la plateforme de gestion de projets audiovisuels
                        la plus complète. Simplifiez votre workflow de production.
                    </p>
                    <Badge>✨ v1.0.0</Badge>
                </FooterSection>

                {/* Support & Produit */ }
                <FooterSection>
                    <h3>Produit</h3>
                    <FooterLink to="/features">📊 Fonctionnalités</FooterLink>
                    <FooterLink to="/pricing">💰 Tarifs</FooterLink>
                    <FooterLink to="/documentation">📚 Documentation</FooterLink>
                    <FooterLink to="/blog">📝 Blog</FooterLink>
                </FooterSection>

                {/* Support */ }
                <FooterSection>
                    <h3>Support</h3>
                    <ContactInfo>
                        <Mail size={ 18 } />
                        <a href="mailto:support@directoryflow.com"
                            style={ { color: 'rgba(255, 255, 255, 0.85)', textDecoration: 'none' } }>
                            support@directoryflow.com
                        </a>
                    </ContactInfo>
                    <ContactInfo>
                        <Phone size={ 18 } />
                        <a href="tel:+33123456789"
                            style={ { color: 'rgba(255, 255, 255, 0.85)', textDecoration: 'none' } }>
                            +33 1 23 45 67 89
                        </a>
                    </ContactInfo>
                    <ContactInfo>
                        <MapPin size={ 18 } />
                        <span>Cameroun, Yaounde</span>
                    </ContactInfo>
                    <FooterLink to="/contact">💬 Nous contacter</FooterLink>
                </FooterSection>

                {/* Réseaux Sociaux */ }
                <FooterSection>
                    <h3>Suivez-Nous</h3>
                    <p style={ { fontSize: '0.95em', margin: '0 0 10px 0' } }>
                        Restez connecté et découvrez les dernières actualités.
                    </p>
                    <SocialLinks>
                        <SocialLink
                            href="https://facebook.com/directoryflow"
                            title="Facebook"
                            aria-label="Suivez-nous sur Facebook"
                        >
                            <Facebook size={ 20 } />
                        </SocialLink>
                        <SocialLink
                            href="https://twitter.com/directoryflow"
                            title="Twitter"
                            aria-label="Suivez-nous sur Twitter"
                        >
                            <Twitter size={ 20 } />
                        </SocialLink>
                        <SocialLink
                            href="https://linkedin.com/company/directoryflow"
                            title="LinkedIn"
                            aria-label="Suivez-nous sur LinkedIn"
                        >
                            <Linkedin size={ 20 } />
                        </SocialLink>
                    </SocialLinks>
                </FooterSection>
            </FooterContent>

            {/* Bottom Section */ }
            <FooterBottom>
                <Copyright>
                    &copy; { currentYear } DirectoryFlow. Tous droits réservés.
                </Copyright>
                <LegalLinks>
                    <LegalLink to="/politique-confidentialite">
                        Politique de Confidentialité
                    </LegalLink>
                    <LegalLink to="/conditions-utilisation">
                        Conditions d'Utilisation
                    </LegalLink>
                    <LegalLink to="/cookies">
                        Gestion des Cookies
                    </LegalLink>
                </LegalLinks>
            </FooterBottom>
        </FooterContainer>
    );
}

export default Footer;
