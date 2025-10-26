/**
 * @file App.jsx
 * @author Renato Wessner dos Santos
 * @date 2025-10-24
 * @project SOS Libras - Sistema de Emergência em Libras
 * @copyright (c) 2025 Renato Wessner dos Santos
 */

import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import Splash from './pages/Splash';
import HomePage from './pages/HomePage';
import InfoScreen from './pages/InfoScreen';
import DistritosScreen from './pages/DistritosScreen';
import EmergencyForm from './pages/EmergencyForm';
import EmergencyForm2 from './pages/EmergencyForm2';
import Otherinformation from './pages/Otherinformation';
import End from './pages/End';

function App() {
  return (
    <Router>
      <Routes>
        <Route path="/" element={<Splash />} />
        <Route path="/home" element={<HomePage />} />
        <Route path="/info" element={<InfoScreen />} />
        <Route path="/distritos" element={<DistritosScreen />} />
        <Route path="/emergency" element={<EmergencyForm />} />
        <Route path="/emergency2" element={<EmergencyForm2 />} />
        <Route path="/otherinformation" element={<Otherinformation />} />
        <Route path="/end" element={<End />} />
      </Routes>
    </Router>
  );
}

export default App;