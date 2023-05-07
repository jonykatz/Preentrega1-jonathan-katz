//addTicket

let ticket = 0;
let selectedTicket = '';
let price = 0;

function addTicket (show){
    ticket ++    

    if (show === selectedTicket || selectedTicket === '' ) {

    selectedTicket = show;

    switch (selectedTicket) {
        case 'Music Night':
            price = ticket * 2500;
            let showTitle1 = document.querySelector("#showTitle");
            let purchaseDetail1 = document.querySelector("#purchaseDetail");
            let goodByeMsg1 = document.querySelector('#goodByeMsg')
            purchaseDetail1.textContent = 'Total a Pagar: $' + price
            showTitle1.textContent = selectedTicket
            goodByeMsg1.textContent = 'Cantidad: ' + ticket + ' Tickets'
            break;

        case 'House Music':
            price = ticket * 2500;
            let showTitle2 = document.querySelector("#showTitle");
            let purchaseDetail2 = document.querySelector("#purchaseDetail");
            let goodByeMsg2 = document.querySelector('#goodByeMsg')
            purchaseDetail2.textContent = 'Total a Pagar: $' + price
            showTitle2.textContent = selectedTicket
            goodByeMsg2.textContent = 'Cantidad: ' + ticket + ' Tickets'
            break;

        case 'Music Fest':
            price = ticket * 2500;
            let showTitle3 = document.querySelector("#showTitle");
            let purchaseDetail3 = document.querySelector("#purchaseDetail");
            let goodByeMsg3 = document.querySelector('#goodByeMsg')
            purchaseDetail3.textContent = 'Total a Pagar: $' + price
            showTitle3.textContent = selectedTicket
            goodByeMsg3.textContent = 'Cantidad: ' + ticket + ' Tickets'

            break;
        case 'The Best Music':
            price = ticket * 2500;
            let showTitle4 = document.querySelector("#showTitle");
            let purchaseDetail4 = document.querySelector("#purchaseDetail");
            let goodByeMsg4 = document.querySelector('#goodByeMsg')
            purchaseDetail4.textContent = 'Total a Pagar: $' + price
            showTitle4.textContent = selectedTicket
            goodByeMsg4.textContent = 'Cantidad: ' + ticket + ' Tickets'
            break;

        default:
            break;
    }
   } else {
    alert('Ya tenes seleccionado otro evento ' + selectedTicket)
   }
          
}

function checkout(){
    let email = prompt('Ingresa tu Email')
    
    
    if(email){    
        ticket = 0;
        selectedTicket = '';
        price = 0;

        let btn = document.querySelector("#checkoutBtn");
        let showTitle = document.querySelector("#showTitle");
        let purchaseDetail = document.querySelector('#purchaseDetail')
        let goodByeMsg = document.querySelector('#goodByeMsg') 

        showTitle.textContent = 'Gracias por tu compra!'
        purchaseDetail.textContent = '';
        btn.textContent = '';
        goodByeMsg.textContent = ''

        function startAgain() {
            showTitle.textContent = 'CARRITO VACIO'
            purchaseDetail.textContent = '';
            btn.textContent = 'PAGAR';
            goodByeMsg.textContent = ''
        }

        setTimeout(startAgain, 1000);

    }else{
        alert('Porfavor, vuelve a tocar el boton PAGAR e Ingresa un Email')
    }
}

//purchaseDetail