import Headers from "../Ui/Header";
import Main from "../Ui/Main.jsx";
import {BrowserRouter as Router, Routes, Route} from 'react-router-dom';

function Home(){
    return(
        <div>
           <Headers/>
           <Main/>
        </div>
    )
}

export default Home;