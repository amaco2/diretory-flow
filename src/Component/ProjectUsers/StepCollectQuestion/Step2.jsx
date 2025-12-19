import { Link, useNavigate } from "react-router-dom";
import { BtnNextQuest, BtnPrevQuest, InputCheckbox } from "../style/styleComponent";
import "./Steps.css"
import { useContext } from "react";
import { ProjectUserContext } from "../../../ThemeContext";


// Nature et format du projet(QCM)
/**
 * Objectif: comprendre le cadre artistique & industriel du projet
 */

function Step2()
{
    const { formatOfProject, setFormatOfProject } = useContext( ProjectUserContext )

    // Variable de navigation
    const navigate = useNavigate();

    // Fonction de mise a jour des donnees
    const updateData = ( partial ) => setFormatOfProject( ( prev ) => ( { ...prev, ...partial } ) );

    const handleSubmit = ( e ) =>
    {
        e.preventDefault();
        const formaData = new FormData( e.target );
        // Recuperation des donnees du formualire depuis <<FrromData>>
        updateData(
            {
                format: formaData.get( 'format' ),
                duree_estimer: formaData.get( 'time' ),
                mode_diffusion: formaData.get( 'mode_diffusion' ),
                niveau_complexite: formaData.get('complexite'),
                tournage_prevu: formaData.get('tournage'),
                existance_scenario: formaData.get('existance_scenario'),
            }
        );
        // Navigation
        navigate( '../step3' );
    }


    return (
        <form onSubmit={ handleSubmit }>
            {/* Question 1 */ }
            <div>
                <label htmlFor="format_principale">1. Format principale</label><br />
                <label htmlFor="fiction">fiction</label>
                <InputCheckbox type="radio" name="format" value={ "fiction" } />
                <label htmlFor="documentaire">Documentaire</label>
                <InputCheckbox type="radio" name="format" value={ "documentaire" } />
                <label htmlFor="animation">Animation</label>
                <InputCheckbox type="radio" name="format" value={ "animation" } />
                <label htmlFor="hybride">Hybride</label>
                <InputCheckbox type="radio" name="format" value={ "hybride" } />
            </div><br />

            {/* Question 2 */ }
            <div>
                <label htmlFor="format_principale">2. Durée estimée</label><br />
                <label htmlFor="10min"> + 10 min</label>
                <InputCheckbox type="radio" name="time" value={ "10min" } />
                <label htmlFor="10_30min">10-30min</label>
                <InputCheckbox type="radio" name="time" value={ "10_30min" } />
                <label htmlFor="10_30min">30-60min</label>
                <InputCheckbox type="radio" name="time" value={ "10_30min" } />
                <label htmlFor="60">+60min</label>
                <InputCheckbox type="radio" name="time" value={ "60" } />
            </div><br />

            {/* Question 3 */ }
            <div>
                <label htmlFor="format_principale">3. mode de diffusion visé</label><br />
                <label htmlFor="cinema">cinéma</label>
                <InputCheckbox type="radio" name="mode_diffusion" value={ "cinema" } />
                <label htmlFor="tv">TV</label>
                <InputCheckbox type="radio" name="mode_diffusion" value={ "tv" } />
                <label htmlFor="streaming">Streaming</label>
                <InputCheckbox type="radio" name="mode_diffusion" value={ "streaming" } />
                <label htmlFor="web">Web</label>
                <InputCheckbox type="radio" name="mode_diffusion" value={ "web" } />
                <label htmlFor="tous">Tous</label>
                <InputCheckbox type="radio" name="mode_diffusion" value={ "tous" } />
            </div><br />

            {/* Quetion 4 */ }
            <div>
                <label htmlFor="format_principale">4. Niveau de complexité perçu</label><br />
                <label htmlFor="simple">Simple</label>
                <InputCheckbox type="radio" name="complexite" value={ "simple" } />
                <label htmlFor="moyen">Moyen</label>
                <InputCheckbox type="radio" name="complexite" value={ "moyen" } />
                <label htmlFor="complexe">Complexe</label>
                <InputCheckbox type="radio" name="complexite" value={ "complexe" } />
            </div><br />

            {/* Question 5 */ }
            <div>
                <label htmlFor="format_principale">5. Tournage prévu</label><br />
                <label htmlFor="studio">Studio</label>
                <InputCheckbox type="checkbox" name="tournage" value={ "studio" } />
                <label htmlFor="decors_reels">Décors réels</label>
                <InputCheckbox type="checkbox" name="tournage" value={ "decors_reels" } />
                <label htmlFor="mixte">Mixte</label>
                <InputCheckbox type="checkbox" name="tournage" value={ "mixte" } />
            </div><br />

            {/* Question 6 */ }
            <div>
                <label htmlFor="format_principale">6. Existance d'un scénario</label><br />
                <label htmlFor="oui">Oui final</label>
                <InputCheckbox type="radio" name="existance_scenario" value={ "oui" } />
                <label htmlFor="en_cours">En cours</label>
                <InputCheckbox type="radio" name="existance_scenario" value={ "en_cours" } />
                <label htmlFor="non">Non</label>
                <InputCheckbox type="radio" name="existance_scenario" value={ "non" } />
            </div><br />

            <div className="nav-btn">
                <Link to={ '../' }><BtnPrevQuest>Précédent</BtnPrevQuest></Link>
                <BtnNextQuest type="submit">Suivant</BtnNextQuest>
            </div>
        </form>
    )
}

export { Step2 };