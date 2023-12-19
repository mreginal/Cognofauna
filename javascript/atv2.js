document.addEventListener('DOMContentLoaded', function () {
    iniciarAtividade();

});

async function iniciarAtividade() {
    try {
        const dadosDoUsuario = await resgatarDadosAluno();
        if (!dadosDoUsuario) {
            console.error('Falha ao obter dados do usuário.');
            return;
        }

        const nomedoUsario = dadosDoUsuario.nomeDoUsuario;
        const idDoUsuario = dadosDoUsuario.idDoUsuario;

        const coresCorreta = "Verde,Vermelho";
        let cor1 = "";
        let cor2 = "";
        let coresSelecionadas = "";
        let contadorDeCliques = 0;
        const inicioAtividade = new Date();

        const botoesCores = document.querySelectorAll('.opcao-alt');
        console.log(botoesCores);

        botoesCores.forEach(botaoCor => {
            botaoCor.addEventListener('click', () => {
                contadorDeCliques++;

                const diferencaTempoSegundos = calcularDiferencaTempo(inicioAtividade);

                if (contadorDeCliques === 1) {
                    cor1 = botaoCor.id;
                    console.log(cor1);
                }

                if (contadorDeCliques === 2) {
                    cor2 = botaoCor.id;
                    console.log(cor2);
                    coresSelecionadas = `${cor1},${cor2}`;
                    const acerto = coresSelecionadas.toLowerCase() === coresCorreta.toLowerCase();
                    enviarDadosParaServidor(idDoUsuario, nomedoUsario, coresSelecionadas, acerto, diferencaTempoSegundos);
                    contadorDeCliques = 0;
                }

            });
        });

    } catch (error) {
        console.error('Erro ao iniciar atividade:', error);
    }
}

function calcularDiferencaTempo(inicioAtividade) {
    const agora = new Date();
    const diferencaTempoMilissegundos = agora - inicioAtividade;
    return Math.floor(diferencaTempoMilissegundos / 1000);
}

function enviarDadosParaServidor(idDoUsuario, nomeDoUsario, coresSelecionadas, acerto, diferencaTempoSegundos) {
    try {
        const corpoRequisicao = {
            idaluno: idDoUsuario,
            nomealuno: nomeDoUsario,
            item: 'CI002',
            descricao: 'Pinte o pato de verde e a baleia de vermelho',
            resposta: coresSelecionadas,
            acerto: acerto,
            tempo: diferencaTempoSegundos,
        };

        fetch('https://fauna-api.onrender.com/resposta', {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json',
            },
            body: JSON.stringify(corpoRequisicao),
        })
            .then((response) => {
                if (!response.ok) {
                    throw new Error(`Erro de rede: ${response.status} - ${response.statusText}`);
                }
                return response.json();
            })
            .then((data) => {
                console.log('Resposta do servidor:', data);
                redirecionarUsuario()
            })
            .catch((error) => {
                console.error('Erro ao enviar dados para o servidor:', error);

                if (error instanceof TypeError && error.message.includes('NetworkError')) {
                    console.error('Erro de rede: Não foi possível conectar ao servidor.');
                } else if (error instanceof SyntaxError) {
                    console.error('Erro de análise de JSON: A resposta do servidor não pôde ser analisada como JSON.');
                } else if (error instanceof Error && error.message.includes('500')) {
                    console.error('Erro interno do servidor (HTTP 500): O servidor encontrou um erro ao processar a solicitação.');
                } else {
                    console.error('Erro desconhecido:', error);
                }

            });
    } catch (error) {
        console.error('Erro ao enviar dados para o servidor:', error);
    }
}

async function resgatarDadosAluno() {
    try {
        const nomeDoUsuario = localStorage.getItem('nomeDoUsuarioClicado')
        const idDoUsuario = localStorage.getItem('idDoUsuarioClicado')

        return { nomeDoUsuario, idDoUsuario };
    } catch (error) {
        console.error('Erro ao resgatar dados do aluno:', error);
        throw error;
    }
}

function redirecionarUsuario() {
    const proximoCapitulo = localStorage.getItem('proximoCapitulo');
    if (proximoCapitulo == "false") {
        window.location.href = '../views/main.html'
    }
    else {
        window.location.href = '../views/jogo3-1.html'
    }
}


