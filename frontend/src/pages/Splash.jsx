/**
 * @file Splash.jsx
 * @author Renato Wessner dos Santos
 * @date 2025-10-24
 * @project SOS Libras - Sistema de Emergência em Libras
 * @description Tela inicial (splash screen) com logo clicável
 * @copyright (c) 2025 Renato Wessner dos Santos
 */

import { useNavigate } from 'react-router-dom';

const Splash = () => {
  const navigate = useNavigate();

  const handleLogoClick = () => {
    navigate('/home');
  };

  return (
    <div className="min-h-screen bg-white flex items-center justify-center p-4">
      <div className="w-full max-w-md">
        {/* Logo clicável */}
        <div className="flex justify-center">
          <img 
            src="/images/Logo_libras.png" 
            alt="SOS Libras Logo" 
            onClick={handleLogoClick}
            className="w-64 h-64 object-contain cursor-pointer hover:scale-105 transition-transform duration-200"
          />
        </div>
      </div>
    </div>
  );
};

export default Splash;