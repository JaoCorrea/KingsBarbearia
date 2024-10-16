function cadastrar(){
    const nome = document.getElementById('nome').value; //pega o valor escrito no input
    document.getElementById("nome_h").innerText = nome; //escreve no html

    const cpf = document.getElementById('cpf').value; //pega o valor escrito no input
    document.getElementById("cpf_h").innerText = cpf; //escreve no html

    const fone = document.getElementById('fone').value; //pega o valor escrito no input
    document.getElementById("fone_h").innerText = fone; //escreve no html

    const email = document.getElementById('email').value; //pega o valor escrito no input

    const sexo = document.getElementById('sexo').value; //pega o valor escrito no input


}
function agendar(){
    const servico = document.getElementById('servico').value; //pega o valor escrito no input
    document.getElementById("servico_h").innerText = servico; //escreve no html
 
    const date = document.getElementById('date').value; //pega o valor escrito no input
    document.getElementById("date_h").innerText = date; //escreve no html

    const hora = document.getElementById('hora').value; //pega o valor escrito no input
    document.getElementById("hora_h").innerText = hora; //escreve no html

    const prof = document.getElementById('prof').value; //pega o valor escrito no input
    document.getElementById("prof_h").innerText = prof; //escreve no html

}

// profissionais
function cadastrar_prof(){
    const nome_prof = document.getElementById('nome_prof').value; //pega o valor escrito no input

    const cpf_prof = document.getElementById('cpf_prof').value; //pega o valor escrito no input

    const fone_prof = document.getElementById('fone_prof').value; //pega o valor escrito no input

    const date_prof = document.getElementById('date_prof').value; //pega o valor escrito no input

    const end_prof = document.getElementById('end_prof').value; //pega o valor escrito no input

    const rg_prof = document.getElementById('rg_prof').value; //pega o valor escrito no input

    const email_prof = document.getElementById('email_prof').value; //pega o valor escrito no input

}
// serviço
function servico(){
    const servico = document.getElementById('servico').value; //pega o valor escrito no input

    const serv_valor = document.getElementById('serv_valor').value; //pega o valor escrito no input
}


// Fornecedor

function fornecedor(){
    const forne = document.getElementById('forne').value; //pega o valor escrito no input

    const forne_email = document.getElementById('forne_email').value; //pega o valor escrito no input

    const forne_fone = document.getElementById('forne_fone').value; //pega o valor escrito no input

    const cnpj = document.getElementById('cnpj').value; //pega o valor escrito no input

    const forne_end = document.getElementById('forne_end').value; //pega o valor escrito no input
}
