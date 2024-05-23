//---------------------------------------------- Asignacion de saldo y créditos-----------------------------------------//

function toggleCreditos() {
    var checkbox = document.getElementById("checkboxCreditos");
    var creditosContainer = document.getElementById("creditosContainer");

    if (checkbox.checked) {
        creditosContainer.style.display = "block";
    } else {
        creditosContainer.style.display = "none";
    }
}

function toggleSaldoParcial() {
    var checkbox = document.getElementById("checkboxSaldosACredito");
    var saldosContainer = document.getElementById("SaldoParcialContainer");

    if (checkbox.checked) {
        saldosContainer.style.display = "block";
    } else {
        saldosContainer.style.display = "none";
    }
}

// -------- saldo no superior al total de compra ----------- NO TERMINADO a falta de tiempo 
// function calculateRemainingSaldo() {

//     let totalbalance=parseFloat(getElementById('totalBalance').value) 
//     let partialvalue=parseFloat(getElementById('partialvalue').value)

//     if (partialvalue>totalbalance) {
//         document.getElementById('partialvalue').value = "";
//         return;
//     }

//     document.getElementById('balanceResult').innerText="El valo de acreditado supera el total de la factura";

//     document.getElementById('remainingDebt').innerText = '$' + remainingDebt.toFixed(2);


// }


// --------------------------------- alerts----------------------------------------
//  ALERTA DE IMPRESION 

	let timerInterval;

	function impresion() {

		// After printing (for both options)
		Swal.fire({
			title: "Imprimiendo Factura", // Change title to "Printing Invoice" or similar
			html: "Espere un momento...", // Change message to "Please wait..." or similar
			timer: 1000, // Adjust timer duration as needed
			timerProgressBar: true,
			didOpen: () => {
				Swal.showLoading();
			},
			willClose: () => {
				clearInterval(timerInterval);
			}
		});
	}

    //  ALERTA DE Guradar

    
	function printInvoice()

	// After printing (for both options)
	{
		Swal.fire({
			icon: "success",
			title: "Guardado",
			showConfirmButton: true,
			timer: 1500
		});
	}

	function cancelarVenta(){
		Swal.fire({
			title: "¿Deseas cancelar la venta?",
			showDenyButton: true,
			confirmButtonText: "Si",
			denyButtonText: "No",
		  }).then((result) => {
			/* Read more about isConfirmed, isDenied below */
			if (result.isConfirmed) {
			  Swal.fire("Venta Cancelada", "", ""),
			  window.location.href = "/newSale";
			} 10000;
		  });
		
	}



			
