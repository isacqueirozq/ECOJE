{
  "name": "Inscricao",
  "type": "object",
  "properties": {
    "nome_aluno": {
      "type": "string",
      "description": "Nome completo do aluno"
    },
    "turma": {
      "type": "string",
      "enum": [
        "6º ano",
        "7º ano",
        "8º ano",
        "9º ano"
      ],
      "description": "Turma do aluno"
    },
    "eletiva_id": {
      "type": "string",
      "description": "ID da eletiva escolhida"
    },
    "eletiva_nome": {
      "type": "string",
      "description": "Nome da eletiva (para facilitar consultas)"
    }
  },
  "required": [
    "nome_aluno",
    "turma",
    "eletiva_id"
  ]
}