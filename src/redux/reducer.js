import {combineReducers} from 'redux';
import {searchPageReducer as searchPage} from '../Pages/SearchPage/searchPageReducer'
import {favoritesPageReducer as favoritesPage} from './../Pages/FavoritesPage/favoritesPageReducer';
import {filmPageReducer as filmPage} from './../Pages/FilmPage/filmPageReducer';

export const reducer = combineReducers({
    searchPage, 
    favoritesPage,
    filmPage
});

