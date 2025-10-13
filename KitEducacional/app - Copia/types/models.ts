export type Professor = {
  nome: string;
  cpf: string;
  email: string;
  telefone?: string;
  area: string;
};

export type Aluno = {
  nome: string;
  dataNasc: string;
  matricula: string;
  email?: string;
  responsavel: string;
  telefoneResp: string;
};

export type Eletiva = {
  nomeEletiva: string;
  descricao?: string;
  professor: string;
  cargaHoraria: string;
  vagas: string;
  periodo: string;
};

export type Candidato = {
  nome: string;
  cpf: string;
  email: string;
  telefone: string;
  cargo: string;
  formacao: string;
};

export type Turma = {
  nomeTurma: string;
  serie: string;
  turno: string;
  capacidade: string;
  orientador?: string;
  sala?: string;
};
