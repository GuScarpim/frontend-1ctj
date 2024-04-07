const apiKey = 'oo3SqKOxhVmDdrw3Dnk0yy1o0E4yeIDSonEXz0H66K8mt7hPeePgxWds'; // Substitua 'sua_chave_de_api' pela sua chave de API do Pexels

const url = 'https://api.pexels.com/videos/search';

// Parâmetros de busca (opcional)
const query = 'animals'; // Palavra-chave para buscar vídeos (opcional)
const perPage = 16; // Número de resultados por página (opcional)

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

const watch = document.getElementById("watch");
watch.addEventListener('click', function () {
  const videoSource = document.getElementById('video-source-modal');
  const videoTitle = document.getElementById('title_modal');
  videoSource.src = "https://videos.pexels.com/video-files/13211510/13211510-sd_640_360_30fps.mp4";
  videoTitle.innerHTML = 'Vídeo Pig';
  const videoElement = document.querySelector('.video-modal');
  videoElement.load();
  
  // Exibir o modal após carregar o vídeo
  const myModal = new bootstrap.Modal(document.getElementById('video-modal'));
  myModal.show();
});


// Função assíncrona para buscar e atribuir os dados a mediaItems para cada artigo
async function fetchDataForArticle(articleIndex) {
  try {
    const heartIconActiveClass = 'heart-icon-active'; // Mova a declaração da heartIconActiveClass para fora da função de clique

    // Defina diferentes consultas de acordo com o artigo
    let query = '';
    if (articleIndex === 1) {
      query = 'animals';
    } else if (articleIndex === 2) {
      query = 'space';
    } else if (articleIndex === 3) {
      query = 'marine';
    }

    const mediaItems = await getVideos(query, perPage);

    const carouselInner = document.querySelector(`.carousel-inner-${articleIndex}`);
    const carouselIndicators = document.querySelector(`.carousel-indicators-${articleIndex}`);

    // Variáveis para controlar o número de itens por linha e o número total de linhas
    const itemsPerRow = 6;
    const totalRows = Math.ceil(mediaItems.videos.length / itemsPerRow);

    // Obtém os itens favoritos do localStorage ou inicializa um array vazio
    let favoriteVideos = JSON.parse(localStorage.getItem(`favoriteVideos${articleIndex}`)) || [];
    // Loop para criar cada linha do carrossel
    for (let i = 0; i < totalRows; i++) {
      // Cria um elemento div para representar uma linha no carrossel
      const row = document.createElement("div");
      row.classList.add("carousel-item");
      if (i === 0) {
        row.classList.add("active");
      }

      // Cria um elemento div para conter os itens da linha
      const rowInner = document.createElement("div");
      rowInner.classList.add("row");

      // Loop para adicionar os itens à linha
      for (let j = i * itemsPerRow; j < Math.min((i + 1) * itemsPerRow, mediaItems.videos.length); j++) {
        // Cria um elemento div para representar uma coluna no layout de grade Bootstrap
        const col = document.createElement("div");
        col.classList.add("col-md-2", "position-relative");

        const heartIcon = document.createElement("i");
        heartIcon.classList.add("fas", "fa-heart", "heart-icon");
        col.appendChild(heartIcon); // Adiciona o ícone de coração à coluna

        // Adiciona um event listener para lidar com o clique no ícone de coração
        heartIcon.addEventListener('click', function () {
          // Cria um objeto representando o vídeo
          const videoObj = {
            "id": mediaItems.videos[j].id,
            "alt": "Image " + (mediaItems.videos[j].id),
            "image": mediaItems.videos[j].image,
            "video": mediaItems.videos[j].video_files[0].link
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
          localStorage.setItem(`favoriteVideos${articleIndex}`, JSON.stringify(favoriteVideos));
        });

        // Verifica se o vídeo está nos favoritos e adiciona a classe heart-icon-active se estiver
        if (favoriteVideos.some(item => item.id === mediaItems.videos[j].id)) {
          heartIcon.classList.add(heartIconActiveClass);
        }

        // Cria um elemento img para exibir a imagem
        const img = document.createElement("img");
        img.src = mediaItems.videos[j].image;
        img.id = mediaItems.videos[j].id;
        img.classList.add("d-block", "w-100", "img-carousel");
        img.alt = "Image " + (mediaItems.videos[j].id);

        // Adiciona os atributos data-bs-toggle e data-bs-target
        img.setAttribute("data-bs-toggle", "modal");
        img.setAttribute("data-bs-target", "#video-modal");

        // Adiciona o evento de clique para carregar o vídeo no modal
        img.addEventListener('click', function () {
          const videoSource = document.getElementById('video-source-modal');
          const videoTitle = document.getElementById('title_modal');
          videoSource.src = mediaItems.videos[j].video_files[0].link;
          videoTitle.innerHTML = 'Vídeo ' + (mediaItems.videos[j].id);
          const videoElement = document.querySelector('.video-modal');
          videoElement.load();
        });

        // Adiciona a imagem à coluna
        col.appendChild(img);
        // Adiciona a coluna à linha
        rowInner.appendChild(col);
      }

      // Adiciona a linha completa ao carrossel
      row.appendChild(rowInner);
      carouselInner.appendChild(row);

      // Cria um indicador para a linha atual
      const indicator = document.createElement("button");
      indicator.type = "button";
      indicator.dataset.bsTarget = `.carousel-indicators-${articleIndex}`;
      indicator.dataset.bsSlideTo = i;

      if (i === 0) {
        indicator.classList.add("active");
      }

      indicator.setAttribute("aria-current", i === 0 ? "true" : "false");
      indicator.setAttribute("aria-label", `Slide ${i + 1}`);
      carouselIndicators.appendChild(indicator);
    }
  } catch (error) {
    console.error(error);
  }
}

// Chama a função para buscar os dados e renderizar os carrosséis para cada artigo
fetchDataForArticle(1); // Primeiro artigo
fetchDataForArticle(2); // Segundo artigo
fetchDataForArticle(3); // Terceiro artigo
