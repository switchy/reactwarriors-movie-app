import React from "react";
import PropTypes from 'prop-types';
import { injectIntl } from 'react-intl';
import UIFormRowSelect from '../UIComponents/UIFormRowSelect';

class PrimaryReleaseYear extends React.PureComponent {

  constructor() {
    super();

    this.yearsOptions = [];

    for(let i = new Date().getFullYear(); i > 1940; i--) {
      this.yearsOptions.push({
        label: i,
        value: String(i)
      })
    }
  }

  render() {
    const { year, onChangeFilters } = this.props;
    return (
      <UIFormRowSelect
        label={this.props.intl.formatMessage({id:"filters.PrimaryReleaseYear", defaultMessage: "Release year"})}
        name="year"
        value={year}
        options={this.yearsOptions}
        onChange={onChangeFilters}
      />
    );
  }
}

PrimaryReleaseYear.propTypes = {
  year: PropTypes.string.isRequired,
  onChangeFilters: PropTypes.func.isRequired
};

export default injectIntl(PrimaryReleaseYear);