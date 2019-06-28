import React, { Component } from "react";
import PropTypes from 'prop-types';
import MovieItem from "./MovieItem";
import queryString from 'query-string';
import { injectIntl, FormattedMessage } from 'react-intl';
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

    let linkQueryParams = {
      api_key: API_KEY_3,
      language: this.props.intl.locale,
      "vote_count.gte": 200,
      sort_by: sort_by,
      page: page,
      primary_release_year: year
    };

    if (genres.length) {
      linkQueryParams.with_genres = genres.join(",")
    }

    let link = `${API_URL}/discover/movie?${queryString.stringify(linkQueryParams)}`;

    fetch(link)
      .then(response => {
        return response.json();
      })
      .then(data => {
        this.setState({
          movies: data.results
        });

        this.props.onChangeTotalPages(data.total_pages)
      });
  };

  componentDidMount() {
    this.getMovies(this.props.filters, this.props.page);
  }

  componentDidUpdate(prevProps) {
    if (prevProps.page !== this.props.page) {
      this.getMovies(this.props.filters, this.props.page);
      return;
    }

    if (prevProps.filters !== this.props.filters) {
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
          <FormattedMessage id="movielist.NotFound" defaultMessage="Nothing was found."/>
        </div>
      );
    }
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

MovieList.propTypes = {
  movies: PropTypes.array
};

export default injectIntl(MovieList);