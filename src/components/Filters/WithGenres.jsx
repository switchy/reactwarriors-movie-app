import React from "react";
import PropTypes from 'prop-types';
import queryString from 'query-string';
import {API_KEY_3, API_URL} from "../../api/api";

class WithGenres extends React.PureComponent {
  constructor() {
    super();

    this.state = {
      genres: []
    };
  }

  componentDidMount() {
    let linkQueryParams = {
      api_key: API_KEY_3,
      language: "uk-UA"
    };

    const link = `${API_URL}/genre/movie/list?${queryString.stringify(linkQueryParams)}`;

    fetch(link)
      .then(response => {
        return response.json();
      })
      .then(data => {
        this.setState({
          genres: data.genres
        });
      });

  }

  onChange = (event) => {
    this.props.onChangeFilters({
      target: {
        name: "genres",
        value: event.target.checked
          ? [...this.props.genres, event.target.value]
          : this.props.genres.filter((genre) => (genre !== event.target.value))
      }
    })
  };

  render() {
    const { genres } = this.props;
    return (
      <div className="form-group">
        <div>Жанр:</div>
        {this.state.genres.map((option) => (
          <div className="form-check" key={option.id}>
            <input
              className="form-check-input"
              name="genres"
              type="checkbox"
              value={option.id}
              id={`genreCheck${option.id}`}
              onChange={this.onChange}
              checked={genres.includes(String(option.id))}
            />
            <label
              className="form-check-label"
              htmlFor={`genreCheck${option.id}`}
            >
              {option.name}
            </label>
          </div>
        ))}
      </div>
    );
  }
}

WithGenres.propTypes = {
  onChangeFilters: PropTypes.func.isRequired,
  genres: PropTypes.array.isRequired
};

export default WithGenres;