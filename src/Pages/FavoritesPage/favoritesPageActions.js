import {getFilmList} from '../../lib';

export const SET_FAVORITES_FILM_LIST = 'SET_FAVORITES_FILM_LIST';
export const IS_FAVORITES_FETCHING = 'IS_FAVORITES_FETCHING';

const setFavoritesFilmList = (filmList)=>{
    return{
        type: SET_FAVORITES_FILM_LIST,
        filmList: filmList,
    }
}

const startFetching = ()=>{
    return {
        type: IS_FAVORITES_FETCHING,
        isFetching: true,
    }
}

const stopFetching = ()=>{
    return {
        type: IS_FAVORITES_FETCHING,
        isFetching: false,
    }
}

export const loadFavoritesFilmList = (idArray) => (
    (dispatch)=>{

        dispatch(startFetching());
        return getFilmList({
            searchArray: idArray, 
            byID: true,
          }).then(result=>{
            dispatch( setFavoritesFilmList(result) );
            dispatch(stopFetching());
          })
    }
)

