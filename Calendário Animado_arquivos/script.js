document.addEventListener('DOMContentLoaded', function() {
    const hoje = new Date();
    let mesSelecionado = hoje.getMonth() + 1;
    let anoSelecionado = hoje.getFullYear();

    const diasContainer = document.getElementById('dias-container');

    // Função para gerar os dias do calendário
    function gerarDias(mes, ano) {
        const primeiroDia = new Date(ano, mes - 1, 1);
        const ultimoDia = new Date(ano, mes, 0);
        const primeiroDiaSemana = primeiroDia.getDay();
        const totalDias = ultimoDia.getDate();

        // Limpar dias anteriores, se houver
        diasContainer.innerHTML = '';

        // Adicionar dias do mês
        for (let i = 0; i < primeiroDiaSemana; i++) {
            const diaVazio = document.createElement('div');
            diasContainer.appendChild(diaVazio);
        }

        for (let dia = 1; dia <= totalDias; dia++) {
            const diaElement = document.createElement('div');
            diaElement.textContent = dia;
            diasContainer.appendChild(diaElement);
        }
    }

    // Função para atualizar o calendário quando mudar o mês
    function atualizarCalendario() {
        gerarDias(mesSelecionado, anoSelecionado);
    }

    // Inicializar o calendário
    atualizarCalendario();

    // Botões de navegação para mês anterior e próximo
    const btnAnterior = document.querySelector('.btn-anterior');
    const btnProximo = document.querySelector('.btn-proximo');

    btnAnterior.addEventListener('click', () => {
        if (mesSelecionado === 1) {
            mesSelecionado = 12;
            anoSelecionado--;
        } else {
            mesSelecionado--;
        }
        atualizarCalendario();
    });

    btnProximo.addEventListener('click', () => {
        if (mesSelecionado === 12) {
            mesSelecionado = 1;
            anoSelecionado++;
        } else {
            mesSelecionado++;
        }
        atualizarCalendario();
    });

    // Selecionar mês pelo dropdown
    const selectMes = document.getElementById('mes');
    selectMes.addEventListener('change', () => {
        mesSelecionado = parseInt(selectMes.value);
        atualizarCalendario();
    });
});
