const API_URL = 'http://localhost:5167/api/usuarios';

async function botoniniciar(event) {
    event.preventDefault();
    var form = document.getElementById("formLogin");
    var errorDiv = document.getElementById("error");

    if (form.checkValidity()) {
        var username = document.getElementById("username").value;
        var password = document.getElementById("password").value;

        try {
            const response = await fetch(API_URL);
            const usuarios = await response.json();

            usuarios.forEach(usuario => {
                if (username == usuario.correo && password == usuario.clave) {
                    window.location.href = './dashboard';
                } else {
                    errorDiv.textContent = 'Correo o contraseña incorrectos';
                }

            });

        } catch (error) {
            console.error('Hubo un problema al iniciar sesión. Por favor, intenta de nuevo.', error);
            errorDiv.textContent = 'Hubo un problema al iniciar sesión. Por favor, intenta de nuevo.';
        }

    } else {
        form.classList.add('was-validated');
    }

    return false;
}