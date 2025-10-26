/**
 * @file EmergencyForm.jsx
 * @author Renato Wessner dos Santos
 * @date 2025-10-24
 * @project SOS Libras - Sistema de Emergência em Libras
 * @copyright (c) 2025 Renato Wessner dos Santos
 */

import { useState } from 'react';
import { useNavigate } from 'react-router-dom';

const EmergencyForm = () => {
  const navigate = useNavigate();
  const [formData, setFormData] = useState({
    isAnonymous: null,
    whatIsHappening: '',
    cep: '',
    phoneNumber: '',
  });

  const handleInputChange = (field, value) => {
    setFormData(prev => ({ ...prev, [field]: value }));
  };

  const handleSubmit = () => {
    // Validação básica
    if (formData.isAnonymous === null) {
      alert('Por favor, informe se a solicitação é anônima');
      return;
    }
    if (!formData.whatIsHappening.trim()) {
      alert('Por favor, descreva o que está acontecendo');
      return;
    }
    
    // Por enquanto só alert, depois vai enviar para backend
    alert('Formulário enviado! Próxima tela...');
  };

  const handleBack = () => {
    navigate('/home');
  };

  return (
    <div className="min-h-screen bg-white flex">
      {/* Área da Webcam - Esquerda */}
      <div className="hidden md:flex md:w-1/2 bg-gray-100 items-center justify-center p-8">
        <div className="w-full h-full max-w-2xl max-h-96 bg-gray-300 rounded-lg flex items-center justify-center">
          <p className="text-gray-600 text-center">
            Área da Webcam<br />
            (Captura de gestos em Libras)
          </p>
        </div>
      </div>

      {/* Formulário - Direita */}
      <div className="w-full md:w-1/2 flex flex-col p-6 py-12">
        <div className="max-w-md mx-auto w-full space-y-4">
          
          {/* Pergunta: É anônima? */}
          <div>
            <label className="block bg-blue-500 text-white text-center py-3 px-4 rounded-full mb-3">
              A solicitação é anônima?
            </label>
            <div className="flex gap-4">
              <button
                onClick={() => handleInputChange('isAnonymous', true)}
                className={`flex-1 py-3 px-4 rounded-full border-2 transition-colors ${
                  formData.isAnonymous === true
                    ? 'bg-blue-500 text-white border-blue-500'
                    : 'bg-white text-blue-500 border-blue-500 hover:bg-blue-50'
                }`}
              >
                Sim
              </button>
              <button
                onClick={() => handleInputChange('isAnonymous', false)}
                className={`flex-1 py-3 px-4 rounded-full border-2 transition-colors ${
                  formData.isAnonymous === false
                    ? 'bg-blue-500 text-white border-blue-500'
                    : 'bg-white text-blue-500 border-blue-500 hover:bg-blue-50'
                }`}
              >
                Não
              </button>
            </div>
          </div>

          {/* O que está acontecendo? */}
          <div>
            <label className="block bg-blue-500 text-white text-center py-3 px-4 rounded-full mb-3">
              O que está acontecendo?
            </label>
            <textarea
              value={formData.whatIsHappening}
              onChange={(e) => handleInputChange('whatIsHappening', e.target.value)}
              className="w-full p-4 border-2 border-gray-300 rounded-3xl focus:border-blue-500 focus:outline-none resize-none"
              rows="3"
              placeholder="Descreva o que está acontecendo..."
            />
          </div>

          {/* Gesticule o CEP */}
          <div>
            <label className="block bg-blue-500 text-white text-center py-3 px-4 rounded-full mb-3">
              Gesticule o CEP
            </label>
            <input
              type="text"
              value={formData.cep}
              onChange={(e) => handleInputChange('cep', e.target.value)}
              className="w-full p-4 border-2 border-gray-300 rounded-full focus:border-blue-500 focus:outline-none"
              placeholder="00000-000"
              maxLength="9"
            />
          </div>

          {/* Gesticule número */}
          <div>
            <label className="block bg-blue-500 text-white text-center py-3 px-4 rounded-full mb-3">
              Gesticule número
            </label>
            <input
              type="tel"
              value={formData.phoneNumber}
              onChange={(e) => handleInputChange('phoneNumber', e.target.value)}
              className="w-full p-4 border-2 border-gray-300 rounded-full focus:border-blue-500 focus:outline-none"
              placeholder="(00) 00000-0000"
            />
          </div>

          {/* Botão VOLTAR */}
          <button
            onClick={handleBack}
            className="w-full bg-blue-500 hover:bg-blue-600 text-white text-lg font-medium py-4 px-8 rounded-full transition-colors duration-200 flex items-center justify-center gap-2 mt-8"
          >
            <span>←</span>
            <span>VOLTAR</span>
          </button>
        </div>
      </div>
    </div>
  );
};

export default EmergencyForm;