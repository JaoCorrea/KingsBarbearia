const express = require("express");
const bodyParser = require("body-parser");
const sqlite3 = require("sqlite3").verbose();

const app = express();
const port = process.env.PORT || 3000;

// Serve os arquivos estáticos da pasta "public"
app.use(express.static("public"));

// Configura o body-parser para ler JSON
app.use(bodyParser.json());

// ************************************
// ************************************
// *****   BANDO DE DADOS     *********
// ************************************
// ************************************

// Conectando ao banco de dados SQLite
const db = new sqlite3.Database("agendamento.db");

// Criar as tabelas se não existirem
db.serialize(() => {
    // Tabela Cliente
    db.run(
        `
        CREATE TABLE IF NOT EXISTS Cliente (
            id integer PRIMARY key autoincrement, 
            nome TEXT NOT NULL,
            cpf TEXT UNIQUE NOT NULL,
            telefone TEXT,
            email TEXT NOT NULL
        )
    `,
        (err) => {
            if (err) {
                console.error("Erro ao criar tabela Cliente:", err);
            } else {
                console.log(
                    "Tabela Cliente criada com sucesso (ou já existe).",
                );
            }
        },
    );
    //consulta serviço
    db.run(
        `
        CREATE TABLE IF NOT EXISTS Servico (
            id integer PRIMARY key autoincrement, 
            nome TEXT NOT NULL,
            valor TEXT  NOT NULL

        )
    `,
        (err) => {
            if (err) {
                console.error("Erro ao criar tabela servico:", err);
            } else {
                console.log(
                    "Tabela servico criada com sucesso (ou já existe).",
                );
            }
        },
    );

    //consulta profissional
    db.run(
        `
        CREATE TABLE IF NOT EXISTS profissional (
            id INTEGER PRIMARY KEY AUTOINCREMENT,
            nome TEXT NOT NULL,
            cpf TEXT UNIQUE,
            telefone TEXT NOT NULL,
            data_nascimento TEXT NOT NULL,
            endereco TEXT NOT NULL,
            email TEXT NOT NULL
        )
    `,
        (err) => {
            if (err) {
                console.error("Erro ao criar tabela profissional:", err);
            } else {
                console.log(
                    "Tabela servico criada com sucesso (ou já existe).",
                );
            }
        },
    );

    // Tabela Profissional
    db.run(
        `
        CREATE TABLE IF NOT EXISTS Profissional (
            id INTEGER PRIMARY KEY AUTOINCREMENT,
            nome TEXT NOT NULL,
            cpf TEXT UNIQUE,
            telefone TEXT NOT NULL,
            data_nascimento TEXT NOT NULL,
            endereco TEXT NOT NULL,
            email TEXT NOT NULL
        )
    `,
        (err) => {
            if (err) {
                console.error("Erro ao criar tabela Profissional:", err);
            } else {
                console.log(
                    "Tabela Profissional criada com sucesso (ou já existe).",
                );
            }
        },
    );

    // Tabela Agenda
    db.run(
        `
        CREATE TABLE IF NOT EXISTS Agenda (
            id INTEGER PRIMARY KEY AUTOINCREMENT,
            data TEXT NOT NULL,
            horario TEXT NOT NULL,
            sala TEXT NOT NULL,
            cpf_cliente TEXT NOT NULL,
            cpf_profissional TEXT NOT NULL,
            FOREIGN KEY(cpf_cliente) REFERENCES Cliente(cpf),
            FOREIGN KEY(cpf_profissional) REFERENCES Profissional(cpf)
        )
    `,
        (err) => {
            if (err) {
                console.error("Erro ao criar tabela Agenda:", err);
            } else {
                console.log("Tabela Agenda criada com sucesso (ou já existe).");
            }
        },
    );
});

// ************************************
// ************************************
// *****        CLIENTES      *********
// ************************************
// ************************************

// Rota para cadastrar um cliente
app.post("/cadastrar-cliente", (req, res) => {
    const { nome, cpf, telefone, email } = req.body;
    db.run(
        "INSERT INTO Cliente ( nome, cpf, telefone, email) VALUES (?, ?, ?, ?)",
        [nome, cpf, telefone, email],
        function (err) {
            if (err) {
                console.error("Erro ao cadastrar cliente:", err);
                res.status(500).send("Erro ao cadastrar cliente");
            } else {
                res.send("Cliente cadastrado com sucesso!");
            }
        },
    );
});

