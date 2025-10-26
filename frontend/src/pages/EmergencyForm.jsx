/**
 * @file EmergencyForm.jsx
 * @author Renato Wessner dos Santos
 * @date 2025-10-24
 * @project SOS Libras - Sistema de Emergência em Libras
 * @copyright (c) 2025 Renato Wessner dos Santos
 */

import { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';

const EmergencyForm = () => {
  const navigate = useNavigate();
  const [formData, setFormData] = useState({
    isAnonymous: null,
    whatIsHappening: '',
    cep: '',
    houseNumber: '',
  });
  
  const [addressData, setAddressData] = useState({
    street: '',
    neighborhood: '',
    city: '',
    state: '',
  });

  const [loadingCep, setLoadingCep] = useState(false);

  const handleInputChange = (field, value) => {
    setFormData(prev => ({ ...prev, [field]: value }));
  };

  // Buscar CEP automaticamente quando tiver 8 dígitos
  useEffect(() => {
    const cepNumeros = formData.cep.replace(/\D/g, '');
    
    if (cepNumeros.length === 8) {
      setLoadingCep(true);
      fetch(`https://viacep.com.br/ws/${cepNumeros}/json/`)
        .then(res => res.json())
        .then(data => {
          if (!data.erro) {
            setAddressData({
              street: data.logradouro || '',
              neighborhood: data.bairro || '',
              city: data.localidade || '',
              state: data.uf || '',
            });
          } else {
            alert('CEP não encontrado');
            setAddressData({ street: '', neighborhood: '', city: '', state: '' });
          }
        })
        .catch(err => {
          console.error('Erro ao buscar CEP:', err);
          alert('Erro ao buscar CEP');
        })
        .finally(() => setLoadingCep(false));
    } else {
      setAddressData({ street: '', neighborhood: '', city: '', state: '' });
    }
  }, [formData.cep]);

  // Montar endereço completo: Rua, Número - Bairro - Cidade/UF
  const fullAddress = () => {
    if (!addressData.street) return '';
    
    const parts = [];
    
    // Rua + Número
    if (formData.houseNumber) {
      parts.push(`${addressData.street}, ${formData.houseNumber}`);
    } else {
      parts.push(addressData.street);
    }
    
    // Bairro
    if (addressData.neighborhood) parts.push(addressData.neighborhood);
    
    // Cidade/Estado
    if (addressData.city) parts.push(`${addressData.city}/${addressData.state}`);
    
    return parts.join(' - ');
  };

  const handleSubmit = () => {
    // Validação
    if (formData.isAnonymous === null) {
      alert('Por favor, informe se a solicitação é anônima');
      return;
    }
    if (!formData.whatIsHappening.trim()) {
      alert('Por favor, informe o que está acontecendo');
      return;
    }
    if (!formData.cep || formData.cep.replace(/\D/g, '').length !== 8) {
      alert('Por favor, informe um CEP válido');
      return;
    }
    if (!formData.houseNumber.trim()) {
      alert('Por favor, informe o número da residência');
      return;
    }
    
    // Navegar para próxima tela (você me dirá qual é)
    alert('Formulário validado! Indo para próxima tela...');
    // navigate('/proxima-tela');
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
            <input
              type="text"
              value={formData.whatIsHappening}
              onChange={(e) => handleInputChange('whatIsHappening', e.target.value)}
              className="w-full p-4 border-2 border-gray-300 rounded-full focus:border-blue-500 focus:outline-none"
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
              maxLength="9"
            />
            {loadingCep && (
              <p className="text-sm text-gray-500 mt-2 text-center">Buscando CEP...</p>
            )}
          </div>

          {/* Gesticule número */}
          <div>
            <label className="block bg-blue-500 text-white text-center py-3 px-4 rounded-full mb-3">
              Gesticule número
            </label>
            <input
              type="text"
              value={formData.houseNumber}
              onChange={(e) => handleInputChange('houseNumber', e.target.value)}
              className="w-full p-4 border-2 border-gray-300 rounded-full focus:border-blue-500 focus:outline-none"
            />
          </div>

          {/* Endereço completo */}
          {fullAddress() && (
            <div>
              <label className="block bg-blue-500 text-white text-center py-3 px-4 rounded-full mb-3">
                Endereço completo
              </label>
              <div className="w-full p-4 bg-gray-100 border-2 border-gray-300 rounded-3xl text-gray-700">
                {fullAddress()}
              </div>
            </div>
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

export default EmergencyForm;
