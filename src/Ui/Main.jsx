import styled from "styled-components"
import Bg_Img_Main from "../asset/jeremy-yap-J39X2xX_8CQ-unsplash.jpg"
// Image d'acceuil
const Div_Img_Bg_Main = styled.div`
  width: 100%;
  height: 650px;
  background-image: url("${Bg_Img_Main}");
  background-repeat: no-repeat;
  filter: contrast(80%);
  box-shadow: inset 0 0 80px 350px #35a7d862;
  background-size: cover;
  background-position: center;
  object-fit: cover;
  border: none;
  border-bottom-left-radius: 10px;
  border-bottom-right-radius: 10px;
  background-attachment: fixed;
  background-clip: padding-box;
//   animation: animate 20s infinite linear;

  @keyframes animate{
    to{
        background-position-x: -300px;
            transform: scale(1);

    }
}

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
  concue personalise rein que pour vous</p> 
                </Div_Img_Bg_Main>
            </main>
        </div>
    )
}

export default Main;