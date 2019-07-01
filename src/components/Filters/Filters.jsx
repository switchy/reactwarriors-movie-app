import React from "react";
import SortBy from "./SortBy";
import PrimaryReleaseYear from "./PrimaryReleaseYear";
import WithGenres from "./WithGenres";
import { injectIntl, FormattedMessage } from 'react-intl';
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
        <SortBy
          key={`SortBy${this.props.intl.locale}`}
          sort_by={sort_by}
          onChangeFilters={onChangeFilters}
        />
        <PrimaryReleaseYear year={year} onChangeFilters={onChangeFilters} />
        <WithGenres
          key={`WithGenres${this.props.intl.locale}`}
          genres={genres}
          onChangeFilters={onChangeFilters}
        />
        <div className="form-group">
          <button
            type="reset"
            className="btn btn-secondary w-100"
            onClick={onResetFilters}
          >
            <i className="fa fa-undo pr-2"/> <FormattedMessage id="filters.buttonReset" defaultMessage="Reset filters"/>
          </button>
        </div>
        <div className="btn-group w-100">
          <button
            type="button"
            className="btn btn-light"
            disabled={page <= 1}
            onClick={this.onClickPrevPage}
          >
            <i className="fa fa-angle-left pr-2"/> <FormattedMessage id="filters.buttonBack" defaultMessage="Back"/>
          </button>
          <button
            type="button"
            className="btn btn-light"
            disabled={total_pages && total_pages <= page}
            onClick={this.onClickNextPage}
          >
            <FormattedMessage id="filters.buttonNext" defaultMessage="Next"/> <i className="fa fa-angle-right pl-2"/>
          </button>
        </div>
        <span className="btn float-right">
          <FormattedMessage
            id="filters.pages"
            values={{n: page,  m: total_pages ? total_pages : page}}
            defaultMessage="{n} of {m}"
          />
        </span>
      </form>
    );
  }
}

Filters.propTypes = {
  filters: PropTypes.object.isRequired,
  page: PropTypes.number.isRequired,
  total_pages: PropTypes.number,
  onChangeFilters: PropTypes.func.isRequired,
  onChangePage: PropTypes.func.isRequired,
  onResetFilters: PropTypes.func.isRequired
};

export default injectIntl(Filters);
