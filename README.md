# 🍅 Pomotimer

Aplicação web moderna de Pomodoro com gerenciamento de tarefas, inspirada no **Pomofocus**, desenvolvida em **React 19 + TypeScript + Tailwind CSS 4**.

![Status](https://img.shields.io/badge/status-em%20desenvolvimento-yellow)
![React](https://img.shields.io/badge/React-19.2-blue)
![TypeScript](https://img.shields.io/badge/TypeScript-5.9-blue)
![Tailwind](https://img.shields.io/badge/Tailwind-4.1-blue)

---

## 💡 Conceito

Diferente do Pomofocus tradicional, o **Pomotimer** permite criar e gerenciar **tarefas individuais** antes de iniciar o Pomodoro. Cada tarefa tem seu próprio timer dedicado, permitindo melhor organização e acompanhamento de progresso.

### Fluxo de Uso

1. **Criar Tarefas** → Página inicial com lista de tarefas
2. **Selecionar Tarefa** → Clicar no card para iniciar Pomodoro
3. **Executar Pomodoro** → Timer dedicado com controles (Iniciar/Pausar/Reiniciar/Avançar)
4. **Acompanhar Progresso** → Estatísticas e métricas de produtividade

---

## ✨ Funcionalidades

### 🏠 Página Inicial (`/`)

- ✅ **CRUD de Tarefas** - Criar, editar, visualizar e remover tarefas
- 📊 **Progresso Visual** - Barra de progresso e porcentagem de conclusão
- 🎯 **Estimativa de Pomodoros** - Definir quantos pomodoros cada tarefa precisa
- 💾 **Persistência Automática** - Dados salvos no localStorage

### ⏱️ Página do Pomodoro (`/pomodoro/:taskId`)

- 🎯 **Timer Dedicado** - Cada tarefa tem seu próprio timer
- ⏯️ **Controles Completos**:
  - Iniciar/Pausar timer
  - Reiniciar timer atual
  - Avançar para próximo estágio (Foco → Intervalo Curto → Intervalo Longo)
- 📈 **Informações da Tarefa** - Título, descrição e progresso
- 🔄 **Ciclo Pomodoro** - Foco (25min) → Intervalo Curto (5min) → Intervalo Longo (15min)
- 🔊 **Feedbacks Sonoros** - Sons ao iniciar timer e ao completar cada período
- ✨ **Feedbacks Visuais** - Indicadores de estado e animações de transição

### ⚙️ Configurações (`/settings`)

- 🌗 **Tema** - Alternar entre modo claro e escuro
- ⏲️ **Tempos Customizáveis**:
  - Duração do Foco (padrão: 25 minutos)
  - Duração do Intervalo Curto (padrão: 5 minutos)
  - Duração do Intervalo Longo (padrão: 15 minutos)

### 📊 Estatísticas (`/statistics`)

- 📈 **Métricas de Produtividade** (em planejamento)
- 📅 **Histórico de Sessões**
- 🎯 **Análise de Desempenho**

---

## 🚀 Quick Start

### Pré-requisitos

- Node.js 18+ instalado
- npm ou yarn

### Instalação

```bash
# Clonar o repositório
git clone https://github.com/DavyAndrade/react-pomotimer.git

# Entrar no diretório
cd pomotimer

# Instalar dependências
npm install

# Executar em modo de desenvolvimento
npm run dev
```

Acesse: **http://localhost:5173**

### Scripts Disponíveis

```bash
npm run dev      # Servidor de desenvolvimento
npm run build    # Build para produção
npm run preview  # Visualizar build
npm run lint     # Verificar código
npm run test     # Executar testes
```

---

## 🛠️ Tecnologias

| Categoria       | Tecnologia       | Versão |
| --------------- | ---------------- | ------ |
| **Core**        | React            | 19.2   |
|                 | TypeScript       | 5.9    |
|                 | Vite             | 7.2    |
| **Roteamento**  | React Router DOM | 7.9    |
| **Estilização** | Tailwind CSS     | 4.1    |
|                 | Lucide React     | 0.555  |
| **Testes**      | Vitest           | 4.0    |
|                 | Testing Library  | 16.3   |

---

## 📂 Estrutura do Projeto

```
src/
├── components/
│   ├── homepage/        # Componentes da Home (TaskCard, Forms)
│   ├── pomodoropage/    # Componentes do Pomodoro (Timer)
│   ├── layout/          # Header, Footer, Layout
│   └── ui/              # Design System (Button, Card, Input, etc)
├── hooks/
│   ├── useLocalStorage.ts   # Persistência genérica
│   └── useTasks.ts          # Gerenciamento de tarefas
├── models/
│   └── Task.ts              # Interface Task
├── pages/
│   ├── Home.tsx             # Lista de tarefas
│   ├── Pomodoro.tsx         # Timer Pomodoro
│   ├── Settings.tsx         # Configurações
│   └── Statistics.tsx       # Estatísticas
└── lib/
    └── utils.ts             # Utilitários (cn)
```

---

## 📊 Modelo de Dados

```typescript
interface Task {
  id: string; // Identificador único
  title: string; // Título da tarefa
  description?: string; // Descrição opcional
  completed: boolean; // Status de conclusão
  pomodorosCompleted: number; // Pomodoros realizados
  estimatedPomodoros: number; // Pomodoros estimados
}
```

---

## 🎯 Roadmap

### ✅ Concluído

- [x] Setup do projeto (Vite + React + TypeScript)
- [x] Sistema de roteamento (React Router DOM)
- [x] CRUD completo de tarefas
- [x] Persistência com localStorage
- [x] Design System (Button, Card, Input, ProgressBar, etc)
- [x] Navegação para página do Pomodoro

### 🚧 Em Desenvolvimento

- [ ] **Timer funcional do Pomodoro**
  - [ ] Controles: Iniciar/Pausar, Reiniciar, Avançar
  - [ ] Ciclo: Foco → Intervalo Curto → Intervalo Longo
  - [ ] Atualização automática de `pomodorosCompleted`
- [ ] **Sistema de configurações**
  - [ ] Tema claro/escuro
  - [ ] Tempos customizáveis (Foco, Intervalos)
- [ ] **Página de estatísticas**
  - [ ] Métricas de produtividade
  - [ ] Histórico de sessões

### 📋 Planejado

- [ ] Notificações sonoras ao fim de cada período
- [ ] Feedback visual (toasts/notifications)
- [ ] Categorias/tags para tarefas
- [ ] PWA (Progressive Web App)
- [ ] Exportação de dados

Veja o [TODO.md](TODO.md) para roadmap completo.

---

## 📚 Documentação

- **[docs/CLAUDE.md](docs/CLAUDE.md)** - Documentação técnica completa para assistentes de IA
- **[docs/TUTOR.md](docs/TUTOR.md)** - Guia educacional com explicações didáticas dos conceitos
- **[TODO.md](TODO.md)** - Lista detalhada de tarefas e roadmap

---

## 🧪 Testes

```bash
# Executar testes em watch mode
npm run test

# Executar testes uma vez
npm run test -- --run

# Executar testes com UI
npm run test -- --ui
```

---

## 🤝 Contribuindo

Este é um projeto pessoal de estudos, mas sugestões e feedback são bem-vindos!

### Como Contribuir

1. Fork o projeto
2. Crie uma branch (`git checkout -b feature/NovaFuncionalidade`)
3. Commit suas mudanças (`git commit -m 'Adiciona nova funcionalidade'`)
4. Push para a branch (`git push origin feature/NovaFuncionalidade`)
5. Abra um Pull Request

### Diretrizes

- Mantenha tipagem TypeScript forte
- Siga os padrões ESLint do projeto
- Utilize Tailwind CSS para estilização
- Componentes devem ser reutilizáveis quando possível
- Adicione testes para novas funcionalidades

---

## 🎓 Aprendizados

Este projeto foi desenvolvido para aprender:

- ✅ React Hooks avançados (custom hooks)
- ✅ TypeScript com React
- ✅ Design Systems e componentização
- ✅ React Router DOM v7
- ✅ Tailwind CSS v4
- ✅ Vite como build tool
- ✅ Testes com Vitest

---

## 🌟 Inspiração

Projeto inspirado no [Pomofocus](https://pomofocus.io/), com a diferença de permitir gerenciamento individual de tarefas antes de iniciar o Pomodoro.

---

**Desenvolvido com ❤️ e ☕ usando a técnica Pomodoro**

---

## 🔗 Links Úteis

- [Documentação React](https://react.dev)
- [Documentação TypeScript](https://www.typescriptlang.org/docs)
- [Documentação Tailwind CSS](https://tailwindcss.com/docs)
- [Documentação React Router](https://reactrouter.com)
- [Documentação Vitest](https://vitest.dev)
- [Pomofocus (Inspiração)](https://pomofocus.io/)
