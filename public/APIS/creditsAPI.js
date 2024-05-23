const API_URL = 'http://localhost:5167/api/creditos'; // Cambia esto a la URL de tu API

// Obtener créditos
async function fetchCreditos() {
    try {
        const response = await fetch(API_URL);
        const creditos = await response.json();
        viewCredits(creditos);
    } catch (error) {
        console.error('Error al obtener los créditos:', error);
    }
}

// Poblar la tabla con los datos obtenidos de la API
async function viewCredits(creditos) {
    const tableBody = document.querySelector('#dataTable tbody');
    tableBody.innerHTML = '';

    for (const credito of creditos) {
        const row = document.createElement('tr');
        const cliente = await fetchClientName(credito.idCliente); // Obtener el nombre del cliente

        row.innerHTML = `
            <td>${cliente}</td>
            <td>${credito.deudaTotal}</td>
            <td>${credito.deudaActual}</td>
            <td>${credito.abonosTotal}</td>
            <td class="d-flex justify-content-center align-items-center">
                <button id="abonarButton1" class="btn btn-success p-2" data-bs-toggle="modal" data-bs-target="#payment"
                    data-original-value="93000" data-current-debt="0" onclick="abonar()">
                    <i class="bi bi-cash"></i>
                </button>
                <button class="btn btn-primary p-2 ms-2" data-bs-toggle="modal" data-bs-target="#detailsModal">
                    <i class="bi bi-eye-fill"></i>
                </button>
            </td>
        `;
        tableBody.appendChild(row);
    }
}

// Función para obtener el nombre del cliente
async function fetchClientName(clientId) {
    try {
        const response = await fetch(`http://localhost:5167/api/clientes/${clientId}`);
        const cliente = await response.json();
        return cliente.nombreCliente;
    } catch (error) {
        console.error('Error al obtener el nombre del cliente:', error);
        return 'Nombre no disponible';
    }
}

// Llamar a la función para obtener y mostrar los créditos al cargar la página
document.addEventListener('DOMContentLoaded', fetchCreditos);
