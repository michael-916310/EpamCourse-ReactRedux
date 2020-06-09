import {getFilmList} from './../../lib';

export const FILM_PAGE_SET_FILM_DESC = 'FILM_PAGE_SET_FILM_DESC';
export const FILM_PAGE_SET_FILM_LIST = 'FILM_PAGE_SET_FILM_LIST';
export const IS_FILM_PAGE_DESC_FETCHING = 'IS_FILM_PAGE_DESC_FETCHING';


const setFilmDesc=(result)=>{
    return {
        type: FILM_PAGE_SET_FILM_DESC,

        posterUrl: result.posterUrl,
        title: result.title,
        year: result.year,
        runtime: result.runtime,
        plot: result.plot,
        director: result.director,
        actors: result.actors
    }
}

const startFilmDescFetching = () =>{
    return {
        type: IS_FILM_PAGE_DESC_FETCHING,
        isFetching: true,
    }
}

const stopFilmDescFetching = () =>{
    return {
        type: IS_FILM_PAGE_DESC_FETCHING,
        isFetching: false,
    }
}

const setFilmList = (result) => {
    return {
        type:FILM_PAGE_SET_FILM_LIST,
        filmList: result,
    }
}

export const loadFilmDesc = (filmTitle) => (
    (dispatch)=>{

        dispatch(startFilmDescFetching());
        return getFilmList({
            searchString: filmTitle, 
            byTitle:true,
          }).then(result=>{
            if (Array.isArray(result) && result.length === 1) {
                dispatch(setFilmDesc(result[0]));
            }
            dispatch(stopFilmDescFetching());
          })
    }
)

export const loadFilmByDirector = (director) => (
    (dispatch)=>{

        dispatch(startFilmDescFetching());        
        return getFilmList({
            searchString: director,
            byDirector:true,            
        }).then((result)=>{
            if (result.length>0){
                dispatch(setFilmList(result));
            }
            dispatch(stopFilmDescFetching());            
        })      
    }
)

