import React from "react";
import SortBy from "./SortBy";
import PrimaryReleaseYear from "./PrimaryReleaseYear";
import WithGenres from "./WithGenres";
import PropTypes from "prop-types";

class Filters extends React.Component {
  render() {
    const {
      filters: { sort_by, year },
      page,
      lastPage,
      onChangeFilters,
      onChangePage,
      onResetFilters
    } = this.props;
    return (
      <form className="mb-3">
        <SortBy sort_by={sort_by} onChangeFilters={onChangeFilters} />
        <PrimaryReleaseYear year={year} onChangeFilters={onChangeFilters} />
        <WithGenres onChangeFilters={onChangeFilters} />
        <div className="form-group">
          <button type="reset" className="btn btn-secondary" onClick={onResetFilters}>Скинути фільтри</button>
        </div>
        <div className="btn-group">
          <button
            type="button"
            className="btn btn-light"
            disabled={page <= 1}
            onClick={() => {
              onChangePage(page - 1)
            }}>
            Назад
          </button>
          <button
            type="button"
            className="btn btn-light"
            disabled={lastPage !== null && lastPage <= page}
            onClick={() => {
              onChangePage(page + 1)
            }}>
            Вперед
          </button>
        </div>
      </form>
    );
  }
}

Filters.propTypes = {
  filters: PropTypes.object.isRequired,
  page: PropTypes.number.isRequired,
  lastPage: PropTypes.oneOfType([ PropTypes.number ]),
  onChangeFilters: PropTypes.func.isRequired,
  onChangePage: PropTypes.func.isRequired,
  onResetFilters: PropTypes.func.isRequired
};

export default Filters;
