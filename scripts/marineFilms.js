const apiKey = 'oo3SqKOxhVmDdrw3Dnk0yy1o0E4yeIDSonEXz0H66K8mt7hPeePgxWds'; // Substitua 'sua_chave_de_api' pela sua chave de API do Pexels

const url = 'https://api.pexels.com/videos/search';

// Parâmetros de busca (opcional)
const query = ''; // Palavra-chave para buscar vídeos (opcional)
const perPage = 48; // Número de resultados por página (opcional)

// Construção da URL de requisição incluindo os parâmetros de busca
const searchUrl = `${url}?query=${query}&per_page=${perPage}`;

// Função para fazer a requisição e obter os dados
async function getFilms() {
  const response = await fetch(searchUrl, {
    headers: {
      Authorization: apiKey
    }
  });
  const data = await response.json();
  return data;
}

// Função para buscar vídeos da API do Pexels
async function getVideos(query, perPage) {
  const response = await fetch(`${url}?query=${query}&per_page=${perPage}`, {
    headers: {
      Authorization: apiKey
    }
  });
  const data = await response.json();
  return data;
}

// Função assíncrona para buscar e atribuir os dados a mediaItems para cada artigo
async function fetchDataForArticle() {
  try {
    // Defina diferentes consultas de acordo com o artigo
    let query = 'marine';
    const heartIconActiveClass = 'heart-icon-active'; // Mova a declaração da heartIconActiveClass para fora da função de clique
    const mediaItems = await getVideos(query, perPage);

    const carouselInner = document.querySelector(`.animals-content-imgs`);

    const rowInner = document.createElement("div");
    rowInner.classList.add("row");

    // Obtém os itens favoritos do localStorage ou inicializa um array vazio
    let favoriteVideos = JSON.parse(localStorage.getItem(`favoriteVideos2`)) || [];

    // Loop para adicionar os itens à linha
    for (let i = 0; i < mediaItems.videos.length; i++) {
      // Cria um elemento div para representar uma coluna no layout de grade Bootstrap
      const col = document.createElement("div");
      col.classList.add("col-md-2", "mb-4", "position-relative");

      const heartIcon = document.createElement("i");
      heartIcon.classList.add("fas", "fa-heart", "heart-icon");
      col.appendChild(heartIcon); // Adiciona o ícone de coração à coluna

      // Adiciona um event listener para lidar com o clique no ícone de coração
      heartIcon.addEventListener('click', function () {
        // Cria um objeto representando o vídeo
        const videoObj = {
          "id": mediaItems.videos[i].id,
          "alt": "Image " + (mediaItems.videos[i].id),
          "image": mediaItems.videos[i].image,
          "video": mediaItems.videos[i].video_files[0].link
        };

        // Verifica se o vídeo já está nos favoritos
        const videoIndex = favoriteVideos.findIndex(item => item.id === videoObj.id);

        if (videoIndex !== -1) { // Se o vídeo já estiver nos favoritos, remove-o
          favoriteVideos.splice(videoIndex, 1);
          heartIcon.classList.remove(heartIconActiveClass);
        } else { // Se o vídeo não estiver nos favoritos, adiciona-o
          favoriteVideos.push(videoObj);
          heartIcon.classList.add(heartIconActiveClass);
        }

        // Atualiza o localStorage com os novos itens favoritos
        // localStorage.setItem(localStorageKey, JSON.stringify(favoriteVideos));
        localStorage.setItem(`favoriteVideos2`, JSON.stringify(favoriteVideos));
      });

      // Verifica se o vídeo está nos favoritos e adiciona a classe heart-icon-active se estiver
      if (favoriteVideos.some(item => item.id === mediaItems.videos[i].id)) {
        heartIcon.classList.add(heartIconActiveClass);
      }

      // Cria um elemento img para exibir a imagem
      const img = document.createElement("img");
      img.src = mediaItems.videos[i].image;
      img.id = i;
      img.classList.add("d-block", "w-100", "img-carousel");
      img.alt = "Image " + (i + 1);
    
      // Adiciona os atributos data-bs-toggle e data-bs-target
      img.setAttribute("data-bs-toggle", "modal");
      img.setAttribute("data-bs-target", "#video-modal");
    
      // Adiciona o evento de clique para carregar o vídeo no modal
      img.addEventListener('click', function () {
        const videoSource = document.getElementById('video-source-modal');
        const videoTitle = document.getElementById('title_modal');
        videoSource.src = mediaItems.videos[i].video_files[0].link;
        videoTitle.innerHTML = 'Vídeo ' + (i + 1);
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