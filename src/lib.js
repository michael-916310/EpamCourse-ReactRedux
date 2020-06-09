const url="https://my-json-server.typicode.com/michael-916310/my-json-server/movies";
export const baseDeployURL="/EpamCourse-ReactRedux-Deploy";

function loadFilmList (){
  return fetch(url)
  .then(response => {
    if (response.ok) {
      return response.json()
    } else {
      throw new Error(`Fetching data-wrong response-status:${response.status}`);
    }
  }) 
  .then(data => {
    return data;
  })
  .catch(e=>console.log(e));
}

export function getFilmList({searchString, searchArray, byTitle, byDirector, byID}){

  return loadFilmList()
    .then((fullList)=>{

      return fullList.filter((el)=>{
        let i;
        if (byTitle) {
          i = el.title.toUpperCase();
        } else if (byDirector) {
          i = el.director.toUpperCase();
        } else if (byID) {
          i = el.id;
          return searchArray.includes(i);
        } else {
          return false;
        }
        
        return i.includes(searchString.toUpperCase())
      })

    })

}

export const getFavoritesArray=()=>{
  let favString = localStorage.getItem('favoritesArray');
  let favArr=[];
  if (favString) {
    favArr = favString.split(',');
  }   
  return favArr.map((item)=>+item)
}

