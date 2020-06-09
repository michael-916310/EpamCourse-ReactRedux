import {SEARCH_STRING_CHANGE, 
        SEARCH_BY_TITLE,
        SET_FILM_LIST,
        IS_FETCHING} from './searchPageActions';

const searchPageInitialState = {
    searchString: '',
    searchByTitle: true,
    filmList: [],
    lastSearchString: '',
    lastSearchByTitle: true,
    isFetching: false,
    isFetchingError: false,
}

export function searchPageReducer(state = searchPageInitialState, action) {
    switch (action.type) {
        case SEARCH_STRING_CHANGE: 
            return {...state, searchString: action.newSearchString};
        case SEARCH_BY_TITLE:
            return {...state, searchByTitle: action.flag};
        case SET_FILM_LIST:
            return {...state, filmList: action.filmList, 
                    lastSearchString: action.lastSearchString, 
                    lastSearchByTitle: action.lastSearchByTitle};
        case IS_FETCHING:
            return {...state, isFetching: action.isFetching, isFetchingError: false};
        default: 
            return state;
    }
}


