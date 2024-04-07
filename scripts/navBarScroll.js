document.addEventListener("DOMContentLoaded", function () {
    var scroll_start = 0; // Inicializa a variável de controle de scroll
    var startchange = document.querySelector('nav'); // Obtém o elemento de referência de início da mudança

    if (startchange) { // Verifica se o elemento de referência existe
      var offset = startchange.offsetTop;
      window.addEventListener('scroll', function () { // Adiciona um listener de evento de scroll à janela
        scroll_start = window.pageYOffset; // Obtém a posição de scroll atual
        if (scroll_start > offset) { // Verifica se o scroll passou da posição do elemento de referência
          document.querySelector('.navbar').classList.add('navbar-custom'); // Adiciona a classe .navbar-custom à navbar
        } else {
          document.querySelector('.navbar').classList.remove('navbar-custom'); // Remove a classe .navbar-custom da navbar
        }
      });
    }
  });