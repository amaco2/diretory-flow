import styled from 'styled-components';
import Bg_Img_Main from '../asset/1766161148404.png';
import './style/Main.css';
import 'directoryflow-fonts';
import { ArrowBigRight } from 'lucide-react';
import { Link } from 'react-router-dom';
import { useContext } from 'react';
import { TContext } from '../ThemeContext';
// Image d'acceuil
const Div_Img_Bg_Main = styled.div`
  width: 100%;
  height: 550px;
  margin-top: 65px;
  background-image: url('${ Bg_Img_Main }');
  background-repeat: no-repeat;
  // filter: contrast(80%);
  // box-shadow: inset 20px 20px 100px 950px #15161662;
  background-size: cover;
  background-position: center;
  object-fit: cover;
  border: none;
  border-bottom-left-radius: 10px;
  border-bottom-right-radius: 10px;
  background-attachment: fixed;
  background-clip: padding-box;
  //   animation: animate 20s infinite linear;

  @keyframes animate {
    to {
      background-position-x: -300px;
      transform: scale(1);
    }
  }
`;
/** Bouton d'orientation de redirection de l'utilisateur vers la
 * creation de projet ou de compte si pas deja cree */

const BtnGetStart = styled.button`
  width: 20svw;
  height: 70px;
  font-size: 2em;
  position: relative;
  top: 15svw;
  left: 40svw;
  font-weight: bold;
  padding-top: -30px;
  font-family: 'Roboto', Times, serif;
  cursor: pointer;
  color: #000000ff;
  background-color: #00ffb7ff;
  border: none;
  border-radius: 10px;

  &:hover {
    color: #00eaffff;
    background-color: #000000ff;
  }
`;

/**Ameliorer votre productivite et votre influance en production cinemetographisque grace a notre application
 * concue personalise rein que pour vous
 */

function Main()
{
  /**
   * @param {isConnect} Stockage de l'etat de connexion de l'utilisateur pour decider de se reidrection en
   * fonction de si <<isConnect>> est a <<true> ou <<false>>
   * @Component
   * @example
   * <Link to={isConnect?"projects":"connexion"}>
   */
  const { isConnect } = useContext( TContext );
  return (
    <div>
      <main>
        <Div_Img_Bg_Main>
          <p className='main--bg-img-p'>
            { ' ' }
            Améliorer votre productivité et votre influance en production
            audio-visuelle grace à notre application conçue et personalisée rien
            que pour vous
          </p>
          <Link to={ isConnect ? 'projects' : 'connexion' }>
            <BtnGetStart className='btn--gets-Start'>
              <ArrowBigRight className='arrowRight' />
              Commencer
            </BtnGetStart>
          </Link>
        </Div_Img_Bg_Main>
      </main>
    </div>
  );
}

export default Main;
