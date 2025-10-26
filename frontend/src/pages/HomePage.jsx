/**
 * @file HomePage.jsx
 * @author Renato Wessner dos Santos
 * @date 2025-10-24
 * @project SOS Libras - Sistema de Emergência em Libras
 * @copyright (c) 2025 Renato Wessner dos Santos
 */

import { useNavigate } from 'react-router-dom';

const HomePage = () => {
  const navigate = useNavigate();

  const handleEmergencyNow = () => {
    alert('Indo para formulário de emergência');
  };

  const handleNotNow = () => {
    alert('Procure uma delegacia ou ligue 190');
  };

  const handleBack = () => {
    navigate('/');
  };

  return (
    <div className="min-h-screen bg-white flex flex-col items-center justify-center p-6 gap-6 py-24">
      <button
        onClick={handleEmergencyNow}
        className="w-full max-w-sm bg-blue-500 hover:bg-blue-600 text-white text-lg font-medium py-4 px-8 rounded-full transition-colors duration-200"
      >
        Está acontecendo agora
      </button>

      <button
        onClick={handleNotNow}
        className="w-full max-w-sm bg-blue-500 hover:bg-blue-600 text-white text-lg font-medium py-4 px-8 rounded-full transition-colors duration-200"
      >
        Não está acontecendo agora
      </button>

      <button
        onClick={handleBack}
        className="w-full max-w-sm bg-blue-500 hover:bg-blue-600 text-white text-lg font-medium py-4 px-8 rounded-full transition-colors duration-200 flex items-center justify-center gap-2 mt-auto"
      >
        <span>←</span>
        <span>VOLTAR</span>
      </button>
    </div>
  );
};

export default HomePage;
