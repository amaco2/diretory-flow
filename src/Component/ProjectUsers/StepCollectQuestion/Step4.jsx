import
{
    AlarmClock,
    Calendar1Icon,
    Film,
    ProjectorIcon,
    Text,
    TimerOff,
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
import { ProgressBar } from './ProgressBar';


// Planning & contrainte
/**
 * Objectif: preparer la timeline et alerte
 * @returns 
 */



function Step4()
{
    const { dataStep4, setDataStep4 } = useContext( DashboardContext )
    // Variable de navigation
    const navigate = useNavigate();

    // Fonction de mise a jour des donnees
    const updateData = ( partial ) => setDataStep4( ( prev ) => ( { ...prev, ...partial } ) );

    const handleSubmit = ( e ) =>
    {
        e.preventDefault();
        const formaData = new FormData( e.target );
        // Recuperation des donnees du formualire depuis <<FrromData>>
        updateData(
            {
                date_Debut: formaData.get( 'date_debut' ),
                date_Fin: formaData.get( 'date_fin' ),
            }
        );
        // Navigation
        navigate( '../step5' );
    }

    return (
        <section aria-labelledby="step4-title" className="section">
            <h2 id="step4-title" className="sr-only">Planning et contraintes</h2>
            <ProgressBar />
            <form className="step-form center-column" onSubmit={ handleSubmit }>
                <div className="form-field">
                    <label htmlFor='date_debut'>
                        Date de début estimé: <AlarmClock color='#ff0000' size={ 25 } />{ ' ' }
                    </label>
                    <InputDate id='date_debut' name='date_debut' type='date' />
                </div>
                <div className="form-field">
                    <label htmlFor='date_fin'>
                        Date de fin estimé: <AlarmClock color='#ff0000' size={ 25 } />{ ' ' }
                    </label>
                    <InputDate id='date_fin' name='date_fin' type='date' />
                </div>
                <div className="nav-btn">
                    <Link to={ '../step3' }><BtnPrevQuest>Précédent</BtnPrevQuest></Link>
                    <BtnNextQuest type="submit">Suivant</BtnNextQuest>
                </div>
            </form>
        </section>
    )
}


export { Step4 };
