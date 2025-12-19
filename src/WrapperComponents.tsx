import Home from './Component/Home.jsx';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import FormConnexion from './Ui/Connexion/FromConnexion.jsx';
import FormInscription from './Ui/Connexion/FormInscription.jsx';
import { useEffect, useState } from 'react';
import axios from 'axios';
import { TContext } from './ThemeContext.jsx';
import styled, { keyframes } from 'styled-components';
import ProjectUser from './Component/ProjectUsers/ProjectUser.jsx';
import ProjectDashboar from './pages/ProjectDashboard.jsx';
import { Step1 } from './Component/ProjectUsers/StepCollectQuestion/Step1.jsx';
import { Step2 } from './Component/ProjectUsers/StepCollectQuestion/Step2.jsx';
import { Step3 } from './Component/ProjectUsers/StepCollectQuestion/Step3.jsx';
import { Step4 } from './Component/ProjectUsers/StepCollectQuestion/Step4.jsx';
import { Step5 } from './Component/ProjectUsers/StepCollectQuestion/Step5.jsx';
import { Step6 } from './Component/ProjectUsers/StepCollectQuestion/Step6.jsx';

// Cette position est temporaire
const colors = {
  primary: '#5843E4',
  secondary: '#8186A0',
  backgroundLight: '#F9F9FC',
};
const rotate = keyframes`
  from {
    transform: rotate(0deg);
  }

  to {
    transform: rotate(360deg);
  }
`;
export const Loader = styled.div`
  padding: 10px;
  position: relative;
  top: 20svw;
  left: 40svw;
  display: flex;
  align-items: center;
  justify-content: center;
  border: 8px solid ${colors.primary};
  border-bottom-color: transparent;
  border-radius: 100px;
  animation: ${rotate} 1s infinite linear;
  height: 150px;
  width: 150px;
`;

const HiddenProfil = styled.section`
  position: absolute;
  width: 100%;
  height: 100%;
  z-index: 10;
  top: 0;
  background-color: #334d517b;
`;
function WrapperComponent()
{
  // Etat de connexion de l'utilisateur
  const [isConnect, setIsConnect] = useState(false);
  const [iconeUser, setIconeUser] = useState();
  const [username, setUsername] = useState<String>('');
  // Activation et desactivation du profil utilisateur
  const [isShowProfil, setIsShowProfil] = useState<Boolean>(true);
  // Connextion en utlisant les cookies
  useEffect(() =>
  {
    axios
      .get('http://localhost:5000/api/auth/me', {
        withCredentials: true,
      })
      .then((res) =>
      {
        setIconeUser(res.data.message.email);
        setUsername(res.data.message.username + "");
        setIsConnect(true);
      })
      .catch((error) =>
      {
        setIsConnect(false);
        console.error(error);
      });
  }, []);
  return (
    <div>
      <TContext.Provider
        value={{
          isConnect,
          isShowProfil,
          setIsShowProfil,
          iconeUser,
          setIconeUser,
          username,
          setUsername,
        }}
      >
        <HiddenProfil
          onClick={(event) =>
          {
            event.stopPropagation();
            setIsShowProfil(true);
          }}
          hidden={isShowProfil ? true : false}
        ></HiddenProfil>
        <Routes>
          <Route path='/connexion' element={<FormConnexion />} />
          <Route path='/inscription' element={<FormInscription />} />
          <Route path='/projects/' element={<ProjectUser />} >
            <Route index element={<Step1 />} />
            <Route path='step2' element={<Step2 />} />
            <Route path='step3' element={<Step3 />} />
            <Route path='step4' element={<Step4 />} />
            <Route path='step5' element={<Step5 />} />
            <Route path='step6' element={<Step6 />} />
          </Route>
          <Route index path='/' element={<Home />} />
          <Route path='/project/' element={<ProjectDashboar />} >
            {/* <Route path='overview' element={ <OverView /> } /> */}
            {/* <Route path='kanban' element={ <Kanban /> } /> */}
            {/* <Route path='timeline' element={ <Timeline /> } /> */}
            {/* <Route path='ai' element={ <AI /> } /> */}
            {/* <Route path='documents' element={ <Documents /> } /> */}
            {/* <Route path='team' element={ <Team /> } /> */}
          </Route>
        </Routes>
      </TContext.Provider>
    </div>
  );
}

export default WrapperComponent;
