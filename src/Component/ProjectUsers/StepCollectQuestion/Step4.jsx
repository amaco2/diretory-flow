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
import { ProjectUserContext } from '../../../ThemeContext';


// Planning & contrainte
/**
 * Objectif: preparer la timeline et alerte
 * @returns 
 */



function Step4()
{
    const {dataStep4, setDataStep4} = useContext(ProjectUserContext)
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
                nbr_Jour_tournage: formaData.get( 'nbr_jours' ),
                contrainte: formaData.get( 'contrainte' ),
                niveauPression: formaData.get( 'niveau_pression' ),
                flexibilitePlanning: formaData.get( 'flexibilite_planning' ),
            }
        );
        // Navigation
        navigate( '../step5' );
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
            <label htmlFor='date_debut'>
                Date de début estimé: <AlarmClock color='#ff0000' size={ 25 } />{ ' ' }
            </label>
            <InputDate type='date' name='date_debut' />
            <label htmlFor='date_fin'>
                Date de fin estimé: <AlarmClock color='#ff0000' size={ 25 } />{ ' ' }
            </label>
            <InputDate type='date' name='date_fin' />
            <label htmlFor='nbr_jours'>
                Nombres de jours de tournage: <Calendar1Icon color='#00aeffff' size={ 25 } />{ ' ' }
            </label>
            <InputDate type='number' name='nbr_jours' />
            <label htmlFor='type_production'>
                Contrainte majeures : <Film size={ 25 } />{ ' ' }
            </label>
            <InputTypeProductyion name='contrainte'>
                <option value=''>--------</option>
                <option value='lieux'>Lieux</option>
                <option value="acteurs">Acteurs</option>
                <option value='budget'>Budget</option>
                <option value='meteo'>météo</option>
                <option value='all'>Tous ce qui précède</option>
            </InputTypeProductyion>
            <div>
                <label htmlFor="format_principale">Niveau de préssion temporelle <TimerOff color='#ff0000' /></label><br />
                <label htmlFor="faible">Faible</label>
                <InputCheckbox type="radio" name="niveau_pression" value={ "faible" } />
                <label htmlFor="moyen">Moyen</label>
                <InputCheckbox type="radio" name="niveau_pression" value={ "moyen" } />
                <label htmlFor="eleve">Elevé</label>
                <InputCheckbox type="radio" name="niveau_pression" value={ "eleve" } />
            </div><br />
            <div>
                <label htmlFor="format_principale">Flexibilité du planning<TimerOff color='#ff0000' /></label><br />
                <label htmlFor="rigide">Rigide</label>
                <InputCheckbox type="radio" name="flexibilite_planning" value={ "rigide" } />
                <label htmlFor="ajustable">Ajustable</label>
                <InputCheckbox type="radio" name="flexibilite_planning" value={ "ajustable" } />
                <label htmlFor="libre">Libre</label>
                <InputCheckbox type="radio" name="flexibilite_planning" value={ "libre" } />
            </div><br /><br />

            <div className="nav-btn" style={ {
                width: "600px"
            } }>
                <Link to={ '../step3' }><BtnPrevQuest>Précédent</BtnPrevQuest></Link>
                <BtnNextQuest type="submit">Suivant</BtnNextQuest>
            </div>
        </form>
    )
}


export { Step4 };
