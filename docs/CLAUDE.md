# 🤖 CLAUDE.md - Documentação para Assistentes de IA

Este documento fornece contexto técnico completo sobre o projeto **Pomotimer** para assistentes de IA (Claude, Gemini, etc.) que trabalharão no código.

---

## 📋 Visão Geral do Projeto

**Pomotimer** é uma aplicação web de Pomodoro com gerenciamento de tarefas, inspirada no **[Pomofocus](https://pomofocus.io/)**, desenvolvida em **React 19 + TypeScript + Tailwind CSS 4**.

### Conceito

Diferente do Pomofocus tradicional onde você inicia o timer diretamente, o **Pomotimer** adota uma abordagem **task-first**:

1. **Criar Tarefas** → Usuário cria tarefas individuais na página inicial
2. **Selecionar Tarefa** → Clica no card da tarefa para acessar o timer dedicado
3. **Executar Pomodoro** → Timer com controles completos (Iniciar/Pausar/Reiniciar/Avançar)
4. **Acompanhar Progresso** → Estatísticas e métricas de produtividade

Cada tarefa tem seu próprio timer e acompanhamento de progresso, permitindo melhor organização e foco.

### Stack Tecnológica

```json
{
  "core": {
    "react": "19.2.0",
    "typescript": "5.9.3",
    "vite": "7.2.4"
  },
  "routing": {
    "react-router-dom": "7.9.6"
  },
  "styling": {
    "tailwindcss": "4.1.17",
    "lucide-react": "0.555.0",
    "clsx": "2.1.1",
    "tailwind-merge": "3.4.0"
  },
  "testing": {
    "vitest": "4.0.17",
    "@testing-library/react": "16.3.1"
  }
}
```

---

## 🏗️ Arquitetura do Projeto

### Estrutura de Diretórios

```
src/
├── assets/              # Recursos estáticos (imagens, SVGs)
├── components/
│   ├── homepage/        # Componentes específicos da Home
│   │   ├── AddTaskForm.tsx
│   │   ├── EditTaskForm.tsx
│   │   └── TaskCard.tsx
│   ├── layout/          # Componentes de layout
│   │   ├── Footer/
│   │   ├── Header/
│   │   └── PageLayout/
│   ├── pomodoropage/    # Componentes da página Pomodoro
│   │   └── Timer.tsx
│   └── ui/              # Design System (componentes reutilizáveis)
│       ├── Button.tsx
│       ├── Card.tsx
│       ├── Container.tsx
│       ├── Form.tsx
│       ├── Input.tsx
│       ├── ProgressBar.tsx
│       ├── TextArea.tsx
│       └── Typography.tsx (vazio)
├── hooks/
│   ├── useLocalStorage.ts   # Hook genérico para persistência
│   └── useTasks.ts           # Hook de gerenciamento de tarefas
├── lib/
│   └── utils.ts              # Utilitários (cn para merge de classes)
├── models/
│   ├── Pomodoro.ts           # Interface Pomodoro (vazio)
│   └── Task.ts               # Interface Task
├── pages/
│   ├── Home.tsx              # Lista de tarefas
│   ├── Pomodoro.tsx          # Timer Pomodoro
│   ├── Settings.tsx          # Configurações
│   └── Statistics.tsx        # Estatísticas
├── test/
│   ├── cn.test.ts            # Testes do utilitário cn
│   └── setup.ts              # Setup do Vitest
├── App.css
├── App.tsx                   # Componente raiz com rotas
└── main.tsx                  # Entry point
```

---

## 📊 Modelo de Dados

### Interface Task

```typescript
// src/models/Task.ts
export interface Task {
  id: string; // Timestamp único
  title: string; // Título da tarefa
  description?: string; // Descrição opcional
  completed: boolean; // Status de conclusão
  pomodorosCompleted: number; // Pomodoros realizados
  estimatedPomodoros: number; // Pomodoros estimados
}
```

### LocalStorage

- **Chave**: `pomodoroTasks`
- **Formato**: `Task[]` serializado em JSON
- **Sincronização**: Automática via `useLocalStorage` hook

---

## 🔄 Fluxo de Dados

### Hierarquia de Estado

```
App.tsx (BrowserRouter)
  └─> Layout.tsx (Container + Header + Footer)
       └─> Pages (Home, Pomodoro, Settings, Statistics)
            └─> useTasks() hook
                 ├─> useLocalStorage('pomodoroTasks')
                 │    ├─> Load from localStorage
                 │    └─> Save to localStorage
                 └─> CRUD operations
                      ├─> addTask(task: Omit<Task, 'id'>)
                      ├─> editTask(id: string, updates: Partial<Task>)
                      ├─> toggleComplete(id: string)
                      └─> removeTask(id: string)
```

### Hooks Customizados

#### `useLocalStorage<T>`

```typescript
function useLocalStorage<T>(
  key: string,
  initialValue: T,
): [T, (value: T | ((val: T) => T)) => void];
```

- **Responsabilidade**: Persistência genérica no localStorage
- **Features**:
  - Sincronização automática
  - Suporte a função updater
  - Tratamento de erros de serialização
  - Tipagem genérica

#### `useTasks`

```typescript
function useTasks() {
  const [tasks, setTasks] = useLocalStorage<Task[]>('pomodoroTasks', []);

  return {
    tasks,
    addTask: (task: Omit<Task, 'id'>) => void,
    editTask: (id: string, updates: Partial<Task>) => void,
    toggleComplete: (id: string) => void,
    removeTask: (id: string) => void
  };
}
```

- **Responsabilidade**: Gerenciamento centralizado de tarefas
- **Features**:
  - CRUD completo
  - Geração automática de IDs (timestamp)
  - Imutabilidade (usa spread operator)

---

## 🎨 Design System

### Componentes UI (`src/components/ui/`)

#### Button

```typescript
interface ButtonProps {
  variant?: "primary" | "secondary" | "transparent";
  size?: "sm" | "md" | "lg" | "icon";
  children: React.ReactNode;
  onClick?: () => void;
  type?: "button" | "submit" | "reset";
  className?: string;
}
```

**Variantes**:

- `primary`: Fundo azul, texto branco
- `secondary`: Fundo cinza, texto escuro
- `transparent`: Sem fundo, texto azul

**Tamanhos**:

- `sm`: padding pequeno
- `md`: padding médio (padrão)
- `lg`: padding grande
- `icon`: quadrado, sem padding horizontal

#### Card

```typescript
interface CardProps {
  variant?: "default" | "bordered";
  children: React.ReactNode;
  className?: string;
}
```

#### Container

```typescript
interface ContainerProps {
  size?: "sm" | "md" | "lg" | "xl" | "full";
  children: React.ReactNode;
  className?: string;
}
```

**Tamanhos**:

- `sm`: max-w-2xl
- `md`: max-w-4xl
- `lg`: max-w-6xl
- `xl`: max-w-7xl
- `full`: w-full

#### Input / TextArea

```typescript
interface InputProps {
  label?: string;
  error?: string;
  helperText?: string;
  // ... props nativas do input
}
```

#### ProgressBar

```typescript
interface ProgressBarProps {
  current: number;
  total: number;
  className?: string;
}
```

---

## 🛣️ Roteamento

### Rotas Configuradas

```typescript
// App.tsx
<Routes>
  <Route path="/" element={<Home />} />
  <Route path="/pomodoro/:taskId" element={<Pomodoro />} />
  <Route path="/settings" element={<Settings />} />
  <Route path="/statistics" element={<Statistics />} />
</Routes>
```

### Navegação entre Páginas

**Home → Pomodoro**:

```tsx
// TaskCard.tsx
<Link to={`/pomodoro/${task.id}`} className="...">
  {/* Card content */}
</Link>
```

**Pomodoro → Home**:

```tsx
// Pomodoro.tsx
<Button onClick={() => navigate("/")}>Voltar</Button>
```

---

## ⚠️ Problemas Conhecidos e Limitações

### Arquiteturais

1. **Layout.tsx - Containers Aninhados**

   ```tsx
   // Estrutura atual (funciona mas não é ideal)
   <Container size="md">
     <Header />
     <main>
       <Container size="full">{children}</Container>
     </main>
     <Footer />
   </Container>
   ```

   - **Problema**: Container dentro de Container
   - **Impacto**: Dificulta controle de largura por página
   - **Solução futura**: Refatorar para um único Container ou permitir override

2. **Typography.tsx - Não Implementado**
   - Arquivo existe mas está vazio
   - Componentes usam tags HTML diretamente (`<h1>`, `<p>`, etc)

3. **Pomodoro.ts - Interface Vazia**
   - Model criado mas não definido
   - Timer ainda não implementado

### Funcionalidades Incompletas

1. **Timer do Pomodoro** (`/pomodoro/:taskId`)
   - Página existe mas timer não funciona completamente
   - **Controles necessários**:
     - **Iniciar/Pausar**: Controla a execução do timer
     - **Reiniciar**: Reseta o timer atual para o início do estágio
     - **Avançar**: Pula para o próximo estágio (Foco → Intervalo Curto → Intervalo Longo)
   - **Ciclo Pomodoro**: Foco (25min) → Intervalo Curto (5min) → Intervalo Longo (15min após 4 pomodoros)
   - `pomodorosCompleted` não é atualizado automaticamente ao completar um ciclo de foco

2. **Página de Configurações** (`/settings`)
   - UI criada mas sem funcionalidade completa
   - **Funcionalidades necessárias**:
     - **Tema**: Toggle entre modo claro e escuro
     - **Tempos customizáveis**:
       - Duração do Foco (padrão: 25 minutos)
       - Duração do Intervalo Curto (padrão: 5 minutos)
       - Duração do Intervalo Longo (padrão: 15 minutos)
   - Configurações devem persistir no localStorage
   - Criar hook `useSettings` para gerenciar configurações

3. **Página de Estatísticas** (`/statistics`)
   - Página vazia
   - **Métricas planejadas** (ainda não definidas completamente):
     - Total de pomodoros completados
     - Total de tarefas concluídas
     - Tempo total de foco
     - Histórico de sessões
   - Sem visualizações/gráficos

### UX

1. **Sem confirmação de deleção**
   - Tarefas são removidas imediatamente
   - Risco de perda acidental de dados

2. **Sem feedback visual**
   - Faltam toasts/notifications
   - Usuário não recebe confirmação de ações

3. **Estado vazio simples**
   - Lista vazia mostra apenas mensagem básica
   - Poderia ter ilustração ou call-to-action

---

## 🎯 Próximos Passos (Prioridades)

### Alta Prioridade

1. **Implementar Timer Funcional do Pomodoro**
   - Criar hook `useTimer` ou `usePomodoro` para gerenciar estado do timer
   - Implementar contagem regressiva (usando `setInterval` ou `requestAnimationFrame`)
   - **Controles do Timer**:
     - **Iniciar/Pausar**: Toggle entre estados running/paused
     - **Reiniciar**: Reset do timer atual para o tempo inicial do estágio
     - **Avançar**: Skip para próximo estágio (Foco → Intervalo Curto/Longo)
   - **Ciclo Pomodoro**:
     - Foco: 25 minutos (customizável)
     - Intervalo Curto: 5 minutos (após cada pomodoro, exceto o 4º)
     - Intervalo Longo: 15 minutos (após 4 pomodoros)
   - Atualizar `pomodorosCompleted` automaticamente ao completar um ciclo de foco
   - Notificação sonora ao fim de cada período (opcional)
   - Exibir informações da tarefa (título, descrição, progresso)

2. **Sistema de Configurações**
   - Criar hook `useSettings` para gerenciar configurações
   - Persistir configurações no localStorage (chave: `pomodoroSettings`)
   - **Interface Settings**:
     ```typescript
     interface Settings {
       theme: "light" | "dark";
       focusDuration: number; // em minutos, padrão: 25
       shortBreakDuration: number; // em minutos, padrão: 5
       longBreakDuration: number; // em minutos, padrão: 15
     }
     ```
   - Implementar tema claro/escuro (Context API ou CSS variables)
   - Validar valores mínimos e máximos para durações

3. **Melhorias de UX**
   - Modal de confirmação para deletar tarefas
   - Toast notifications (biblioteca sugerida: `react-hot-toast` ou `sonner`)
   - Melhorar empty state da lista de tarefas

### Média Prioridade

4. **Página de Estatísticas**
   - Calcular métricas básicas:
     - Total de pomodoros completados
     - Total de tarefas concluídas
     - Tarefas pendentes
     - Tempo total de foco
     - Taxa de conclusão (%)
   - Exibir cards com números principais
   - Histórico de sessões (opcional - requer salvar sessões no localStorage)
   - Visualizações/gráficos (opcional - biblioteca: `recharts` ou `chart.js`)

5. **Refatorações**
   - Refatorar Layout.tsx (remover Containers aninhados)
   - Implementar Typography.tsx (componentes de tipografia)
   - Definir interface Pomodoro.ts (se necessário para histórico de sessões)

---

## 🧪 Testes

### Configuração Atual

- **Framework**: Vitest 4.0.17
- **Testing Library**: @testing-library/react 16.3.1
- **Ambiente**: jsdom

### Testes Existentes

```typescript
// src/test/cn.test.ts
describe("cn utility", () => {
  it("merges class names correctly", () => {
    // Testa função utilitária cn (clsx + twMerge)
  });
});
```

### Testes Necessários

1. **Hooks**:
   - `useLocalStorage`: persistência, atualização, erros
   - `useTasks`: CRUD operations, validações

2. **Componentes**:
   - `TaskCard`: renderização, eventos, estados
   - `AddTaskForm`: validação, submissão
   - `EditTaskForm`: edição, cancelamento

3. **Integração**:
   - Fluxo completo: adicionar → editar → completar → remover
   - Navegação Home → Pomodoro

---

## 📝 Convenções de Código

### TypeScript

- **Tipagem forte**: Evitar `any`, usar interfaces/types
- **Props interfaces**: Sempre definir para componentes
- **Generics**: Usar em hooks reutilizáveis (`useLocalStorage<T>`)

### React

- **Functional Components**: Usar arrow functions
- **Hooks**: Seguir regras dos hooks (ordem, condicionalidade)
- **Props destructuring**: Sempre no parâmetro da função
- **Event handlers**: Prefixo `handle` para funções locais, `on` para props

### Estilização

- **Tailwind CSS**: Preferir classes utilitárias
- **CSS Modules**: Para componentes de layout (Header, Footer)
- **Utilitário `cn`**: Para merge condicional de classes
  ```typescript
  import { cn } from '@/lib/utils';
  className={cn('base-class', condition && 'conditional-class', className)}
  ```

### Nomenclatura

- **Componentes**: PascalCase (`TaskCard.tsx`)
- **Hooks**: camelCase com prefixo `use` (`useTasks.ts`)
- **Interfaces**: PascalCase (`Task`, `ButtonProps`)
- **Funções**: camelCase (`addTask`, `toggleComplete`)

---

## 🔧 Comandos Úteis

```bash
# Desenvolvimento
npm run dev              # Inicia dev server (localhost:5173)

# Build
npm run build            # Compila TypeScript + build Vite
npm run preview          # Visualiza build de produção

# Qualidade
npm run lint             # ESLint
npm run test             # Vitest (watch mode)
npm run test -- --run    # Vitest (single run)

# TypeScript
npx tsc --noEmit         # Type checking sem build
```

---

## 🚨 Pontos de Atenção para IA

### Ao Modificar Código

1. **Sempre verificar tipagem TypeScript**
   - Não usar `any` sem justificativa
   - Atualizar interfaces se mudar estrutura de dados

2. **Manter consistência do Design System**
   - Usar componentes de `src/components/ui/`
   - Não criar estilos inline ou classes ad-hoc

3. **Persistência de dados**
   - Toda mudança em `Task` deve ser refletida no localStorage
   - Usar `useTasks` hook, não manipular `tasks` diretamente

4. **Navegação**
   - Usar `Link` do React Router para navegação interna
   - Usar `useNavigate` para navegação programática

5. **Acessibilidade**
   - Adicionar labels em inputs
   - Usar atributos ARIA quando necessário
   - Garantir navegação por teclado

### Ao Adicionar Features

1. **Criar hook customizado** se houver lógica complexa
2. **Componentizar** se houver repetição de UI
3. **Adicionar testes** para lógica crítica
4. **Atualizar documentação** (README, TODO, CLAUDE)

### Ao Refatorar

1. **Não quebrar funcionalidades existentes**
2. **Manter backward compatibility** com localStorage
3. **Atualizar imports** se mover arquivos
4. **Rodar testes** após mudanças

---

## 📚 Recursos Adicionais

- **Tailwind CSS v4**: [tailwindcss.com](https://tailwindcss.com)
- **React Router v7**: [reactrouter.com](https://reactrouter.com)
- **Lucide Icons**: [lucide.dev](https://lucide.dev)
- **Vitest**: [vitest.dev](https://vitest.dev)

---

**Última atualização**: 10 de fevereiro de 2026  
**Versão do projeto**: 0.0.0 (em desenvolvimento)
