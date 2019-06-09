import React from "react";
import PropTypes from 'prop-types';

class PrimaryReleaseYear extends React.Component {

  constructor() {
    super();

    this.yearsOptions = [];

    for(let i = new Date().getFullYear(); i > 1940; i--) {
      this.yearsOptions.push({
        label: i,
        value: i.toString()
      })
    }
  }

  render() {
    const { year, onChangeFilters } = this.props;
    return (
      <div className="form-group">
        <label htmlFor="year">Рік виходу:</label>
        <select
          className="form-control"
          id="year"
          name="year"
          value={year}
          onChange={onChangeFilters}
        >
          {this.yearsOptions.map((option) => (
            <option key={option.value} value={option.value}>
              {option.label}
            </option>
          ))}
        </select>
      </div>
    );
  }
}

PrimaryReleaseYear.propTypes = {
  year: PropTypes.string.isRequired,
  onChangeFilters: PropTypes.func.isRequired
};

export default PrimaryReleaseYear;