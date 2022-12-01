export {fetchImages};
import Notiflix from 'notiflix';
import axios from 'axios';

// async fetchImages (query, page) {
//     const KEY = `31735095-684ab1f66144313a79ef81b6d`;
//     const url = ` https://pixabay.com/api/`;
//     try {
//         const response = await axios.get(`${url}?key=${KEY}&q=${query}&orientation=horisontal&safesearch=true&image_type=photo&per_page=40&page=${page}`);
//         console.log(response.data);
//         return response.data;
//     }
//         .catch (error) {
//     // обробка помилки
//       throw new Error(error)
//     console.log(error);
//   }
        
    
// }
    
async function fetchImages(query, page) {
  const KEY = `31735095-684ab1f66144313a79ef81b6d`;
  const url = `https://pixabay.com/api/`;
  
  const response = await axios.get(`${url}?key=${KEY}&q=${query}&orientation=horizontal&safesearch=true&image_type=photo&per_page=40&page=${page}`);
  if(!response.data.total || !query)
  {console.log("aaaaaaaa");
    throw new Error(`Find ${ response.data.total } matches`)}
    
  console.log(response.data.hits);
  return (response.data);
  
  
}