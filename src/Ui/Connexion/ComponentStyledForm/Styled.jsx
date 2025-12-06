import {LucideHome } from "lucide-react";
import styled from "styled-components";
const Homes = styled(LucideHome)`
    color: #fff;
    display: inline-block;
    postion: relative;
    left: -20svw;
    width: 50px;
     `;

      // Style globale input form

  const styleGlobalInput = `
      background-color: #DEE5F1;
       color: #000;
       border: none;
      &:focus {
      border: 1px solid #fff;
     }
      height: 40px;
      `;


export {Homes, styleGlobalInput}