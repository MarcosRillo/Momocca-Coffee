<html lang="en">
<head>
  <meta charset="UTF-8">
  <meta http-equiv="X-UA-Compatible" content="IE=edge">
  <meta name="viewport" content="width=device-width, initial-scale=1.0">
  <title>Login</title>
</head>
<body>
  <form>
    <!-- necesito 3 elementos basicos para un login:
    username, password y un boton de enviar -->
    <input placeholder="nombre de usuario" type="text" id="username" />
    <input placeholder="contraseña" type="password" id="password" />
    <button id="submit">Acceder</button>
  </form>
  <script>
    // Aca defino dos usuarios pre-existentes
    // es un arreglo (corchetes), pero en vez de tener numeros o strings
    // tiene objetitos (*)
    let usuariosIniciales = [
      {
        username: "mauro", // cada objeto tiene 2 propiedades, un username
        password: "123456" // y una contrasenia
      },
      {
        username: "ramiro",
        password: "abcdef"
      }
    ];

    // Ahora guardo los usuarios iniciales en el localStorage
    // El localStorage es un sistema parecido a una DB como vos dijiste, pero es local en
    // el browser; si cerras y abris la pestaña la informacion sigue ahi, a diferencia de una 
    // variable normal que desapareceria

    // El problema es que el localstorage guarda SOLO cadenas de texto
    // Hay una herramienta en javascript que permite convertir objetos y arrays en cadenas
    // en la siguiente linea, usamos esa herramienta para generar una string a partir del
    // arreglo de usuarios
    
    
    let stringDeUsuariosIniciales = JSON.stringify(usuariosIniciales);
    // Dicha cadena de texto (stringDeUsuariosIniciales) puede ser guardada ahora en el
    // localStorage
    
    localStorage.setItem('users', stringDeUsuariosIniciales);
    // ahora los usuarios estan guardados en el localStorage bajo el nombre "users"

    // Aca abajo defino 3 variables que me van a servir para
    // sostener los 3 elementos html que me interesan: el input del user, 
    // el de la contrasenia y el del boton para enviarlos
    let inputUsername = document.getElementById("username");
    let inputPassword = document.getElementById("password");
    let submitButton = document.getElementById("submit");

    // Esta funcion que sigue me va a servir para decile
    // "cuando haga clic, correme esta funcion"

    function login() {
      // la funcion toma los dos inputs y saca el valor ingresado de cada uno
      // y los guarda en dos variables respectivamente
      let userIngresado = inputUsername.value;
      let pwdIngresado = inputPassword.value;

      // si el usuario o la contrasenia estan vacios ni siquiera me gasto en hacer nada
      if (userIngresado == "" || pwdIngresado == "") {
        // sencillamente se muestra un alert diciendo que hay campos vacios
        // llenalo todo, no sea pancho
        alert("Por favor, llene ambos campos");
      } else {
        // si los campos estan llenos, entonces puedo seguir:
        // Asi como antes habia guardado los usuarios en el localStorage, ahora tengo que
        // sacarlos de ahi; para eso uso el getItem usando el nombre "users"
        let stringDeUsuariosExistentes = localStorage.getItem('users');
        // ahora tengo los usuarios stringDeUsuariosExistentes
        // PERO ESO ES UNA STRING. Necesitamos algo que se pueda manipular
        // Necesitamos convertirlo al tipo de datos original (antes era un arreglo de objetos)
        // para eso uso el .parse
        let usuariosExistentes = JSON.parse(stringDeUsuariosExistentes);
        // Ahora si, usuariosExistentes vuelve a ser el arreglo de usuarios que 
        // teniamos originalmente
        
        // Ahora defino una variable, una bandera. Inicialmente el usuario no es valido
        // hasta que se pruebe lo contrario, por eso empieza en false
        let usuarioEsValido = false;

        // ahora usamos un for para recorrer el arreglo de usuarios existentes que defini
        // al principio del script (*)
        for (let i = 0; i < usuariosExistentes.length; i++) {
          // esta linea guarda en una variable al usuario del indice i
          // es decir, la primera vuelta (i es 0) va a tener al user de mauro
          // la segunda vuelta (i es 1) va a tener al user de ramiro, etc
          let esteUsuario = usuariosExistentes[i];

          // sabiendo cual es el usuario de "esta vuelta",
          // puedo acceder al username y password y los guardo en otras variables para comodidad
          let esteUsername = esteUsuario.username;
          let estePassword = esteUsuario.password;

          // ahora si, comparo:
          // es el username de esta vuelta igual al username ingresado por el formulario?
          // y ademas, es el password de esta vuelta igual al password ingresado por formulario?
          
          if (esteUsername == userIngresado && estePassword == pwdIngresado) {
            // si son iguales, entonces quiere decir que el usuario existe
            // y que la contrasenia es correcta tambien, BIEN AHI
            usuarioEsValido = true;
          }
          // sino quiere decir que esta vuelta no coincidio y hay que seguir
          // a chequear el proximo elemento del arreglo
        }

        // en este punto ya termino el for y nuestra bandera va a decirnos efectivamente
        // si el usuario existia y es valido o no, entonces podemos mostrar las cosas asi
        if (usuarioEsValido) {
          alert("Usuario es valido / login exitoso");
        } else {
          alert("Usuario no existe o es invalido / login fallo");
        }
      }
    }

    // Esto esta fuera del contexto de la funcion de login
    // esta linea simplemente dice: cuando venga un salame y haga click en el
    // boton, correme la funcion login

    submitButton.addEventListener("click", login, false);

  </script>
</body>
</html>