# 📜 Changelog

Todas as mudanças notáveis neste projeto serão documentadas neste arquivo.

O formato é baseado em [Keep a Changelog](https://keepachangelog.com/pt-BR/1.0.0/),
e este projeto adere ao [Semantic Versioning](https://semver.org/lang/pt-BR/).

---

## [1.0.0] - 2025-10-26

### 🎉 Lançamento Inicial do MVP

#### ✨ Adicionado

**Interface Completa (8 Páginas)**
- Splash screen com logo clicável
- HomePage com menu principal
- InfoScreen para não-emergências
- DistritosScreen com 50+ delegacias
- EmergencyForm (formulário página 1)
- EmergencyForm2 (formulário página 2)
- Otherinformation (informações adicionais)
- End (tela de sucesso com protocolo)

**Funcionalidades Core**
- Captura de vídeo via webcam (desktop)
- Resolução HD 1280x720
- Área de captura otimizada (cintura para cima)
- Margem de 10px ao redor da webcam

**Formulários Inteligentes**
- Validação completa de campos obrigatórios
- Busca automática de endereço via CEP (API ViaCEP)
- Campos condicionais baseados em respostas
- Labels dinâmicos (furto/roubo)
- Campo "Descreva" aparece quando detecta pessoa armada

**Persistência de Dados**
- Salvamento automático de rascunhos em LocalStorage
- Recuperação de dados ao retornar às páginas
- Prevenção de sobrescrita de dados vazios
- Limpeza automática ao finalizar
- Botão "NOVA SOLICITAÇÃO" para começar do zero

**Design e UX**
- Interface acessível para surdos
- Paleta de cores consistente (azul/verde)
- Responsivo (desktop principalmente)
- Feedback visual em botões
- Transições suaves

**Dados e Informações**
- Tabela completa de distritos policiais de SP
- Endereços, telefones e horários
- Link para Delegacia Eletrônica
- Geração de número de protocolo

---

## [0.9.0] - 2025-10-26

### Versão Beta - Testes Finais

#### ✨ Adicionado
- Persistência de dados com LocalStorage
- Botão "NOVA SOLICITAÇÃO" na página End

#### 🐛 Corrigido
- Bug de sobrescrita de dados vazios
- Validação agora só salva quando há dados preenchidos

---

## [0.8.0] - 2025-10-26

### Webcam Implementada

#### ✨ Adicionado
- Webcam real substituindo placeholder
- Integração com react-webcam
- Captura de vídeo em alta qualidade

#### 🔧 Mudado
- Tamanho da webcam aumentado (de 384px para tela cheia)
- Margem reduzida para 10px
- Área de captura otimizada

---

## [0.7.0] - 2025-10-26

### Página End Criada

#### ✨ Adicionado
- Tela de sucesso com mensagem
- "SOLICITAÇÃO ENVIADA COM SUCESSO!" em duas linhas
- Geração de número de protocolo aleatório
- Centralização do conteúdo

---

## [0.6.0] - 2025-10-26

### Página Otherinformation Criada

#### ✨ Adicionado
- Campo "Tem alguma outra informação?"
- Textarea grande para informações adicionais
- Espaçamento adequado entre campo e botões
- Navegação para página End

---

## [0.5.0] - 2025-10-26

### EmergencyForm2 Completa

#### ✨ Adicionado
- Label dinâmico baseado em "furto" ou "roubo"
- Campo "O que está sendo furtado/roubado?"
- Pergunta "Vê alguém armado?" com botões Sim/Não
- Campo condicional "Descreva" (aparece se clicar Sim)
- Espaçamento inteligente (grande quando Não, normal quando Sim)
- Validação completa de todos os campos
- Navegação para Otherinformation

#### 🔧 Mudado
- EmergencyForm passa dados via React Router state
- App.jsx atualizado com rota /otherinformation

---

## [0.4.0] - 2025-10-25

### EmergencyForm Melhorado

#### ✨ Adicionado
- Busca automática de CEP com ViaCEP
- Validação de CEP (8 dígitos)
- Exibição de endereço completo formatado
- Campo "Gesticule número" para número da residência
- Indicador "Buscando CEP..." durante carregamento

#### 🐛 Corrigido
- Formato do endereço completo (Rua, Número - Bairro - Cidade/UF)
- Endereço só aparece quando CEP válido + número preenchido

---

## [0.3.0] - 2025-10-24

### Formulário de Emergência

#### ✨ Adicionado
- EmergencyForm com área de webcam (placeholder)
- Campo "A solicitação é anônima?" (Sim/Não)
- Campo "O que está acontecendo?"
- Campo "Gesticule o CEP"
- Campo "Gesticule número"
- Botões AVANÇAR e VOLTAR
- Validação básica de campos

---

## [0.2.0] - 2025-10-24

### Telas de Informação

#### ✨ Adicionado
- DistritosScreen com tabela de delegacias
- 50+ distritos com endereços, telefones e horários
- Tabela scrollável e responsiva
- InfoScreen com mensagens e links
- Botão para Delegacia Eletrônica online
- Link para lista de distritos

---

## [0.1.0] - 2025-10-24

### Estrutura Inicial

#### ✨ Adicionado
- Configuração inicial do projeto com Vite
- Instalação de React 18
- Configuração do Tailwind CSS v3
- React Router DOM para navegação
- Splash screen com logo
- HomePage com botões de navegação
- Estrutura de pastas organizada

#### 🗂️ Estrutura
```
frontend/
├── src/
│   ├── pages/
│   ├── App.jsx
│   ├── main.jsx
│   └── index.css
├── public/images/
├── tailwind.config.js
└── package.json
```

---

## Tipos de Mudanças

- `✨ Adicionado` - Novas funcionalidades
- `🔧 Mudado` - Mudanças em funcionalidades existentes
- `🗑️ Removido` - Funcionalidades removidas
- `🐛 Corrigido` - Correção de bugs
- `🔒 Segurança` - Correções de segurança
- `📝 Documentação` - Mudanças na documentação

---

## Links

- [Repositório GitHub](https://github.com/renato-wessmer/Projeto_qualificao)
- [Issues](https://github.com/renato-wessmer/Projeto_qualificao/issues)
- [Releases](https://github.com/renato-wessmer/Projeto_qualificao/releases)

---

[1.0.0]: https://github.com/renato-wessmer/Projeto_qualificao/releases/tag/v1.0.0