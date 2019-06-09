import React, { Component } from "react";
import PropTypes from 'prop-types';
import MovieItem from "./MovieItem";
import { API_URL, API_KEY_3 } from "../../api/api";

class MovieList extends Component {
  constructor() {
    super();

    this.state = {
      movies: []
    };
  }

  getMovies = (filters, page=1) => {
    const { sort_by, year, genres } = filters;

    let link =
      `${API_URL}/discover/movie?api_key=${API_KEY_3}`
      +`&language=uk-UA&vote_count.gte=500`
      +`&sort_by=${sort_by}`
      +`&page=${page}`
      +`&primary_release_year=${year}`;

    if (genres.length) {
      link = link + '&with_genres=' + genres.join(",")
    }

    fetch(link)
      .then(response => {
        return response.json();
      })
      .then(data => {
        this.setState({
          movies: data.results
        });

        this.props.handleEndPage(data.total_pages)
      });
  };

  componentDidMount() {
    this.getMovies(this.props.filters, this.props.page);
  }

  componentDidUpdate(prevProps) {
    let needReloadFilters = false;

    if (prevProps.page !== this.props.page) {
      this.getMovies(this.props.filters, this.props.page);
    }

    if (prevProps.filters.sort_by !== this.props.filters.sort_by) {
      needReloadFilters = true
    }

    if (prevProps.filters.year !== this.props.filters.year) {
      needReloadFilters = true
    }

    if (this.props.filters.genres.length !== prevProps.filters.genres.length
      || !this.props.filters.genres.every( e => prevProps.filters.genres.includes(e))) {
      needReloadFilters = true
    }

    if (needReloadFilters) {
      this.props.onChangePage(1);
      this.getMovies(this.props.filters, 1);
      return;
    }

  }

  render() {
    const { movies } = this.state;
    if (!movies.length) {
      return (
        <div className="alert alert-warning">
          Нічого не знайдено.
        </div>
      );
    } else {
      return (
        <div className="row">
          {movies.map(movie => {
            return (
              <div key={movie.id} className="col-6 mb-4">
                <MovieItem item={movie}/>
              </div>
            );
          })}
        </div>
      );
    }
  }
}

MovieList.propTypes = {
  movies: PropTypes.object
};

export default MovieList;