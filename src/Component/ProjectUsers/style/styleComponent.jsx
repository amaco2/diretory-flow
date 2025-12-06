import styled from "styled-components";
import { breakPoint } from "../../../Ui/MediaQuery/MediaQuery";


const DivFormProjects = styled.div`
  position: absolute;
  width: 100%;
  display: grid;
  grid-template-columns: repeat(2, 1fr);
  height: 100%;
  background-color: #2c3134ff;
  color: #fff;
  @media screen and (max-widht: ${breakPoint.tablet}){
      grid-template-columns: repeat(1, 1fr);
  }
     `;
const styleAllInput =`
       width: 30svw;
       height: 35px;
       border: none;
       background-color: #DEE5F1;
       border-radius: 10px;
     `;
const InputText = styled.input`
       ${styleAllInput}
     `;
const DivForm = styled.div`
      position: absolute;
      left: 45svw;
      box-shadow: 0 0 10px #201f1fff;
      display: flex;
      flex-direction: column;
      justify-content: center;
      border-radius: 20px;
      top: 5svh;
      align-items: center;
      flex-wrap: nowrap;
      width: 40svw;
      height: 90svh;
      background-color: #ffffff;
     `;
const InputDate = styled.input`
       ${styleAllInput}
      
     `;
const InputDescription = styled.textarea`
       width: 30svw;
       height: 120px;
       border: none;
       background-color: #DEE5F1;
       border-radius: 10px;

     `;
const InputTypeProductyion = styled.select`
      cursor: pointer;
       ${styleAllInput}
       
     `;
// Bouton de navigation des etapes suivantes

const BtnNextQuest = styled.button`
         width: 10svw;
         height: 35px;
         border: none;
         border-radius: 15px;
         background-color: #0000ff;
         color: #fff;
         font-weight: bold;
         font-size: 1.3em;
         cursor: pointer;
     //     Gestion du hover
     &:hover{
         background-color: #000;
         color: #fff;
     }
         `
 /** ***********************************
  * ************** Les fonctions suivant sont place a cette endroit de facon temporaire 
  **************** et servent a genere l'icone ou les intials de l'utilisateur ******** */
     function getInitials(email){
          if(!email) return "?";

          const parts = email.split("@")[0].split('');
          if(parts.length === 1){
               return parts[0].toUpperCase();
          }

          return parts[0].toUpperCase()
     }

     function stringToColor(str){
          let hash = 0;
          if(!str){
               return undefined;
          }
            console.log("hsash", str)
          for(let i =0; i < str.length; i++){
               hash = str.charCodeAt(i) + ((hash << 5) - hash);
          }
          const c = (hash & 0x00feffff)
                .toString(16)
                .toUpperCase();

                return "#" + "00000".substring(0, 6 - c.length) + c;
     }
export {
    InputText,
    DivForm,
    InputDate,
    InputDescription,
    InputTypeProductyion,
    DivFormProjects,
    getInitials,
    stringToColor,
    BtnNextQuest
};