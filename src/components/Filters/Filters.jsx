import React from "react";
import SortBy from "./SortBy";
import PrimaryReleaseYear from "./PrimaryReleaseYear";
import WithGenres from "./WithGenres";
import PropTypes from "prop-types";

class Filters extends React.Component {
  onClickPrevPage = () => {
    this.props.onChangePage(this.props.page - 1);
  };

  onClickNextPage = () => {
    this.props.onChangePage(this.props.page + 1);
  };

  render() {
    const {
      filters: { sort_by, year, genres },
      page,
      total_pages,
      onChangeFilters,
      onResetFilters
    } = this.props;
    return (
      <form className="mb-3">
        <SortBy sort_by={sort_by} onChangeFilters={onChangeFilters} />
        <PrimaryReleaseYear year={year} onChangeFilters={onChangeFilters} />
        <WithGenres genres={genres} onChangeFilters={onChangeFilters} />
        <div className="form-group">
          <button
            type="reset"
            className="btn btn-secondary w-100"
            onClick={onResetFilters}
          >
            Скинути фільтри
          </button>
        </div>
        <div className="btn-group w-100">
          <button
            type="button"
            className="btn btn-light"
            disabled={page <= 1}
            onClick={this.onClickPrevPage}
          >
            Назад
          </button>
          <button
            type="button"
            className="btn btn-light"
            disabled={total_pages && total_pages <= page}
            onClick={this.onClickNextPage}
          >
            Вперед
          </button>
        </div>
        <span className="btn float-right">{page} із {total_pages ? total_pages : page}</span>
      </form>
    );
  }
}

Filters.propTypes = {
  filters: PropTypes.object.isRequired,
  page: PropTypes.number.isRequired,
  total_pages: PropTypes.oneOfType([ PropTypes.number ]),
  onChangeFilters: PropTypes.func.isRequired,
  onChangePage: PropTypes.func.isRequired,
  onResetFilters: PropTypes.func.isRequired
};

export default Filters;
