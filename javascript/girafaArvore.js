document.addEventListener('DOMContentLoaded', function() {
    iniciarAtividade()
});

let respostas = [];
let frases = [];
let inicioAtividade; 

function iniciarAtividade() {
    inicioAtividade = new Date(); 
}

function drag(ev) {
    ev.dataTransfer.setData("text", ev.target.id);
}

function allowDrop(ev) {
    ev.preventDefault();
}

function drop(ev, dropzoneId) {
    ev.preventDefault();
    var data = ev.dataTransfer.getData("text");
    var dropzone = document.getElementById(dropzoneId);

    if (data === 'imagem1' && dropzoneId === 'imagem2') {
        document.getElementById('imagem1').style.display = 'none';
        dropzone.style.display = 'none';
        document.getElementById('imagem5').style.display = 'block';
        respostas.push(true);
        frases.push("Imagem 1 na 2");
        console.log(respostas);
        console.log(frases);
    }

    if (data === 'imagem3' && dropzoneId === 'imagem4') {
        document.getElementById('imagem3').style.display = 'none';
        dropzone.style.display = 'none';
        document.getElementById('imagem6').style.display = 'block';
        respostas.push(false);
        frases.push("Imagem 3 na 4");
        console.log(respostas);
        console.log(frases);
    }

    if (data === 'imagem1' && dropzoneId === 'imagem4') {
        document.getElementById('imagem1').style.display = 'none';
        dropzone.style.display = 'none';
        document.getElementById('imagem7').style.display = 'block';
        respostas.push(false);
        frases.push("Imagem 1 na 4");
        console.log(respostas);
        console.log(frases);
    }

    if (data === 'imagem3' && dropzoneId === 'imagem2') {
        document.getElementById('imagem3').style.display = 'none';
        dropzone.style.display = 'none';
        document.getElementById('imagem8').style.display = 'block';
        respostas.push(false);
        frases.push("Imagem 3 na 2");
        console.log(respostas);
        console.log(frases);
    }

    if (respostas.length === 2) {
        const diferencaTempoSegundos = calcularDiferencaTempo(inicioAtividade);
        console.log(diferencaTempoSegundos)
        const nomedoUsario = localStorage.getItem('nomeDoUsuarioClicado');
        const idDoUsuario = localStorage.getItem('idDoUsuarioClicado');
        const respostaCompleta = frases[0] + ', ' + frases[1];
        const acerto = respostas.every((resposta) => resposta === true);
        enviarDadosParaServidor(nomedoUsario, idDoUsuario, respostaCompleta, acerto, diferencaTempoSegundos);
    }
}

function calcularDiferencaTempo(inicioAtividade) {
    const agora = new Date();
    const diferencaTempoMilissegundos = agora - inicioAtividade;
    return Math.floor(diferencaTempoMilissegundos / 1000);
}

function enviarDadosParaServidor(idDoUsuario, nomeDoUsario, respostaCompleta, acerto, diferencaTempoSegundos) {

    try {
        const corpoRequisicao = {
            idaluno: idDoUsuario,
            nomealuno: nomeDoUsario,
            item: 'CI006',
            descricao: 'Arraste a girafa maior',
            resposta: respostaCompleta,
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
                redirecionarUsuario();
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

function redirecionarUsuario() {
    const proximoCapitulo = localStorage.getItem('proximoCapitulo');
    if (proximoCapitulo == "false") {
        setTimeout(function() {
            window.location.href = '../views/main.html';
        }, 3000); // Atraso de 3 segundos (3000 milissegundos)
    } else {
        setTimeout(function() {
            window.location.href = '../views/animalComida.html';
            //ainda falta adicionar os jogos de ligar
        }, 3000); // Atraso de 3 segundos (3000 milissegundos)
    }
}

