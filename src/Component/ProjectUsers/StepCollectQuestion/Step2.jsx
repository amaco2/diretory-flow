import { Link, useNavigate } from "react-router-dom";
import { BtnNextQuest, BtnPrevQuest, InputCheckbox } from "../style/styleComponent";
import "./Steps.css"
import { useContext } from "react";
import { DashboardContext, ProjectUserContext } from "../../../ThemeContext";


// Nature et format du projet(QCM)
/**
 * Objectif: comprendre le cadre artistique & industriel du projet
 */

function Step2()
{
    const { formatOfProject, setFormatOfProject } = useContext( DashboardContext )

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
                niveau_complexite: formaData.get( 'complexite' ),
            }
        );
        // Navigation
        navigate( '../step3' );
    }


    return (
        <section aria-labelledby="step2-title" className="section">
            <h2 id="step2-title" className="sr-only">Nature et format du projet</h2>
            <form className="step-form" onSubmit={ handleSubmit }>
                <fieldset className="form-field">
                    <legend> Format principal</legend>
                    <label htmlFor="format-fiction">fiction</label>
                    <InputCheckbox id="format-fiction" type="radio" name="format" value={ "fiction" } />
                    <label htmlFor="format-documentaire">Documentaire</label>
                    <InputCheckbox id="format-documentaire" type="radio" name="format" value={ "documentaire" } />
                    <label htmlFor="format-animation">Animation</label>
                    <InputCheckbox id="format-animation" type="radio" name="format" value={ "animation" } />
                    <label htmlFor="format-hybride">Hybride</label>
                    <InputCheckbox id="format-hybride" type="radio" name="format" value={ "hybride" } />
                </fieldset>

                <fieldset className="form-field">
                    <legend> Niveau de complexité perçu</legend>
                    <label htmlFor="complexite-simple">Simple</label>
                    <InputCheckbox id="complexite-simple" type="radio" name="complexite" value={ "simple" } />
                    <label htmlFor="complexite-moyen">Moyen</label>
                    <InputCheckbox id="complexite-moyen" type="radio" name="complexite" value={ "moyen" } />
                    <label htmlFor="complexite-complexe">Complexe</label>
                    <InputCheckbox id="complexite-complexe" type="radio" name="complexite" value={ "complexe" } />
                </fieldset>

                <div className="nav-btn">
                    <Link to={ '../' }><BtnPrevQuest>Précédent</BtnPrevQuest></Link>
                    <BtnNextQuest type="submit">Suivant</BtnNextQuest>
                </div>
            </form>
        </section>
    )
}

export { Step2 };