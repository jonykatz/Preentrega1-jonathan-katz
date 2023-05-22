let ticket = 0;
let selectedTicket = '';
let price = 0;

//Array of Shows
let shows = [
    {
        id:'mn',
        showName: 'Music Night',
        price: '3000',
        showDescription: '"Music Night" es un electrizante espectáculo de música DJ que enciende el escenario con ritmos vibrantes, mezclas electrizantes y un ambiente de fiesta inolvidable.',
        showPhoto: 'https://res.cloudinary.com/drj3ogctf/image/upload/v1683497450/Coder/1257_yhv8ex.jpg',
        showDate: '14 de Febrero',
    },
    {
        id:'hm',
        showName: 'House Music',
        price: '2000',
        showDescription: '"House Music": ¡Sumérgete en la magia de los ritmos envolventes y las mezclas cautivadoras en este apasionante evento de música DJ que te hará vibrar toda la noche!',
        showPhoto: 'http://res.cloudinary.com/drj3ogctf/image/upload/v1683497699/Coder/4558935_nm4obt.jpg',
        showDate: '05 de Junio',
    },
    {
        id:'mf',
        showName: 'Music Fest',
        price: '2500',
        showDescription: '"Music Fest" es un evento imperdible que te llevará a un mundo de melodías vibrantes, actuaciones electrizantes y una atmósfera festiva que te hará bailar sin parar.',
        showPhoto: 'http://res.cloudinary.com/drj3ogctf/image/upload/c_scale,w_4000/v1683497787/Coder/4097578_qq14lg.jpg',
        showDate: '17 de Junio',
    },
    {
        id:'tbm',
        showName: 'The Best Music',
        price: '3500',
        showDescription: '"The Best Music": Un evento único con los cantautores más destacados, donde la magia de las letras y las melodías te envolverá en una experiencia musical inolvidable.',
        showPhoto: 'http://res.cloudinary.com/drj3ogctf/image/upload/v1683497547/Coder/6925880_j2dsmc.jpg',
        showDate: '28 de Agosto',
    },
];

//DOM interactions
let showTitle = document.querySelector("#showTitle");
let purchaseDetail = document.querySelector('#purchaseDetail')
let goodByeMsg = document.querySelector('#goodByeMsg') 
let cancelBtn = document.querySelector('#clearBtn')

//form data
let customerNameInput = document.querySelector('#nombre')


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
        const findShow = shows.find((element) => element.id === showId );
        // calculate the price
        price = findShow.price * ticket;
        //save the showName into the showTitle var 
        showTitle.textContent  = findShow.showName
        //sow the price into the purchaseDetail selector
        purchaseDetail.textContent = `Estas Comprando ${ticket} Tickets, a un valor de $ ${price}`;

   } else {
    alert('Ya tenes seleccionado otro evento ' + selectedTicket)
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
        $('#successPurchase').modal('show');
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
  

