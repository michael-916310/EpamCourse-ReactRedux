import React from 'react';
import {FooterComp} from './../../Components/FooterComp/FooterComp';
import {FilmListComp} from './../../Components/FilmListComp/FilmListComp'
import {baseDeployURL, getFavoritesArray} from './../../lib';
import {loadFavoritesFilmList} from './favoritesPageActions';
import {SpinnerComp} from './../../Components/SpinnerComp/SpinnerComp';
import {connect} from 'react-redux';

import './FavoritesPage.scss';

class FavoritesPage extends React.Component {

  refreshFilms=()=>{
    this.props.loadFavoritesFilmList(getFavoritesArray());
  }

  componentDidMount(){
    this.props.loadFavoritesFilmList(getFavoritesArray());
  }

  handleGoToSerach(){
    window.location.assign(`${baseDeployURL}`);
  }

  
  render(){

    return(
      <React.Fragment>
        <div className='favorites-page-header'>
          <div className='favorites-page-outer-container'>
            <div className='favorites-page-inner-container'>
              <div className='favorites-page-container'>
                <div className='favorites-page-caption'>
                  YOUR FAVORITES FILMS
                </div>
                <div>
                  <input 
                    type='button' 
                    className='favorites-page-button'
                    onClick={this.handleGoToSerach}
                    value='go to SEARCH' />
                </div>
              </div>
            </div>
          </div>
        </div>

        <div className='favorites-page-film-list'>
          {this.props.favoritesList.length === 0 ? 
            (
              <div className='favorites-page-empty-result'>No films added to favorites</div>
            )
          : 
            (<FilmListComp 
              filmList={this.props.favoritesList}
              flagRemoveFromFavorites={true}
              refreshFilms={this.refreshFilms}
            />)
          }
        </div>

        <div className='favorites-page-fotter'>
          <FooterComp/>
        </div>

        <SpinnerComp isLoading={this.props.isFetching}/>

      </React.Fragment>
    )
  }
}

const mapStateToProps=(state)=>{
  return {
    favoritesList: state.favoritesPage.favoritesList,
    isFetching: state.favoritesPage.isFetching,
  }
}

const mapDispatchToProps={
  loadFavoritesFilmList,
}

export default connect(mapStateToProps, mapDispatchToProps)(FavoritesPage);
