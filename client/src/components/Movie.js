import React, { Component } from 'react';

class Movie extends Component {
  render(){
    return (
      <div className="movieinfo">
        <h1>
          {this.props.movieData.original_title}
        </h1>
        <h2>
          {this.props.movieData.tagline}
        </h2>
        <p>
          {this.props.movieData.overview}
        </p>
        <img src={"https://image.tmdb.org/t/p/w500" + this.props.movieData.poster_path} alt="poster"/>
        {/*<img src={"https://image.tmdb.org/t/p/w500" + this.props.movieData.backdrop_path} alt="irene" />*/}
      </div>
    )
  }
}

export default Movie;

// {this.props.movieData}