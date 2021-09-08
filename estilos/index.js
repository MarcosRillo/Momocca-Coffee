let cardProducto = document.getElementsByClassName("card-producto");
let productos = document.getElementsByClassName("producto");
let precioProducto = document.getElementsByClassName("producto-precio");
let table = document.querySelector("table");
let tbody = document.querySelector("tbody");
let listaPedidos = JSON.parse(localStorage.getItem("productos")) || [];

//se supone que es para crear un arreglo con el precio y producto
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
    }else{
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
  console.log(listaPedidos);
  if (listaPedidos === null) {
    listaPedidos = [];
  } else if (listaPedidos) {
    tbody.innerHTML = "";
    listaPedidos.forEach((element) => {
      tbody.innerHTML += `<td> <i class="fas fa-times-circle"></i> ${element.producto}</td>
      <td>${element.precio}</td>`;
    });

    
  }
};

leerLS();
