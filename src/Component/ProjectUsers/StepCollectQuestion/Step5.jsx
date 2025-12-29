import { Link, useNavigate } from "react-router-dom";
import { BtnNextQuest, BtnPrevQuest, InputCheckbox, InputDate } from "../style/styleComponent";
import "./Steps.css"
import { Columns4 } from "lucide-react";
import { useContext } from "react";
import { DashboardContext, ProjectUserContext } from "../../../ThemeContext";


// Equipes et moyens

/**
 * Objectif: comprendre les ressources
 */

function Step5()
{
    const { dataStep5, setDataStep5 } = useContext( DashboardContext );

    // Variable de navigation
    const navigate = useNavigate();

    // Fonction de mise a jour des donnees
    const updateData = ( partial ) => setDataStep5( ( prev ) => ( { ...prev, ...partial } ) );

    const handleSubmit = ( e ) =>
    {
        e.preventDefault();
        const formaData = new FormData( e.target );
        // Recuperation des donnees du formualire depuis <<FrromData>>
        updateData(
            {
                budget: formaData.get( 'budget_global' ),
                risque: formaData.get( 'risque' ),
            }
        );
        // Navigation
        navigate( '../step6' );
    }

    return (
        <section aria-labelledby="step5-title" className="section">
            <h2 id="step5-title" className="sr-only">Équipes et moyens</h2>
            <form className="step-form" onSubmit={ handleSubmit }>
                <fieldset className="form-field">
                    <legend>2. Budget Global estimé</legend>
                    <label htmlFor="budget-faible">Très faible</label>
                    <InputCheckbox id="budget-faible" type="radio" name="budget_global" value={ "faible" } />
                    <label htmlFor="budget-moyen">Moyen</label>
                    <InputCheckbox id="budget-moyen" type="radio" name="budget_global" value={ "moyen" } />
                    <label htmlFor="budget-eleve">Élevé</label>
                    <InputCheckbox id="budget-eleve" type="radio" name="budget_global" value={ "élevé" } />
                </fieldset>
                <fieldset className="form-field">
                    <legend>6. Niveau de risque global</legend>
                    <label htmlFor="risque-faible">Faible</label>
                    <InputCheckbox id="risque-faible" type="radio" name="risque" value={ "faible" } />
                    <label htmlFor="risque-moyen">Moyen</label>
                    <InputCheckbox id="risque-moyen" type="radio" name="risque" value={ "moyen" } />
                    <label htmlFor="risque-eleve">Élevé</label>
                    <InputCheckbox id="risque-eleve" type="radio" name="risque" value={ "élevé" } />
                </fieldset>

                <div className="nav-btn">
                    <Link to={ '../step3' }><BtnPrevQuest>Précédent</BtnPrevQuest></Link>
                    <BtnNextQuest type="submit">Suivant</BtnNextQuest>
                </div>
            </form>
        </section>
    )
}

export { Step5 };