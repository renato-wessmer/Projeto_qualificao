/**
 * @file End.jsx
 * @author Renato Wessner dos Santos
 * @date 2025-10-26
 * @project SOS Libras - Sistema de Emergência em Libras
 * @copyright (c) 2025 Renato Wessner dos Santos
 */

import { useNavigate } from 'react-router-dom';

const End = () => {
  const navigate = useNavigate();

  // Gera número de registro aleatório (exemplo)
  const registrationNumber = Math.floor(Math.random() * 1000000).toString().padStart(6, '0');

  const handleBackToHome = () => {
    navigate('/home');
  };

  return (
    <div className="min-h-screen bg-white flex">
      {/* Conteúdo - Direita */}
      <div className="w-full flex flex-col items-center justify-center p-6">
        <div className="max-w-md w-full text-center space-y-4">
          
          {/* Mensagem de Sucesso em 2 linhas */}
          <div className="space-y-2">
            <h1 className="text-3xl font-bold text-green-600">
              SOLICITAÇÃO ENVIADA
            </h1>
            <h1 className="text-3xl font-bold text-green-600">
              COM SUCESSO!
            </h1>
          </div>

          {/* Espaçamento (2 botões) */}
          <div className="h-24"></div>

          {/* Número de registro */}
          <div className="text-xl text-gray-700">
            <span className="font-medium">Número de registro: </span>
            <span className="font-bold text-blue-600">{registrationNumber}</span>
          </div>

        </div>
      </div>
    </div>
  );
};

export default End;