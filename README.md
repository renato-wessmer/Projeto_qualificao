# 🤟 SOS Libras - Sistema de Emergência em Libras

> Sistema web para registro de ocorrências policiais por pessoas surdas utilizando Língua Brasileira de Sinais (Libras)

![Status](https://img.shields.io/badge/status-MVP-blue)
![Version](https://img.shields.io/badge/version-1.0.0-green)
![License](https://img.shields.io/badge/license-MIT-blue)

---

## 📋 Índice

- [Sobre o Projeto](#-sobre-o-projeto)
- [Funcionalidades](#-funcionalidades)
- [Tecnologias](#-tecnologias)
- [Pré-requisitos](#-pré-requisitos)
- [Instalação](#-instalação)
- [Como Usar](#-como-usar)
- [Estrutura do Projeto](#-estrutura-do-projeto)
- [Fluxo de Navegação](#-fluxo-de-navegação)
- [Arquitetura](#-arquitetura)
- [Roadmap](#-roadmap)
- [Autor](#-autor)
- [Licença](#-licença)

---

## 📖 Sobre o Projeto

O **SOS Libras** é um sistema web desenvolvido como MVP (Minimum Viable Product) para permitir que pessoas surdas registrem ocorrências policiais de forma autônoma, utilizando a Língua Brasileira de Sinais (Libras) através de captura de vídeo.

### 🎯 Objetivo

Promover a **acessibilidade** e **inclusão** da comunidade surda brasileira no acesso aos serviços de segurança pública, eliminando barreiras de comunicação no momento de registrar emergências.

### 🏫 Contexto Acadêmico

- **Instituição:** UNIVESP (Universidade Virtual do Estado de São Paulo)
- **Nível:** Mestrado
- **Autor:** Renato Wessner dos Santos
- **Tipo:** Projeto de Qualificação
- **Data:** Outubro de 2025

---

## ✨ Funcionalidades

### ✅ Implementadas

- **Interface Acessível:** Design pensado para usuários surdos
- **Captura de Vídeo:** Webcam integrada para registro de gestos em Libras
- **Formulários Inteligentes:**
  - Validação de campos obrigatórios
  - Busca automática de endereço via CEP (API ViaCEP)
  - Campos condicionais baseados nas respostas
  - Labels dinâmicos (furto/roubo)
- **Persistência de Dados:** 
  - Salvamento automático de rascunhos (LocalStorage)
  - Recuperação de dados ao retornar
  - Prevenção de perda de informações
- **Tabela de Distritos:** Lista completa de 50+ distritos policiais de São Paulo
- **Geração de Protocolo:** Número único de registro da ocorrência
- **Fluxo Completo:** Do início ao fim, com 8 páginas funcionais

### 🚧 Em Desenvolvimento

- Integração com modelo de IA para reconhecimento de Libras
- Backend para processamento e armazenamento de dados
- Versão mobile otimizada
- Sistema de autenticação de usuários

---

## 🛠 Tecnologias

### Frontend

| Tecnologia | Versão | Uso |
|------------|--------|-----|
| React | 18.x | Framework principal |
| Vite | 7.x | Build tool e dev server |
| React Router DOM | 6.x | Roteamento de páginas |
| Tailwind CSS | 3.x | Estilização |
| React-Webcam | 7.x | Captura de vídeo |
| Axios | 1.x | Requisições HTTP |

### APIs Externas

- **ViaCEP:** Busca automática de endereços por CEP

---

## 📋 Pré-requisitos

Antes de começar, certifique-se de ter instalado:

- **Node.js** (versão 16 ou superior)
- **npm** (vem com Node.js)
- **Git**
- **Navegador moderno** (Chrome, Firefox, Edge ou Safari)
- **Webcam** (para funcionalidade completa)

---

## 🚀 Instalação

### 1. Clone o repositório

```bash
git clone https://github.com/renato-wessmer/Projeto_qualificao.git
cd Projeto_qualificao
```

### 2. Acesse a pasta do frontend

```bash
cd frontend
```

### 3. Instale as dependências

```bash
npm install
```

### 4. Execute o projeto

```bash
npm run dev
```

### 5. Acesse no navegador

Abra [http://localhost:5173](http://localhost:5173)

---

## 💻 Como Usar

### Passo 1: Tela Inicial

Clique no logo SOS Libras para iniciar.

### Passo 2: Menu Principal

Escolha uma das opções:
- **"Está acontecendo agora"** → Registro de emergência
- **"Não está acontecendo agora"** → Informações e delegacias

### Passo 3: Formulário de Emergência (Página 1)

Preencha:
1. A solicitação é anônima? (Sim/Não)
2. O que está acontecendo? (Ex: Furto, Roubo)
3. CEP do local
4. Número da residência

→ O endereço completo será preenchido automaticamente

### Passo 4: Formulário de Emergência (Página 2)

Preencha:
1. O que está sendo furtado/roubado?
2. Vê alguém armado? (Sim/Não)
3. Se sim, descreva a pessoa armada

### Passo 5: Informações Adicionais

Adicione qualquer outra informação relevante (opcional).

### Passo 6: Confirmação

Visualize o número do protocolo gerado e clique em "NOVA SOLICITAÇÃO" para registrar outra ocorrência.

---

## 📁 Estrutura do Projeto

```
Projeto_qualificao/
├── frontend/
│   ├── public/
│   │   └── images/
│   │       ├── Logo_libras.png
│   │       └── Celular.png
│   ├── src/
│   │   ├── pages/
│   │   │   ├── Splash.jsx              # Tela inicial com logo
│   │   │   ├── HomePage.jsx            # Menu principal
│   │   │   ├── InfoScreen.jsx          # Informações gerais
│   │   │   ├── DistritosScreen.jsx     # Tabela de distritos
│   │   │   ├── EmergencyForm.jsx       # Formulário página 1
│   │   │   ├── EmergencyForm2.jsx      # Formulário página 2
│   │   │   ├── Otherinformation.jsx    # Info adicionais
│   │   │   └── End.jsx                 # Tela de sucesso
│   │   ├── App.jsx                     # Componente raiz
│   │   ├── main.jsx                    # Entry point
│   │   └── index.css                   # Estilos globais
│   ├── tailwind.config.js              # Configuração Tailwind
│   ├── postcss.config.js               # Configuração PostCSS
│   ├── vite.config.js                  # Configuração Vite
│   └── package.json                    # Dependências
└── README.md                           # Este arquivo
```

---

## 🗺 Fluxo de Navegação

```
Splash (/) 
  ↓ [clica no logo]
HomePage (/home)
  ↓ [Está acontecendo agora]        ↓ [Não está acontecendo agora]
EmergencyForm (/emergency)         InfoScreen (/info)
  ↓ [AVANÇAR]                        ↓ [Distritos Policiais]
EmergencyForm2 (/emergency2)       DistritosScreen (/distritos)
  ↓ [AVANÇAR]
Otherinformation (/otherinformation)
  ↓ [AVANÇAR]
End (/end)
  ↓ [NOVA SOLICITAÇÃO]
HomePage (/home)
```

---

## 🏗 Arquitetura

### Padrão de Projeto

- **SPA (Single Page Application)** com React
- **Client-Side Routing** com React Router
- **Component-Based Architecture**
- **Hooks** para gerenciamento de estado

### Persistência de Dados

```javascript
LocalStorage (Browser)
├── emergencyForm1          // Rascunho formulário 1
├── emergencyForm2          // Rascunho formulário 2
├── otherinformation        // Rascunho info adicionais
├── emergencyForm1Complete  // Dados completos pág 1
├── emergencyForm2Complete  // Dados completos pág 2
└── otherinformationComplete // Dados completos pág 3
```

### Captura de Vídeo

- **react-webcam** para acesso à câmera
- Resolução: 1280x720 (HD)
- Formato: JPEG para screenshots
- Posicionamento: user-facing (câmera frontal)

---

## 🛣 Roadmap

### Fase 1 - MVP ✅ CONCLUÍDO
- [x] Interface frontend completa
- [x] 8 páginas funcionais
- [x] Formulários com validação
- [x] Integração com ViaCEP
- [x] Captura de webcam (desktop)
- [x] Persistência de dados

### Fase 2 - Backend 🚧 PLANEJAMENTO
- [ ] API REST com Python/Flask
- [ ] Banco de dados
- [ ] Sistema de autenticação
- [ ] Upload e armazenamento de vídeos

### Fase 3 - IA 🔮 FUTURO
- [ ] Modelo de reconhecimento de Libras
- [ ] Processamento de gestos em tempo real
- [ ] Conversão de vídeo para texto

### Fase 4 - Mobile 📱 FUTURO
- [ ] Versão mobile otimizada
- [ ] PWA (Progressive Web App)
- [ ] App nativo

---

## 👨‍💻 Autor

**Renato Wessner dos Santos**

- 🎓 Mestrando - Centro Paula Sousa
- 🐙 GitHub: [@renato-wessmer](https://github.com/renato-wessmer)

---

## 📄 Licença

Este projeto está sob licença proprietária. Todos os direitos reservados.

© 2025 Renato Wessner dos Santos 

**Uso Restrito:** Este software foi desenvolvido como parte de um projeto de qualificação de mestrado e não pode ser reproduzido, distribuído ou modificado sem autorização expressa do autor.

---

## 🙏 Agradecimentos

- UNIVESP - Universidade Virtual do Estado de São Paulo
- Comunidade Surda Brasileira
- Orientadores e professores do programa de Mestrado

---

<div align="center">

**Feito com ❤️ para a comunidade surda brasileira**

🤟 **SOS Libras** - Acessibilidade em Emergências

[⬆ Voltar ao topo](#-sos-libras---sistema-de-emergência-em-libras)

</div>