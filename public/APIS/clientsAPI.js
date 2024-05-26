const API_URL = 'http://localhost:5167/api/clientes';

// Obtener clientes
async function fetchclientes() {
    try {
        const response = await fetch(API_URL);
        const clientes = await response.json();
        viewClients(clientes);
    } catch (error) {
        console.error('Error al obtener los clientes:', error);
    }
}

// Poblar la tabla con los datos obtenidos de la API
function viewClients(clientes) {
    const tableBody = document.querySelector('#dataTable tbody');
    tableBody.innerHTML = '';

    clientes.forEach(cliente => {
        const row = document.createElement('tr');

    if (cliente.estadoCliente == true) {    
        var estadoDelCliente = '<td style="color: #009900;">ACTIVO</td>'
    }
    else {
        var estadoDelCliente = '<td style="color: #ff0000;">INACTIVO</td>'
    }

        row.innerHTML = `
<td>${cliente.cedulaCliente}</td>
<td>${cliente.nombreCliente}</td>
<td>${cliente.apellidoCliente}</td>
<td>${cliente.direccionCliente}</td>
<td>${cliente.telefonoCliente}</td>
    ${estadoDelCliente}
<td class="align-middle text-center">
    <div style="display: flex; justify-content: center; align-items: center;">
        <div style="margin-right: 10px;">
            <div class="form-check form-switch ">
                <input class="form-check-input" type="checkbox" role="switch" checked onclick="alertSuccesClients()">
            </div>
        </div>
        <button class="btn btn-warning" data-bs-toggle="modal" data-bs-target="#editModal">
            <i class="bi bi-pen"></i>
        </button>
        <button class="btn btn-primary p-2 ms-2" data-bs-toggle="modal" data-bs-target="#detailsModal">
            <i class="bi bi-eye-fill"></i>
        </button>
    </div>
</td>
`;

        tableBody.appendChild(row);
    });
}

// Llamar a la función para obtener y mostrar los clientes al cargar la página
document.addEventListener('DOMContentLoaded', fetchclientes);