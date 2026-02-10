# 🍅 Pomotimer

Aplicação web moderna de gerenciamento de tarefas com a técnica Pomodoro, desenvolvida em React + TypeScript + Tailwind CSS.

## 📋 Sobre o Projeto

O **Pomotimer** é uma aplicação que combina gerenciamento de tarefas com a técnica Pomodoro, ajudando usuários a manterem o foco e produtividade através de intervalos cronometrados de trabalho. 

### ✨ Características Principais

- ✅ **CRUD Completo de Tarefas** - Criar, editar, visualizar e remover tarefas
- 📊 **Acompanhamento de Progresso** - Barra visual e porcentagem de conclusão
- 🎯 **Sistema Pomodoro** - Contagem de pomodoros por tarefa (em desenvolvimento)
- 💾 **Persistência Local** - Dados salvos automaticamente no navegador
- 🎨 **Design System Próprio** - Componentes UI reutilizáveis e customizáveis
- 📱 **Responsivo** - Interface adaptada para desktop e mobile
- ⚡ **Performance** - Build otimizado com Vite
- 🔒 **Type-Safe** - 100% TypeScript

## ✨ Funcionalidades

### 🏠 Página Inicial (Home)

A página inicial exibe a lista de tarefas do usuário com as seguintes funcionalidades:

#### Gerenciamento de Tarefas
- **Adicionar Tarefa**: Botão dedicado que abre um formulário para criar novas tarefas
  - Campos: Título, Descrição (opcional), Pomodoros Estimados
  - Validação: Título e número de pomodoros são obrigatórios
- **Visualizar Tarefas**: Cards que exibem informações da tarefa
  - Título e descrição
  - Barra de progresso visual (pomodoros completados / estimados)
  - Porcentagem de conclusão (limitada a 100%)
  - Ícones de ação (Editar e Remover)
- **Marcar como Concluída**: Checkbox no card para alternar status de conclusão
  - Visual diferenciado para tarefas concluídas (opacidade e cor verde)
  - Line-through no título quando concluída
- **Editar Tarefa**: Botão que substitui o card por um formulário inline de edição
  - Permite alterar título, descrição e pomodoros (completados e estimados)
  - Botões de Salvar e Cancelar
- **Remover Tarefa**: Botão para deletar a tarefa permanentemente

#### Navegação para Pomodoro
- **Card Clicável**: Clicar no corpo do card navega para a página do Pomodoro
  - A tarefa selecionada se torna a tarefa ativa do temporizador
  - Botões de ação (editar/remover) não propagam o clique

### ⏱️ Página do Pomodoro

Página dedicada para executar a técnica Pomodoro na tarefa selecionada:

#### Controles do Timer
- **Iniciar**: Começa a contagem do pomodoro
- **Pausar**: Pausa o timer atual
- **Skippar**: Pula para o próximo intervalo (pausa ou pomodoro)
- **Voltar**: Botão para retornar à tela de tarefas

#### Informações Exibidas
- Timer visual com contagem regressiva
- Informações da tarefa ativa
- Indicador de qual pomodoro está em andamento
- Status (pomodoro, intervalo curto ou intervalo longo)

### ⚙️ Página de Configurações

Permite ao usuário personalizar a experiência:

#### Configurações de Tema
- **Tema**: Alternância entre tema claro e escuro

#### Configurações de Tempo
- **Tempo de Pomodoro**: Duração de cada sessão de trabalho (padrão: 25 min)
- **Intervalo Pequeno**: Duração do intervalo curto entre pomodoros (padrão: 5 min)
- **Intervalo Grande**: Duração do intervalo longo após 4 pomodoros (padrão: 15 min)

### 📊 Página de Estatísticas

Dashboard com métricas de produtividade do usuário:

#### Métricas Principais
- **Pomodoros Realizados**: Total de pomodoros completados
- **Tarefas Concluídas**: Quantidade de tarefas finalizadas
- **Tarefas Restantes**: Quantidade de tarefas pendentes
- **Tempo Total de Foco**: Horas acumuladas em pomodoros
- **Taxa de Conclusão**: Percentual de tarefas concluídas

#### Visualizações
- Gráficos de progresso
- Histórico de atividades
- Análise de produtividade por período

## 🗂️ Estrutura do Projeto

