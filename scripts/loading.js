// Função para mostrar a div de loading
function showLoading() {
    document.getElementById("loading-container").style.opacity = 1;
  }
  
  // Função para esconder a div de loading
  function hideLoading() {
    setTimeout(function() {
      document.getElementById("loading-container").style.opacity = 0;
      document.getElementById("loading-container").style.display = "none";
    }, 1000); // Tempo de espera de 2 segundos
  }
  
  // Chamar a função showLoading antes de buscar os dados
  showLoading();
  
//   // Chamar a função fetchDataForArticle para cada artigo
//   fetchDataForArticle(1);
//   fetchDataForArticle(2);
//   fetchDataForArticle(3);
  
  // Chamar a função hideLoading após a busca pelos dados
  hideLoading();