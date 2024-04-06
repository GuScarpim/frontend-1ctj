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

// Função assíncrona para buscar e atribuir os dados a mediaItems
async function fetchData() {
  try {
    await getFilms();
    // Faça o que precisar com mediaItems aqui dentro
  } catch (error) {
    console.error('Erro ao fazer requisição:', error);
  }
}

async function fetchData() {
  try {
    const mediaItems = await getFilms();

    console.log('que isso', mediaItems)
    // Seleciona o elemento HTML com a classe "carousel-inner" e "carousel-indicators"
    const carouselInner = document.querySelector(".carousel-inner");
    const carouselIndicators = document.querySelector(".carousel-indicators");

    // Variáveis para controlar o número de itens por linha e o número total de linhas
    const itemsPerRow = 6;
    const totalRows = Math.ceil(mediaItems.videos.length / itemsPerRow);

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
        col.classList.add("col-md-2");

        // Cria um elemento img para exibir a imagem
        const img = document.createElement("img");
        img.src = mediaItems.videos[j].image;
        console.log('aaa', mediaItems.videos[j]);
        img.id = j;
        img.classList.add("d-block", "w-100", "img-carousel");
        img.alt = "Image " + (j + 1);

        // Adiciona os atributos data-bs-toggle e data-bs-target
        img.setAttribute("data-bs-toggle", "modal");
        img.setAttribute("data-bs-target", "#video-modal");

        // Adiciona o evento de clique para carregar o vídeo no modal
        img.addEventListener('click', function () {
          const videoSource = document.getElementById('video-source-modal');
          const videoTitle = document.getElementById('title_modal');
          videoSource.src = mediaItems.videos[j].video_files[0].link;
          videoTitle.innerHTML = 'Vídeo ' + (j + 1);
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
      indicator.dataset.bsTarget = "#carouselExampleIndicators";
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

// Chama a função para buscar os dados e renderizar o carrossel
fetchData();
