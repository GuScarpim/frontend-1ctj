// Função para buscar vídeos da API do Pexels
async function getVideos() {
  const localStorageKey1 = 'favoriteVideos1';
  const localStorageKey2 = 'favoriteVideos2';
  const localStorageKey3 = 'favoriteVideos3';

  // Recupera os itens favoritos de cada localStorage
  let favoriteVideos = [];

  const favoriteVideos1 = JSON.parse(localStorage.getItem(localStorageKey1)) || [];
  const favoriteVideos2 = JSON.parse(localStorage.getItem(localStorageKey2)) || [];
  const favoriteVideos3 = JSON.parse(localStorage.getItem(localStorageKey3)) || [];

  // Se todos os localStorage existirem, adicione seus itens ao array combinado
  favoriteVideos = [...favoriteVideos1, ...favoriteVideos2, ...favoriteVideos3];

  // Atualize o localStorage com o novo array combinado
  localStorage.setItem('favoriteVideos', JSON.stringify(favoriteVideos));
  return favoriteVideos;
}


// Função assíncrona para buscar e atribuir os dados a mediaItems para cada artigo
async function fetchDataForArticle() {
  try {
    // Defina diferentes consultas de acordo com o artigo
    const mediaItems = await getVideos();
    console.log(mediaItems.length);

    const carouselInner = document.querySelector(`.animals-content-imgs`);

    const rowInner = document.createElement("div");
    rowInner.classList.add("row");

     // Verifica se existem vídeos favoritos
     if (mediaItems.length === 0) {
      document.querySelector(`.title`).style.display = "none";

      const h1 = document.createElement("h1");
      const div = document.createElement("div");
      h1.classList.add("text-not-has-favorite");
      h1.innerHTML = "Não existe nenhum vídeo listado como favorito ainda!"

      div.appendChild(h1);
      carouselInner.appendChild(div);
    } 

    // Loop para adicionar os itens à linha
    for (let i = 0; i < mediaItems.length; i++) {
      // Cria um elemento div para representar uma coluna no layout de grade Bootstrap
      const col = document.createElement("div");
      col.classList.add("col-md-2", "mb-4", "position-relative");

      // Cria um elemento img para exibir a imagem
      const img = document.createElement("img");
      img.src = mediaItems[i].image;
      img.id = mediaItems[i].id;
      img.classList.add("d-block", "w-100", "img-carousel");
      img.alt = "Image " + mediaItems[i].id;

      // Adiciona os atributos data-bs-toggle e data-bs-target
      img.setAttribute("data-bs-toggle", "modal");
      img.setAttribute("data-bs-target", "#video-modal");

      // Adiciona o evento de clique para carregar o vídeo no modal
      img.addEventListener('click', function () {
        const videoSource = document.getElementById('video-source-modal');
        const videoTitle = document.getElementById('title_modal');
        videoSource.src = mediaItems[i].video;
        videoTitle.innerHTML = 'Vídeo ' + mediaItems[i].id;
        const videoElement = document.querySelector('.video-modal');
        videoElement.load();
      });

      // Adiciona a imagem à coluna
      col.appendChild(img);

      // Adiciona a coluna à linha
      rowInner.appendChild(col);
    }

    // Adiciona a linha completa ao carrossel
    carouselInner.appendChild(rowInner);
  } catch (error) {
    console.error(error);
  }
}

// Chama a função para buscar os dados e renderizar os carrosséis para cada artigo
fetchDataForArticle();