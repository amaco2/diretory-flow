import { Link, useNavigate } from "react-router-dom";
import { BtnNextQuest, BtnPrevQuest, InputCheckbox, InputDate } from "../style/styleComponent";
import "./Steps.css"
import { Columns4 } from "lucide-react";
import { useContext } from "react";
import { ProjectUserContext } from "../../../ThemeContext";


// Equipes et moyens

/**
 * Objectif: comprendre les ressources
 */

function Step5()
{
    const { dataStep5, setDataStep5 } = useContext( ProjectUserContext );

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
                satusEquipe: formaData.get( 'constitution_equipe' ),
                budget: formaData.get( 'budget_global' ),
                materiel: formaData.get( 'acces_materiel' ),
                tele_travail: formaData.get( 'tele_travaille' ),
                nbr_Lieux_Principaux: formaData.get( 'nbr_jours' ),
                risque: formaData.get( 'risque' ),
            }
        );
        // Navigation
        navigate( '../step6' );
    }

    return (
        <form
            style={ {
                marginLeft: "90px"
            } }
            onSubmit={ handleSubmit }>
            <div>
                <label htmlFor="format_principale">1. Equipe complète déjà constitué ?</label><br />
                <label htmlFor="oui">Oui</label>
                <InputCheckbox type="radio" name="constitution_equipe" value={ "oui" } />
                <label htmlFor="partielle">Partielle</label>
                <InputCheckbox type="radio" name="constitution_equipe" value={ "partielle" } />
                <label htmlFor="non">Non</label>
                <InputCheckbox type="radio" name="constitution_equipe" value={ "non" } />
            </div><br />
            <div>
                <label htmlFor="format_principale">2. Budget Global estimé</label><br />
                <label htmlFor="faible">Très faible</label>
                <InputCheckbox type="radio" name="budget_global" value={ "faible" } />
                <label htmlFor="moyen">Moyen</label>
                <InputCheckbox type="radio" name="budget_global" value={ "moyen" } />
                <label htmlFor="eleve">Elevé</label>
                <InputCheckbox type="radio" name="budget_global" value={ "élevé" } />
            </div><br />
            <div>
                <label htmlFor="format_principale">3. Accès au matériel</label><br />
                <label htmlFor="oui">Oui</label>
                <InputCheckbox type="radio" name="acces_materiel" value={ "oui" } />
                <label htmlFor="partiel">Partiel</label>
                <InputCheckbox type="radio" name="acces_materiel" value={ "partiel" } />
                <label htmlFor="non">Non</label>
                <InputCheckbox type="radio" name="acces_materiel" value={ "non" } />
            </div><br />
            <div>
                <label htmlFor="format_principale">4. Travaille à distaner</label><br />
                <label htmlFor="oui">Oui</label>
                <InputCheckbox type="radio" name="tele_travaille" value={ "oui" } />
                <label htmlFor="non">Non</label>
                <InputCheckbox type="radio" name="tele_travaille" value={ "non" } />
            </div><br />
            <div>
                <label htmlFor='nbr_jours'>
                    Nombres de lieux Principaux: <Columns4 color='#00aeffff' size={ 25 } />{ ' ' }
                </label>
                <InputDate type='number' name="nbr_jours" style={ { marginLeft: "30px" } } />
            </div><br />
            <div>
                <label htmlFor="format_principale">6. Niveau de risque global</label><br />
                <label htmlFor="faible">Faible</label>
                <InputCheckbox type="radio" name="risque" value={ "faible" } />
                <label htmlFor="moyen">Moyen</label>
                <InputCheckbox type="radio" name="risque" value={ "moyen" } />
                <label htmlFor="élevé">Elevé</label>
                <InputCheckbox type="radio" name="risque" value={ "élevé" } />
            </div><br />

            <div className="nav-btn" style={ { marginLeft: "-120px" } }>
                <Link to={ '../step3' }><BtnPrevQuest>Précédent</BtnPrevQuest></Link>
                <BtnNextQuest type="submit">Suivant</BtnNextQuest>
            </div>
        </form>
    )
}

export { Step5 };