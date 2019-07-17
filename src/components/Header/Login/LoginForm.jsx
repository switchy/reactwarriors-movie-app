import React from "react";
import queryString from 'query-string';
import { Spinner } from "reactstrap";
import UIFormTextField from "../../UIComponents/UIFormTextField";
import { injectIntl, FormattedMessage } from 'react-intl';
import {API_KEY_3, API_URL, fetchApi} from "../../../api/api";
import PropTypes from "prop-types";

class LoginForm extends React.Component {
  constructor() {
    super();
    this.state = {
      "username": "",
      "password": "",
      "repeatPassword": "",
      "submitting": false,
      "errors": {}
    };

  }

  validateFields = (field = null) => {
    const errors = {};

    if ((field === "username" || field === null ) && !this.state.username.length) {
      errors.username = this.props.intl.formatMessage({id:"login.validate.notEmpty", defaultMessage: "Must by set"});
    }

    if ((field === "password" || field === null ) && !this.state.password.length) {
      errors.password = this.props.intl.formatMessage({id:"login.validate.notEmpty", defaultMessage: "Must by set"});
    }

    if ((field === "repeatPassword" || field === null ) && !this.state.repeatPassword.length) {
      errors.repeatPassword = this.props.intl.formatMessage({id:"login.validate.notEmpty", defaultMessage: "Must by set"});
    } else if ((field === "repeatPassword" || field === null ) && this.state.repeatPassword !== this.state.password) {
      errors.repeatPassword = this.props.intl.formatMessage({id:"login.validate.passwordMustEq", defaultMessage: "Must be equal password"});
    }

    return errors;
  };

  onChange = (e) => {
    const name  = e.target.name;
    const value = e.target.value;
    this.setState(prevState => ({
      errors: {
        ...prevState.errors,
        base: null,
        [name]: null
      },
      [name]: value
    }));
  };

  handleBlur = (e) => {
    const errors = this.validateFields(e.target.name);
    if (Object.keys(errors).length) {
      this.setState(prevState => ({
        errors: {
          ...prevState.errors,
          ...errors
        }
      }));
    }
  };

  onSubmit = () => {

    this.setState({
      submitting: true,
      errors: {}
    });

    let linkQueryParams = {
      api_key: API_KEY_3,
      language: this.props.intl.locale,
    };

    fetchApi(`${API_URL}/authentication/token/new?${queryString.stringify(linkQueryParams)}`)
      .then(data => {
        return fetchApi(`${API_URL}/authentication/token/validate_with_login?${queryString.stringify(linkQueryParams)}`,
          {
            method: "POST",
            mode: "cors",
            headers: {
              "Content-type": "application/json"
            },
            body: JSON.stringify({
              username: this.state.username,
              password: this.state.password,
              request_token: data.request_token
            })
          });
      })
      .then(data => {
        return fetchApi(
          `${API_URL}/authentication/session/new?${queryString.stringify(linkQueryParams)}`,
          {
            method: "POST",
            mode: "cors",
            headers: {
              "Content-type": "application/json"
            },
            body: JSON.stringify({
              request_token: data.request_token
            })
          }
        );
      })
      .then(data => {
        linkQueryParams = {
          ...linkQueryParams,
          session_id: data.session_id
        };
        this.props.updateSessionId(data.session_id);
        return fetchApi(`${API_URL}/account?${queryString.stringify(linkQueryParams)}`)
      })
      .then(data => {
        this.props.updateUser(data);
        this.setState({
            submitting: false
        });

      })
      .catch(error => {
        this.setState(prevState => ({
          errors: {
            ...prevState.errors,
            base: error.status_message
          },
          submitting: false
        }));

      })
  };

  onLogin = (e) => {
    e.preventDefault();
    const errors = this.validateFields();
    if (!Object.keys(errors).length) {
      this.onSubmit();
    } else {
      this.setState(prevState => ({
        errors: {
          ...prevState.errors,
          ...errors
        }
      }));
    }

  };

  render() {
    const { errors } = this.state;
    return (
      <div className="form-login-container">
        <h1 className="h3 text-center">
          {this.state.submitting &&
            <Spinner type="grow" />
          }
          <FormattedMessage id="login.signin" defaultMessage="Signin"/>
        </h1>
        <form className="form card-body">
          <UIFormTextField
            labelText={this.props.intl.formatMessage({id:"login.usernameLabel", defaultMessage: "User"})}
            type="text"
            id="username"
            name="username"
            placeHolder={this.props.intl.formatMessage({id:"login.usernamePlaceholder", defaultMessage: "Enter username"})}
            onChange={this.onChange}
            onBlur={this.handleBlur}
            value={this.state.username}
            error={errors.username}
          />

          <UIFormTextField
            labelText={this.props.intl.formatMessage({id:"login.passwordLabel", defaultMessage: "Password"})}
            type="password"
            id="password"
            name="password"
            placeHolder={this.props.intl.formatMessage({id:"login.passwordPlaceholder", defaultMessage: "Enter password"})}
            onChange={this.onChange}
            onBlur={this.handleBlur}
            value={this.state.password}
            error={errors.password}
          />

          <UIFormTextField
            labelText={this.props.intl.formatMessage({id:"login.repasswordLabel", defaultMessage: "Repeat Password"})}
            type="password"
            id="repeatPassword"
            name="repeatPassword"
            placeHolder={this.props.intl.formatMessage({id:"login.repasswordPlaceholder", defaultMessage: "Enter repeat password"})}
            onChange={this.onChange}
            onBlur={this.handleBlur}
            value={this.state.repeatPassword}
            error={errors.repeatPassword}
          />

          <button
            type="submit"
            disabled={this.state.submitting}
            className="btn btn-lg btn-primary btn-block"
            onClick={this.onLogin}
          >
            <FormattedMessage id="login.buttonEnter" defaultMessage="Enter"/>
            <i className="fa fa-sign-in-alt pl-2"/>
          </button>
          {errors.base && (
            <div className="alert alert-danger mt-2">
              <div className="small">
                {errors.base}
              </div>
            </div>
          )}
        </form>
      </div>
    );
  }
}

LoginForm.propTypes = {
  updateUser: PropTypes.func.isRequired,
  updateSessionId: PropTypes.func.isRequired,
};


export default injectIntl(LoginForm);