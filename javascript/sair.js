document.addEventListener('DOMContentLoaded', function () {
    const botaoDeslogar = document.getElementById('botaoDeslogar');

    botaoDeslogar.addEventListener('click', function() {
        $('#confirmacaoDeslogarModal').modal('show');
    });

    const confirmarDeslogar = document.getElementById('confirmarDeslogar');
    confirmarDeslogar.addEventListener('click', function() {
        apagarCookie('authToken'); 
    });
});

function apagarCookie(nomeCookie) {
    document.cookie = nomeCookie + '=; expires=Thu, 01 Jan 1970 00:00:00 UTC; path=/;';
    window.location.href = '../views/login.html';
}
