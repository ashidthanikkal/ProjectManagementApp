import { Route, Routes } from 'react-router-dom';
import './App.css';
import Home from './pages/Home';
import Auth from './pages/Auth';
import Dashboard from './pages/Dashboard';
import Allprojects from './pages/Allprojects';

function App() {
  return (
    <div className="App">
      <Routes>
        <Route path='/' element={<Home></Home>}></Route>
        <Route path='/authentication' element={<Auth></Auth>}></Route>
        <Route path='/register' element={<Auth register></Auth>}></Route>
        <Route path='/dashboard' element={<Dashboard></Dashboard>}></Route>
        <Route path='/allproject' element={<Allprojects></Allprojects>}></Route>
      </Routes>
    </div>
  );
}

export default App;
