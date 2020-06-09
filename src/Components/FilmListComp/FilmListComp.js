import React from 'react';
import {FilmCardComp} from '../FilmCardComp/FilmCardComp'

import './FilmListComp.scss';
import {baseDeployURL} from './../../lib';

export class FilmListComp extends React.Component{

  handlePosterClick(title){
    window.location.href=`${baseDeployURL}/film/${title}`
  }

  render(){
    let listElement = this.props.filmList.map((item)=>
    <FilmCardComp
      key={item.id}
      id={item.id}
      posterUrl={item.posterUrl}
      year = {item.year}
      genres={item.genres.toString()}
      title = {item.title}
      director = {item.director}
      runtime = {item.runtime}
      onPosterClick = {()=>this.handlePosterClick(item.title)}
      flagAddToFavorites ={this.props.flagAddToFavorites}
      flagRemoveFromFavorites = {this.props.flagRemoveFromFavorites}
      refreshFilms={this.props.refreshFilms}
    />
    );
  
    return(
      <div className="film-list-outer-container">
        <div className="film-list-inner-container">
            {this.props.renderFirstLine}
          <div className='film-list-comp__list'>
            {listElement}
          </div>
        </div>
      </div>
    )
  }
}

