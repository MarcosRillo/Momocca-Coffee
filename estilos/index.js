let descripcion = document.getElementsByClassName("descripcion");
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
  console.log(listaPedidos);
  return item;
};

//Insertar nombre del producto al array "listaPedidos" al hacer click spbre el
for (let i = 0; i < descripcion.length; i++) {
  descripcion[i].addEventListener("click", insertarItem);
  let producto = productos[i].innerHTML;
  let precio = precioProducto[i].innerHTML;
  console.log(producto);

  function insertarItem(event) {
    console.log(listaPedidos);
    crearItem(producto, precio);
    guardarLS();
  }
}

//Guardar producto de "listaPedidos" en LocalStorage
const guardarLS = () => {
  localStorage.setItem("productos", JSON.stringify(listaPedidos));
  leerLS();
};

//Insertar en HTML el item al hacer click spbre el [ARREGLAR]
const leerLS = () => {
  listaPedidos = JSON.parse(localStorage.getItem("productos"));
  console.log(listaPedidos);
  if (listaPedidos === null) {
    listaPedidos = [];
  } else {
    tbody.innerHTML = "";
    listaPedidos.forEach((element) => {
      tbody.innerHTML += `<td>${element.producto}</td>
      <td>${element.precio}</td>`;
    });
  }
};
leerLS();
