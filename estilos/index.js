let listaItems = document.getElementById('lista-items')
let cardProducto = document.getElementsByClassName("card-producto");
let productos = document.getElementsByClassName("producto");
let precioProducto = document.getElementsByClassName("producto-precio");
let table = document.querySelector("table");
let tbody = document.querySelector("tbody");
let botonBorrar = document.getElementsByClassName("fa-times-circle");
let listaPedidos = JSON.parse(localStorage.getItem("productos")) || [];


/****** INSERTAR CODIGO A HTML DE LOS PRODUCTOS DEL MENU *******/

class productoMenu {
  constructor(foto, nombre, precio) {
    this.foto = foto;
    this.nombre = nombre;
    this.precio = precio;
  }
  insertarHTML() {
    listaItems.innerHTML += `
    <div class="card-producto col-12 col-md-6 col-lg-4">
            <div class="d-flex flex-column">
              <img
                src="${this.foto}"
                class="img-fluid"
                alt="foto-chocolatada"
              />
              <div class="descripcion">
                <p class="producto" id="nombreProducto">${this.nombre}</p>
                <p class="estiqueta-precio">$<span class="producto-precio">${this.precio}</span></p>
              </div>
            </div>
    </div>
    `;
    return this
  }
}

const chocolatada = new productoMenu("https://picsum.photos/250/150", "chocolatada", "100");
const cafeHelado = new productoMenu("https://picsum.photos/250/150", "cafe heldo", "90");
const cafeCaliente = new productoMenu("https://picsum.photos/250/150", "cafe caliente", "90");
const jugo = new productoMenu("https://picsum.photos/250/150", "jugo", "80");
const teFrio = new productoMenu("https://picsum.photos/250/150", "te frio", "70");
const teCaliente = new productoMenu("https://picsum.photos/250/150", "Te caliente", "70");
const licuadoConLeche = new productoMenu("https://picsum.photos/250/150", "tlicuado con leche", "70");
const licuadoConAgua = new productoMenu("https://picsum.photos/250/150", "licuado con agua", "70");
const tostada = new productoMenu("https://picsum.photos/250/150", "tostada", "70");
const helado = new productoMenu("https://picsum.photos/250/150", "helado", "70");

chocolatada.insertarHTML();
cafeHelado.insertarHTML();
cafeCaliente.insertarHTML();
teFrio.insertarHTML();
teCaliente.insertarHTML();
licuadoConLeche.insertarHTML();
tostada.insertarHTML();
helado.insertarHTML();

// crea un arreglo con el precio y producto
const crearItem = (producto, precio) => {
  let item = {
    producto: producto,
    precio: precio,
  };
  listaPedidos.push(item);
  return item;
};

//Insertar nombre del producto al array "listaPedidos" al hacer click spbre el
for (let i = 0; i < cardProducto.length; i++) {
  cardProducto[i].addEventListener("click", insertarItem);
  let producto = productos[i].innerHTML;
  let precio = precioProducto[i].innerHTML;

  function insertarItem(event) {
    if (listaPedidos.length < 8) {
      crearItem(producto, precio);
      guardarLS();
    } else {
      alert("No puede agregar mas de 8 productos.");
    }
  }
}

//Guardar producto de "listaPedidos" en LocalStorage
const guardarLS = () => {
  localStorage.setItem("productos", JSON.stringify(listaPedidos));
  leerLS();
};

//Insertar en HTML el item al hacer click sobre el
const leerLS = () => {
  listaPedidos = JSON.parse(localStorage.getItem("productos"));
  if (listaPedidos === null) {
    listaPedidos = [];
  } else if (listaPedidos) {
    tbody.innerHTML = "";
    listaPedidos.forEach((element) => {
      tbody.innerHTML += `<td><i class="fas fa-times-circle"></i> ${element.producto}</td>
      <td>$${element.precio}</td>`;
    });
  }
};


// funcion para eliminar producto de la lista
const eliminarLS = (index) => {
  listaPedidos.splice(index, 1);
  // guardarLS() guarda el nuevo cambio en LocalStorage
  guardarLS();
};

//Cerrar Mesa
const cerrarMesa = () => {
  let totalPedido =
  listaPedidos.reduce((acc, producto) => acc += parseFloat(producto.precio), 0)
  alert('Total del Pedido: '+ totalPedido)
  listaPedidos = []
  guardarLS()
  return totalPedido
}

// EventListener para señalar que producto vamos a eliminar
table.addEventListener("click", (e) => {
  e.preventDefault;
  //console.log(e.composedPath()[2].innerText)  

  for (let i = 0; i < botonBorrar.length; i++) {    
    if (e.target === botonBorrar[i]) {
      eliminarLS(i);
    }    
  }  
});

leerLS();
