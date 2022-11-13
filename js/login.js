// Validacion de los datos ingresados
(function () {
    const form = document.querySelector('.needs-validation');

    form.addEventListener('submit', function(event) {
     event.preventDefault();

     if (form.checkValidity() === false) {
       form.classList.add('was-validated');
     } else {
      const usuario = document.querySelector("#floatingInput");
     localStorage.setItem("usuario", usuario.value);
       location.href = ("home.html");
     }
     
    }, false);
    })()
    

  




  

