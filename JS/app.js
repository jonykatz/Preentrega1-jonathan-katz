let ticket = 0;
let selectedTicket = '';
let selectedShowName = '';
let price = 0;



//DOM interactions
let showTitle = document.querySelector("#showTitle");
let purchaseDetail = document.querySelector('#purchaseDetail')
let goodByeMsg = document.querySelector('#goodByeMsg') 
let cancelBtn = document.querySelector('#clearBtn')

//form data
let customerNameInput = document.querySelector('#nombre')

//add shows
function fetchAndInjectShows() {
  fetch('showsDataBase.json')
    .then(response => response.json())
    .then(data => {
      const showCardsContainer = document.getElementById('showCards');

      data.forEach(show => {
        const cardColumn = document.createElement('div');
        cardColumn.className = 'col-sm-6 col-md-4 col-lg-3';

        const card = document.createElement('div');
        card.className = 'card mb-4';
        card.style.width = 'auto';
        card.style.height = 'auto';

        const img = document.createElement('img');
        img.src = show.showPhoto;
        img.className = 'card-img-top';
        img.alt = '...';

        const cardBody = document.createElement('div');
        cardBody.className = 'card-body';

        const title = document.createElement('h5');
        title.className = 'card-title';
        title.textContent = `${show.showName} | ${show.showDate}`;

        const description = document.createElement('p');
        description.className = 'card-text';
        description.textContent = show.showDescription;

        const btn = document.createElement('a');
        btn.href = '#';
        btn.className = 'btn btn-primary';
        btn.textContent = 'Agregar Entrada';
        btn.setAttribute('onclick', `addTicket('${show.id}')`);

        cardBody.appendChild(title);
        cardBody.appendChild(description);
        cardBody.appendChild(btn);

        card.appendChild(img);
        card.appendChild(cardBody);

        cardColumn.appendChild(card);

        showCardsContainer.appendChild(cardColumn);
      });
    })
    .catch(error => {
      console.error('Error:', error);
    });
}

document.addEventListener('DOMContentLoaded', function() {
  fetchAndInjectShows();
});



// Clear Cart
function clearBtn(){
    event.preventDefault();
    showTitle.textContent = 'CARRITO VACIO'
    purchaseDetail.textContent = '';

    ticket = 0;
    selectedTicket = '';
    price = 0;  
}

// Add Ticket Function
function addTicket (showId){
    event.preventDefault();
    ticket ++    
    //check if selected ticket is the same as showId or selected ticket is an empty string
    if (showId === selectedTicket || selectedTicket === '' ) {
        //slectedTicket is showId so you can add two different tickets in the same purchase
        selectedTicket = showId;
        //find the show by id
        fetch('showsDataBase.json')
          .then(response => response.json())
          .then(data => {
            const findShow = data.find((element) => element.id === showId );
            selectedShowName = findShow.showName
            // calculate the price
            price = findShow.price * ticket;
            //save the showName into the showTitle var 
            showTitle.textContent  = findShow.showName
            //sow the price into the purchaseDetail selector
            purchaseDetail.textContent = `Estas Comprando ${ticket} Tickets, a un valor de $ ${price}`;
          })
        

   } else {
    Swal.fire({
      title: `Ya tenes seleccionado otro evento ${selectedShowName}`,
      icon: 'error',
      confirmButtonText: 'cerrar'
    })
   }
          
}

//open form Function
function formControl(payload, modal) {
    if (payload == 'open' && ticket >= 1) {
        $(modal).modal('show'); 
    }else if(payload == 'cancel'){
        $(modal).modal('hide');
        showTitle.textContent = 'CARRITO VACIO';
        purchaseDetail.textContent = '';
    }else{
        alert('Selecciona algun evento')
    }
    
}

// Wait for the DOM to be fully loaded
// Checkout Function
document.addEventListener('DOMContentLoaded', function() {
    let submitButton = document.getElementById('submitButton');
    submitButton.addEventListener('click', function(event) {
      event.preventDefault();
      checkout();
    });
  
    // Checkout Function
    function checkout() {
      let customerName = document.getElementById('nombre').value;
      let customerLastName = document.getElementById('lastName').value;
      let customerEmail = document.getElementById('email').value;
      let customerCardNumber = document.getElementById('cardNumber').value;
      
      //regular expression to validate mail formatting
      const emailRegex = /^[-\w.%+]{1,64}@(?:[A-Z0-9-]{1,63}\.){1,125}[A-Z]{2,63}$/i;

      //Check if any of the fields are empty and if customerCardNumber has exactly 16 characters
      if (customerName && customerLastName && emailRegex.test(customerEmail) && customerCardNumber.length == 16) {
        
        //If the other fields have values and customerCardNumber is 16 characters, the modal is hidden and the purchase completed modal opens.
        $('#checkoutForm').modal('hide');
        Swal.fire({
          title: 'la compra se ha realizado con exito!',
          text: 'gracias por comprar tu entrada, recibiras un mail con toda la informacion',
          icon: 'success',
          confirmButtonText: 'cerrar'
        })
        
        //save data in an object, convert to JSON and send data to local storage
        let saleObject = {
                            name:customerName,
                            lastName: customerLastName,
                            email: customerEmail,
                            cardNumber:customerCardNumber           
                          }

        let json = JSON.stringify(saleObject)
        localStorage.setItem("sale",json)                  
        let getLs = localStorage.getItem('sale');
        console.log(getLs)
        
        goodByeMsg.textContent = `Gracias ${customerName} por comprar ${ticket} Tickets, por un valor de $ ${price}
        los datos de tu compra seran enviados a ${customerEmail}`
  
        function startAgain() {
          $('#successPurchase').modal('hide');
          //reset showTitle var 
            showTitle.textContent  = 'CARRITO VACIO';
            purchaseDetail.textContent = '';

        }setTimeout(startAgain, 10000);
      } else {

        // If any field is empty or customerCardNumber is not 16 characters, an alert is displayed for each case.
        if (!customerName) {
          alert("El campo 'Nombre' es requerido.");
        }
        if (!customerLastName) {
          alert("El campo 'Apellido' es requerido.");
        }
        if (!customerEmail) {
        
            alert("El campo 'Email' es requerido.");
          }
        if (!emailRegex.test(customerEmail)) {
            
            alert("El correo electrónico ingresado no es válido");
        } 
        if (customerCardNumber.length != 16) {
          alert("El campo 'Número de Tarjeta' debe tener 16 caracteres.");
        }
      }
    }
});
  

