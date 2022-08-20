
(function () {
    const form = document.querySelector('.needs-validation');

    form.addEventListener('submit', function(event) {
     event.preventDefault();

     if (form.checkValidity() === false) {
       form.classList.add('was-validated');
     } else {
       location.href = ("home.html");
     }
    }, false);
    })()
    



  

