import styled from "styled-components";
import { mediaQueryInput } from "./MediaQuery/MediaQuery";


const styleBtn_Connexion_Instription = `
                                    border: none;
                                    border-radius: 10px;
                                    width: 30svw;
                                    height: 35px;
                                    cursor: pointer;
                                    font-weight: bold;
                                    margin-top: 30px;
                                    left: -px;
                                    position: relative;
                                    font-size: 1.2em;
                                          ${mediaQueryInput}
                                    `;
const BtnInscription = styled.button`
                                  ${styleBtn_Connexion_Instription};
                                  background-color: #0af8b5ff;
                                  color: #fff;
                                  margin-left: 8px;
                                   &:hover {
                                     background-color: purple;
                                    color: #fff
                                  };
                                 `;
const BtnConnexion = styled.button`
                            ${styleBtn_Connexion_Instription};
                            background-color: #08fd9fff;
                            color: #fff;
                             &:hover {
                                     background-color: #000;
                                     color: #fff;
                                     border: 1px solid #ec4f11ff;
                                  };
                            `;
export {BtnInscription, BtnConnexion};