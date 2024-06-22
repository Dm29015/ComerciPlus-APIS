// const API_URL = 'http://deisy77-001-site1.gtempurl.com/api/usuarios';

// async function botoniniciar(event) {
//     event.preventDefault();
//     var form = document.getElementById("formLogin");
//     var errorDiv = document.getElementById("error");

//     if (form.checkValidity()) {
//         var username = document.getElementById("username").value;
//         var password = document.getElementById("password").value;

//         try {
//             const response = await fetch(API_URL);
//             const usuarios = await response.json();

//             usuarios.forEach(usuario => {
//                 if (username == usuario.correo && password == usuario.clave) {
//                     window.location.href = './dashboard';
//                 } else {
//                     errorDiv.textContent = 'Correo o contraseña incorrectos';
//                 }

//             });

//         } catch (error) {
//             console.error('Hubo un problema al iniciar sesión. Por favor, intenta de nuevo.', error);
//             errorDiv.textContent = 'Hubo un problema al iniciar sesión. Por favor, intenta de nuevo.';
//         }

//     } else {
//         form.classList.add('was-validated');
//     }

//     return false;
// }
const API_URL = 'http://deisy77-001-site1.gtempurl.com/api';

async function botoniniciar(event) {
    event.preventDefault();
    var form = document.getElementById("formLogin");
    var errorDiv = document.getElementById("error");

    if (form.checkValidity()) {
        var username = document.getElementById("username").value;
        var password = document.getElementById("password").value;
        var token = document.getElementById("token").value;

        try {
            // Validar el token
            const tokenValidationResponse = await fetch(`${API_URL}/auth/validate-token`, {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json'
                },
                body: JSON.stringify({ token })
            });

            if (tokenValidationResponse.ok) {
                const validationResult = await tokenValidationResponse.json();

                // Verificar si el token ha expirado
                if (validationResult.message === "Token has expired") {
                    // Limpiar el token almacenado
                    localStorage.removeItem('token'); // o sessionStorage.removeItem('token');
                    window.location = '/'; // Redirigir a la página de inicio de sesión
                    errorDiv.textContent = 'El token ha expirado. Por favor, inicia sesión nuevamente.';
                    return;
                }

                // Proceder con el login si el token es válido
                const loginResponse = await fetch(`${API_URL}/usuarios`);
                if (loginResponse.ok) {
                    const usuarios = await loginResponse.json();
                    let usuarioEncontrado = false;

                    usuarios.forEach(usuario => {
                        if (username === usuario.correo && password === usuario.clave) {
                            usuarioEncontrado = true;
                            // Ejemplo de cómo manejar la redirección después del login
                            window.location.href = './dashboard';
                        }
                    });

                    if (!usuarioEncontrado) {
                        errorDiv.textContent = 'Correo o contraseña incorrectos';
                    }
                } else {
                    errorDiv.textContent = 'Error al obtener los usuarios. Por favor, intenta de nuevo.';
                }
            } else {
                const errorData = await tokenValidationResponse.json();
                errorDiv.textContent = errorData.message || 'Token inválido';
            }
        } catch (error) {
            console.error('Hubo un problema al iniciar sesión. Por favor, intenta de nuevo.', error);
            errorDiv.textContent = 'Hubo un problema al iniciar sesión. Por favor, intenta de nuevo.';
        }
    } else {
        form.classList.add('was-validated');
    }

    return false;
}


