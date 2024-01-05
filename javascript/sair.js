function apagarCookie(nomeCookie) {
    document.cookie = nomeCookie + '=; expires=Thu, 01 Jan 1970 00:00:00 UTC; path=/;';
    window.location.href = '../views/login.html'
}
