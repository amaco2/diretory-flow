import Home from './Component/Home.jsx';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import FormConnexion from './Ui/Connexion/FromConnexion.jsx';
import FormInscription from './Ui/Connexion/FormInscription.jsx';
import ForgotPasswordRequest from './Ui/Connexion/ForgotPasswordRequest.jsx';
import ResetPassword from './Ui/Connexion/ResetPassword.jsx';
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
import Summary from './Component/ProjectUsers/StepCollectQuestion/Summary.jsx';
import { useAllProjects } from './getProject.js';
import { LayoutProject } from './Component/ProjectUsers/LayoutProjects';
import ScriptUpload from './pages/AI/ScriptUpload.js';
import KanbanBoard from './pages/KanbanBoard.js';
import ProjectOverview from './Component/Dashboard/ProjectOverview.jsx';

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
  height: 10px;
  width: 10px;
`;

const HiddenProfil = styled.section`
  position: fixed;
  width: 100%;
  height: 100vh;
  z-index: 10;
  top: 0;
  background-color: #334d517b;
`;
function WrapperComponent()
{
  // Etat de connexion de l'utilisateur
  const [isConnect, setIsConnect] = useState<Boolean>(false);
  const [iconeUser, setIconeUser] = useState();
  const [username, setUsername] = useState<String>('');
  // Activation et desactivation du profil utilisateur
  const [isShowProfil, setIsShowProfil] = useState<Boolean>(true);

  // Recuperation de tous les projets d'un utilisateur
  const [projectId, setProjectId] = useState<Object>();

  // On test si l'utilisateur a bien un projet
  const [wasProject, setWasProject] = useState<boolean>(false);


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
        console.error(error);
      });

    useAllProjects(setProjectId, setWasProject);
  }, [isConnect, wasProject, iconeUser]);
  // test-net.js
  // fetch("https://api.openai.com")
  //   .then(res => console.log("OK", res.status))
  //   .catch(err => console.error("FAIL", err));


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
          projectId,
          wasProject,
          setWasProject
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
          <Route path='/mot-de-passe-oublie' element={<ForgotPasswordRequest />} />
          <Route path='/reset-password' element={<ResetPassword />} />
          <Route path='/projects/' element={<ProjectUser />} >
            <Route index element={<LayoutProject />} />
            <Route path='createproject' element={<Step1 />} />
            {/* <Route path='step2' element={<Step2 />} /> */}
          </Route>
          <Route index path='/' element={<Home />} />
          <Route path='/project/:projectid' element={<ProjectDashboar />} >
            <Route index element={<ProjectOverview />} />
            <Route path='step2' element={<Step2 />} />
            {/* <Route path='overview' element={ <OverView /> } /> */}
            <Route path='kanban' element={<KanbanBoard />} />
            {/* <Route path='timeline' element={ <Timeline /> } /> */}
            <Route path='ai' element={<ScriptUpload />} />
            {/* <Route path='documents' element={ <Documents /> } /> */}
            {/* <Route path='team' element={ <Team /> } /> */}
            <Route path='step3' element={<Step3 />} />
            <Route path='step4' element={<Step4 />} />
            <Route path='step5' element={<Step5 />} />
            <Route path='step6' element={<Step6 />} />
            <Route path='summary' element={<Summary />} />
          </Route>
        </Routes>
      </TContext.Provider>
    </div>
  );
}

export default WrapperComponent;
