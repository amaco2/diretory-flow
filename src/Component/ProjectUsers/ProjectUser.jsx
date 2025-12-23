import { DivfonsScrool } from '../../Ui/ProfilUsers/ComponentsProfil';
import
{
  DivForm,
  DivFormProjects,
} from './style/styleComponent';
import { Link, Outlet } from 'react-router-dom';
import { itemslist } from './ComponentUser';
import { useEffect, useRef, useState } from 'react';
// Importation de notre feuille de style
import './style/ProjectUser.css';
import { ProjectUserContext } from '../../ThemeContext';

function ProjectUser()
{

  /**
* On cree un state qui va stocker les information du <<step1>>
* et un @Component de useContext
*/
  const [ dataProject, setDataProject ] = useState( {
    title_project: "",
    type_production: "",
    status: 'Préproduction',
    description: ""
  } );

  const [ formatOfProject, setFormatOfProject ] = useState(
    {
      format: '',
      duree_estimer: '',
      mode_diffusion: '',
      niveau_complexite: '',
      tournage_prevu: '',
      existance_scenario: '',
    }
  )
  const [ dataStep3, setDataStep3 ] = useState(
    {
      taille_equipe: '',
      isDirecteurProduction: '',
      isPremierAD: '',
      methode_travaille: '',
      expEquipe: '',
      outil_utilise: '',
    }
  )

  const [ dataStep4, setDataStep4 ] = useState(
    {
      date_Debut: "",
      date_Fin: "",
      nbr_Jour_tournage: '',
      contrainte: '',
      niveauPression: '',
      flexibilitePlanning: '',
    }
  )

  const [ dataStep5, setDataStep5 ] = useState(
    {
      satusEquipe: '',
      budget: '',
      materiel: '',
      tele_travail: '',
      nbr_Lieux_Principaux: '',
      risque: '',
    }
  );

  const [ dataStep6, setDataStep6 ] = useState(
    {
      objectif: '',
      crainte: '',
      blockage: '',
      priorite: '',
      attente: '',
      autoriserIA: '',
    }
  )


  /** Dans la suite nous declarons des variables qui
   * font references aux elements du DOM et des fonctions
   * qui appel celle-ci */
  const refDivInpuit = useRef( null );
  const refDivBgImg = useRef( null );
  const description = useRef( null );

  // on place un tableau de dependence vide pour charger les donnes pendant chaque rendu
  useEffect( () =>
  {
    let i = 0;
    const getDivInput = () =>
    {
      //  On recupere la <<DIV>> contenant les input ici
      if ( refDivInpuit.current )
      {
        return refDivInpuit.current.querySelectorAll( 'input[type="radio"]' );
      }
    };
    const getDivBgImg = () =>
    {
      if ( refDivBgImg.current )
      {
        const set = setInterval( () =>
        {
          refDivBgImg.current.style.backgroundImage = `url(${ itemslist[ i ].img })`;
          refDivBgImg.current.style.transition = 'all';
          description.current.textContent = itemslist[ i ].description;
          const get = getDivInput();
          get[ i ].checked = true;
          i = ( i + 1 ) % itemslist.length;
        }, 10000 );

        return () =>
        {
          clearInterval( set );
        };
      }
    };
    getDivBgImg();
  }, [] );

  return (
    <div className='addImgBg' ref={ refDivBgImg }>
      <DivFormProjects className='div-form-project-grid'>
        <DivfonsScrool>
          <div >
            {/* Ici seront les images */ }
            <p ref={ description } className='description'>
              ...
            </p>
            <div className='input-radio-check' ref={ refDivInpuit }>
              <input type='radio' id='rdio' name='rdio' disabled />
              <input type='radio' id='rdio' name='rdio' disabled />
              <input type='radio' id='rdio' name='rdio' disabled />
              <input type='radio' id='rdio' name='rdio' disabled />
              <input type='radio' id='rdio' name='rdio' disabled />
            </div>
          </div>
        </DivfonsScrool>
        <div>
          {/* <form action=""> */ }
          <DivForm>
            <ProjectUserContext.Provider value={ {
              dataProject,
              setDataProject,
              formatOfProject,
              setFormatOfProject,
              dataStep3,
              setDataStep3,
              dataStep4,
              setDataStep4,
              dataStep5,
              setDataStep5,
              dataStep6,
              setDataStep6
            } }>
              <Outlet />
            </ProjectUserContext.Provider>
            {/* Lien de retour a la page d'accueil */ }
          </DivForm>
          {/* </form> */ }
        </div>
      </DivFormProjects>
    </div>
  );
}
/**
 * @param {<DivForm/>}Cretion d'une fonction servant d'index au swicth des donnes qui seront
 * utilise pour pose diverse question a l'utilisateur
 * @example
 * @component
 * <GetStartQuestion />
 */

export default ProjectUser;
