/* eslint-disable jsx-a11y/anchor-is-valid */
import React, { Fragment } from 'react'

import {SearchComp} from '../../Components/SearchComp/SearchComp';
import {FilmListComp as FilmList} from '../../Components/FilmListComp/FilmListComp';
import {FooterComp as Footer} from '../../Components/FooterComp/FooterComp';
import {SpinnerComp} from './../../Components/SpinnerComp/SpinnerComp';

import {baseDeployURL} from '../../lib';
import {searchStringChange, searchByTitleChange, loadFilms, setFilmList} from './searchPageActions';
import {connect} from 'react-redux';

import './SearchPage.scss';

const SearchPage = (props)=> {

  let URLFilm = props.match.params.filmName || '';
  let URLSearchByTitle;
  
  let url = new URL(window.location.href);
  if (!url.searchParams.has('searchByTitle')) {
    URLSearchByTitle = true;
  }else {
    URLSearchByTitle = Boolean(url.searchParams.get('searchByTitle'));
  }


  if  ((URLFilm !== props.lastSearchString) || 
      (URLSearchByTitle !== props.lastSearchByTitle)) {
    props.loadFilms({
      searchString: URLFilm, 
      searchByTitle: URLSearchByTitle}
      );

    props.searchStringChange(URLFilm);
    props.searchByTitleChange(URLSearchByTitle);
  }

  const handleSearchStringChange = (e)=>{
    props.searchStringChange(e.target.value);
  }

  const handleSearchByChange = (isbyTitle)=>{
    props.searchByTitleChange(isbyTitle);
  }


  const handleSearch=()=>{
    // Если в URL что-то не соотвествует тому что в store - редиректим как в store
    if  ((URLFilm !== props.searchString) || 
        (URLSearchByTitle !== props.SearchByTitle)) {

      let url= new URL(`${baseDeployURL}/search/${props.searchString}`, window.location.origin);
      url.searchParams.set('searchByTitle', props.searchByTitle ? 1 :'');
      window.location.assign(url);
    }
  }

  const sortFilms = (byDate)=>{
    let compare;

    if (byDate) {
      compare = (item1, item2)=>{
        return (+item1.year > +item2.year) ? -1 : 1;
      }
    } else {
      compare = (item1, item2)=>{
        return (+item1.runtime > +item2.runtime) ? -1 : 1;
      }
    }

    let newList = [...props.filmList].sort(compare);
    props.setFilmList(newList, URLFilm, URLSearchByTitle);
  }

  const handleSortByRuntime=(e)=>{
    e.preventDefault();
    sortFilms(false);
  }

  const handleSortByDate=(e)=>{
    e.preventDefault()
    sortFilms(true);
  }  

  /* рендер-пропс для компонента FilmList */
  const renderFistLine = ()=>{
    let result;

    if (props.filmList.length) {

     result = (
        /* сформируем строку вверху */
        <Fragment>
          <div className="film-list-comp__top-line">
            <div>
              {props.filmList.length} movies found
            </div>
            <div>
              SORT BY
              <a 
                className="film-list-comp__sort-by-release-date" 
                href="#" 
                onClick={handleSortByDate}
              >release date</a>
              <a 
                className="film-list-comp__sort-by-runtime" 
                href="#"
                onClick={handleSortByRuntime}
                >runtime</a>
            </div>
          </div>
        </Fragment>
      )
    } 

    return result;
  }

  return (
    <React.Fragment>

      <div className='search-page-header'>
        <SearchComp 
          searchString={props.searchString}
          searchByTitle={props.searchByTitle}

          onSearchStringChange={handleSearchStringChange} 
          onSubmit={handleSearch}
          onSearchByChange = {handleSearchByChange}/>
      </div>

      <div className='search-page-result'>
        {(props.filmList.length) ? 
          (
          <FilmList 
            renderFirstLine={renderFistLine()} 
            filmList={props.filmList}
            flagAddToFavorites={true}
          />) : 
          (
            <div className='search-page-empty-result'>No films found</div>
          )
        }

      </div>

      <div className='search-page-footer'>
        <Footer/>
      </div>

      <SpinnerComp isLoading={props.isFetching}/>
    </React.Fragment>
    )
} 

const mapStateToProps = (state)=>{
  const s = state.searchPage;
  return {
    searchString: s.searchString,
    searchByTitle: s.searchByTitle,
    filmList: s.filmList, 
    isFetching: s.isFetching,
    lastSearchString: s.lastSearchString,
    lastSearchByTitle: s.lastSearchByTitle,
  }
}

const mapDispatchToProps = {
  searchStringChange, 
  searchByTitleChange, 
  loadFilms,
  setFilmList,
}

export default connect (mapStateToProps, mapDispatchToProps) (SearchPage);

