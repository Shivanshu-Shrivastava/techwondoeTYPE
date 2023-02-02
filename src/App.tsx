import React from 'react';
import './App.css';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom'
import Home from './components/Home';
import Billings from './components/Billings';
import General from './components/General';
import Integrations from './components/Integrations';
import Plan from './components/Plan';
import User from './components/User/User';

const App: React.FC = () => {
  return (
    <div className='w-9/12 p-6 m-6 bg-white border border-gray-200 rounded-lg shadow-lg'>
      <h2 className='font-bold text-3xl pb-3'>Company Settings</h2>
      <Router>
        <Routes>
          <Route  path='/' element={<Home />}  />
            <Route  path='/plan' element={<Plan />} />
            <Route  path='/user' element={<User />} />
            <Route  path='/general' element={<General />} />
            <Route  path='/billings' element={<Billings />} />
            <Route  path='/integrations' element={<Integrations />} />

        </Routes>
      </Router>
    </div>
  );
}

export default App;
