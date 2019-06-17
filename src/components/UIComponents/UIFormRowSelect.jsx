import React from "react";
import PropTypes from "prop-types";

class UIFormRowSelect extends React.Component {

  render() {
    const { label, name, value, options, onChange } = this.props;

    return (
      <div className="form-group">
        <label htmlFor={name}>{label}:</label>
        <select
          className="form-control"
          id={name}
          name={name}
          value={value}
          onChange={onChange}
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

UIFormRowSelect.propTypes = {
  label: PropTypes.string.isRequired,
  name: PropTypes.string.isRequired,
  value: PropTypes.string.isRequired,
  options: PropTypes.array.isRequired,
  onChange: PropTypes.func.isRequired
};

export default UIFormRowSelect;
