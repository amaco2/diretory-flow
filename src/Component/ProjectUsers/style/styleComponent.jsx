import styled from 'styled-components';
import { breakPoint } from '../../../Ui/MediaQuery/MediaQuery';

const innerWidth = window.innerWidth;
const DivFormProjects = styled.div`
  // display: grid;
  // grid-template-columns: repeat(1, 1fr);
  color: #fff;
  // width: 100vw;
  @media screen and (max-width: ${ breakPoint.tablet }) {
    grid-template-columns: repeat(1, 1fr);
    gap: 40px;
  }
`;
const styleAllInput = `
       width: 48vw;
       max-width: 640px;
       height: 40px;
       box-sizing: border-box;
       padding: 8px 10px;
       border: none;
       background-color: #DEE5F1;
       border-radius: 10px;
       outline: none;
       &:focus{ box-shadow: 0 0 0 3px rgba(0,123,255,0.18); }

       @media screen and (max-width: ${ breakPoint.tablet }) {
         width: 78vw;
       }
     `;
const InputText = styled.input`
  ${ styleAllInput }
`;
const DivForm = styled.div`
  position: relative;
  z-index: 2;
  display: flex;
  flex-direction: column;
  justify-content: flex-start;
  align-items: stretch;
  width: 100%;
  max-width: 980px;
  margin: 0 auto;
  padding: 20px;
  background-color: rgba(11,11,11,0.85);
  color: #fff;
  border-radius: 8px;
  box-shadow: 0 8px 30px rgba(0,0,0,0.6);

  @media screen and (max-width: ${ breakPoint.tablet }) {
    padding: 16px;
    // background-color: transparent;
    box-shadow: none;
    border-radius: 1px;
  }
`;
const InputDate = styled.input`
  ${ styleAllInput }
`;
const InputDescription = styled.textarea`
  width: 48vw;
  max-width: 640px;
  height: 200px;
  box-sizing: border-box;
  padding: 10px;
  border: none;
  background-color: #dee5f1;
  border-radius: 10px;
  &:focus{ box-shadow: 0 0 0 3px rgba(0,123,255,0.18); }

       @media screen and (max-width: ${ breakPoint.tablet }) {
         width: 90vw;
       }
`;
const InputTypeProductyion = styled.select`
  cursor: pointer;
  ${ styleAllInput }
`;
// Bouton de navigation des etapes suivantes

const BtnNextQuest = styled.button`
    width: auto;
    padding: 8px 14px;
    height: 36px;
    border: none;
    border-radius: 8px;
  background-color: #c82333; /* cinema red */
    color: #fff;
    font-weight: bold;
    font-size: 1em;
    cursor: pointer;
    &:focus{ outline: 3px solid rgba(55, 253, 11, 0.3); }
    &:hover { background-color: #3aec04ff; color: #fff; }
`;
const BtnPrevQuest = styled.button`
  width: auto;
  padding: 8px 14px;
  height: 36px;
  border: none;
  border-radius: 8px;
  background-color: #ffd166; /* gold accent */
  color: #fff;
  font-weight: bold;
  font-size: 1em;
  cursor: pointer;
  &:focus{ outline: 3px solid rgba(0, 198, 252, 0.12); }
  &:hover { background-color: #00b3ffff; color: #fff; }
`

const InputCheckbox = styled.input`
  margin-left: 12px;
  cursor: pointer;
  &:focus{ outline: 2px solid rgba(0,123,255,0.25); }
`
/** ***********************************
 * ************** Les fonctions suivant sont place a cette endroit de facon temporaire
 **************** et servent a genere l'icone ou les intials de l'utilisateur ******** */
function getInitials( email )
{
  if ( !email ) return '?';

  const parts = email.split( '@' )[ 0 ].split( '' );
  if ( parts.length === 1 )
  {
    return parts[ 0 ].toUpperCase();
  }

  return parts[ 0 ].toUpperCase();
}

function stringToColor( str )
{
  let hash = 0;
  if ( !str )
  {
    return undefined;
  }
  for ( let i = 0; i < str.length; i++ )
  {
    hash = str.charCodeAt( i ) + ( ( hash << 5 ) - hash );
  }
  const c = ( hash & 0x00feffff ).toString( 16 ).toUpperCase();

  return '#' + '00000'.substring( 0, 6 - c.length ) + c;
}
export
{
  InputText,
  DivForm,
  InputDate,
  InputDescription,
  InputTypeProductyion,
  DivFormProjects,
  getInitials,
  stringToColor,
  BtnNextQuest,
  InputCheckbox,
  BtnPrevQuest
};
