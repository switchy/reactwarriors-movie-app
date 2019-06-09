import React from "react";
import PropTypes from 'prop-types';
import {API_KEY_3, API_URL} from "../../api/api";

class WithGenres extends React.Component {
  constructor() {
    super();

    this.state = {
      genres: []
    };

    const link = `${API_URL}/genre/movie/list?api_key=${API_KEY_3}&language=uk-UA`;

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

  render() {
    const { onChangeFilters } = this.props;

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
              onChange={onChangeFilters}
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
  onChangeFilters: PropTypes.func.isRequired
};

export default WithGenres;