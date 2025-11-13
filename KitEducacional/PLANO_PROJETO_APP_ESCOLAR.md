# Plano de Projeto - Sistema de Ferramentas Escolar Unificado

## 📋 Visão Geral

Sistema integrado de ferramentas escolares com base de dados unificada para gerenciar alunos, candidatos, eletivas e votações escolares.

---

## 🎯 Objetivos Principais

1. **Centralizar dados** - Uma base de dados única para todas as ferramentas
2. **Integração entre módulos** - Dados compartilhados e relacionados
3. **Usabilidade** - Interface intuitiva para uso escolar
4. **Escalabilidade** - Permitir futuras expansões e ferramentas

---

## 🔧 Módulos/Ferramentas Principais

### 1. **Cadastro de Alunos**
- Gerenciar dados básicos dos alunos
- Adicionar, editar, deletar e visualizar registros
- Armazenar: matrícula, nome, série/turma, data de nascimento, contato, etc.

### 2. **Cadastro de Candidatos**
- Relacionado com alunos (1 aluno pode ser múltiplos candidatos)
- Candidatos para diferentes posições/eventos
- Vinculação automática com dados do aluno

### 3. **Cadastro de Eletivas**
- Criar e gerenciar disciplinas/eletivas
- Inscrição de alunos em eletivas
- Controle de vagas e turmas
- Visualizar alunos inscritos por eletiva

### 4. **Eleição de Presidente de Sala**
- Sistema de votação por turma
- Candidatos pré-registrados
- Votação segura e confidencial
- Apuração e resultado de votos

### 5. **Ferramentas Futuras**
- Notas e frequência
- Boletim escolar
- Agenda de eventos
- Chat ou comunicados
- Relatórios gerenciais

---

## 💾 Arquitetura de Banco de Dados

### Tabelas Principais

```
ALUNOS
├── id (PK)
├── matricula (UNIQUE)
├── nome
├── serie_turma
├── data_nascimento
├── email
├── telefone
├── data_cadastro
└── ativo (bool)

CANDIDATOS
├── id (PK)
├── aluno_id (FK → ALUNOS)
├── tipo_candidatura (ex: presidente, vice)
├── turma/serie
├── data_inscricao
└── descricao_plataforma

ELETIVAS
├── id (PK)
├── nome
├── professor_responsavel
├── vagas_total
├── vagas_preenchidas
├── horario
├── descricao
└── ativo (bool)

INSCRICOES_ELETIVAS
├── id (PK)
├── aluno_id (FK → ALUNOS)
├── eletiva_id (FK → ELETIVAS)
├── data_inscricao
└── status (ativo/cancelado)

VOTOS
├── id (PK)
├── turma
├── candidato_id (FK → CANDIDATOS)
├── data_voto (timestamp)
├── sessao_votacao (FK → SESSOES_VOTACAO)
└── hash_votante (anonimato)

SESSOES_VOTACAO
├── id (PK)
├── turma
├── tipo_eleicao (ex: presidente)
├── data_inicio
├── data_fim
├── status (planejada/aberta/finalizada)
└── resultado_apurado (bool)
```

---

## 🛠️ Stack Tecnológico (Proposto)

### Frontend
- **React** ou **Vue.js** (interface responsiva)
- **TypeScript** (tipagem estática)
- **Tailwind CSS** ou **Material-UI** (design)

### Backend
- **Node.js + Express** ou **Python + Django/FastAPI**
- **RESTful API** ou **GraphQL**
- **JWT** para autenticação

### Banco de Dados
- **PostgreSQL** (relacional, robusto)
- **MySQL** (alternativa)
- **SQLite** (desenvolvimento local)

### DevOps/Deploy
- **Docker** (containerização)
- **GitHub Actions** (CI/CD)

---

## 📊 Relacionamentos Principais

```
ALUNOS (1) ──→ (N) CANDIDATOS
ALUNOS (1) ──→ (N) INSCRICOES_ELETIVAS
ELETIVAS (1) ──→ (N) INSCRICOES_ELETIVAS
CANDIDATOS (1) ──→ (N) VOTOS
SESSOES_VOTACAO (1) ──→ (N) VOTOS
```

---

## 🔐 Considerações de Segurança

- Autenticação por usuário/senha ou SSO escolar
- Controle de acesso por perfil (admin, professor, aluno)
- Logs de auditoria para alterações sensíveis
- Votação anônima (hash do votante)
- Proteção de dados pessoais (LGPD)

---

## 📱 Fluxos de Usuário Principais

### Aluno
1. Login → Visualizar perfil → Inscrever em eletivas → Votar para presidente

### Professor/Coordenador
1. Login → Gerenciar candidatos → Criar sessão de votação → Apurar resultado

### Admin
1. Login → CRUD Alunos → CRUD Eletivas → Gerenciar usuários

---

## 🚀 Fases de Desenvolvimento

### Fase 1 (MVP)
- [ ] Banco de dados estruturado
- [ ] Cadastro de Alunos (CRUD)
- [ ] Interface básica (tela principal)

### Fase 2
- [ ] Módulo de Candidatos
- [ ] Módulo de Eletivas
- [ ] Autenticação básica

### Fase 3
- [ ] Sistema de Votação
- [ ] Apuração de resultados
- [ ] Relatórios

### Fase 4+
- [ ] Melhorias de UI/UX
- [ ] Novas ferramentas
- [ ] Otimizações

---

## 📝 Próximos Passos

1. **Validar requisitos** - Confirmar funcionalidades com stakeholders
2. **Refinar modelo de dados** - Ajustar esquema conforme feedback
3. **Escolher stack** - Definir tecnologias definitivas
4. **Setup inicial** - Criar repositório e estrutura base
5. **Prototipagem** - Criar mockups das interfaces principais

---

## 📌 Notas Importantes

- Manter simplicidade e foco nas funcionalidades essenciais
- Documentar APIs e estrutura do banco desde o início
- Pensar em escalabilidade para múltiplas escolas (futura)
- Considerar mobile-first para acessibilidade dos alunos

---

**Data de criação:** 13 de novembro de 2025  
**Status:** Planejamento
