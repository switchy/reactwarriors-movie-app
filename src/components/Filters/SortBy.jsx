import React from "react";
import PropTypes from 'prop-types';
import UIFormRowSelect from '../UIComponents/UIFormRowSelect';

class SortBy extends React.PureComponent {

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
      <UIFormRowSelect
        label="Сортувати за"
        name="sort_by"
        value={sort_by}
        options={options}
        onChange={onChangeFilters}
      />
    );
  }
}

SortBy.propTypes = {
  sort_by: PropTypes.string.isRequired,
  onChangeFilters: PropTypes.func.isRequired
};

export default SortBy;
