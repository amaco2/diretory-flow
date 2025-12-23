import
{
    AlarmClock,
    Film,
    ProjectorIcon,
    Text,
} from 'lucide-react';
import
{
    BtnNextQuest,
    InputDate,
    InputDescription,
    InputText,
    InputTypeProductyion,
} from '../style/styleComponent';
import { IconStatusChange } from '@tabler/icons-react';
import { useNavigate } from 'react-router-dom';
import { useContext } from 'react';
import { ProjectUserContext } from '../../../ThemeContext';



function Step1()
{


    const { dataProject, setDataProject } = useContext( ProjectUserContext )

    // Variable de navigation
    const navigate = useNavigate();

    // Fonction de mise a jour des donnees
    const updateData = ( partial ) => setDataProject( ( prev ) => ( { ...prev, ...partial } ) );

    const handleSubmit = ( e ) =>
    {
        e.preventDefault();
        const formaData = new FormData( e.target );
        // Recuperation des donnees du formualire depuis <<FrromData>>
        updateData( {
            title_project: formaData.get( 'titre' ),
            type_production: formaData.get( 'type_production' ),
            status: formaData.get( 'satut' ),
            description: formaData.get( 'description' ) || null,
        } );
        // Navigation
        navigate( './step2' );
    }

    return (
        <section aria-labelledby="step1-title">
            <h2 id="step1-title" className="sr-only">Informations générales</h2>
            <form className="step-form center-column" onSubmit={ handleSubmit }>
                <div className="form-field">
                    <label htmlFor='titre'>
                        Titre du projet : <ProjectorIcon color='#00ff00' size={ 35 } />{ ' ' }
                    </label>
                    <InputText type='text' id='titre' name='titre' required />
                </div>
                <div className="form-field">
                    <label htmlFor='date_debut'>
                        Date de début : <AlarmClock color='#ff0000' size={ 25 } />{ ' ' }
                    </label>
                    <InputDate type='date' id='date_debut' name='date_debut' required />
                </div>
                <div className="form-field">
                    <label htmlFor='type_production'>
                        Type de production : <Film size={ 25 } />{ ' ' }
                    </label>
                    <InputTypeProductyion id='type_production' name='type_production' required>
                        <option value=''>--------</option>
                        <option value='film'>Film</option>
                        <option value="court_metrage">Court-métrage</option>
                        <option value='clip'>Clip</option>
                        <option value='pub'>Pub</option>
                        <option value='court_metrage'>Court métrage</option>
                        <option value="documentaire">Documentaire</option>
                        <option value="clip">Clip</option>
                        <option value="autre">Autre</option>
                    </InputTypeProductyion>
                </div>
                <div className="form-field">
                    <label htmlFor="satut">Statut actuel <IconStatusChange color='#0000ff' /></label>
                    <InputTypeProductyion id='satut' name='satut' required>
                        <option value="">---------</option>
                        <option value="idee">idée</option>
                        <option value="preproduction">Préproduction</option>
                        <option value="production">Production</option>
                        <option value="postproduction">Postproduction</option>
                    </InputTypeProductyion>
                </div>
                <div className="form-field">
                    <label htmlFor='description'>
                        Description : <Text />
                    </label>
                    <InputDescription id='description' name='description' required></InputDescription>
                </div>
                <div className="form-actions">
                    <BtnNextQuest type='submit'>Suivant</BtnNextQuest>
                </div>
            </form>
        </section>
    )
}


export { Step1 };