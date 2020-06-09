import {
    FILM_PAGE_SET_FILM_DESC, 
    IS_FILM_PAGE_DESC_FETCHING,
    FILM_PAGE_SET_FILM_LIST} from './filmPageActions';

const filmPageInitialState = {
    posterUrl: '',
    title: '',
    year: '',
    runtime: '',
    plot: '',
    director: '',
    actors: '',
    
    filmList:[],
    isFetching: false,    
}

export function filmPageReducer(state=filmPageInitialState, action) {
    switch (action.type) {
        case FILM_PAGE_SET_FILM_DESC:
            return {
                ...state, 
                posterUrl: action.posterUrl, 
                title: action.title, 
                year: action.year,
                runtime: action.runtime,
                plot: action.plot,
                director: action.director,
                actors: action.actors,
            }
        case FILM_PAGE_SET_FILM_LIST:
            return {...state, filmList:action.filmList};
        case IS_FILM_PAGE_DESC_FETCHING: 
            return {...state, isFetching: action.isFetching }
        default: 
            return state;
    }
}