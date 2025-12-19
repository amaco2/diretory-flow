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
import { ProjectUserContext } from '../../../ThemeContext';


// Vision risque & attente
/**
 * Objectif: personalisation maximale
 * @returns 
 */



function Step6()
{
    const { dataStep6, setDataStep6 } = useContext( ProjectUserContext );
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
                crainte: formaData.get( 'crainte' ),
                blockage: formaData.get( 'blockage' ),
                priorite: formaData.get( 'priorite_absolue' ),
                attente: formaData.get( 'attente' ),
                autoriserIA: formaData.get( 'suggestion_IA' ),
            }
        );
        // Navigation
        navigate( '/project' );
    }

    return (
        <form
            style={
                {
                    display: "flex",
                    flexDirection: "column",
                    justifyContent: "center",
                    alignItems: "center"
                } }
            onSubmit={ handleSubmit }>
            <label htmlFor='type_production'>
                Objectif principale du projet : <Briefcase size={ 25 } />{ ' ' }
            </label>
            <InputTypeProductyion name='type_production'>
                <option value=''>--------</option>
                <option value='artistique'>Artistique</option>
                <option value="commercial">Commercial</option>
                <option value='pedqgogique'>Pédagogique</option>
                <option value='autre'>Autre</option>
            </InputTypeProductyion>
            <label htmlFor='crainte'>
                Plus grande crainte actuelle: <Ghost color='#1a1919ff' size={ 25 } />{ ' ' }
            </label>
            <InputDate type='text' name='crainte' />
            <label htmlFor='blockage'>
                Ce qui pourrait bloquer la production: <BriefcaseBusiness color='#ff00e1ff' size={ 25 } />{ ' ' }
            </label>
            <InputDate type='text' name='blockage' />

            <div>
                <label htmlFor="format_principale">Priorité absolue <Flag color='#ff0000' /></label><br />
                <label htmlFor="temps">Temps</label>
                <InputCheckbox type="radio" name="priorite_absolue" value={ "temps" } />
                <label htmlFor="qualite">Qualité</label>
                <InputCheckbox type="radio" name="priorite_absolue" value={ "qualite" } />
                <label htmlFor="budget">Budget</label>
                <InputCheckbox type="radio" name="priorite_absolue" value={ "eleve" } />
            </div><br />
            <div>
                <label htmlFor="format_principale">Attente vis-à-vis de DirectoryFlow <Hourglass color='#9f9f29ff' /></label><br />
                <label htmlFor="organisation">Organisation</label>
                <InputCheckbox type="radio" name="attente" value={ "organisation" } />
                <label htmlFor="anticipation">Anticipation</label>
                <InputCheckbox type="radio" name="attente" value={ "anticipation" } />
                <label htmlFor="assistance">Assistance</label>
                <InputCheckbox type="radio" name="attente" value={ "assistance" } />
            </div><br /><br />

            <div>
                <label htmlFor="format_principale">Autorise-tu l'IA à faire des suggestions <Lightbulb color='#f6ff00ff' size={ 35 } />?</label><br />
                <label htmlFor="oui">Oui</label>
                <InputCheckbox type="radio" name="suggestion_IA" value={ "oui" } />
                <label htmlFor="non">Non</label>
                <InputCheckbox type="radio" name="suggestion_IA" value={ "non" } />
            </div><br />

            <div className="nav-btn" style={ {
                width: "600px"
            } }>
                <Link to={ '../step5' }><BtnPrevQuest>Précédent</BtnPrevQuest></Link>
                <BtnNextQuest type="submit">Suivant</BtnNextQuest>
            </div>
        </form>
    )
}


export { Step6 };
