import React from "react";
import PropTypes from 'prop-types';
import { injectIntl } from 'react-intl';
import UIFormRowSelect from '../UIComponents/UIFormRowSelect';

class SortBy extends React.PureComponent {

  constructor(props) {
    super(props);
    this.listOptions = [
      {
        label: props.intl.formatMessage({id: "sortby.opts.popularity.desc", defaultMessage: "Popular by descending"}),
        value: "popularity.desc"
      },
      {
        label: props.intl.formatMessage({id: "sortby.opts.popularity.asc", defaultMessage: "Popular ascending"}),
        value: "popularity.asc"
      },
      {
        label: props.intl.formatMessage({id: "sortby.opts.vote_average.desc", defaultMessage: "Rating by descending"}),
        value: "vote_average.desc"
      },
      {
        label: props.intl.formatMessage({id: "sortby.opts.vote_average.asc", defaultMessage: "Rating ascending"}),
        value: "vote_average.asc"
      },
    ];
  };

  render() {
    const { sort_by, onChangeFilters } = this.props;
    const options = this.listOptions;
    return (
      <UIFormRowSelect
        key={this.props.intl.locale}
        label={this.props.intl.formatMessage({id:"filters.SortBy", defaultMessage: "Sort by"})}
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

export default injectIntl(SortBy);
