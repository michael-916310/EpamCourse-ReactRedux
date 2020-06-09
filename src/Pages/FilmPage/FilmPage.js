import React from 'react';
import {FilmListComp as FilmList} from '../../Components/FilmListComp/FilmListComp';
import {FooterComp as Footer} from '../../Components/FooterComp/FooterComp';
import {FilmDetailComp} from '../../Components/FilmDetailComp/FilmDetailComp';
import {SpinnerComp} from './../../Components/SpinnerComp/SpinnerComp';
import {loadFilmDesc, loadFilmByDirector} from './filmPageActions';
import {connect} from 'react-redux';

import './FilmPage.scss'

class FilmPage extends React.Component {

 getFilmDesc(){
   const filmURL = this.props.match.params.filmName;
   if (filmURL) {
     return this.props.loadFilmDesc(filmURL);
   }
 }

  componentDidMount(){
    const filmURL = this.props.match.params.filmName;

    if (filmURL) {
      this.props.loadFilmDesc(filmURL)
      .then(()=>{
        if (this.props.director) {
          this.props.loadFilmByDirector(this.props.director);
        }
      });
    }
  }


  render(){

    return(
      <React.Fragment>
        
        <div className='film-page-header'>
          <FilmDetailComp
            posterUrl={this.props.posterUrl}
            title={this.props.title}
            year={this.props.year}
            runtime = {this.props.runtime}
            plot = {this.props.plot}
            director = {this.props.director}
            actors = {this.props.actors}
          />
        </div>

        <div className='film-page-content'>
          <FilmList 
            renderFirstLine={<div>Films by {this.props.director} </div>}
            filmList={this.props.filmList}
            flagAddToFavorites = {true}
            />
        </div>
        

        <div className='film-page-footer'>
          <Footer/>
        </div>

        <SpinnerComp isLoading={this.props.isLoading}/>
        
      </React.Fragment>
    )
  }
}

const mapStateToProps = (state)=>{
  const s = state.filmPage;
  return {
    posterUrl: s.posterUrl,
    title: s.title,
    year: s.year,
    runtime: s.runtime,
    plot: s.plot,
    director: s.director,
    actors: s.actors,

    filmList: s.filmList,
    isLoading: s.isFetching,
  }
}

const mapDispathcToProps = {
  loadFilmDesc,
  loadFilmByDirector,
}

export default connect (mapStateToProps, mapDispathcToProps) (FilmPage);