async function loginUser() {
    const email = document.getElementById('email').value;
    const password = document.getElementById('password').value;

    try {
        const response = await fetch('https://fauna-api.onrender.com/auth/aluno', {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json'
            },
            body: JSON.stringify({ email, password })
        });

        if (response.ok) {
            const data = await response.json();

            // Armazena o token no cookie
            setCookie('authToken', data.token);

            // Decodifica o token para obter informações do usuário
            const decodedToken = decodeJwtToken(data.token);

            // Armazena informações do usuário no localStorage (opcional)
            localStorage.setItem('userData', JSON.stringify(decodedToken));

            console.log("Login realizado com sucesso");

            window.location.href = "../views/main.html";
        } else {
            const errorMsg = await response.text();
            alert(errorMsg);
            console.log("Falha no login");
        }
    } catch (error) {
        console.error('Erro ao logar usuário:', error);
        alert('Erro ao logar usuário. Por favor, tente novamente.');
    }
}

// Função para configurar um cookie
function setCookie(name, value) {
    const encodedValue = encodeURIComponent(value);
    document.cookie = name + '=' + encodedValue + '; path=/; secure; samesite=strict';
}


function decodeJwtToken(token) {
    try {
        // Decodifica o token diretamente no formato JSON
        return JSON.parse(atob(token.split('.')[1]));
    } catch (error) {
        console.error('Erro ao decodificar o token:', error);
        return null;
    }
}