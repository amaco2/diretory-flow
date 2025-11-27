// Importation de librairie <<css>> de styled component pour rendre le Responsive plus flexible
import { css } from "styled-components";

// Niveau de refenece des appareilles

const breakPoint = {
    mobile: '480px',
    tablet: '768px',
    desktop: '1200px',
    mobileSlime: '290px',
}

const media = {
    mobile: (...args) => css`
            @media (max-width: 480px){
               ${css(...args)};
            }`,
    tablet: (...args) => css`
            @media (max-width: 768px){
               ${css(...args)}
            }`,
    desktop: (...args) => css`
            @media (max-width: 1200px){
               ${css(...args)}
            }`,
   mobileSlime: (...args) => css`
   @media (max-width: 290px){
   ${css(...args)};}`
}
const mediaQueryInput = `
   @media screen and (max-width: ${breakPoint.tablet}){
       width: 45svw;
 };
 @media screen and (max-width: ${breakPoint.desktop}){
     width: 50svw;
 };
 @media screen and (max-width: ${breakPoint.mobile}){
 width: 60svw;
 }`;

export {breakPoint, media, mediaQueryInput};