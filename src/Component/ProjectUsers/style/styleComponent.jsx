import styled from 'styled-components';
import { breakPoint } from '../../../Ui/MediaQuery/MediaQuery';

const DivFormProjects = styled.div`
  display: grid;
  grid-template-columns: repeat(2, 1fr);
  color: #fff;
  // width: 100vw;
  @media screen and (max-width: ${ breakPoint.tablet }) {
    grid-template-columns: repeat(1, 1fr);
    gap: 40px;
  }
`;
const styleAllInput = `
       width: 48svw;
       height: 40px;
       border: none;
       background-color: #DEE5F1;
       border-radius: 10px;

       @media screen and (max-width: ${ breakPoint.tablet }) {
       width: 90svw;
  }
     `;
const InputText = styled.input`
  ${ styleAllInput }
`;
const DivForm = styled.div`
  position: relative;
  // left: -2svw;
  // box-shadow: 0 0 10px #201f1fff;
  display: flex;
  flex-direction: column;
  justify-content: center;
  align-items: center;
  flex-wrap: nowrap;
  width: 60svw;
  height: 100svh;
  background-color: #ffffff;

  @media screen and (max-width: ${ breakPoint.tablet }) {
    width: 100vw;
    position: absolute;
    height: 100svh;
    bottom: -0;
    left: 0;
  }
`;
const InputDate = styled.input`
  ${ styleAllInput }
`;
const InputDescription = styled.textarea`
  width: 48svw;
  height: 200px;
  border: none;
  background-color: #dee5f1;
  border-radius: 10px;

       @media screen and (max-width: ${ breakPoint.tablet }) {
       width: 90svw;
  }
`;
const InputTypeProductyion = styled.select`
  cursor: pointer;
  ${ styleAllInput }
`;
// Bouton de navigation des etapes suivantes

const BtnNextQuest = styled.button`
    width: 7svw;
  height: 30px;
  border: none;
  border-radius: 8px;
  background-color: #0000ff;
  color: #fff;
  font-weight: bold;
  font-size: 1em;
  cursor: pointer;
  //     Gestion du hover
  &:hover {
    background-color: #000;
    color: #fff;
  }
`;
const BtnPrevQuest = styled.button`
  width: 7svw;
  height: 30px;
  border: none;
  border-radius: 8px;
  background-color: #51ff00ff;
  color: #fff;
  font-weight: bold;
  font-size: 1em;
  cursor: pointer;
  //     Gestion du hover
  &:hover {
    background-color: #000;
    color: #fff;
  }
`

const InputCheckbox = styled.input`
    margin-left: 20px;
    cursor: pointer;
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
  console.log( 'hsash', str );
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
