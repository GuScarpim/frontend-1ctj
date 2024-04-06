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

export default getFilms;

// const apiKey = 'oo3SqKOxhVmDdrw3Dnk0yy1o0E4yeIDSonEXz0H66K8mt7hPeePgxWds'; // Substitua 'sua_chave_de_api' pela sua chave de API do Pexels

// const url = 'https://api.pexels.com/videos/search';

// // Parâmetros de busca (opcional)
// const query = 'animals'; // Palavra-chave para buscar vídeos (opcional)
// const perPage = 16; // Número de resultados por página (opcional)

// // Construção da URL de requisição incluindo os parâmetros de busca
// const searchUrl = `${url}?query=${query}&per_page=${perPage}`;

// // Função para fazer a requisição e obter os dados
// async function getFilms() {
//   const response = await fetch(searchUrl, {
//     headers: {
//       Authorization: apiKey
//     }
//   });
//   const data = await response.json();
//   return data;
// }

// // Função assíncrona para buscar e atribuir os dados a mediaItems
// async function fetchData() {
//   try {
//     await getFilms();
//     // Faça o que precisar com mediaItems aqui dentro
//   } catch (error) {
//     console.error('Erro ao fazer requisição:', error);
//   }
// }
