import React from "react";
import Login from "./Login/Login";
import { Nav, Navbar, NavbarBrand, NavItem, UncontrolledDropdown, DropdownToggle, DropdownMenu, DropdownItem } from "reactstrap";
import User from "./User";
import PropTypes from 'prop-types';
import { injectIntl, FormattedMessage } from 'react-intl';
import _ from "lodash";

class Header extends React.Component {
  switchLanguage = (e) => {
    //this.props.onChangeLanguage()
    const language = e.target.attributes.getNamedItem('data-lang').value;
    this.props.onChangeLanguage(language)
  };

  render() {
    let locales = [...this.props.locales];
    locales = _.remove(locales, (item) => {
      return item !== this.props.intl.locale;
    });
    let curLocale = this.props.intl.locale;

    const { user, updateUser, updateSessionId, closeSession } = this.props;
    return (
      <Navbar color="dark" dark expand="md" sticky="top">
        <div className="container">
          <NavbarBrand href="#">MoiveDB application</NavbarBrand>
          <Nav className="ml-auto" navbar>
            <UncontrolledDropdown nav inNavbar>
              <DropdownToggle nav caret>
                {curLocale}
              </DropdownToggle>
              <DropdownMenu right>
                {locales.map((item) => (
                  <DropdownItem onClick={this.switchLanguage} data-lang={item} key={item}>
                    {item}
                  </DropdownItem>
                ))}
              </DropdownMenu>
            </UncontrolledDropdown>
          </Nav>
          <Nav className="ml-auto" navbar>
            {user === null ?
              <NavItem>
                <Login updateUser={updateUser} updateSessionId={updateSessionId}/>
              </NavItem>
              :
              <UncontrolledDropdown nav inNavbar>
                <DropdownToggle nav caret className="pt-0 pb-0">
                  <User user={user} />
                </DropdownToggle>
                <DropdownMenu right>
                  {/*<DropdownItem>
                    Option 1
                  </DropdownItem>
                  <DropdownItem>
                    Option 2
                  </DropdownItem>
                  <DropdownItem divider >*/}
                  <DropdownItem onClick={closeSession}>
                    <i className="fa fa-sign-in-alt"/> <FormattedMessage id="login.buttonSignOut" defaultMessage="Logout"/>
                  </DropdownItem>
                </DropdownMenu>
              </UncontrolledDropdown>
            }
          </Nav>
        </div>
      </Navbar>
    );
  }
}

Header.propTypes = {
  updateUser: PropTypes.func.isRequired,
  updateSessionId: PropTypes.func.isRequired,
  closeSession: PropTypes.func.isRequired,
  user: PropTypes.oneOfType([
    () => null,
    PropTypes.object.isRequired,
  ]),
};

export default injectIntl(Header);