import styled from "styled-components"
import Bg_Img_Main from "./Connexion/Icon/mariola-grobelska-B40aLA7EBOE-unsplash.jpg"
// Image d'acceuil
const Div_Img_Bg_Main = styled.div`
  width: 100%;
  height: 450px;
  background-image: url("${Bg_Img_Main}");
  background-repeat: no-repeat;
  filter: contrast(80%);
  background-size: cover;
  background-position: center;
  object-fit: cover;
  border: none;
  border-bottom-left-radius: 10px;
  border-bottom-right-radius: 10px;
  background-attachment: fixed;

  `
/**Ameliorer votre productivite et votre influance en production cinemetographisque grace a notre application
 * concue personalise rein que pour vous
 */

function Main(){

    return(
        <div>
            <main>
                <Div_Img_Bg_Main>
                  <p style={{position: 'relative', top: "10svw", color: '#fff'}}> Ameliorer votre productivite et votre influance en production cinemetographisque grace a notre application
 * concue personalise rein que pour vous</p> 
                </Div_Img_Bg_Main>
            </main>
        </div>
    )
}

export default Main;