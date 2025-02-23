import React, { Component } from "react";
import MovieItem from "./MovieItem";
import { API_URL, API_KEY_3 } from "../../api/api";

export default class MovieList extends Component {
  constructor() {
    super();

    this.state = {
      movies: []
    };
  }

  getMovies = (filters, page=1) => {
    const { sort_by } = filters;

    const link = `${API_URL}/discover/movie?api_key=${API_KEY_3}&language=uk-UA&sort_by=${sort_by}&page=${page}`;
    fetch(link)
      .then(response => {
        return response.json();
      })
      .then(data => {
        this.setState({
          movies: data.results
        });
      });
  };

  componentDidMount() {
    this.getMovies(this.props.filters, this.props.page);
  }

  componentDidUpdate(prevProps) {
    if (prevProps.filters.sort_by !== this.props.filters.sort_by) {
      this.props.onChangePage(1);
      this.getMovies(this.props.filters, 1);
    }

    if (prevProps.page !== this.props.page) {
        this.getMovies(this.props.filters, this.props.page);
    }
  }

  render() {
    const { movies } = this.state;
    return (
      <div className="row">
        {movies.map(movie => {
          return (
            <div key={movie.id} className="col-6 mb-4">
              <MovieItem item={movie} />
            </div>
          );
        })}
      </div>
    );
  }
}
