let producto = document.getElementsByClassName("producto");
let table = document.querySelector("table");
let tbody = document.querySelector("tbody");
let listaPedidos = [];

for (let i = 0; i < producto.length; i++) {
  producto[i].addEventListener("click", createItem);

  function createItem(event) {
    listaPedidos.push(event.target.innerHTML);

    guardarLS(listaPedidos);
    leerLS()
  }
}

const guardarLS = ()=>{
 localStorage.setItem('producto', JSON.stringify(listaPedidos))
}

//document.addEventListener('DOMContentLoaded', leerLS)

const leerLS = () =>{
    listaPedidos = JSON.parse(localStorage.getItem('producto'))
    if(listaPedidos === null){
        listaPedidos = []
    }else{
        listaPedidos.forEach(element => {
            console.log(element)
            tbody.innerHTML += `<td>${listaPedidos}</td>`
        });
    }
    }