//addTicket

let ticket = 0;
let selectedTicket = '';
let price = 0;

let showTitle = document.querySelector("#showTitle");
let purchaseDetail = document.querySelector('#purchaseDetail')
let goodByeMsg = document.querySelector('#goodByeMsg') 
let cancelBtn = document.querySelector('#clearBtn')

// Clear Cart
function clearBtn(){
    event.preventDefault();
    showTitle.textContent = 'CARRITO VACIO'
    purchaseDetail.textContent = '';
    goodByeMsg.textContent = ''
    ticket = 0;
    selectedTicket = '';
    price = 0;  
}

// Add Ticket Function
function addTicket (show){
    event.preventDefault();
    ticket ++    

    if (show === selectedTicket || selectedTicket === '' ) {

    selectedTicket = show;

    switch (selectedTicket) {
        case 'Music Night':
            price = ticket * 2500;
            purchaseDetail.textContent = 'Total a Pagar: $' + price
            showTitle.textContent = selectedTicket
            goodByeMsg.textContent = 'Cantidad: ' + ticket + ' Tickets'
            break;

        case 'House Music':
            price = ticket * 2500;
            purchaseDetail.textContent = 'Total a Pagar: $' + price
            showTitle.textContent = selectedTicket
            goodByeMsg.textContent = 'Cantidad: ' + ticket + ' Tickets'
            break;

        case 'Music Fest':
            price = ticket * 2500;
            purchaseDetail.textContent = 'Total a Pagar: $' + price
            showTitle.textContent = selectedTicket
            goodByeMsg.textContent = 'Cantidad: ' + ticket + ' Tickets'

            break;
        case 'The Best Music':
            price = ticket * 2500;
            purchaseDetail.textContent = 'Total a Pagar: $' + price
            showTitle.textContent = selectedTicket
            goodByeMsg.textContent = 'Cantidad: ' + ticket + ' Tickets'
            break;

        default:
            break;
    }
   } else {
    alert('Ya tenes seleccionado otro evento ' + selectedTicket)
   }
          
}

// Checkout Function

function checkout(){

    let email = prompt('Ingresa tu Email')
    
    if(email){    
        ticket = 0;
        selectedTicket = '';
        price = 0;
        showTitle.textContent = 'Gracias por tu compra!'
        purchaseDetail.textContent = '';
        goodByeMsg.textContent = ''

        function startAgain() {
            showTitle.textContent = 'CARRITO VACIO'
            purchaseDetail.textContent = '';
            goodByeMsg.textContent = ''
        }

        setTimeout(startAgain, 1000);

    }else{
        alert('Porfavor, vuelve a tocar el boton PAGAR e Ingresa un Email')
    }
}

