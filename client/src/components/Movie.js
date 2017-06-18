import React, { Component } from 'react';

class Movie extends Component {
  render(){
    return (
      <div className="movieinfo">
        <h3>{this.props.movieData.original_title}</h3>
        <img src={"https://image.tmdb.org/t/p/w500" + this.props.movieData.poster_path} alt="poster"/>
        <p>{this.props.movieData.overview}</p>
        <h5>Vote: <br />{this.props.movieData.vote_average} | Released on: <br />{this.props.movieData.release_date}</h5>
        
        
      </div>
    )
  }
}

export default Movie;