
import './App.css';
import {  Route, Routes } from "react-router-dom";
import Login from './Pages/Login';
import Home from './Pages/Home';

function App() {
  return (
    <div>
        <Routes>
           <Route path= "/" element={<Login />} />
           <Route path = "/Home" element = {<Home/>}/>
        </Routes>
    </div>
  );
}

export default App;
