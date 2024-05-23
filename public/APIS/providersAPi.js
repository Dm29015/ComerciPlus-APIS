const API_URL = 'http://localhost:5167/api/proveedores'; // Cambia esto a la URL de tu API

// Obtener proveedores
async function fetchProveedores() {
    try {
        const response = await fetch(API_URL);
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
            <td>${proveedor.direccion}</td>
            <td>${proveedor.telefono}</td>
            <td>${proveedor.nombreVendedor}</td>
            <td></td>
            <td class="align-middle text-center">
				<div style="display: flex; justify-content: center; align-items: center;">
					<div style="margin-right: 10px;">
						<div class="form-check form-switch ">
							<input class="form-check-input" type="checkbox" role="switch" checked onclick="alertSuccesClients()">
						</div>
					</div>
					    <button class="btn btn-warning p-2" data-bs-toggle="modal" data-bs-target="#editModal">
                            <i class="bi bi-pen"></i>
                        </button>
				</div>
			</td>
        `;

        tableBody.appendChild(row);
    });
}

// Llamar a la función para obtener y mostrar los proveedores al cargar la página
document.addEventListener('DOMContentLoaded', fetchProveedores);

// Crear proveedor
// async function createProveedor(proveedor) {
//     try {
//         const response = await fetch(API_URL, {
//             method: 'POST',
//             headers: {
//                 'Content-Type': 'application/json'
//             },
//             body: JSON.stringify(proveedor)
//         });

//         if (response.ok) {
//             // Refrescar la lista de proveedores
//             fetchProveedores();
//             alert('Proveedor creado exitosamente');
//         } else {
//             console.error('Error al crear el proveedor:', response.statusText);
//             alert('Error al crear el proveedor');
//         }
//     } catch (error) {
//         console.error('Error al crear el proveedor:', error);
//         alert('Error al crear el proveedor');
//     }
// }

// document.getElementById('createProveedorForm').addEventListener('submit', async function (event) {
//     event.preventDefault();

//     const proveedor = {
//         nit: document.getElementById('nit1').value,
//         telefono: document.getElementById('phone1').value,
//         nombre: document.getElementById('name1').value,
//         encargado: document.getElementById('Seller1').value,
//         direccion: document.getElementById('address1').value,
//         horario: 'Horario no especificado' // Ajusta esto si tienes un campo de horario en el formulario
//     };

//     await createProveedor(proveedor);

//     // Cierra el modal
//     $('#createModal').modal('hide');
// });
