# 📝 TODO - Pomotimer

Lista de tarefas para desenvolvimento do projeto Pomotimer.

---

## 🎯 Prioridade Alta

### ⚡ Funcionalidades Críticas

- [x] **Edição de Tarefas**
  - [x] Criar componente `TaskEditForm.tsx`
  - [x] Implementar lógica real no `editTask` do useTasks (atualmente retorna "Teste")
  - [x] Adicionar estado para controlar qual task está sendo editada
  - [x] Permitir editar: título, descrição e pomodoros estimados
  - [x] Adicionar validação de formulário

- [ ] **Página do Pomodoro**
  - [x] Criar página `Pomodoro.tsx` em `/pages`
  - [ ] Implementar timer/contador regressivo
  - [ ] Adicionar controles: Iniciar, Pausar, Resetar, Skippar
  - [ ] Mostrar informações da tarefa ativa
  - [ ] Indicar qual pomodoro está em andamento (1/4, 2/4, etc)
  - [ ] Diferenciar visualmente: pomodoro, intervalo curto, intervalo longo
  - [ ] Botão para voltar à tela de tarefas
  - [ ] Atualizar `pomodorosCompleted` automaticamente ao completar
  - [ ] Adicionar notificação sonora ao fim do timer (opcional)

- [x] **Navegação para Pomodoro**
  - [x] Tornar TaskCard clicável
  - [x] Implementar rota `/pomodoro/:taskId`
  - [x] Passar task selecionada para página do Pomodoro
  - [x] Capturar parâmetro via useParams
  - [x] Prevenir propagação de eventos nos botões do card
  - [x] Buscar task pelo ID na página Pomodoro
  - [x] Botão de voltar para tela de tarefas
  - [x] Tratamento quando task não é encontrada
  - [ ] Criar contexto/estado global para task ativa (opcional)

---

## 🔧 Refatoração e Melhorias

### 🎨 CSS Modules

- [ ] **Migrar Tailwind para CSS Modules**
  - [ ] Configurar reset CSS (manter Tailwind apenas para reset)
  - [ ] Criar `Tasks.module.css`
  - [ ] Criar `TaskCard.module.css`
  - [ ] Criar `TaskForm.module.css`
  - [ ] Criar `Navbar.module.css`
  - [ ] Criar `Footer.module.css`
  - [ ] Migrar estilos página por página
  - [ ] Definir paleta de cores em variáveis CSS
  - [ ] Criar sistema de design consistente

### 🧹 Código Limpo

- [x] **Melhorar useTasks.ts**
  - [x] Remover `console.log` desnecessários
  - [x] Padronizar nomenclatura (remover "handle" dos métodos)
  - [x] Adicionar tipagem para `editTask` com `Partial<Task>`
  - [x] Renomear `toggleCompleteTask` para `toggleComplete`

- [x] **Otimizar TaskCard**
  - [x] Remover funções wrapper desnecessárias
  - [x] Passar callbacks diretamente: `onClick={() => onRemoveTask(task.id)}`
  - [x] Simplificar lógica de renderização condicional
  - [x] Calcular progresso uma única vez (evitar duplicação)
  - [x] Limitar barra de progresso a 100% com Math.min()

- [ ] **Componentizar melhor**
  - [ ] Extrair `ProgressBar` de TaskCard (componente reutilizável)
  - [ ] Extrair botões de ação em componente próprio (opcional)

---

## ⚙️ Página de Configurações

- [ ] **Implementar Settings.tsx**
  - [ ] Criar hook `useSettings` para gerenciar configurações
  - [ ] Persistir configurações no localStorage
  - [ ] Adicionar campo: Tempo de Pomodoro (padrão: 25min)
  - [ ] Adicionar campo: Intervalo Curto (padrão: 5min)
  - [ ] Adicionar campo: Intervalo Longo (padrão: 15min)
  - [ ] Adicionar campo: Pomodoros até intervalo longo (padrão: 4)
  - [ ] Implementar toggle de tema claro/escuro
  - [ ] Criar interface `Settings` em models/
  - [ ] Validar valores mínimos e máximos

### 🌗 Sistema de Temas

- [ ] **Dark/Light Mode**
  - [ ] Criar contexto de tema (`ThemeContext`)
  - [ ] Implementar hook `useTheme`
  - [ ] Definir variáveis CSS para cada tema
  - [ ] Aplicar tema globalmente
  - [ ] Salvar preferência no localStorage
  - [ ] Detectar preferência do sistema (opcional)

---

## 📊 Página de Estatísticas

- [ ] **Implementar Statistics.tsx**
  - [ ] Reutilizar `useTasks` para acessar tasks
  - [ ] Calcular métricas:
    - [ ] Total de pomodoros realizados
    - [ ] Total de tarefas concluídas
    - [ ] Total de tarefas pendentes
    - [ ] Tempo total de foco
    - [ ] Taxa de conclusão (%)
    - [ ] Média de pomodoros por tarefa
  - [ ] Criar visualizações:
    - [ ] Cards com números principais
    - [ ] Gráfico de pomodoros por dia (opcional - biblioteca de gráficos)
    - [ ] Lista de tarefas mais produtivas
    - [ ] Histórico de atividades

- [ ] **Histórico de Sessões**
  - [ ] Criar model `PomodoroSession` em models/
  - [ ] Salvar cada sessão completada (data, duração, taskId)
  - [ ] Criar hook `usePomodoroHistory`
  - [ ] Exibir histórico na página de estatísticas

---

## 🎨 UI/UX

### Melhorias Visuais

- [ ] **Componentes de UI**
  - [ ] Criar componente `Button` reutilizável
  - [ ] Criar componente `Input` reutilizável
  - [ ] Criar componente `Modal` para confirmações
  - [ ] Adicionar loading states

