
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
          // guardar en localStorage los datos del usuario
            localStorage.setItem("nombre", nombre.value);
            localStorage.setItem("segundoNombre", segundoNombre.value);
            localStorage.setItem("apellido", apellido.value);
            localStorage.setItem("segundoApellido", segundoApellido.value);
            localStorage.setItem("telefono", telefono.value);
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
    nombre.value = localStorage.getItem("nombre");
    segundoNombre.value = localStorage.getItem("segundoNombre");
    apellido.value = localStorage.getItem("apellido");
    segundoApellido.value = localStorage.getItem("segundoApellido");
    telefono.value = localStorage.getItem("telefono");
    if(localStorage.getItem('profile-pic') !=null){
      var dataImage = localStorage.getItem('profile-pic');
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
