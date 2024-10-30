// Função para cadastrar cliente
async function cadastrar() {
    const nome = document.getElementById('nome').value; // pega o valor escrito no input

    const cpf = document.getElementById('cpf').value; // pega o valor escrito no input

    const fone = document.getElementById('fone').value; // pega o valor escrito no input

    const email = document.getElementById('email').value; // pega o valor escrito no input
    const sexo = document.getElementById('sexo').value; // pega o valor escrito no input

    // Envio das informações para o banco de dados
    await fetch('/cadastrar-cliente', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ nome, cpf, fone, email, sexo })
    });

    alert('Cliente cadastrado com sucesso!');
}

// Função para agendar serviço
async function agendar() {
    const servico = document.getElementById('servico').value; // pega o valor escrito no input
    document.getElementById("servico_h").innerText = servico; // escreve no html

    const date = document.getElementById('date').value; // pega o valor escrito no input
    document.getElementById("date_h").innerText = date; // escreve no html

    const hora = document.getElementById('hora').value; // pega o valor escrito no input
    document.getElementById("hora_h").innerText = hora; // escreve no html

    const prof = document.getElementById('prof').value; // pega o valor escrito no input
    document.getElementById("prof_h").innerText = prof; // escreve no html

    // Envio das informações para o banco de dados
    await fetch('/agendar-servico', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ servico, date, hora, prof })
    });

    alert('Agendamento realizado com sucesso!');
}

// Função para cadastrar profissional
async function cadastrar_prof() {
    const nome_prof = document.getElementById('nome_prof').value; // pega o valor escrito no input
    const cpf_prof = document.getElementById('cpf_prof').value; // pega o valor escrito no input
    const fone_prof = document.getElementById('fone_prof').value; // pega o valor escrito no input
    const date_prof = document.getElementById('date_prof').value; // pega o valor escrito no input
    const end_prof = document.getElementById('end_prof').value; // pega o valor escrito no input
    const rg_prof = document.getElementById('rg_prof').value; // pega o valor escrito no input
    const email_prof = document.getElementById('email_prof').value; // pega o valor escrito no input

    // Envio das informações para o banco de dados
    await fetch('/cadastrar-profissional', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ nome_prof, cpf_prof, fone_prof, date_prof, end_prof, rg_prof, email_prof })
    });

    alert('Profissional cadastrado com sucesso!');
}

// Função para cadastrar serviço
async function servico() {
    const servico = document.getElementById('servico').value; // pega o valor escrito no input
    const serv_valor = document.getElementById('serv_valor').value; // pega o valor escrito no input

    // Envio das informações para o banco de dados
    await fetch('/cadastrar-servico', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ servico, serv_valor })
    });

    alert('Serviço cadastrado com sucesso!');
}
async function consultarServico() {
    const nome_serv = document.getElementById('consultarServ').value;
    const queryParams = new URLSearchParams();

    if (nome_serv) queryParams.append('nome_serv', nome_serv);

    const response = await fetch(`/consultar-servico?${queryParams.toString()}`);

    if (!response.ok) {
        console.error('Erro ao consultar serviços:', response.statusText);
        return;
    }

    const servicos = await response.json();
    console.log('Serviços retornados:', servicos);

    const tabelaResultados = document.getElementById('serv_linha_1');
    const tbody = tabelaResultados.querySelector('tbody');
    tbody.innerHTML = ''; // Limpa a tabela antes de adicionar resultados

    if (servicos.length > 0) {
        servicos.forEach(serv => {
            const row = document.createElement('tr');
            row.innerHTML = `
                <td>${serv.nome_servico}</td>
                <td>${serv.valor_servico}</td>
            `;
            tbody.appendChild(row);
        });
    } else {
        alert('Nenhum serviço encontrado com os critérios informados.');
    }
}


// Função para cadastrar fornecedor
async function fornecedor() {
    const forne = document.getElementById('forne').value; // pega o valor escrito no input
    const forne_email = document.getElementById('forne_email').value; // pega o valor escrito no input
    const forne_fone = document.getElementById('forne_fone').value; // pega o valor escrito no input
    const cnpj = document.getElementById('cnpj').value; // pega o valor escrito no input
    const forne_end = document.getElementById('forne_end').value; // pega o valor escrito no input

    // Envio das informações para o banco de dados
    await fetch('/cadastrar-fornecedor', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ forne, forne_email, forne_fone, cnpj, forne_end })
    });

    alert('Fornecedor cadastrado com sucesso!');
}
