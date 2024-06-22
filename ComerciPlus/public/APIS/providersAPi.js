const API_URL = 'http://deisy77-001-site1.gtempurl.com/api/proveedores'; // Cambia esto a la URL de tu API

// Obtener proveedores
async function fetchProviders() {
    try {
        const response = await fetch(API_URL);
        if (!response.ok) throw new Error('Error en la respuesta de la API');
        const proveedores = await response.json();
        viewProviders(proveedores);
    } catch (error) {
        console.error('Error al obtener los proveedores:', error);
    }
}

// Poblar la tabla con los datos obtenidos de la API
function viewProviders(proveedores) {
    const tableBody = document.querySelector('#dataTable tbody');
    tableBody.innerHTML = '';

    proveedores.forEach(proveedor => {
        const row = document.createElement('tr');

        row.innerHTML = `
            <td>${proveedor.nit}</td>
            <td>${proveedor.nombreEmpresa}</td>
            <td>${proveedor.direccionEmpresa}</td>
            <td>${proveedor.telefonoEmpresa}</td>
            <td>${proveedor.nombreVendedor}</td>
            <td></td>
            <td class="align-middle text-center">
                <div style="display: flex; justify-content: center; align-items: center;">
                    <div style="margin-right: 10px;">
                        <div class="form-check form-switch ">
                            <input class="form-check-input" type="checkbox" role="switch" checked onclick="alertSuccesClients()">
                        </div>
                    </div>

                    <button class="btn btn-warning" data-bs-toggle="modal" data-bs-target="#editModal" onclick="dataProvider('${proveedor.id}')">
                        <i class="bi bi-pen"></i>
                    </button>
                    <button class="btn btn-danger p-2 ms-2" onclick="deleteProvider('${proveedor.id}')">
                        <i class="bi bi-trash"></i>
                    </button>
                </div>
            </td>
        `;

        tableBody.appendChild(row);
    });
}

// Crear proveedor
async function createProvider() {
    const nit = document.getElementById('nit1').value;
    const telefonoEmpresa = document.getElementById('phone1').value;
    const nombreEmpresa = document.getElementById('name1').value;
    const nombreVendedor = document.getElementById('Seller1').value;
    const direccionEmpresa = document.getElementById('address1').value;

    const proveedor = {
        nit,
        telefonoEmpresa,
        nombreEmpresa,
        nombreVendedor,
        direccionEmpresa
    };

    try {
        const response = await fetch(API_URL, {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json'
            },
            body: JSON.stringify(proveedor)
        });

        if (!response.ok) {
            console.error('Error al crear el proveedor:', response.statusText);
        }
    } catch (error) {
        console.error('Error al crear el proveedor:', error);
        throw error;
    }
}

// Llenar el formulario de edición con los datos del proveedor seleccionado
async function dataProvider(id) {
    try {
        const response = await fetch(`${API_URL}/${id}`);

        if (!response.ok) throw new Error('Error en la respuesta de la API')

        const proveedor = await response.json();

        idProveedor = proveedor.id;

        document.getElementById('editNit').value = proveedor.nit;
        document.getElementById('editPhone').value = proveedor.telefonoEmpresa;
        document.getElementById('editName').value = proveedor.nombreEmpresa;
        document.getElementById('editSeller').value = proveedor.nombreVendedor;
        document.getElementById('editAddress').value = proveedor.direccionEmpresa;

    } catch (error) {
        console.error('Error al obtener los detalles del proveedor:', error);
    }
}

// Actualizar proveedor
async function updateProvider() {
    
    const nit = document.getElementById('editNit').value;
    const telefonoEmpresa = document.getElementById('editPhone').value;
    const nombreEmpresa = document.getElementById('editName').value;
    const nombreVendedor = document.getElementById('editSeller').value;
    const direccionEmpresa = document.getElementById('editAddress').value;

    const updatedProvider = {
        id : idProveedor,
        nit,
        nombreEmpresa,
        direccionEmpresa,
        telefonoEmpresa,
        nombreVendedor
    };

    try {
        const response = await fetch(`${API_URL}/${idProveedor}`, {
            method: 'PUT',
            headers: {
                'Content-Type': 'application/json'
            },
            body: JSON.stringify(updatedProvider)
        });

        if (!response.ok) {
            console.error('Error al actualizar el proveedor:', response.statusText);
            return false;
        }
    } catch (error) {
        console.error('Error al actualizar el proveedor:', error);
    }
}


// Eliminar proveedor
async function deleteProvider(id) {
    try {
        const response = await fetch(`${API_URL}/${id}`, {
            method: 'DELETE'
        });

        if (response.ok) {
            fetchProviders();
        } else {
            console.error('Error al eliminar el proveedor:', response.statusText);
        }
    } catch (error) {
        console.error('Error al eliminar el proveedor:', error);
    }
}

// Inicializar la obtención de proveedores
document.addEventListener('DOMContentLoaded', fetchProviders);

// Validar y enviar el formulario de creación de proveedor
document.getElementById('createForm').addEventListener('submit', createProvider);

// Validar y enviar el formulario de actualización de proveedor
document.getElementById('editForm').addEventListener('submit', updateProvider);