```
pomotimer/
├── public/                    # Arquivos estáticos
├── src/
│   ├── assets/               # Imagens, fontes, etc
│   ├── components/
│   │   ├── homepage/         # Componentes específicos da Home
│   │   │   ├── AddTaskForm.tsx       # Formulário de adicionar tarefa
│   │   │   ├── EditTaskForm.tsx      # Formulário de edição
│   │   │   └── TaskCard.tsx          # Card individual de tarefa
│   │   ├── layout/           # Componentes de layout
│   │   │   ├── Footer/
│   │   │   │   ├── Footer.module.css
│   │   │   │   └── Footer.tsx
│   │   │   ├── Header/
│   │   │   │   ├── Header.module.css
│   │   │   │   └── Header.tsx
│   │   │   └── PageLayout/
│   │   │       └── Layout.tsx        # Layout principal da aplicação
│   │   ├── pomodoropage/     # Componentes da página Pomodoro
│   │   │   └── Timer.tsx             # Timer do Pomodoro (em desenvolvimento)
│   │   └── ui/               # Componentes reutilizáveis (Design System)
│   │       ├── Button.tsx            # Botão customizável
│   │       ├── Card.tsx              # Card genérico
│   │       ├── Container.tsx         # Container de largura
│   │       ├── Form.tsx              # Wrapper de formulário
│   │       ├── Input.tsx             # Input customizado
│   │       ├── ProgressBar.tsx       # Barra de progresso
│   │       ├── TextArea.tsx          # TextArea customizado
│   │       └── Typography.tsx        # Componentes de tipografia (vazio)
│   ├── hooks/
│   │   ├── useLocalStorage.ts        # Hook genérico para localStorage
│   │   └── useTasks.ts               # Hook de gerenciamento de tarefas
│   ├── models/
│   │   ├── Pomodoro.ts               # Interface Pomodoro (vazio)
│   │   └── Task.ts                   # Interface Task
│   ├── pages/
│   │   ├── Home.tsx                  # Página inicial (lista de tarefas)
│   │   ├── Pomodoro.tsx              # Página do timer Pomodoro
│   │   ├── Settings.tsx              # Página de configurações
│   │   └── Statistics.tsx            # Página de estatísticas
│   ├── App.css
│   ├── App.tsx                       # Componente raiz com rotas
│   └── main.tsx                      # Entry point
├── .gitignore
├── eslint.config.js
├── index.html
├── package.json
├── README.md
├── TODO.md
├── tsconfig.json
├── tsconfig.app.json
├── tsconfig.node.json
└── vite.config.ts
```

## 🔄 Fluxo de Uso

1. **Criar Tarefa**: Usuário clica no botão "Adicionar Tarefa" e preenche o formulário
2. **Visualizar Tarefas**: Lista exibe todas as tarefas com barra de progresso
3. **Editar Tarefa**: Clica no botão de editar para modificar informações
4. **Marcar Concluída**: Switch no card alterna status de conclusão
5. **Selecionar Tarefa**: Clica no card da tarefa para acessar o Pomodoro
6. **Executar Pomodoro**: Na página dedicada, inicia o timer de 25 minutos
7. **Intervalo**: Após cada pomodoro, faz pausa curta (5min) ou longa (15min)
8. **Progresso Automático**: Ao completar pomodoro, contador é atualizado
9. **Conclusão**: Ao finalizar todos os pomodoros, marca tarefa como concluída
10. **Remover Tarefa**: Botão de deletar remove a tarefa da lista

## 💾 Persistência de Dados

- **LocalStorage**: Tarefas são salvas localmente no navegador
- **Sincronização automática**: Dados persistem entre sessões
- **Chave de armazenamento**: `pomodoroTasks`
- **Hook personalizado**: `useLocalStorage` gerencia toda a lógica de persistência

## 🔄 Fluxo de Dados

### Estado das Tarefas

```
App.tsx
  └─> Layout.tsx
       └─> Pages (Home, Pomodoro)
            └─> useTasks() hook
                 ├─> useLocalStorage('pomodoroTasks')
                 │    ├─> Load from localStorage
                 │    └─> Save to localStorage
                 └─> CRUD operations
                      ├─> addTask
                      ├─> editTask
                      ├─> toggleComplete
                      └─> removeTask
```

### Navegação e Rotas

```
/ (Home)
  └─> Lista todas as tarefas
  └─> Click no TaskCard → /pomodoro/:taskId

/pomodoro/:taskId
  └─> Exibe timer da tarefa selecionada
  └─> Botão voltar → /

/settings
  └─> Configurações (em desenvolvimento)

/statistics
  └─> Estatísticas (em desenvolvimento)
```

## 🛠️ Tecnologias Utilizadas

### Core
- **React 19.2**: Biblioteca para construção da interface
- **TypeScript 5.9**: Tipagem estática para JavaScript
- **Vite 7.2**: Build tool e dev server

### Roteamento e Navegação
- **React Router DOM 7.9**: Navegação entre páginas (SPA)

### Estilização
- **Tailwind CSS 4.1**: Framework CSS utilitário
- **CSS Modules**: Para estilos isolados em alguns componentes
- **Lucide React**: Biblioteca de ícones modernos

