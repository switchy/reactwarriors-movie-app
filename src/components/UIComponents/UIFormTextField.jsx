import React from "react";
import PropTypes from "prop-types";
import classNames from "classnames/bind";

class UIFormTextField extends React.Component {

  render() {
    const {
      id,
      type,
      labelText,
      placeHolder,
      name,
      value,
      error,
      onChange,
      onBlur
    } = this.props;

    let optAttrs = {};
    if (placeHolder) {
      optAttrs.placeholder = placeHolder;
    }
    if (onBlur) {
      optAttrs.onBlur = onBlur;
    }

    return (
      <div className="form-group">
        <label htmlFor={id}>{labelText}</label>
        <input
          type={type}
          className={classNames("form-control", {"is-invalid": error})}
          name={name}
          id={id}
          value={value}
          onChange={onChange}
          {...optAttrs}
        />
        {error && (
          <div className="invalid-feedback">
            {error}
          </div>
        )}
      </div>
    );
  }
}

UIFormTextField.propTypes = {
  labelText: PropTypes.string.isRequired,
  name: PropTypes.string.isRequired,
  value: PropTypes.string.isRequired,
  id: PropTypes.string.isRequired,
  type: PropTypes.string.isRequired,
  placeHolder: PropTypes.string,
  error: PropTypes.oneOfType([
    () => null,
    PropTypes.string,
  ]),
  onChange: PropTypes.func.isRequired,
  onBlur: PropTypes.func
};

export default UIFormTextField;