{
  "name": "Eletiva",
  "type": "object",
  "properties": {
    "nome": {
      "type": "string",
      "description": "Nome da eletiva"
    },
    "descricao": {
      "type": "string",
      "description": "Descrição da eletiva"
    },
    "imagem_url": {
      "type": "string",
      "description": "URL da imagem da eletiva"
    },
    "vagas": {
      "type": "number",
      "description": "Número de vagas disponíveis",
      "default": 30
    },
    "ativa": {
      "type": "boolean",
      "description": "Se a eletiva está ativa para inscrição",
      "default": true
    }
  },
  "required": [
    "nome",
    "descricao"
  ]
}