### Ferramentas de Desenvolvimento
- **ESLint**: Linting e análise de código
- **TypeScript ESLint**: Regras específicas para TypeScript
- **Sass Embedded**: Suporte a SCSS (se necessário)

## 🚀 Como Executar

### Pré-requisitos
- Node.js 18+ instalado
- npm ou yarn

### Instalação e Execução

```bash
# Clonar o repositório
git clone https://github.com/DavyAndrade/react-pomotimer.git

# Entrar no diretório
cd pomotimer

# Instalar dependências
npm install

# Executar em modo de desenvolvimento
npm run dev
# Acesse: http://localhost:5173

# Build para produção
npm run build

# Visualizar build de produção
npm run preview

# Executar linter
npm run lint
```

### Scripts Disponíveis

- **`npm run dev`**: Inicia o servidor de desenvolvimento (Vite)
- **`npm run build`**: Compila TypeScript e cria build otimizado
- **`npm run preview`**: Visualiza o build de produção localmente
- **`npm run lint`**: Executa ESLint para verificar problemas no código

## 📝 Modelo de Dados

### Task (Tarefa)

```typescript
interface Task {
  id: string;                  // Identificador único (timestamp)
  title: string;               // Título da tarefa
  description?: string;        // Descrição opcional
  completed: boolean;          // Status de conclusão
  pomodorosCompleted: number;  // Pomodoros já realizados
  estimatedPomodoros: number;  // Pomodoros estimados para conclusão
}
```

## 🏗️ Arquitetura e Padrões

### Sistema de Componentes UI
O projeto utiliza um **Design System** próprio com componentes reutilizáveis:

#### Componentes Base (`src/components/ui/`)
- **Button**: Componente de botão com variantes (primary, secondary, transparent) e tamanhos
- **Card**: Container estilizado com variantes (default, bordered)
- **Container**: Gerenciador de largura máxima e responsividade (sm, md, lg, xl, full)
- **Form**: Wrapper para formulários com estilização consistente
- **Input**: Campo de entrada customizado com suporte a label, erro e helper text
- **TextArea**: Área de texto customizada
- **ProgressBar**: Barra de progresso reutilizável com cores customizáveis

### Padrões Arquiteturais

#### 1. Feature-Based Structure
Componentes organizados por feature (homepage, pomodoropage) + componentes compartilhados (ui, layout)

#### 2. Custom Hooks
- **useLocalStorage**: Hook genérico para sincronização automática com localStorage
- **useTasks**: Hook especializado para CRUD de tarefas

#### 3. Separação de Responsabilidades
- **Pages**: Orquestração e lógica de roteamento
- **Components**: UI e apresentação
- **Hooks**: Lógica de estado e side effects
- **Models**: Tipos e interfaces TypeScript

#### 4. Layout Pattern
- Layout principal (Header + Main + Footer) aplicado em todas as páginas
- Router envolve o Layout para permitir uso de `Link` e hooks de roteamento

### Estrutura do Layout

O componente `Layout.tsx` segue a seguinte estrutura:

```tsx
<Container size="md">          {/* Container externo (max-w-4xl) */}
  <Header />                   {/* Navegação */}
  
  <main>                       {/* Área de conteúdo */}
    <Container size="full">    {/* Container interno */}
      {children}               {/* Páginas renderizadas aqui */}
    </Container>
  </main>
  
  <Footer />                   {/* Rodapé */}
</Container>
```

**Nota técnica**: O layout atual utiliza Containers aninhados. Esta abordagem funciona mas pode ser otimizada em futuras refatorações para melhor controle de responsividade e largura por página.

## 🎯 Próximos Passos

### Alta Prioridade
- [ ] Implementar timer funcional na página do Pomodoro
- [ ] Adicionar controles: Iniciar, Pausar, Resetar, Skip
- [ ] Atualizar `pomodorosCompleted` automaticamente ao completar timer
- [ ] Diferenciar visualmente: pomodoro, intervalo curto, intervalo longo
- [ ] Adicionar notificações sonoras ao fim de cada período

### Melhorias de UX
- [ ] Implementar confirmação antes de deletar tarefa
- [ ] Adicionar feedback visual para ações (toast notifications)
- [ ] Melhorar estado vazio (empty state) da lista de tarefas
- [ ] Adicionar loading states onde necessário
- [ ] Implementar drag and drop para reordenar tarefas

### Funcionalidades
- [ ] Implementar sistema de configurações persistentes
- [ ] Criar dashboard de estatísticas com gráficos
- [ ] Adicionar tema claro/escuro
- [ ] Implementar histórico de sessões de pomodoro
- [ ] Adicionar categorias/tags para tarefas
- [ ] Sistema de conquistas/gamificação
- [ ] Exportar/importar dados

