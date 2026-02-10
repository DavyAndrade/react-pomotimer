# 📚 TUTOR.md - Guia Educacional do Pomotimer

Este documento explica os conceitos, padrões e decisões técnicas do projeto **Pomotimer** de forma didática, ideal para aprendizado de React, TypeScript e boas práticas.

---

## 🎯 Objetivo do Projeto

O **Pomotimer** é uma aplicação web de Pomodoro com gerenciamento de tarefas, inspirada no **[Pomofocus](https://pomofocus.io/)**, criada para aprender e praticar conceitos avançados de React e TypeScript.

### Diferencial

Diferente do Pomofocus tradicional onde você inicia o timer diretamente, o **Pomotimer** adota uma abordagem **task-first**:

1. **Criar Tarefas** → Usuário cria tarefas individuais na página inicial
2. **Selecionar Tarefa** → Clica no card da tarefa para acessar o timer dedicado
3. **Executar Pomodoro** → Timer com controles completos (Iniciar/Pausar/Reiniciar/Avançar)
4. **Acompanhar Progresso** → Estatísticas e métricas de produtividade

Cada tarefa tem seu próprio timer e acompanhamento de progresso, permitindo melhor organização e foco.

### Tecnologias Aprendidas

- ✅ React Hooks avançados (custom hooks)
- ✅ TypeScript com React
- ✅ Design Systems e componentização
- ✅ React Router DOM v7
- ✅ Tailwind CSS v4
- ✅ Vite como build tool
- ✅ Persistência de dados com localStorage
- ✅ Testes com Vitest

---

## 📖 Conceitos Fundamentais

### 1. Custom Hooks

Custom hooks são funções JavaScript que encapsulam lógica reutilizável usando hooks do React.

#### Por que usar?

- **Reutilização**: Mesma lógica em múltiplos componentes
- **Separação de responsabilidades**: UI separada da lógica
- **Testabilidade**: Lógica pode ser testada isoladamente
- **Organização**: Código mais limpo e manutenível

#### Exemplo: `useLocalStorage`

```typescript
// src/hooks/useLocalStorage.ts
function useLocalStorage<T>(key: string, initialValue: T) {
  // 1. Estado que sincroniza com localStorage
  const [storedValue, setStoredValue] = useState<T>(() => {
    try {
      const item = window.localStorage.getItem(key);
      return item ? JSON.parse(item) : initialValue;
    } catch (error) {
      console.error(error);
      return initialValue;
    }
  });

  // 2. Função que atualiza estado E localStorage
  const setValue = (value: T | ((val: T) => T)) => {
    try {
      const valueToStore =
        value instanceof Function ? value(storedValue) : value;
      setStoredValue(valueToStore);
      window.localStorage.setItem(key, JSON.stringify(valueToStore));
    } catch (error) {
      console.error(error);
    }
  };

  return [storedValue, setValue] as const;
}
```

**Aprendizados**:

- ✅ **Lazy initialization**: `useState(() => ...)` executa apenas uma vez
- ✅ **Generics**: `<T>` permite usar com qualquer tipo
- ✅ **Tuple return**: `as const` para tipagem precisa `[T, Setter]`
- ✅ **Function updater**: Suporta `setValue(prev => prev + 1)`

#### Exemplo: `useTasks`

```typescript
// src/hooks/useTasks.ts
function useTasks() {
  const [tasks, setTasks] = useLocalStorage<Task[]>("pomodoroTasks", []);

  const addTask = (task: Omit<Task, "id">) => {
    const newTask: Task = {
      ...task,
      id: Date.now().toString(),
    };
    setTasks((prevTasks) => [...prevTasks, newTask]);
  };

  const editTask = (id: string, updates: Partial<Task>) => {
    setTasks((prevTasks) =>
      prevTasks.map((task) =>
        task.id === id ? { ...task, ...updates } : task,
      ),
    );
  };

  const toggleComplete = (id: string) => {
    setTasks((prevTasks) =>
      prevTasks.map((task) =>
        task.id === id ? { ...task, completed: !task.completed } : task,
      ),
    );
  };

  const removeTask = (id: string) => {
    setTasks((prevTasks) => prevTasks.filter((task) => task.id !== id));
  };

  return { tasks, addTask, editTask, toggleComplete, removeTask };
}
```

**Aprendizados**:

- ✅ **Composição de hooks**: `useTasks` usa `useLocalStorage`
- ✅ **Omit utility type**: `Omit<Task, 'id'>` remove propriedade
- ✅ **Partial utility type**: `Partial<Task>` torna todas propriedades opcionais
- ✅ **Imutabilidade**: Sempre cria novo array/objeto (spread operator)
- ✅ **Function updater**: `setTasks(prev => ...)` garante estado atualizado

---

### 2. TypeScript com React

#### Interfaces vs Types

```typescript
// Interface (preferível para objetos)
interface Task {
  id: string;
  title: string;
  description?: string; // Opcional
  completed: boolean;
}

// Type (preferível para unions, intersections)
type ButtonVariant = "primary" | "secondary" | "transparent";
type Size = "sm" | "md" | "lg";
```

#### Props Typing

```typescript
// Componente com props
interface ButtonProps {
  variant?: ButtonVariant;
  size?: Size;
  children: React.ReactNode;
  onClick?: () => void;
  className?: string;
}

export function Button({
  variant = "primary",
  size = "md",
  children,
  onClick,
  className,
}: ButtonProps) {
  // ...
}
```

**Aprendizados**:

- ✅ **Props interface**: Define contrato do componente
- ✅ **Optional props**: `?` para propriedades opcionais
- ✅ **Default values**: Destructuring com valores padrão
- ✅ **React.ReactNode**: Tipo para children (aceita JSX, string, number, etc)

#### Generics em Hooks

```typescript
// Hook genérico
function useLocalStorage<T>(
  key: string,
  initialValue: T,
): [T, (value: T) => void] {
  // ...
}

// Uso
const [tasks, setTasks] = useLocalStorage<Task[]>("tasks", []);
const [count, setCount] = useLocalStorage<number>("count", 0);
```

**Aprendizados**:

- ✅ **Type parameter**: `<T>` é placeholder para qualquer tipo
- ✅ **Type inference**: TypeScript infere `T` do `initialValue`
- ✅ **Reusabilidade**: Mesmo hook para diferentes tipos

---

### 3. Design System

Um Design System é um conjunto de componentes reutilizáveis com estilos consistentes.

#### Componentes Base

```typescript
// src/components/ui/Button.tsx
interface ButtonProps {
  variant?: 'primary' | 'secondary' | 'transparent';
  size?: 'sm' | 'md' | 'lg' | 'icon';
  children: React.ReactNode;
  onClick?: () => void;
  type?: 'button' | 'submit' | 'reset';
  className?: string;
}

export function Button({
  variant = 'primary',
  size = 'md',
  children,
  onClick,
  type = 'button',
  className
}: ButtonProps) {
  const baseStyles = 'rounded-lg font-medium transition-colors';

  const variantStyles = {
    primary: 'bg-blue-600 text-white hover:bg-blue-700',
    secondary: 'bg-gray-200 text-gray-800 hover:bg-gray-300',
    transparent: 'bg-transparent text-blue-600 hover:bg-blue-50',
  };

  const sizeStyles = {
    sm: 'px-3 py-1.5 text-sm',
    md: 'px-4 py-2 text-base',
    lg: 'px-6 py-3 text-lg',
    icon: 'p-2',
  };

  return (
    <button
      type={type}
      onClick={onClick}
      className={cn(
        baseStyles,
        variantStyles[variant],
        sizeStyles[size],
        className
      )}
    >
      {children}
    </button>
  );
}
```

**Aprendizados**:

- ✅ **Variants**: Diferentes estilos para diferentes contextos
- ✅ **Sizes**: Diferentes tamanhos para hierarquia visual
- ✅ **Base styles**: Estilos compartilhados por todas variantes
- ✅ **Composição**: `className` prop permite override
- ✅ **Utilitário `cn`**: Merge inteligente de classes Tailwind

#### Utilitário `cn` (Class Names)

```typescript
// src/lib/utils.ts
import { clsx, type ClassValue } from "clsx";
import { twMerge } from "tailwind-merge";

export function cn(...inputs: ClassValue[]) {
  return twMerge(clsx(inputs));
}
```

**Como funciona**:

1. **clsx**: Concatena classes condicionalmente
2. **twMerge**: Resolve conflitos de classes Tailwind

**Exemplo**:

```typescript
// Sem cn - classes conflitantes não são resolvidas
className = "px-4 py-2 bg-blue-500 px-6"; // px-4 e px-6 conflitam, resultado imprevisível

// Com cn - última classe vence
cn("px-4 py-2 bg-blue-500", "px-6"); // Resultado: "py-2 bg-blue-500 px-6"
```

---

### 4. React Router DOM v7

#### Configuração de Rotas

```typescript
// src/App.tsx
import { BrowserRouter, Routes, Route } from 'react-router-dom';

function App() {
  return (
    <BrowserRouter>
      <Layout>
        <Routes>
          <Route path="/" element={<Home />} />
          <Route path="/pomodoro/:taskId" element={<Pomodoro />} />
          <Route path="/settings" element={<Settings />} />
          <Route path="/statistics" element={<Statistics />} />
        </Routes>
      </Layout>
    </BrowserRouter>
  );
}
```

**Aprendizados**:

- ✅ **BrowserRouter**: Usa History API do navegador
- ✅ **Routes**: Container de rotas
- ✅ **Route**: Define path e componente
- ✅ **Parâmetros dinâmicos**: `:taskId` captura valor da URL

#### Navegação

```typescript
// Navegação declarativa (Link)
import { Link } from 'react-router-dom';

<Link to={`/pomodoro/${task.id}`}>
  Ver Pomodoro
</Link>

// Navegação programática (useNavigate)
import { useNavigate } from 'react-router-dom';

function MyComponent() {
  const navigate = useNavigate();

  const handleClick = () => {
    navigate('/');
  };

  return <button onClick={handleClick}>Voltar</button>;
}
```

#### Captura de Parâmetros

```typescript
// src/pages/Pomodoro.tsx
import { useParams } from 'react-router-dom';

function Pomodoro() {
  const { taskId } = useParams<{ taskId: string }>();
  const { tasks } = useTasks();

  const task = tasks.find((t) => t.id === taskId);

  if (!task) {
    return <div>Tarefa não encontrada</div>;
  }

  return <div>{task.title}</div>;
}
```

**Aprendizados**:

- ✅ **useParams**: Hook para acessar parâmetros da URL
- ✅ **Type safety**: Tipar parâmetros esperados
- ✅ **Validação**: Sempre verificar se recurso existe

---

### 5. Padrões de Componentização

#### Feature-Based Structure

```
components/
├── homepage/        # Componentes específicos da Home
│   ├── AddTaskForm.tsx
│   ├── EditTaskForm.tsx
│   └── TaskCard.tsx
├── pomodoropage/    # Componentes específicos do Pomodoro
│   └── Timer.tsx
├── layout/          # Componentes de layout (Header, Footer)
└── ui/              # Componentes reutilizáveis (Design System)
```

**Vantagens**:

- ✅ **Organização**: Fácil encontrar componentes
- ✅ **Escalabilidade**: Adicionar features sem bagunça
- ✅ **Reusabilidade**: `ui/` contém componentes genéricos

#### Separação de Responsabilidades

```
Pages (Orquestração)
  └─> Components (UI)
       └─> Hooks (Lógica)
            └─> Models (Tipos)
```

**Exemplo**:

```typescript
// ❌ Ruim: Lógica misturada com UI
function Home() {
  const [tasks, setTasks] = useState<Task[]>([]);

  useEffect(() => {
    const saved = localStorage.getItem('tasks');
    if (saved) setTasks(JSON.parse(saved));
  }, []);

  const addTask = (task: Task) => {
    const newTasks = [...tasks, task];
    setTasks(newTasks);
    localStorage.setItem('tasks', JSON.stringify(newTasks));
  };

  return <div>{/* UI */}</div>;
}

// ✅ Bom: Lógica separada em hook
function Home() {
  const { tasks, addTask } = useTasks();

  return <div>{/* UI */}</div>;
}
```

---

## 🔄 Fluxos de Dados

### Fluxo de Adição de Tarefa

```
1. Usuário preenche formulário (AddTaskForm)
   └─> 2. Clica em "Adicionar"
        └─> 3. onSubmit chama addTask({ title, description, ... })
             └─> 4. useTasks.addTask cria Task com ID
                  └─> 5. Atualiza estado tasks
                       └─> 6. useLocalStorage salva no localStorage
                            └─> 7. Re-render automático (React)
                                 └─> 8. TaskCard aparece na lista
```

### Fluxo de Navegação para Pomodoro

```
1. Usuário clica no TaskCard
   └─> 2. Link navega para /pomodoro/:taskId
        └─> 3. React Router renderiza <Pomodoro />
             └─> 4. useParams captura taskId
                  └─> 5. useTasks retorna lista de tasks
                       └─> 6. tasks.find(t => t.id === taskId)
                            └─> 7. Renderiza informações da task
```

---

## 🎨 Tailwind CSS

### Utility-First CSS

```typescript
// ❌ CSS tradicional
<button className="my-button">Click</button>
// .my-button { padding: 0.5rem 1rem; background: blue; ... }

// ✅ Tailwind
<button className="px-4 py-2 bg-blue-500 text-white rounded hover:bg-blue-600">
  Click
</button>
```

**Vantagens**:

- ✅ Sem context switching (HTML ↔ CSS)
- ✅ Sem naming (não precisa inventar nomes de classes)
- ✅ Purge automático (remove classes não usadas)
- ✅ Responsividade fácil (`md:px-6`, `lg:text-xl`)

### Responsividade

```typescript
<div className="
  px-4          // padding horizontal padrão
  md:px-6       // padding maior em telas médias
  lg:px-8       // padding maior em telas grandes
  text-sm       // texto pequeno padrão
  md:text-base  // texto normal em telas médias
">
  Conteúdo responsivo
</div>
```

**Breakpoints**:

- `sm`: 640px
- `md`: 768px
- `lg`: 1024px
- `xl`: 1280px
- `2xl`: 1536px

---

## 🧪 Testes com Vitest

### Configuração

```typescript
// vite.config.ts
import { defineConfig } from "vite";
import react from "@vitejs/plugin-react";

export default defineConfig({
  plugins: [react()],
  test: {
    environment: "jsdom",
    setupFiles: "./src/test/setup.ts",
  },
});
```

### Exemplo de Teste

```typescript
// src/test/cn.test.ts
import { describe, it, expect } from "vitest";
import { cn } from "@/lib/utils";

describe("cn utility", () => {
  it("merges class names correctly", () => {
    expect(cn("px-4", "px-6")).toBe("px-6");
  });

  it("handles conditional classes", () => {
    expect(cn("base", true && "active", false && "disabled")).toBe(
      "base active",
    );
  });
});
```

**Aprendizados**:

- ✅ **describe**: Agrupa testes relacionados
- ✅ **it**: Define um teste individual
- ✅ **expect**: Asserção (verificação)

---

## 💡 Boas Práticas Aplicadas

### 1. Imutabilidade

```typescript
// ❌ Mutação direta
const addTask = (task: Task) => {
  tasks.push(task); // Modifica array original
  setTasks(tasks); // React pode não detectar mudança
};

// ✅ Imutabilidade
const addTask = (task: Task) => {
  setTasks([...tasks, task]); // Cria novo array
};
```

### 2. Function Updater

```typescript
// ❌ Closure stale
const increment = () => {
  setCount(count + 1); // Pode usar valor desatualizado
};

// ✅ Function updater
const increment = () => {
  setCount((prev) => prev + 1); // Sempre usa valor atual
};
```

### 3. Lazy Initialization

```typescript
// ❌ Executa toda renderização
const [value, setValue] = useState(expensiveComputation());

// ✅ Executa apenas uma vez
const [value, setValue] = useState(() => expensiveComputation());
```

### 4. Event Propagation

```typescript
// TaskCard clicável que navega para Pomodoro
<Link to={`/pomodoro/${task.id}`}>
  <div>
    {/* Conteúdo */}

    {/* Botões que NÃO devem navegar */}
    <button onClick={(e) => {
      e.stopPropagation();  // Previne navegação
      onEdit(task.id);
    }}>
      Editar
    </button>
  </div>
</Link>
```

---

## 🚀 Próximos Passos de Aprendizado

### Conceitos para Estudar

1. **Context API**: Estado global sem prop drilling
2. **useReducer**: Gerenciamento de estado complexo
3. **React Query**: Cache e sincronização de dados
4. **Zustand/Jotai**: State management moderno
5. **React Hook Form**: Formulários performáticos
6. **Zod**: Validação de schemas TypeScript-first

### Melhorias para Praticar

1. **Implementar Timer do Pomodoro**
   - Criar hook `useTimer`
   - Usar `setInterval` ou `requestAnimationFrame`
   - Gerenciar estados: running, paused, completed
   - **Feedbacks Sonoros**: Usar `HTMLAudioElement` ou Web Audio API
   - **Feedbacks Visuais**: Animações CSS e mudanças de cor por estado

2. **Adicionar Tema Claro/Escuro**
   - Criar `ThemeContext`
   - Usar CSS variables
   - Persistir preferência

3. **Criar Sistema de Notificações**
   - Biblioteca: `react-hot-toast` ou `sonner`
   - Feedback visual para ações

4. **Implementar Testes**
   - Testar hooks com `@testing-library/react-hooks`
   - Testar componentes com `@testing-library/react`
   - Testar integração (fluxos completos)

---

## 📚 Recursos Recomendados

### Documentação Oficial

- [React Docs](https://react.dev) - Nova documentação oficial
- [TypeScript Handbook](https://www.typescriptlang.org/docs/handbook/intro.html)
- [Tailwind CSS](https://tailwindcss.com/docs)
- [React Router](https://reactrouter.com/en/main)
- [Vitest](https://vitest.dev/guide/)

### Tutoriais e Cursos

- [React TypeScript Cheatsheet](https://react-typescript-cheatsheet.netlify.app/)
- [Total TypeScript](https://www.totaltypescript.com/)
- [Tailwind CSS Tutorial](https://www.youtube.com/watch?v=pfaSUYaSgRo)

### Ferramentas

- [TypeScript Playground](https://www.typescriptlang.org/play)
- [Tailwind Play](https://play.tailwindcss.com/)
- [React DevTools](https://react.dev/learn/react-developer-tools)

---

**Última atualização**: 10 de fevereiro de 2026  
**Nível**: Intermediário  
**Tempo estimado de estudo**: 4-6 semanas
