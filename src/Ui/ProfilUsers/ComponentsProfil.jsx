import styled from 'styled-components';
import { breakPoint } from '../MediaQuery/MediaQuery';

// Profil utilisateur
const DivUser = styled.div`
  width: 40px;
  position: relative;
  height: 40px;
  //      background-color: #cbeff3a7;
  border: 1px solid #000;
  border-radius: 100px;
  z-index: 1;
  left: -30px;
  top: 25px;
  cursor: pointer;
`;
//    Parametre profil

const SettingUser = styled.div`
  position: absolute;
  z-index: 999;
  top: 0svw;
  left: -0svw;
  width: 100%;
  //        border-radius: 20px;
  height: 300px;
  background-color: #fff;
`;
const DivImgPpUser = styled.img``;

/** La division suivante est créée pour afficher les messages de motivation
 */

const DivfonsScrool = styled.div`
     position: relative;
     left: -2vw;

  @media screen and (max-width: ${ breakPoint.tablet }) {
     justify-content: center;
     display: flex;
     top: -9vw;
     left: 3px;
  }
`;
export { SettingUser, DivUser, DivImgPpUser, DivfonsScrool };