### Refatorações e Otimizações
- [ ] Refatorar Layout.tsx (remover Container aninhado)
- [ ] Implementar Typography.tsx (componente vazio atualmente)
- [ ] Criar interface Pomodoro.ts (arquivo vazio atualmente)
- [ ] Adicionar testes unitários (Jest/Vitest)
- [ ] Implementar acessibilidade (ARIA labels, keyboard navigation)
- [ ] Otimizar performance com React.memo onde necessário

## ⚠️ Problemas Conhecidos e Limitações

### Arquiteturais
- **Layout.tsx**: Utiliza Containers aninhados (funciona mas não é ideal)
- **Typography.tsx**: Arquivo criado mas vazio (não implementado)
- **Pomodoro.ts**: Interface não definida ainda

### Funcionalidades
- **Timer do Pomodoro**: Ainda não implementado (apenas UI)
- **Configurações**: Página criada mas sem funcionalidade
- **Estatísticas**: Página criada mas sem dados

### UX
- **Sem confirmação de deleção**: Tarefas são removidas imediatamente
- **Sem feedback visual**: Faltam toasts/notifications para ações
- **Lista vazia simples**: Estado vazio poderia ser mais informativo

## 🤝 Contribuindo

Este é um projeto pessoal de estudos, mas sugestões e feedback são bem-vindos!

### Como Contribuir

1. Fork o projeto
2. Crie uma branch para sua feature (`git checkout -b feature/NovaFuncionalidade`)
3. Commit suas mudanças (`git commit -m 'Adiciona nova funcionalidade'`)
4. Push para a branch (`git push origin feature/NovaFuncionalidade`)
5. Abra um Pull Request

### Diretrizes

- Mantenha o código TypeScript com tipagem forte
- Siga os padrões ESLint do projeto
- Utilize Tailwind CSS para estilização
- Componentes devem ser reutilizáveis quando possível
- Documente mudanças significativas

## 📸 Screenshots

_Screenshots em desenvolvimento - serão adicionados em breve_

## 📚 Recursos de Aprendizado

Este projeto foi desenvolvido como parte do aprendizado de:
- React Hooks avançados (custom hooks)
- TypeScript com React
- Design Systems e componentização
- React Router DOM v7
- Tailwind CSS v4
- Vite como build tool

## 🗺️ Roadmap

Veja o arquivo [TODO.md](TODO.md) para um roadmap mais detalhado do projeto.

## ✅ Concluído

### Sprint 1 - Setup e CRUD ✅
- [x] Estrutura base do projeto (Vite + React + TypeScript)
- [x] Sistema de roteamento (React Router DOM 7.9)
- [x] Layout básico (Header + Footer + PageLayout)
- [x] Componentes de Tasks (TaskCard, AddTaskForm, EditTaskForm)
- [x] CRUD completo de tarefas:
  - [x] Adicionar tarefas
  - [x] Editar tarefas (formulário inline)
  - [x] Remover tarefas
  - [x] Marcar/desmarcar como concluída
- [x] Persistência automática em localStorage
- [x] Barra de progresso de pomodoros
- [x] Porcentagem de conclusão (limitada a 100%)
- [x] Interface Task em models/
- [x] README.md e TODO.md com documentação completa

### Sprint 2 - Hooks Customizados ✅
- [x] Hook customizado `useLocalStorage` (genérico e reutilizável)
- [x] Hook customizado `useTasks` (gerenciamento centralizado)
- [x] Refatoração para separar lógica de UI
- [x] Componentes limpos focados em renderização

### Sprint 3 - Navegação para Pomodoro ✅
- [x] Página Pomodoro.tsx criada
- [x] Rota `/pomodoro/:taskId` implementada
- [x] TaskCard clicável (navegação via Link do React Router)
- [x] Captura de parâmetro taskId via useParams
- [x] Prevenção de propagação de eventos nos botões de ação
- [x] Busca da task pelo ID na página Pomodoro
- [x] Botão de voltar para tela de tarefas
- [x] Tratamento de task não encontrada

### Sprint 4 - Design System ✅
- [x] Componente Button (variants: primary, secondary, transparent, sizes: sm, md, lg, icon)
- [x] Componente Card (variants: default, bordered)
- [x] Componente Container (sizes: sm, md, lg, xl, full)
- [x] Componente Form (wrapper estilizado)
- [x] Componente Input (com label, error, helperText)
- [x] Componente TextArea (com label, error, helperText)
- [x] Componente ProgressBar (reutilizável com cores customizáveis)
- [x] Integração do Design System nos componentes existentes
- [x] CSS Modules para Header e Footer

## 📄 Licença

Este projeto está sob desenvolvimento pessoal.

---

Desenvolvido com ❤️ e ☕ usando a técnica Pomodoro