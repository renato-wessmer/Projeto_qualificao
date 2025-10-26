/**
 * @file EmergencyForm2.jsx
 * @author Renato Wessner dos Santos
 * @date 2025-10-24
 * @project SOS Libras - Sistema de Emergência em Libras
 * @copyright (c) 2025 Renato Wessner dos Santos
 */

import { useState, useEffect } from 'react';
import { useNavigate, useLocation } from 'react-router-dom';
import Webcam from 'react-webcam';

const EmergencyForm2 = () => {
  const navigate = useNavigate();
  const location = useLocation();
  
  // Recebe o valor de "O que está acontecendo?" da página anterior
  const whatIsHappening = location.state?.whatIsHappening?.toLowerCase() || '';
  
  // Define o label baseado no que foi informado na página 1
  const getLabel = () => {
    if (whatIsHappening.includes('furto')) {
      return 'O que está sendo furtado?';
    } else if (whatIsHappening.includes('roubo')) {
      return 'O que está sendo roubado?';
    }
    return 'O que está sendo furtado?'; // padrão
  };
  
  const [formData, setFormData] = useState({
    whatIsBeingStolen: '',
    isArmed: null,
    armedDescription: '', // novo campo
  });
  const [hasDraft, setHasDraft] = useState(false);

  // Carregar dados salvos do LocalStorage ao montar o componente
  useEffect(() => {
    const savedData = localStorage.getItem('emergencyForm2');
    if (savedData) {
      try {
        const parsed = JSON.parse(savedData);
        setFormData(parsed.formData || formData);
        setHasDraft(true);
      } catch (error) {
        console.error('Erro ao carregar dados salvos:', error);
      }
    }
  }, []);

  // Salvar dados no LocalStorage sempre que formData mudar
  // MAS SOMENTE se houver algum dado preenchido (não salvar quando tudo está vazio)
  useEffect(() => {
    const hasData = 
      formData.whatIsBeingStolen.trim() !== '' ||
      formData.isArmed !== null ||
      formData.armedDescription.trim() !== '';
    
    if (hasData) {
      const dataToSave = {
        formData,
        timestamp: new Date().toISOString()
      };
      localStorage.setItem('emergencyForm2', JSON.stringify(dataToSave));
    }
  }, [formData]);

  const handleInputChange = (field, value) => {
    setFormData(prev => ({ ...prev, [field]: value }));
    
    // Se mudar isArmed para false, limpar a descrição
    if (field === 'isArmed' && value === false) {
      setFormData(prev => ({ ...prev, armedDescription: '' }));
    }
  };

  const handleSubmit = () => {
    // Validação
    if (!formData.whatIsBeingStolen.trim()) {
      alert(`Por favor, informe ${getLabel().toLowerCase()}`);
      return;
    }
    if (formData.isArmed === null) {
      alert('Por favor, informe se vê alguém armado');
      return;
    }
    if (formData.isArmed === true && !formData.armedDescription.trim()) {
      alert('Por favor, descreva a pessoa armada');
      return;
    }
    
    // Salvar dados completos do formulário 2 antes de navegar
    const completeData = {
      formData,
      whatIsHappening,
      timestamp: new Date().toISOString()
    };
    localStorage.setItem('emergencyForm2Complete', JSON.stringify(completeData));
    
    // Navega para página Otherinformation
    navigate('/otherinformation');
  };

  const handleBack = () => {
    navigate('/emergency');
  };

  return (
    <div className="min-h-screen bg-white flex flex-col md:flex-row">
      {/* Área da Webcam - Topo (mobile) / Esquerda (desktop) */}
      <div className="w-full md:w-1/2 bg-gray-100 flex items-center justify-center p-[10px]">
        <div className="w-full h-64 md:h-full rounded-lg overflow-hidden">
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
          
          {/* O que está sendo furtado/roubado? */}
          <div>
            <label className="block bg-blue-500 text-white text-center py-3 px-4 rounded-full mb-3">
              {getLabel()}
            </label>
            <input
              type="text"
              value={formData.whatIsBeingStolen}
              onChange={(e) => handleInputChange('whatIsBeingStolen', e.target.value)}
              className="w-full p-4 border-2 border-gray-300 rounded-full focus:border-blue-500 focus:outline-none"
            />
          </div>

          {/* Vê alguém armado? */}
          <div>
            <label className="block bg-blue-500 text-white text-center py-3 px-4 rounded-full mb-3">
              Vê alguém armado?
            </label>
            <div className="flex gap-4">
              <button
                onClick={() => handleInputChange('isArmed', true)}
                className={`flex-1 py-3 px-4 rounded-full border-2 transition-colors ${
                  formData.isArmed === true
                    ? 'bg-blue-500 text-white border-blue-500'
                    : 'bg-white text-blue-500 border-blue-500 hover:bg-blue-50'
                }`}
              >
                SIM
              </button>
              <button
                onClick={() => handleInputChange('isArmed', false)}
                className={`flex-1 py-3 px-4 rounded-full border-2 transition-colors ${
                  formData.isArmed === false
                    ? 'bg-blue-500 text-white border-blue-500'
                    : 'bg-white text-blue-500 border-blue-500 hover:bg-blue-50'
                }`}
              >
                NÃO
              </button>
            </div>
          </div>

          {/* Campo "Descreva" - aparece somente se clicar SIM */}
          {formData.isArmed === true && (
            <div>
              <label className="block bg-blue-500 text-white text-center py-3 px-4 rounded-full mb-3">
                Descreva
              </label>
              <div className="w-full min-h-[400px] p-4 border-2 border-blue-500 rounded-3xl bg-white focus-within:border-blue-600">
                <textarea
                  value={formData.armedDescription}
                  onChange={(e) => handleInputChange('armedDescription', e.target.value)}
                  className="w-full h-full min-h-[380px] resize-none focus:outline-none"
                  placeholder="Área de captura de gestos..."
                />
              </div>
            </div>
          )}

          {/* Espaçamento grande - aparece somente quando NÃO houver caixa de descrição */}
          {formData.isArmed !== true && (
            <div className="h-32"></div>
          )}

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

export default EmergencyForm2;