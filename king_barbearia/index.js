const express = require('express');
const bodyParser = require('body-parser');
const sqlite3 = require('sqlite3').verbose();

const app = express();
const port = process.env.PORT || 3000;

// Serve os arquivos estáticos (HTML, CSS, JS) da pasta "public"
app.use(express.static('public'));

// Configura o body-parser para ler JSON
app.use(bodyParser.json());

// Conectando ao banco de dados SQLite
const db = new sqlite3.Database('barbearia.db');

// Criar as tabelas se não existirem
db.serialize(() => {
    // Criar a tabela clientes
    db.run(`
        CREATE TABLE IF NOT EXISTS clientes (
            nome TEXT NOT NULL,
            cpf TEXT PRIMARY KEY UNIQUE,
            telefone TEXT ,
            email TEXT NOT NULL,
            sexo VARCHAR(1) NOT NULL
        )
    `, (err) => {
        if (err) {
            console.error('Erro ao criar tabela clientes:', err);
        } else {
            console.log('Tabela clientes criada com sucesso (ou já existe).');
        }
    });

    // Criar a tabela servico
    db.run(`
        CREATE TABLE IF NOT EXISTS servico (
            id_servico INTEGER PRIMARY KEY AUTOINCREMENT,
            nome_servico TEXT NOT NULL,
            valor_servico TEXT NOT NULL
        )
    `, (err) => {
        if (err) {
            console.error('Erro ao criar tabela servico:', err);
        } else {
            console.log('Tabela servico criada com sucesso (ou já existe).');
        }
    });

    // Criar a tabela profissionais
    db.run(`
        CREATE TABLE IF NOT EXISTS profissionais (
            nome TEXT NOT NULL,
            cpf TEXT PRIMARY KEY UNIQUE,
            telefone TEXT NOT NULL,
            data_nascimento TEXT NOT NULL,
            endereco TEXT NOT NULL,
            rg TEXT NOT NULL,
            email TEXT NOT NULL
        )
    `, (err) => {
        if (err) {
            console.error('Erro ao criar tabela profissionais:', err);
        } else {
            console.log('Tabela profissionais criada com sucesso (ou já existe).');
        }
    });

    // Criar a tabela fornecedores
    db.run(`
        CREATE TABLE IF NOT EXISTS fornecedores (
            nome TEXT NOT NULL,
            cnpj TEXT PRIMARY KEY UNIQUE,
            telefone TEXT NOT NULL,
            email TEXT NOT NULL,
            endereco TEXT NOT NULL
        )
    `, (err) => {
        if (err) {
            console.error('Erro ao criar tabela fornecedores:', err);
        } else {
            console.log('Tabela fornecedores criada com sucesso (ou já existe).');
        }
    });
});

// Rota para cadastrar um cliente
app.post('/cadastrar-cliente', (req, res) => {
    const { nome, cpf, fone, email, sexo } = req.body;
    db.run("INSERT INTO clientes (nome, cpf, telefone, email, sexo) VALUES (?, ?, ?, ?, ?)", [nome, cpf, fone, email, sexo], function(err) {
        if (err) {
            console.error('Erro ao cadastrar cliente:', err);
            res.status(500).send('Erro ao cadastrar cliente');
        } else {
            res.send('Cliente cadastrado com sucesso!');
        }
    });
});

// Rota para cadastrar um serviço
app.post('/cadastrar-servico', (req, res) => {
    const { servico, serv_valor } = req.body;
    db.run("INSERT INTO servico (nome_servico, valor_servico) VALUES (?, ?)", [servico, serv_valor], function(err) {
        if (err) {
            console.error('Erro ao cadastrar serviço:', err);
            res.status(500).send('Erro ao cadastrar serviço');
        } else {
            res.send('Serviço cadastrado com sucesso!');
        }
    });
});

// Rota para cadastrar um profissional
app.post('/cadastrar-profissional', (req, res) => {
    const { nome_prof, cpf_prof, fone_prof, date_prof, end_prof, rg_prof, email_prof} = req.body;
    db.run("INSERT INTO profissionais (nome, cpf, telefone, data_nascimento, endereco, rg, email) VALUES (?, ?, ?, ?, ?, ?, ?)", 
        [nome_prof, cpf_prof, fone_prof, date_prof, end_prof, rg_prof, email_prof], function(err) {
        if (err) {
            console.error('Erro ao cadastrar profissional:', err);
            res.status(500).send('Erro ao cadastrar profissional');
        } else {
            res.send('Profissional cadastrado com sucesso!');
        }
    });
});

// Rota para cadastrar um fornecedor
app.post('/cadastrar-fornecedor', (req, res) => {
    const { forne, forne_email, forne_fone, cnpj, forne_end } = req.body;
    db.run("INSERT INTO fornecedores (nome, cnpj, telefone, email, endereco) VALUES (?, ?, ?, ?, ?)", 
        [forne, forne_email, forne_fone, cnpj, forne_end], function(err) {
        if (err) {
            console.error('Erro ao cadastrar fornecedor:', err);
            res.status(500).send('Erro ao cadastrar fornecedor');
        } else {
            res.send('Fornecedor cadastrado com sucesso!');
        }
    });
});

