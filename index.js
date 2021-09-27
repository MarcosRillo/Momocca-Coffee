let listaItems = document.getElementById("lista-items");
let cardProducto = document.getElementsByClassName("card-producto");
let productos = document.getElementsByClassName("producto");
let precioProducto = document.getElementsByClassName("producto-precio");
let table = document.querySelector("table");
let tbody = document.querySelector("tbody");
let botonBorrar = document.getElementsByClassName("fa-times-circle");
let listaPedidos = JSON.parse(localStorage.getItem("productos")) || [];
let botonesDeMesas = document.getElementsByClassName("numero-mesa");

/*********  SELECCION DE MESA ********/
let pedidosPorMesaDefault = [];
for (let i = 0; i < botonesDeMesas.length; i++) {
  pedidosPorMesaDefault.push([]);
}
let pedidosPorMesa;
let mesaSeleccionada = 0; // inicialmente la mesa seleccionada es la primera

function dibujarListaDePedidos(pedidos) {
  tbody.innerHTML = "";
  pedidos.forEach((element) => {
    tbody.innerHTML += `
      <td><i class="fas fa-times-circle"></i>${element.producto}</td>
      <td>$${element.precio}</td>
    `;
  });
  document.getElementById('mostrarTotal').innerHTML = `$ `+ calculatTotal()
}

function marcarComoMesaActiva(indiceMesaActiva) {
  for (let i = 0; i < botonesDeMesas.length; i++) {
    botonesDeMesas[i].classList.toggle("activa", i === indiceMesaActiva);
  }
}

function configurarBotonesMesas() {
  marcarComoMesaActiva(0);
  for (let i = 0; i < botonesDeMesas.length; i++) {
    function seleccionarMesa() {
      mesaSeleccionada = i;
      let pedidosEnEstaMesa = pedidosPorMesa[i] || [];
      marcarComoMesaActiva(i);
      dibujarListaDePedidos(pedidosEnEstaMesa);
    }
    let botonMesa = botonesDeMesas[i];
    botonMesa.addEventListener("click", seleccionarMesa);
  }
}

/****** INSERTAR CODIGO A HTML DE LOS PRODUCTOS DEL MENU *******/
class productoMenu {
  constructor(foto, nombre, precio) {
    this.foto = foto;
    this.nombre = nombre;
    this.precio = precio;
  }
  insertarHTML() {
    listaItems.innerHTML += `
    <div class="card-producto col-12 col-sm-6 col-lg-4 d-flex flex-column">
       <img
        src="${this.foto}"
        class="img-fluid"
        alt="foto-chocolatada"
       />
      <div class="descripcion">
        <p class="producto" id="nombreProducto">${this.nombre}</p>
        <p class="etiqueta-precio">$<span class="producto-precio">${this.precio}</span></p>
      </div>
    </div>
    `;
    return this;
  }
}

const chocolatada = new productoMenu(
  "https://picsum.photos/250/150",
  "chocolatada",
  "100"
);
const cafeHelado = new productoMenu(
  "https://picsum.photos/250/150",
  "cafe heldo",
  "90"
);
const cafeCaliente = new productoMenu(
  "https://picsum.photos/250/150",
  "cafe caliente",
  "90"
);
const jugo = new productoMenu("https://picsum.photos/250/150", "jugo", "80");
const teFrio = new productoMenu(
  "https://picsum.photos/250/150",
  "te frio",
  "70"
);
const teCaliente = new productoMenu(
  "https://picsum.photos/250/150",
  "Te caliente",
  "70"
);
const licuadoConLeche = new productoMenu(
  "https://picsum.photos/250/150",
  "Licuado con leche",
  "70"
);
const licuadoConAgua = new productoMenu(
  "https://picsum.photos/250/150",
  "Licuado con agua",
  "70"
);
const tostada = new productoMenu(
  "https://picsum.photos/250/150",
  "tostada",
  "70"
);
const helado = new productoMenu(
  "https://picsum.photos/250/150",
  "helado",
  "70"
);

chocolatada.insertarHTML();
cafeHelado.insertarHTML();
cafeCaliente.insertarHTML();
teFrio.insertarHTML();
teCaliente.insertarHTML();
licuadoConLeche.insertarHTML();
tostada.insertarHTML();
helado.insertarHTML();

// crea un arreglo con el precio y producto
function crearItem(producto, precio) {
  let item = {
    producto: producto,
    precio: precio,
  };
  pedidosPorMesa[mesaSeleccionada].push(item);
  return item;
}

//Insertar nombre del producto al array "listaPedidos" al hacer click spbre el
function configurarBotonesMenu() {
  for (let i = 0; i < cardProducto.length; i++) {
    cardProducto[i].addEventListener("click", insertarItem);
    let producto = productos[i].innerHTML;
    let precio = precioProducto[i].innerHTML;

    function insertarItem() {
      if (pedidosPorMesa[mesaSeleccionada].length < 8) {
        crearItem(producto, precio);
        guardarPedidosEnLS();
      } else {
        alert("No puede agregar mas de 8 productos.");
      }
    }
  }
}

//Guardar producto de "listaPedidos" en LocalStorage
function guardarPedidosEnLS() {
  localStorage.setItem("pedidos", JSON.stringify(pedidosPorMesa));
  leerPedidosDeLS();
}

//Insertar en HTML el item al hacer click sobre el
function leerPedidosDeLS() {
  pedidosPorMesa =
    JSON.parse(localStorage.getItem("pedidos")) || pedidosPorMesaDefault;
  dibujarListaDePedidos(pedidosPorMesa[mesaSeleccionada]);
}

/******* CERRAR MESA **********/
const cerrarMesa = () => {
  let totalPedido = calculatTotal()
  alert("Total del Pedido: " + totalPedido);
  pedidosPorMesa[mesaSeleccionada] = [];
  guardarPedidosEnLS();
  return totalPedido;
};

//sumar total
function calculatTotal (){
  return pedidosPorMesa[mesaSeleccionada].reduce(
    (acc, producto) => (acc += parseFloat(producto.precio)),
    0
  );
}

/******* ELIMINAR DE LA LISTA **********/
const eliminarLS = (index) => {
  pedidosPorMesa[mesaSeleccionada].splice(index, 1);
  // guardarPedidosEnLS() guarda el nuevo cambio en LocalStorage
  guardarPedidosEnLS();
};

// EventListener para señalar que producto vamos a eliminar
table.addEventListener("click", (e) => {
  e.preventDefault;

  for (let i = 0; i < botonBorrar.length; i++) {
    if (e.target === botonBorrar[i]) {
      eliminarLS(i);
    }
  }
});

// corre las configuraciones iniciales
function iniciar() {
  configurarBotonesMesas();
  configurarBotonesMenu();
}

iniciar();
leerPedidosDeLS();
