let ticket = 0;
let selectedTicket = '';
let selectedShowName = '';
let price = 0;
let purchasesArray = []



//DOM interactions
let showTitle = document.querySelector("#showTitle");
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

document.addEventListener('DOMContentLoaded', function () {
  fetchAndInjectShows();
});



// Clear Cart
function clearBtn() {
  event.preventDefault();
  showTitle.textContent = 'CARRITO VACIO'
  purchaseDetail.textContent = '';

  ticket = 0;
  selectedTicket = '';
  price = 0;
}

// Add Ticket Function
function addTicket(showId) {
  event.preventDefault();
  //find the show by id
  fetch('showsDataBase.json')
    .then(response => response.json())
    .then(data => {
      const findShow = data.find((show) => show.id === showId);

      let showInfo = {
        id: findShow.id,
        name: findShow.showName,
        showDate: findShow.showDate,
        unitPrice: findShow.price,
        quantity: 1,
        totalprice: findShow.price
      }

      const existingShow = purchasesArray.some(obj => obj.id === showId);

      if (!existingShow) {

        purchasesArray.push(showInfo)
        addTable()

      } else {

        let i = purchasesArray.findIndex(obj => obj.id === showId);

        purchasesArray[i].quantity++

        let unitPrice = purchasesArray[i].unitPrice

        purchasesArray[i].totalprice = unitPrice * purchasesArray[i].quantity
        addTable()
      }

    })


}

function addTable() {
  const cartContainer = document.getElementById('cart-container');
  const cartIcont = document.getElementById('cartIcon')

  const totalPriceSum = purchasesArray.reduce((sum, item) => sum + item.totalprice, 0);

  let products = purchasesArray.length.toString()

  const badge = document.createElement('badge')

  badge.className = 'badge bg-danger position-absolute top-0 start-100 translate-middle p-1'  //<span class="badge bg-danger position-absolute top-0 start-100 translate-middle p-1" style="font-size: 10px;">3</span>
  badge.style = 'font-size: 10px;'
  badge.innerHTML = `<span>${products}</span>`

  cartIcont.appendChild(badge)

  cartContainer.innerHTML = '';
  const table = document.createElement('table');

  table.className = 'table';
  table.innerHTML = `
                          <thead>
                            <tr>
                              <th>Show</th>
                              <th>Precio</th>
                              <th>Cant.</th>
                              <th></th>
                            </tr>
                          </thead>
                          <tbody id="cart-body">
                          </tbody>
                          <tfoot>
                            <p> Total a pagar $${totalPriceSum} </p>
                            <a href="#" class="btn btn-primary" onclick="formControl('open', '#checkoutForm')" id="checkoutBtn"><i class="bi bi-credit-card-2-back-fill"></i> PAGAR</a>
                          </tfoot>
                        `;

  const cartBody = table.querySelector('#cart-body');

  purchasesArray.forEach(item => {
    const row = document.createElement('tr');
    row.innerHTML = `
      <td>${item.name}</td>
      <td>$${item.totalprice}</td>
      <td>${item.quantity}</td>
      <td>
        <button class="btn btn-danger btn-sm" onclick="removeItem('${item.id}')">Eliminar</button>
      </td>
    `;
    cartBody.appendChild(row);
  });

  cartContainer.appendChild(table);
}

function removeItem(id) {
  let i = purchasesArray.findIndex(obj => obj.id === id);

  if (purchasesArray[i].quantity === 1) {
    purchasesArray.splice(i, 1);
    addTable()
  } else {
    let i = purchasesArray.findIndex(obj => obj.id === id);

    purchasesArray[i].quantity -= 1

    let unitPrice = purchasesArray[i].unitPrice

    purchasesArray[i].totalprice = unitPrice * purchasesArray[i].quantity
    addTable()
  }

  console.log(purchasesArray);
}

//open form Function
function formControl(payload, modal) {
  if (payload == 'open') {
    $(modal).modal('show');
  }

}

// Wait for the DOM to be fully loaded
// Checkout Function
document.addEventListener('DOMContentLoaded', function () {
  let submitButton = document.getElementById('submitButton');
  submitButton.addEventListener('click', function (event) {
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
        name: customerName,
        lastName: customerLastName,
        email: customerEmail,
        cardNumber: customerCardNumber,
        purchase: purchasesArray
      }

      let json = JSON.stringify(saleObject)
      localStorage.setItem("sale", json)
      let getLs = localStorage.getItem('sale');
      console.log(getLs)

      function startAgain() {
        purchasesArray.length = 0
        addTable()

      } setTimeout(startAgain, 3000);
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


