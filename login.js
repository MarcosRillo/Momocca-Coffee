
let usuariosIniciales = [ {username : "mauro", password : "12345"},
{username: "marcos", password: "54321"}];

let stringDeUsuariosIniciales = JSON.stringify(usuariosIniciales);
localStorage.setItem('users', stringDeUsuariosIniciales);

let inputUsername = document.getElementById("usuario");
    let inputPassword = document.getElementById("password");
    let submitButton = document.getElementById("btn__iniciar-sesion");

    function login(event){
        event.preventDefault();
        console.log(inputUsername)
        let userIngresado = inputUsername.value;
        let pwdIngresado = inputPassword.value;
        if (userIngresado == "" || pwdIngresado == "") {
            alert("Por favor, llene ambos campos");
          } else {
           
            let stringDeUsuariosExistentes = localStorage.getItem('users');
        let usuariosExistentes = JSON.parse(stringDeUsuariosExistentes);

      
        let usuarioEsValido = false;

       
        for (let i = 0; i < usuariosExistentes.length; i++) {
         
          let esteUsuario = usuariosExistentes[i];

         
          let esteUsername = esteUsuario.username;
          let estePassword = esteUsuario.password;

          
          
          if (esteUsername == userIngresado && estePassword == pwdIngresado) {
        
            usuarioEsValido = true;
            localStorage.setItem("loggedUser",esteUsername)
          }
         
        }

        if (usuarioEsValido) {
          alert("Usuario es valido / login exitoso");
          window.location.replace("index.html")
        } else {
          alert("Usuario no existe o es invalido / login fallo");
        }
      }
    }

  




    