// Rota para consultar clientes
app.get("/consultar-clientes", (req, res) => {
    const { nome, cpf, telefone } = req.query;

    let sql = `
        SELECT 
            Cliente.id,
            Cliente.nome, 
            Cliente.cpf, 
            Cliente.telefone,
            Cliente.email,
            Cliente.sexo,
            Cliente.nome AS nome
        FROM 
            Cliente
        JOIN 
            Cliente ON Cliente.nome= Cliente.nome`;
    const params = [];

    if (nome) {
        sql += " AND Cliente.nome = ?";
        params.push(nome);
    }
    if (cpf) {
        sql += " AND Cliente.cpf = ?";
        params.push(cpf);
    }
    if (telefone) {
        sql += " AND Cliente.telefone = ?";
        params.push(telefone);
    }

    db.all(sql, params, (err, rows) => {
        if (err) {
            console.error("Erro ao consultar agendamentos:", err);
            return res.status(500).send("Erro ao consultar agendamentos.");
        }
        res.json(rows);
    });
});

// Rota para cadastrar um servico
app.post("/cadastrar-servico", (req, res) => {
    const { nome, valor } = req.body;
    db.run(
        "INSERT INTO Servico ( nome, valor ) VALUES (?, ?)",
        [nome, valor],
        function (err) {
            if (err) {
                console.error("Erro ao cadastrar servico:", err);
                res.status(500).send("Erro ao cadastrar servico");
            } else {
                res.send("servico cadastrado com sucesso!");
            }
        },
    );
});

// ************************************
// ************************************
// *****      PROFISSIONAL    *********
// ************************************
// ************************************

// Rota para cadastrar um profissional
app.post("/cadastrar-profissional", (req, res) => {
    const {
        nome_prof,
        cpf_prof,
        fone_prof,
        date_prof,
        end_prof,
        email_prof,
    } = req.body;
    db.run(
        "INSERT INTO Profissional (nome_prof, cpf_prof, fone_prof, date_prof, end_prof, email_prof) VALUES (?, ?, ?, ?, ?, ?)",
        [nome_prof, cpf_prof, fone_prof, date_prof, end_prof, email_prof],
        function (err) {
            if (err) {
                console.error("Erro ao cadastrar profissional:", err);
                res.status(500).send("Erro ao cadastrar profissional");
            } else {
                res.send("Profissional cadastrado com sucesso!");
            }
        },
    );
});

// ************************************
// ************************************
// *****      AGENDAMENTO     *********
// ************************************
// ************************************
// Rota para cadastrar um agendamento
app.post("/cadastrar-agendamento", (req, res) => {
    const { servico_desejado, data, hora, profissional, cpf_cliente } =
        req.body;
    db.run(
        "INSERT INTO Agenda ( sala, data, horario, cpf_profissional, cpf_cliente ) VALUES (?, ?, ?, ?, ? )",
        [servico_desejado, data, hora, profissional, cpf_cliente],
        function (err) {
            if (err) {
                console.error("Erro ao cadastrar agenda:", err);
                res.status(500).send("Erro ao cadastrar agenda");
            } else {
                res.send("agenda cadastrada com sucesso!");
            }
        },
    );
});

// ************************************
// ***********************************
// ************************************
// ************************************
// ************************************

// Rota para consultar agendamentos
app.get("/consultar-agendamentos", (req, res) => {
    const { data, cpf_cliente, cpf_profissional } = req.query;

    let sql = `
         SELECT 
            Agenda.id,
            Agenda.data, 
            Agenda.horario, 
            Agenda.sala, 
            Cliente.nome AS nome_cliente, 
            Profissional.nome AS nome_profissional 
        FROM 
            Agenda
        JOIN 
            Cliente ON Agenda.cpf_cliente = Cliente.cpf
        JOIN 
            Profissional ON Agenda.cpf_profissional = Profissional.cpf
        WHERE 1=1`;
    const params = [];

    if (data) {
        sql += " AND Agenda.data = ?";
        params.push(data);
    }
    if (cpf) {
        sql += " AND Agenda.cpf_cliente = ?";
        params.push(cpf);
    }

    db.all(sql, params, (err, rows) => {
        if (err) {
            console.error("Erro ao consultar agendamentos:", err);
            return res.status(500).send("Erro ao consultar agendamentos.");
        }
        res.json(rows);
    });
});


// Teste para verificar se o servidor está rodando
app.get("/", (req, res) => {
    res.send("Servidor está rodando e tabelas criadas!");
});

// Iniciando o servidor
app.listen(port, () => {
    console.log(`Servidor rodando na porta ${port}`);
});
