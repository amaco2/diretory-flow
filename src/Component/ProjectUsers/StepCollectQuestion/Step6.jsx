import
{
    AlarmClock,
    Briefcase,
    BriefcaseBusiness,
    Calendar1Icon,
    Film,
    Flag,
    Ghost,
    Hourglass,
    Lightbulb,
    ProjectorIcon,
    Text,
    TimerOff,
    WatchIcon,
} from 'lucide-react';
import
{
    BtnNextQuest,
    BtnPrevQuest,
    InputCheckbox,
    InputDate,
    InputTypeProductyion,
} from '../style/styleComponent';
import { Link, useNavigate } from 'react-router-dom';
import "./Steps.css"
import { useContext } from 'react';
import { DashboardContext, ProjectUserContext } from '../../../ThemeContext';


// Vision risque & attente
/**
 * Objectif: personalisation maximale
 * @returns 
 */



function Step6()
{
    const { dataStep6, setDataStep6 } = useContext( DashboardContext );
    // Variable de navigation
    const navigate = useNavigate();

    // Fonction de mise a jour des donnees
    const updateData = ( partial ) => setDataStep6( ( prev ) => ( { ...prev, ...partial } ) );

    const handleSubmit = ( e ) =>
    {
        e.preventDefault();
        const formaData = new FormData( e.target );
        // Recuperation des donnees du formualire depuis <<FrromData>>
        updateData(
            {
                objectif: formaData.get( 'type_production' ),
                priorite: formaData.get( 'priorite_absolue' ),
                autoriserIA: formaData.get( 'suggestion_IA' ),
            }
        );
        // Navigation
        navigate( '../summary' );
    }

    return (
        <section aria-labelledby="step6-title" className="section">
            <h2 id="step6-title" className="sr-only">Vision, risques et attentes</h2>
            <form className="step-form center-column" onSubmit={ handleSubmit }>
                <div className="form-field">
                    <label htmlFor='type_production'>
                        Objectif principal du projet : <Briefcase size={ 25 } />{ ' ' }
                    </label>
                    <InputTypeProductyion id='type_production' name='type_production' className='select'>
                        <option value=''>--------</option>
                        <option value='artistique'>Artistique</option>
                        <option value="commercial">Commercial</option>
                        <option value='pedqgogique'>Pédagogique</option>
                        <option value='autre'>Autre</option>
                    </InputTypeProductyion>
                </div>

                <fieldset className="form-field">
                    <legend>Priorité absolue <Flag color='#ff0000' /></legend>
                    <label htmlFor="priorite-temps">Temps</label>
                    <InputCheckbox id="priorite-temps" type="radio" name="priorite_absolue" value={ "temps" } />
                    <label htmlFor="priorite-qualite">Qualité</label>
                    <InputCheckbox id="priorite-qualite" type="radio" name="priorite_absolue" value={ "qualite" } />
                    <label htmlFor="priorite-budget">Budget</label>
                    <InputCheckbox id="priorite-budget" type="radio" name="priorite_absolue" value={ "eleve" } />
                </fieldset>

                <fieldset className="form-field">
                    <legend>Autorise-tu l'IA à faire des suggestions <Lightbulb color='#f6ff00ff' size={ 35 } /></legend>
                    <label htmlFor="ia-oui">Oui</label>
                    <InputCheckbox id="ia-oui" type="radio" name="suggestion_IA" value={ "oui" } />
                    <label htmlFor="ia-non">Non</label>
                    <InputCheckbox id="ia-non" type="radio" name="suggestion_IA" value={ "non" } />
                </fieldset>

                <div className="nav-btn">
                    <Link to={ '../step5' }><BtnPrevQuest>Précédent</BtnPrevQuest></Link>
                    <BtnNextQuest type="submit">Suivant</BtnNextQuest>
                </div>
            </form>
        </section>
    )
}


export { Step6 };
