document.addEventListener('DOMContentLoaded',function(){
    chamarConsole()
})

// Obtendo referências para os botões
const primeiroBtn = document.getElementById('primeiro');
const segundoBtn = document.getElementById('segundo');
const terceiroBtn = document.getElementById('terceiro');
const tartaruga = document.getElementById('tartaruga')
const todosBtn = document.getElementById('todos');
const ninhoArvore = document.getElementById('ninhoArvore')
const gatoCachorro = document.getElementById('gatoCachorro')
const gatoRato = document.getElementById('gatoRato')
const girafaArvore = document.getElementById('girafaArvore')
const animaisIguais = document.getElementById('animaisIguais')
const animalComida = document.getElementById('animalComida')
const animalSombra = document.getElementById('animalSombra')

// Adicionando eventos de clique aos botões
primeiroBtn.addEventListener('click', () => {
    localStorage.setItem('proximoCapitulo', false)
    window.location.href = 'jogo1.html';
});

segundoBtn.addEventListener('click', () => {
    localStorage.setItem('proximoCapitulo', false)
    window.location.href = 'jogo2.html';
});

terceiroBtn.addEventListener('click', () => {
    localStorage.setItem('proximoCapitulo', false)
    window.location.href = 'jogo3-1.html';
});

animalComida.addEventListener('click', () => {
    localStorage.setItem('proximoCapitulo', false)
    window.location.href = 'animaisIguais.html';
});

girafaArvore.addEventListener('click', () => {
    localStorage.setItem('proximoCapitulo', false)
    window.location.href = 'animaisIguais.html';
});



animaisIguais.addEventListener('click', () => {
    localStorage.setItem('proximoCapitulo', false)
    window.location.href = 'animaisIguais.html';
});

animalSombra.addEventListener('click', () => {
    localStorage.setItem('proximoCapitulo', false)
    window.location.href = 'animaisIguais.html';
});
tartaruga.addEventListener('click', () => {
    localStorage.setItem('proximoCapitulo', false)
    window.location.href = 'encontreTartaruga.html';
});

ninhoArvore.addEventListener('click', ()=>{
    localStorage.setItem('proximoCapitulo', false)
    window.location.href ='ninhoArvore.html'

});

gatoCachorro.addEventListener('click',() =>{
    localStorage.setItem('proximoCapitulo', false)
    window.location.href = 'gatoCachorro.html';

});

gatoRato.addEventListener('click',() =>{
    localStorage.setItem('proximoCapitulo', false)
    window.location.href = 'gatoRato-1.html';

});

todosBtn.addEventListener('click', () => {
    localStorage.setItem('proximoCapitulo', true)
    window.location.href = 'jogo1.html';
});

function chamarConsole(){
    const nomeDoUsuario = localStorage.getItem('nomeDoUsuarioClicado')
    const idDoUsuario = localStorage.getItem('idDoUsuarioClicado')
    console.log(nomeDoUsuario,idDoUsuario)
}