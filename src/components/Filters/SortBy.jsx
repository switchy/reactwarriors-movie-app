import React from "react";
import PropTypes from 'prop-types';

class SortBy extends React.Component {

  static defaultProps = {
    options: [
      {
        label: "Популярні за спаданням",
        value: "popularity.desc"
      },
      {
        label: "Популярні за зростанням",
        value: "popularity.asc"
      },
      {
        label: "Рейтинг за спаданням",
        value: "vote_average.desc"
      },
      {
        label: "Рейтинг за зростанням",
        value: "vote_average.asc"
      },
    ]
  };

  render() {
    const { sort_by, onChangeFilters, options } = this.props;
    return (
      <div className="form-group">
        <label htmlFor="sort_by">Сортувати за:</label>
        <select
          className="form-control"
          id="sort_by"
          name="sort_by"
          value={sort_by}
          onChange={onChangeFilters}
        >
          {options.map((option) => (
            <option key={option.value} value={option.value}>
              {option.label}
            </option>
          ))}
        </select>
      </div>
    );
  }
}

SortBy.propTypes = {
  sort_by: PropTypes.string.isRequired,
  onChangeFilters: PropTypes.func.isRequired
};

export default SortBy;
