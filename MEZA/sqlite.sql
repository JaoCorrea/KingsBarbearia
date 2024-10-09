CREATE TABLE cliente (
   nome TEXT NOT NULL,
   cpf TEXT PRIMARY KEY,
   telefone TEXT NOT NULL
);
CREATE TABLE funcionario (
   id_funcionario INTEGER PRIMARY KEY AUTOINCREMENT,
   nome TEXT NOT NULL,
   cpf_funcionario TEXT NOT NULL,
   rg TEXT NOT NULL,
   telefone TEXT NOT NULL,
   email TEXT NOT NULL,
   data_nascimento TEXT NOT NULL,
   endereco TEXT NOT NULL
);
CREATE TABLE servico(
  	id_servico INTEGER PRIMARY KEY AUTOINCREMENT,
	nome TEXT NOT NULL,
  	VALOR TEXT NOT NULL
);
CREATE TABLE fornecedores (
    id_fornecedor INTEGER PRIMARY KEY AUTOINCREMENT,
    nome TEXT NOT NULL,
    email TEXT NOT NULL,
    telefone TEXT NOT NULL,
    cnpj TEXT NOT NULL UNIQUE,
    endereco TEXT NOT NULL
);