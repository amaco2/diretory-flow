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
import {  useNavigate } from 'react-router-dom';
import { useContext} from 'react';
import { ProjectUserContext } from '../../../ThemeContext';



function Step1()
{


    const { dataProject, setDataProject } = useContext(ProjectUserContext)

    // Variable de navigation
    const navigate = useNavigate();

    // Fonction de mise a jour des donnees
    const updateData = ( partial ) => setDataProject( ( prev ) => ( { ...prev, ...partial } ) );

    const handleSubmit = ( e ) =>
    {
        e.preventDefault();
        const formaData = new FormData( e.target );
        // Recuperation des donnees du formualire depuis <<FrromData>>
        updateData({
            title_project: formaData.get('titre'),
            type_production: formaData.get('type_production'),
            status: formaData.get('satut'),
            description: formaData.get('description') || null,
        });
        // Navigation
        navigate('./step2');
    }

    return (
        <form style={ {
            display: "flex",
            flexDirection: "column",
            justifyContent: "center",
            alignItems: "center"
        } } onSubmit={ handleSubmit }>
            <label htmlFor='titre'>
                Titre du projet : <ProjectorIcon color='#00ff00' size={ 35 } />{ ' ' }
            </label>
            <InputText type='text' id='titre' name='titre' required/>
            <label htmlFor='date_debut'>
                Date de début : <AlarmClock color='#ff0000' size={ 25 } />{ ' ' }
            </label>
            <InputDate type='date' required/>
            <label htmlFor='type_production'>
                Type de production : <Film size={ 25 } />{ ' ' }
            </label>
            <InputTypeProductyion name='type_production' required>
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
            <label htmlFor="satut">Statut actuel <IconStatusChange color='#0000ff' /></label>
            <InputTypeProductyion name='satut' required>
                <option value="">---------</option>
                <option value="idee">idée</option>
                <option value="preproduction">Préproduction</option>
                <option value="production">Production</option>
                <option value="postproduction">Postproduction</option>
            </InputTypeProductyion>
            <label htmlFor='description'>
                Description : <Text />
            </label>
            <InputDescription name='description' required></InputDescription>
            <br />
            <BtnNextQuest type='submit'>Suivant</BtnNextQuest>

        </form>
    )
}


export { Step1 };