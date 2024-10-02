function cadastrar(){
    const nome = document.getElementById('nome').value; //pega o valor escrito no input
    document.getElementById("nome_h").innerText = nome; //escreve no html

    const cpf = document.getElementById('cpf').value; //pega o valor escrito no input
    document.getElementById("cpf_h").innerText = cpf; //escreve no html

    const fone = document.getElementById('fone').value; //pega o valor escrito no input
    document.getElementById("fone_h").innerText = fone; //escreve no html

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