var boton1 = document.getElementById('boton1');

boton1.addEventListener('click', function(event) {
    event.preventDefault();
    var introP1 = document.querySelector('.introP1');
    introP1.scrollIntoView({ behavior: "auto" });
});