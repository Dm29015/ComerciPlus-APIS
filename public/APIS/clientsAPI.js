const API_URL = 'http://localhost:5167/api/clientes';
let idCliente;

// Obtener clientes
async function fetchClients() {
    try {
        const response = await fetch(API_URL);
        const clientes = await response.json();
        viewClients(clientes);
    } catch (error) {
        console.error('Error al obtener los clientes:', error);
    }
}

function viewClients(clientes) {
    const tableBody = document.querySelector('#dataTable tbody');
    tableBody.innerHTML = '';

    clientes.forEach(cliente => {
        const row = document.createElement('tr');

        let estadoDelCliente = cliente.estadoCliente ?
            '<td style="color: #009900;">ACTIVO</td>' :
            '<td style="color: #ff0000;">INACTIVO</td>';

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
                    <button class="btn btn-warning " data-bs-toggle="modal" data-bs-target="#editModal"
                        onclick="editClient('${cliente.id}')">
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

// Crear cliente
async function createClient(event) {
    event.preventDefault(); // Prevenir el envío del formulario predeterminado

    const cedulaCliente = document.getElementById('inputIdentification').value;
    const telefonoCliente = document.getElementById('inputPhone').value;
    const nombreCliente = document.getElementById('inputName').value;
    const apellidoCliente = document.getElementById('inputLastName').value;
    const direccionCliente = document.getElementById('inputAddress').value;

    const cliente = {
        cedulaCliente,
        nombreCliente,
        apellidoCliente,
        direccionCliente,
        telefonoCliente,
        estadoCliente: true
    };

    try {
        const response = await fetch(API_URL, {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json'
            },
            body: JSON.stringify(cliente)
        });

        if (!response.ok) {
            console.error('Error al crear el cliente:', response.statusText);
        } else {
            // Si la creación es exitosa, recargar los clientes
            fetchClients();
            document.getElementById('createFormClient').reset(); // Reiniciar el formulario
        }
    } catch (error) {
        console.error('Error al crear el cliente:', error);
        throw error;
    }
}

// Llenar el formulario de edición con los datos del cliente seleccionado
async function editClient(id) {
    try {
        const response = await fetch(`${API_URL}/${id}`);

        if (!response.ok) throw new Error('Error en la respuesta de la API');

        const cliente = await response.json();

        idCliente = cliente.id; // Asignar el ID del cliente a la variable global

        document.getElementById('inputIdentificationEdit').value = cliente.cedulaCliente;
        document.getElementById('inputPhoneEdit').value = cliente.telefonoCliente;
        document.getElementById('inputNameEdit').value = cliente.nombreCliente;
        document.getElementById('inputLastNameEdit').value = cliente.apellidoCliente;
        document.getElementById('inputAddressEdit').value = cliente.direccionCliente;

    } catch (error) {
        console.error('Error al obtener los detalles del cliente:', error);
    }
}

// Actualizar cliente
async function updateClient() {

    const cedulaCliente = document.getElementById('inputIdentificationEdit').value;
    const telefonoCliente = document.getElementById('inputPhoneEdit').value;
    const nombreCliente = document.getElementById('inputNameEdit').value;
    const apellidoCliente = document.getElementById('inputLastNameEdit').value;
    const direccionCliente = document.getElementById('inputAddressEdit').value;

    const updatedClient = {
        id: idCliente,
        cedulaCliente,
        nombreCliente,
        apellidoCliente,
        direccionCliente,
        telefonoCliente,
        estadoCliente : true
    };

    try {
        const response = await fetch(`${API_URL}/${idCliente}`, {
            method: 'PUT',
            headers: {
                'Content-Type': 'application/json'
            },
            body: JSON.stringify(updatedClient)
        });

        if (!response.ok) {
            console.error('Error al actualizar el cliente:', response.statusText);
        }
    } catch (error) {
        console.error('Error al actualizar el cliente:', error);
    }
}


// Inicializar la obtención de clientes
document.addEventListener('DOMContentLoaded', fetchClients);

// Validar y enviar el formulario de creación de cliente
document.getElementById('createFormClient').addEventListener('submit', createClient);

// Validar y enviar el formulario de actualización de cliente
document.getElementById('editFormClient').addEventListener('submit', updateClient);