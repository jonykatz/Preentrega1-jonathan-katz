//addTicket

let ticket = 0;
let selectedTicket = '';
let price = 0;

function addTicket (show){
    ticket ++    

    if (show === selectedTicket || selectedTicket === '' ) {

    selectedTicket = show;

    switch (selectedTicket) {
        case 'show1':
            price = ticket * 3000;
            var btn = document.querySelector("#checkoutBtn");
                btn.textContent = 'COMPRAR: ' + ticket + ' Total a pagar $' + price;
            break;

        case 'show2':
            price = ticket * 2000;
            var btn = document.querySelector("#checkoutBtn");
                btn.textContent = 'COMPRAR: ' + ticket + ' Total a pagar $' + price;
            break;

        case 'show3':
            price = ticket * 2500;
            var btn = document.querySelector("#checkoutBtn");
                btn.textContent = 'COMPRAR: ' + ticket + ' Total a pagar $' + price;
            break;
        case 'show3':
            price = ticket * 3500;
            var btn = document.querySelector("#checkoutBtn");
                btn.textContent = 'COMPRAR: ' + ticket + ' Total a pagar $' + price;
            break;

        default:
            break;
    }
   } else {
    alert('Ya tenes seleccionado otro evento ' + selectedTicket)
   }
          
}

function checkout(){
    ticket = 0;
    selectedTicket = '';
    price = 0;
    var btn = document.querySelector("#checkoutBtn");
    btn.textContent = 'COMPRAR';
}