- [ ] **Feedback Visual**
  - [ ] Animações de transição entre páginas
  - [ ] Animações ao adicionar/remover tasks
  - [ ] Toast/notificações para ações (sucesso, erro)
  - [ ] Skeleton loading para carregamento

- [ ] **Responsividade**
  - [ ] Testar em mobile
  - [ ] Ajustar espaçamentos para telas pequenas
  - [ ] Melhorar navegação mobile

### Acessibilidade

- [ ] Adicionar labels apropriados em formulários
- [ ] Implementar navegação por teclado
- [ ] Adicionar atributos ARIA onde necessário
- [ ] Testar com leitor de tela
- [ ] Garantir contraste adequado de cores

---

## 🔮 Funcionalidades Futuras

### Features Avançadas

- [ ] **Categorias/Tags**
  - [ ] Adicionar campo `category` no model Task
  - [ ] Criar sistema de categorias customizáveis
  - [ ] Filtrar tasks por categoria
  - [ ] Cores diferentes por categoria

- [ ] **Prioridades**
  - [ ] Adicionar campo `priority` (baixa, média, alta)
  - [ ] Ordenar tasks por prioridade
  - [ ] Indicadores visuais de prioridade

- [ ] **Gamificação**
  - [ ] Sistema de conquistas/badges
  - [ ] Streak de dias consecutivos
  - [ ] Níveis de usuário baseado em pomodoros
  - [ ] Recompensas visuais

- [ ] **Sincronização**
  - [ ] Integração com backend (Firebase, Supabase)
  - [ ] Sincronização entre dispositivos
  - [ ] Sistema de autenticação
  - [ ] Backup automático

- [ ] **Exportação de Dados**
  - [ ] Exportar estatísticas em CSV
  - [ ] Exportar tasks em JSON
  - [ ] Relatórios em PDF

---

## 🧪 Testes

- [ ] Configurar ambiente de testes (Jest + Testing Library)
- [ ] Testes unitários para hooks:
  - [ ] `useLocalStorage`
  - [ ] `useTasks`
  - [ ] `useSettings` (quando criado)
- [ ] Testes de componentes:
  - [ ] TaskCard
  - [ ] TaskForm
  - [ ] Tasks
- [ ] Testes de integração
- [ ] Testes E2E com Playwright/Cypress (opcional)

---

## 📦 Build e Deploy

- [ ] Otimizar build de produção
- [ ] Configurar PWA (Progressive Web App)
  - [ ] Service Worker
  - [ ] Manifest.json
  - [ ] Ícones e splash screens
  - [ ] Funcionar offline
- [ ] Deploy (Vercel, Netlify, ou outro)
- [ ] Configurar CI/CD
- [ ] Adicionar analytics (opcional)

---

## 📚 Documentação

- [ ] Documentar hooks customizados (JSDoc)
- [ ] Documentar componentes principais
- [ ] Criar guia de contribuição (CONTRIBUTING.md)
- [ ] Adicionar screenshots no README
- [ ] Criar changelog (CHANGELOG.md)

---

## 🐛 Bugs Conhecidos

- [ ] Nenhum identificado até o momento

---

## ✅ Concluído

### Sprint 1 - Setup e CRUD ✅
- [x] Estrutura base do projeto (Vite + React + TypeScript)
- [x] Sistema de roteamento (React Router)
- [x] Layout básico (Navbar + Footer)
- [x] Componentes de Tasks (TaskCard, TaskForm, TaskEditForm, Tasks)
- [x] CRUD completo de tarefas
- [x] Persistência automática em localStorage
- [x] Barra de progresso de pomodoros (limitada a 100%)
- [x] Interface Task em models/
- [x] README.md e TODO.md com documentação

### Sprint 2 - Hooks Customizados ✅
- [x] Hook customizado `useLocalStorage`
- [x] Hook customizado `useTasks`
- [x] Refatoração: separação lógica/UI
- [x] Otimizações no TaskCard

### Sprint 3 - Navegação para Pomodoro ✅
- [x] Página Pomodoro.tsx
- [x] Rota `/pomodoro/:taskId`
- [x] TaskCard clicável com Link
- [x] Captura de parâmetro via useParams
- [x] Prevenção de propagação de eventos
- [x] Busca da task por ID
- [x] Botão voltar e tratamento de erros

---

## 📅 Roadmap Sugerido

### Sprint 1 (Atual)
1. ✅ Setup e estrutura bás (useLocalStorage + useTasks)
4. ✅ Implementar edição de tarefas
5. ✅ Navegação para página Pomodoro
6. ⏳ Implementar timer funcional no Pomodoro
7. ⏳ Começar migraçãoração com hooks
4. ⏳ Implementar edição de tarefas
5. ⏳ Migrar para CSS Modules (TaskCard primeiro)

### Sprint 2
1. Criar página do Pomodoro
2. Implementar timer funcional
3. Conectar tasks com pomodoro
4. Adicionar notificações

### Sprint 3
1. Página de Configurações
2. Sistema de temas
3. Persistência de configurações

### Sprint 4
1. Página de Estatísticas
2. Histórico de sessões
3. Visualizações e métricas

### Sprint 5
1. Melhorias de UI/UX
2. Animações e transições
3. Responsividade

### Sprint 6
1. Features avançadas (categorias, prioridades)
2. Gamificação (opcional)
3. PWA e deploy

---

**Última atualização:** 31 de dezembro de 2025  
**Status do projeto:** 🟢 Em desenvolvimento ativo  
**Sprint atual:** Sprint 4 - Implementação do Timer Pomodoro
