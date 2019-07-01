import React, {Fragment} from "react";
import { Modal, ModalBody } from "reactstrap";
import { injectIntl, FormattedMessage } from 'react-intl';
import LoginForm from "./LoginForm";
import PropTypes from "prop-types";

class Login extends React.Component {
  constructor() {
    super();

    this.state = {
      showModel: false
    };
  }

  toggleModel = () => {
    this.setState(prevState => ({
      showModel: !prevState.showModel
    }))
  };

  render() {
    const { updateUser, updateSessionId } = this.props;
    return (
      <Fragment>
        <button
          className="btn btn-success"
          type="button"
          onClick={this.toggleModel}
        >
          <i className="fa fa-sign-in-alt"/> <FormattedMessage id="login.buttonSignIn" defaultMessage="SignIn"/>
        </button>
        <Modal isOpen={this.state.showModel} toggle={this.toggleModel}>
          <ModalBody>
            <LoginForm updateUser={updateUser} updateSessionId={updateSessionId}/>
          </ModalBody>
        </Modal>
      </Fragment>
    );
  }
}

Login.propTypes = {
  updateUser: PropTypes.func.isRequired,
  updateSessionId: PropTypes.func.isRequired,
};

export default injectIntl(Login);