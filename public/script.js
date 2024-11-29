// ************************************
// ************************************
// *****        CLIENTES      *********
// ************************************
// ************************************


// Função para cadastrar cliente
async function cadastrar() {

    const nome = document.getElementById('nome').value; // pega o valor escrito no input
    const cpf = document.getElementById('cpf').value; // pega o valor escrito no input
    const telefone = document.getElementById('telefone').value; // pega o valor escrito no input
    const email = document.getElementById('email').value; // pega o valor escrito no input

    await fetch('/cadastrar-cliente', {
        method: 'POST',
        headers: {'Content-Type': 'application/json'},
    body: JSON.stringify({ nome, cpf, telefone, email })
    });
    alert('Cliente cadastrado com sucesso!');
}

// Função para cadastrar servico
async function cadastrar_servico() {
    const nome = document.getElementById('nome').value; // pega o valor escrito no input

    const valor = document.getElementById('valor').value; // pega o valor escrito no input

    await fetch('/cadastrar-servico', {
        method: 'POST',
        headers: {'Content-Type': 'application/json'},
    body: JSON.stringify({ nome, valor })
    });
    alert('Servico cadastrado com sucesso!');
}
// ************************************
// ************************************
// *****      PROFISSIONAIS   *********
// ************************************
// ************************************

// Função para cadastrar profissional
async function cadastrar_prof() {
    const nome_prof = document.getElementById('nome_prof').value; // pega o valor escrito no input
    const cpf_prof = document.getElementById('cpf_prof').value; // pega o valor escrito no input
    const fone_prof = document.getElementById('fone_prof').value; // pega o valor escrito no input
    const date_prof = document.getElementById('date_prof').value; // pega o valor escrito no input
    const end_prof = document.getElementById('end_prof').value; // pega o valor escrito no input
    const email_prof = document.getElementById('email_prof').value; // pega o valor escrito no input

    // Envio das informações para o banco de dados
    await fetch('/cadastrar-profissional', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ nome_prof, cpf_prof, fone_prof, date_prof, end_prof, email_prof })
    });

    alert('Profissional cadastrado com sucesso!');

}

// ************************************
// ************************************
// *****      AGENDAMENTO     *********
// ************************************ 
// ************************************    

// Função para cadastrar agendamento
async function cadastrar_agendamento() {
    alert('oi');
    const servico_desejado = document.getElementById('servico_desejado').value; // pega o valor escrito no input
    const data = document.getElementById('data').value; // pega o valor escrito no input
    const hora = document.getElementById('hora').value; // pega o valor escrito no input
    const profissional = document.getElementById('profissional').value; // pega o valor escrito no input
    const cpf_cliente = document.getElementById('cpf').value;


    // Envio das informações para o banco de dados
    await fetch('/cadastrar-agendamento', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ servico_desejado, data, hora, profissional, cpf_cliente })
    });

    alert('agendamento cadastrado com sucesso!');
}


// Função para consultar agendamentos
function consultarAgendamentos(event) {
    event.preventDefault();
    
    const cpf_cliente = document.getElementById("cpf").value;
    const data = document.getElementById("data").value;
    const hora = document.getElementById('hora').value; // pega o valor escrito no input
    const tabelaAgendamentos = document.getElementById("tabelaAgendamentos").querySelector("tbody");
    tabelaAgendamentos.innerHTML = "";

    const params = new URLSearchParams({
        cpf_cliente: cpf,
        data: data,
        hora: hora,
    });

    fetch(`/consultar-agendamentos?${params}`)
        .then(response => {
            if (!response.ok) {
                throw new Error('Erro na consulta');
            }
            return response.json();
        })
        .then(agendamentos => {
            agendamentos.forEach(agendamento => {
                const row = tabelaAgendamentos.insertRow();
                row.insertCell(0).innerText = agendamento.id;
                row.insertCell(1).innerText = agendamento.data;
                row.insertCell(2).innerText = agendamento.horario;
                row.insertCell(3).innerText = agendamento.sala;
                row.insertCell(4).innerText = agendamento.nome_cliente;
                row.insertCell(5).innerText = agendamento.nome_profissional;


                const actionsCell = row.insertCell(6);
                actionsCell.innerHTML = `
                    <button onclick="excluirAgendamento('${agendamento.id}')">Excluir</button>
                    <button onclick="carregarAgendamentoParaEdicao('${agendamento.id}')">Editar</button>
                `;
            });

            if (agendamentos.length === 0) {
                const row = tabelaAgendamentos.insertRow();
                row.insertCell(0).colSpan = 5;
                row.cells[0].innerText = "Nenhum agendamento encontrado.";
            }
        })
        .catch(error => {
            console.error('Erro:', error);
            const row = tabelaAgendamentos.insertRow();
            row.insertCell(0).colSpan = 5;
            row.cells[0].innerText = "Erro ao consultar agendamentos.";
        });
}

