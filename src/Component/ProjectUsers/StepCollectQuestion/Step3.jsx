import { Link, useNavigate } from "react-router-dom";
import { BtnNextQuest, BtnPrevQuest, InputCheckbox } from "../style/styleComponent";
import "./Steps.css"
import { useContext } from "react";
import { ProjectUserContext } from "../../../ThemeContext";


// Nature et format du projet(QCM)
/**
 * Objectif: comprendre le cadre artistique & industriel du projet
 */

function Step3()
{

    const { dataStep3, setDataStep3 } = useContext( ProjectUserContext );
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
                outil_utilise: formaData.get( 'outils_utilise' ),
            }
        );
        // Navigation
        navigate( '../step4' );
    }

    return (
        <form onSubmit={ handleSubmit }>
            {/* Question 1 */ }
            <div>
                <label htmlFor="format_principale">1. Taille estimée de l'équipe</label><br />
                <label htmlFor="1_5">1-5</label>
                <InputCheckbox type="radio" name="taille_equipe" value={ "1_5" } />
                <label htmlFor="6_15">6-15</label>
                <InputCheckbox type="radio" name="taille_equipe" value={ "6_15" } />
                <label htmlFor="16_30">16-30</label>
                <InputCheckbox type="radio" name="taille_equipe" value={ "16_30" } />
                <label htmlFor="30">+30</label>
                <InputCheckbox type="radio" name="taille_equipe" value={ "30" } />
            </div><br />

            {/* Question 2 */ }
            <div>
                <label htmlFor="format_principale">2. Présence du directeur de production</label><br />
                <label htmlFor="oui">Oui</label>
                <InputCheckbox type="radio" name="non_oui" value={ "oui" } />
                <label htmlFor="non">Non</label>
                <InputCheckbox type="radio" name="non_oui" value={ "non" } />
            </div><br />

            {/* Question 3 */ }
            <div>
                <label htmlFor="format_principale">3. présence du 1er assistant réalisateur</label><br />
                <label htmlFor="oui">Oui</label>
                <InputCheckbox type="radio" name="oui_non" value={ "oui" } />
                <label htmlFor="non">Non</label>
                <InputCheckbox type="radio" name="oui_non" value={ "non" } />
            </div><br />

            {/* Quetion 4 */ }
            <div>
                <label htmlFor="format_principale">4. méthode de travaille actuelle </label><br />
                <label htmlFor="papier">Papier</label>
                <InputCheckbox type="radio" name="methode_travaille" value={ "papier" } />
                <label htmlFor="exel">Exel</label>
                <InputCheckbox type="radio" name="methode_travaille" value={ "exel" } />
                <label htmlFor="whatsapp">WhatsApp</label>
                <InputCheckbox type="radio" name="methode_travaille" value={ "whatsapp" } />
                <label htmlFor="outils_numerique">Outils numériques</label>
                <InputCheckbox type="radio" name="methode_travaille" value={ "outils_numerique" } />
            </div><br />

            {/* Question 5 */ }
            <div>
                <label htmlFor="format_principale">5. Niveau d'expérience de l'équipe</label><br />
                <label htmlFor="debutant">Débutant</label>
                <InputCheckbox type="radio" name="niveau" value={ "debutant" } />
                <label htmlFor="decors_reels">Expérimenté</label>
                <InputCheckbox type="radio" name="niveau" value={ "expérimenté" } />
                <label htmlFor="mixte">Mixte</label>
                <InputCheckbox type="radio" name="niveau" value={ "mixte" } />
            </div><br />

            {/* Question 6 */ }
            <div>
                <label htmlFor="format_principale">6. Outil déja utilisé (Si oui)</label><br />
                <label htmlFor="aucun">Aucun</label>
                <InputCheckbox type="radio" name="outils_utilise" value={ "aucun" } />
                <label htmlFor="trello">Trello</label>
                <InputCheckbox type="radio" name="outils_utilise" value={ "trello" } />
                <label htmlFor="notion">Notion</label>
                <InputCheckbox type="radio" name="outils_utilise" value={ "notion" } />
                <label htmlFor="autre">Autre</label>
                <InputCheckbox type="radio" name="outils_utilise" value={ "autre" } />
            </div><br />

            <div className="nav-btn">
                <Link to={ '../step2' }><BtnPrevQuest>Précédent</BtnPrevQuest></Link>
                <BtnNextQuest type="submit">Suivant</BtnNextQuest>
            </div>
        </form>
    )
}

export { Step3 };