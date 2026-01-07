import { Link, useNavigate } from "react-router-dom";
import { BtnNextQuest, BtnPrevQuest, InputCheckbox } from "../style/styleComponent";
import "./Steps.css"
import { useContext } from "react";
import { DashboardContext, ProjectUserContext } from "../../../ThemeContext";
import { ProgressBar } from "./ProgressBar";


// Nature et format du projet(QCM)
/**
 * Objectif: comprendre le cadre artistique & industriel du projet
 */

function Step3()
{

    const { dataStep3, setDataStep3 } = useContext( DashboardContext );
    // Variable de navigation
    const navigate = useNavigate();

    // Fonction de mise a jour des donnees
    const updateData = ( partial ) => setDataStep3( ( prev ) => ( { ...prev, ...partial } ) );

    const handleSubmit = ( e ) =>
    {
        e.preventDefault();
        const formaData = new FormData( e.target );
        // Recuperation des donnees du formualire depuis <<FrromData>>
        updateData(
            {
                taille_equipe: formaData.get( 'taille_equipe' ),
                isDirecteurProduction: formaData.get( 'non_oui' ),
                isPremierAD: formaData.get( 'oui_non' ),
                methode_travaille: formaData.get( 'methode_travaille' ),
                expEquipe: formaData.get( 'niveau' ),
            }
        );
        // Navigation
        navigate( '../step4' );
    }

    return (
        <section aria-labelledby="step3-title" className="section">
            <h2 id="step3-title" className="sr-only">Équipe et méthodes</h2>
            <ProgressBar />
            <form className="step-form" onSubmit={ handleSubmit }>
                <fieldset className="form-field">
                    <legend>1. Taille estimée de l'équipe</legend>
                    <label htmlFor="taille-1_5">1-5</label>
                    <InputCheckbox id="taille-1_5" type="radio" name="taille_equipe" value={ "1_5" } />
                    <label htmlFor="taille-6_15">6-15</label>
                    <InputCheckbox id="taille-6_15" type="radio" name="taille_equipe" value={ "6_15" } />
                    <label htmlFor="taille-16_30">16-30</label>
                    <InputCheckbox id="taille-16_30" type="radio" name="taille_equipe" value={ "16_30" } />
                    <label htmlFor="taille-30">+30</label>
                    <InputCheckbox id="taille-30" type="radio" name="taille_equipe" value={ "30" } />
                </fieldset>

                <fieldset className="form-field">
                    <legend>2. Présence du directeur de production</legend>
                    <label htmlFor="dp-oui">Oui</label>
                    <InputCheckbox id="dp-oui" type="radio" name="non_oui" value={ "oui" } />
                    <label htmlFor="dp-non">Non</label>
                    <InputCheckbox id="dp-non" type="radio" name="non_oui" value={ "non" } />
                </fieldset>

                <fieldset className="form-field">
                    <legend>3. Présence du 1er assistant réalisateur</legend>
                    <label htmlFor="ad-oui">Oui</label>
                    <InputCheckbox id="ad-oui" type="radio" name="oui_non" value={ "oui" } />
                    <label htmlFor="ad-non">Non</label>
                    <InputCheckbox id="ad-non" type="radio" name="oui_non" value={ "non" } />
                </fieldset>

                <fieldset className="form-field">
                    <legend>4. Méthode de travail actuelle</legend>
                    <label htmlFor="methode-papier">Papier</label>
                    <InputCheckbox id="methode-papier" type="radio" name="methode_travaille" value={ "papier" } />
                    <label htmlFor="methode-exel">Exel</label>
                    <InputCheckbox id="methode-exel" type="radio" name="methode_travaille" value={ "exel" } />
                    <label htmlFor="methode-whatsapp">WhatsApp</label>
                    <InputCheckbox id="methode-whatsapp" type="radio" name="methode_travaille" value={ "whatsapp" } />
                    <label htmlFor="methode-outils">Outils numériques</label>
                    <InputCheckbox id="methode-outils" type="radio" name="methode_travaille" value={ "outils_numerique" } />
                </fieldset>

                <fieldset className="form-field">
                    <legend>5. Niveau d'expérience de l'équipe</legend>
                    <label htmlFor="niveau-debutant">Débutant</label>
                    <InputCheckbox id="niveau-debutant" type="radio" name="niveau" value={ "debutant" } />
                    <label htmlFor="niveau-experimente">Expérimenté</label>
                    <InputCheckbox id="niveau-experimente" type="radio" name="niveau" value={ "expérimenté" } />
                    <label htmlFor="niveau-mixte">Mixte</label>
                    <InputCheckbox id="niveau-mixte" type="radio" name="niveau" value={ "mixte" } />
                </fieldset>

                {/* Question 6 */ }
                {/* <div>
                <label htmlFor="format_principale">6. Outil déja utilisé (Si oui)</label><br />
                <label htmlFor="aucun">Aucun</label>
                <InputCheckbox type="radio" name="outils_utilise" value={ "aucun" } />
                <label htmlFor="trello">Trello</label>
                <InputCheckbox type="radio" name="outils_utilise" value={ "trello" } />
                <label htmlFor="notion">Notion</label>
                <InputCheckbox type="radio" name="outils_utilise" value={ "notion" } />
                <label htmlFor="autre">Autre</label>
                <InputCheckbox type="radio" name="outils_utilise" value={ "autre" } />
            </div><br /> */}

                <div className="nav-btn">
                    <Link to={ '../step2' }><BtnPrevQuest>Précédent</BtnPrevQuest></Link>
                    <BtnNextQuest type="submit">Suivant</BtnNextQuest>
                </div>
            </form>
        </section>
    )
}

export { Step3 };