import {getFilmList} from '../../lib';

export const SEARCH_STRING_CHANGE = 'SEARCH_STRING_CHANGE';
export const SEARCH_BY_TITLE = 'SEARCH_BY_TITLE';
export const SET_FILM_LIST = 'SET_FILM_LIST';
export const IS_FETCHING = 'IS_FETCHING';

export const searchStringChange = (text)=>{
    return {
        type: SEARCH_STRING_CHANGE,
        newSearchString: text,
    }
}

export const searchByTitleChange = (flag) => {
    return {
        type: SEARCH_BY_TITLE, 
        flag: flag
    }
}

export const setFilmList = (filmList, searchString, searchByTitle) => {
    return {
        type: SET_FILM_LIST,
        filmList: filmList,
        lastSearchString: searchString,
        lastSearchByTitle: searchByTitle
    }
}

const startFetching = ()=>{
    return {
        type: IS_FETCHING,
        isFetching: true,
    }
}

const stopFetching = ()=>{
    return {
        type: IS_FETCHING,
        isFetching: false,
    }
}


export const loadFilms = ({searchString, searchByTitle})=>(
    (dispatch) =>{
        dispatch(startFetching());

        return getFilmList({
            searchString: searchString,
            byTitle: searchByTitle,
            byDirector: !searchByTitle
          }).then(result=>{
            dispatch(setFilmList(
                result,
                searchString,
                searchByTitle
            ));
            dispatch(stopFetching());
          });
    }
)


