/**
 * @file InfoScreen.jsx
 * @author Renato Wessner dos Santos
 * @date 2025-10-24
 * @project SOS Libras - Sistema de Emergência em Libras
 * @copyright (c) 2025 Renato Wessner dos Santos
 */

import { useNavigate } from 'react-router-dom';

const InfoScreen = () => {
  const navigate = useNavigate();

  const handleBack = () => {
    navigate('/home');
  };

  const openDistritosPolice = () => {
    navigate('/distritos');
  };

  const openBoletimOnline = () => {
    window.open('https://www.delegaciaeletronica.policiacivil.sp.gov.br/ssp-de-cidadao/home', '_blank');
  };

  return (
    <div className="min-h-screen bg-white flex flex-col items-center justify-center p-6 py-24">
      {/* Mensagem informativa */}
      <div className="w-full max-w-sm bg-blue-500 text-white text-lg font-medium py-6 px-8 rounded-3xl text-center mb-6">
        Procure uma Delegacia mais próxima ou ligue 190 para maiores informações
      </div>

      {/* Botão: Distritos Policiais */}
      <button
        onClick={openDistritosPolice}
        className="w-full max-w-sm bg-blue-500 hover:bg-blue-600 text-white text-lg font-medium py-4 px-8 rounded-full transition-colors duration-200 mb-6"
      >
        Distritos Policiais
      </button>

      {/* Botão: Boletim de Ocorrência online */}
      <button
        onClick={openBoletimOnline}
        className="w-full max-w-sm bg-blue-500 hover:bg-blue-600 text-white text-lg font-medium py-4 px-8 rounded-full transition-colors duration-200"
      >
        Boletim de Ocorrência online
      </button>

      {/* Espaço grande */}
      <div className="h-80"></div>

      {/* Botão VOLTAR */}
      <button
        onClick={handleBack}
        className="w-full max-w-sm bg-blue-500 hover:bg-blue-600 text-white text-lg font-medium py-4 px-8 rounded-full transition-colors duration-200 flex items-center justify-center gap-2"
      >
        <span>←</span>
        <span>VOLTAR</span>
      </button>
    </div>
  );
};

export default InfoScreen;
