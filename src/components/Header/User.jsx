import React, {Fragment} from "react";
import PropTypes from 'prop-types';

class User extends React.Component {
  render () {
    const { user } = this.props;
    return (
      <Fragment>
        <img
          width="40"
          className="rounded-circle"
          src={`https://secure.gravatar.com/avatar/${
           user.avatar.gravatar.hash
           }.jpg?s=64`}
          alt=""
        />
        <span className="pl-2 small">{user.name || user.username}</span>
      </Fragment>
    );
  }
}

User.propTypes = {
  user: PropTypes.object.isRequired
};

export default User;