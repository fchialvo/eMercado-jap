
(function () {
    const form = document.querySelector('.needs-validation');

    form.addEventListener('submit', function(event) {
     event.preventDefault();

     if (form.checkValidity() === false) {
       form.classList.add('was-validated');
     } else {
       location.href = ("home.html");
     }
     const usuario = document.querySelector("#floatingInput");
     localStorage.setItem("usuario", usuario.value);
    }, false);
    })()
    





  

