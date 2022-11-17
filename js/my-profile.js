
// si el usuario se encuentra logueado:
if(localStorage.getItem("usuario") != null){
    const nombre = document.getElementById("nombreInput");
    const segundoNombre = document.getElementById("segundoNombreInput")
    const apellido = document.getElementById("apellidoInput");
    const segundoApellido = document.getElementById("segundoApellidoInput");
    const telefono = document.getElementById("telInput");
    const fotoPerfil = document.getElementById('pic');

// Validacion del formulario
(() => {
    'use strict'
    const forms = document.querySelectorAll('.needs-validation')
    Array.from(forms).forEach(form => {
      form.addEventListener('submit', event => {
        if (!form.checkValidity()) {
          event.preventDefault()
          event.stopPropagation()
        }
        else{
          //Evalúa si el usuario existe o no, si no existe crea el objeto con sus datos y lo guarda en localStorage
          let usrData = JSON.parse(localStorage.getItem('usrData')) || [];
          let existe = usrData.length && JSON.parse(localStorage.getItem('usrData')).some(data => data.email.toLowerCase() == localStorage.getItem("usuario"));
          if(!existe){
            usrData.push ({
              email: localStorage.getItem("usuario"),
              nombre: nombre.value,
              segundoNombre: segundoNombre.value,
              apellido: apellido.value,
              segundoApellido: segundoApellido.value,
              telefono: telefono.value,
              fotoPerfil: localStorage.getItem("profile-pic")
            })
            localStorage.setItem("usrData", JSON.stringify(usrData));
          }
          else{
            // Si el usuario ya existía, modifica sus datos y actualiza el objeto en localStorage
            usrData = usrData.filter(usr => !(usr.email == localStorage.getItem("usuario"))); // Elimina los usuarios con mismo email, para que no se repitan al ingresar los nuevos datos               
            usrData.push ({
              email: localStorage.getItem("usuario"),
              nombre: nombre.value,
              segundoNombre: segundoNombre.value,
              apellido: apellido.value,
              segundoApellido: segundoApellido.value,
              telefono: telefono.value,
              fotoPerfil: localStorage.getItem("profile-pic")
            })
            localStorage.setItem("usrData", JSON.stringify(usrData));       
          }           
        }
        form.classList.add('was-validated')
      }, false)
    })
  })()


  
  document.addEventListener("DOMContentLoaded", ()=>{
    //colocar en el campo de email el mail ingresado por el usuario en el login
    const emailInput = document.getElementById("emailInput");
    let email = localStorage.getItem("usuario");
    emailInput.value = email;

    //guardar los datos ingresados al editar el perfil, para que queden en los campos
    let usrData = JSON.parse(localStorage.getItem('usrData')) || [];
    let currentUsr = usrData.find(usr=> usr.email.toLowerCase() == localStorage.getItem("usuario"))
    let existe = usrData.length && JSON.parse(localStorage.getItem('usrData')).some(data => data.email.toLowerCase() == localStorage.getItem("usuario"));
    // si el usuario ya existe, se cargan sus datos
    if(existe){
      nombre.value = currentUsr.nombre;
      segundoNombre.value = currentUsr.segundoNombre;
      apellido.value = currentUsr.apellido;
      segundoApellido.value = currentUsr.segundoApellido;
      telefono.value = currentUsr.telefono;
      var dataImage = currentUsr.fotoPerfil;
      fotoPerfil.src = dataImage || "img/avatar.svg";
    }
    // si el usuario no existe, se muestran los campos vacíos y la foto por defecto
    else{
      nombre.value = "";
      segundoNombre.value = "";
      apellido.value = "";
      segundoApellido.value = "";
      telefono.value = "";
      var dataImage = "img/avatar.svg";
      fotoPerfil.src = dataImage;
    }
  })
}

//si el usuario no se encuentra logueado, se lo redirige al login
else{
    window.location = "index.html";
}

//funcion para ver la foto de perfil ni bien se cambia
function previewFile(input) 
{
    document.getElementById("pic").style.display = "block";
    if (input.files && input.files[0]) {
        var reader = new FileReader();

        reader.onload = function (e) {
            document.getElementById('pic').src =  e.target.result;
            localStorage.setItem("profile-pic", e.target.result);
        }
        reader.readAsDataURL(input.files[0]);
    }
}
