// Definição de um array para armazenar imagens e vídeos
let mediaItems = [];

// Loop para criar 36 objetos de imagem e vídeo
for (let i = 0; i < 36; i++) {
    const newMediaItem = {
        img: "https://occ-0-1417-1123.1.nflxso.net/dnm/api/v6/Qs00mKCpRvrkl3HZAN5KwEL1kpE/AAAABVLDgogqpCjno6cUaSzY5WH2ibvqYeN2DYg0B4YBdopFjdc-Apre7z7RY9lg4_hwfXPKjJX8EkWNzwBzNxFyYvUG97IFE44tQgw.webp?r=22b",
        video: "https://cdn.pixabay.com/video/2016/04/29/2922-164833285_large.mp4",
        description: "Lorem",
        id: i
    };
    mediaItems.push(newMediaItem);
}

// Seleciona o elemento HTML com a classe "carousel-inner" e "carousel-indicators"
const carouselInner = document.querySelector(".carousel-inner");
const carouselIndicators = document.querySelector(".carousel-indicators");

// Variáveis para controlar o número de itens por linha e o número total de linhas
const itemsPerRow = 6;
const totalRows = Math.ceil(mediaItems.length / itemsPerRow);

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
    for (let j = i * itemsPerRow; j < Math.min((i + 1) * itemsPerRow, mediaItems.length); j++) {
        // Cria um elemento div para representar uma coluna no layout de grade Bootstrap
        const col = document.createElement("div");
        col.classList.add("col-md-2");
        const lastItem = (j + 1) === Math.min((i + 1) * itemsPerRow);

        // Cria um elemento img para exibir a imagem
        const img = document.createElement("img");
        img.src = mediaItems[j].img;
        img.id = j;
        img.classList.add("d-block", "w-100", "img-carousel");
        console.log(`${lastItem ? "last-video-carousel" : "Image " + (j + 1)}`)
        img.alt = `${lastItem ? "last-video-carousel" : "Image " + (j + 1)}`;
        img.dataset.video = mediaItems[j].video; // Adiciona o atributo dataset para armazenar o link do vídeo

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

// Seleciona todos os elementos com a classe 'img-carousel'
const imgElements = document.querySelectorAll('.img-carousel');

// Função para trocar imagem por vídeo
const swapToVideo = (event) => {
    const videoElement = document.createElement('video');
    const imgElement = document.getElementById(event.target.id);
    videoElement.playsinline = true;
    videoElement.autoplay = true;
    videoElement.id = event.target.id;

    console.log("imgElement", imgElement)

    if (imgElement.alt = "last-video-carousel") {
        videoElement.classList.add('video-carousel');
    } else {
        videoElement.classList.add('video-carousel', 'last-video-carousel');
    }

    // if ((event.target.id + 1) / 6 === )
    
    const sourceElement = document.createElement('source');
    console.log('swapToVideo', event, event.target.id);
    sourceElement.src = mediaItems[event.target.id]?.video;
    
    videoElement.appendChild(sourceElement);

    // Substitui o elemento atual pelo vídeo
    event.target.parentNode.replaceChild(videoElement, event.target);

    // Adiciona um manipulador de evento para voltar à imagem quando o mouse sai do vídeo
    videoElement.addEventListener('mouseleave', swapToImage);
};

// Função para trocar vídeo por imagem
const swapToImage = (event) => {
    const imgElement = document.createElement('img');
    imgElement.src = mediaItems[event.target.id].img;
    imgElement.classList.add('d-block', 'w-100', 'img-carousel');
    imgElement.alt = event.target.alt;
    imgElement.id = event.target.id;

    console.log('swapToImage', event.target, event.target.dataset, mediaItems[event.target.id].img)
    // Substitui o vídeo atual pela imagem
    event.target.parentNode.replaceChild(imgElement, event.target);

    // Adiciona novamente o manipulador de eventos de mouseenter para o elemento de imagem
    imgElement.addEventListener('mouseenter', swapToVideo);
};

// Adiciona manipuladores de eventos de mouse para cada elemento de imagem
imgElements.forEach((imgElement) => {
    imgElement.addEventListener('mouseleave', swapToVideo);
});
