/**
 * @file Otherinformation.jsx
 * @author Renato Wessner dos Santos
 * @date 2025-10-26
 * @project SOS Libras - Sistema de Emergência em Libras
 * @copyright (c) 2025 Renato Wessner dos Santos
 */

import { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import Webcam from 'react-webcam';

const Otherinformation = () => {
  const navigate = useNavigate();
  const [otherInfo, setOtherInfo] = useState('');

  const handleBack = () => {
    navigate('/emergency2');
  };

  const handleSubmit = () => {
    // Navega para página de sucesso
    navigate('/end');
  };

  return (
    <div className="min-h-screen bg-white flex">
      {/* Área da Webcam - Esquerda */}
      <div className="hidden md:flex md:w-1/2 bg-gray-100 items-center justify-center p-[10px]">
        <div className="w-full h-full rounded-lg overflow-hidden">
          <Webcam
            audio={false}
            screenshotFormat="image/jpeg"
            videoConstraints={{
              width: 1280,
              height: 720,
              facingMode: "user"
            }}
            className="w-full h-full object-cover rounded-lg"
          />
        </div>
      </div>

      {/* Formulário - Direita */}
      <div className="w-full md:w-1/2 flex flex-col p-6 py-12">
        <div className="max-w-md mx-auto w-full space-y-4">
          
          {/* Tem alguma outra informação? */}
          <div>
            <label className="block bg-blue-500 text-white text-center py-3 px-4 rounded-full mb-3">
              Tem alguma outra informação?
            </label>
            <div className="w-full min-h-[400px] p-4 border-2 border-blue-500 rounded-3xl bg-white focus-within:border-blue-600">
              <textarea
                value={otherInfo}
                onChange={(e) => setOtherInfo(e.target.value)}
                className="w-full h-full min-h-[380px] resize-none focus:outline-none"
                placeholder=""
              />
            </div>
          </div>

          {/* Espaçamento grande */}
          <div className="h-32"></div>

          {/* Botão AVANÇAR */}
          <button
            onClick={handleSubmit}
            className="w-full bg-green-500 hover:bg-green-600 text-white text-lg font-medium py-4 px-8 rounded-full transition-colors duration-200 flex items-center justify-center gap-2"
          >
            <span>AVANÇAR</span>
            <span>→</span>
          </button>

          {/* Botão VOLTAR */}
          <button
            onClick={handleBack}
            className="w-full bg-blue-500 hover:bg-blue-600 text-white text-lg font-medium py-4 px-8 rounded-full transition-colors duration-200 flex items-center justify-center gap-2"
          >
            <span>←</span>
            <span>VOLTAR</span>
          </button>
        </div>
      </div>
    </div>
  );
};

export default Otherinformation;