import {SET_FAVORITES_FILM_LIST, IS_FAVORITES_FETCHING} from './favoritesPageActions';


const favoritesPageInitialState = {
    favoritesList : [],
    isFetching: false,
}

export function favoritesPageReducer(state = favoritesPageInitialState, action){
    switch (action.type) {
        case SET_FAVORITES_FILM_LIST:
            return {...state, favoritesList: action.filmList};
        case IS_FAVORITES_FETCHING:
            return {...state, isFetching: action.isFetching, isFetchingError: false};            
        default: 
            return state;
    }
}

