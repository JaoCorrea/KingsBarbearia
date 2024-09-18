function cadastro_cliente(){
    const no_cl = document.getElementById('nome').value
    const e_mail = document.getElementById('email').value
    const tel_fone = document.getElementById('telefone').value
    const cp_f = document.getElementById('CPF').value

    document.getElementById(cliente_cadastro).innerText=no_cl
}