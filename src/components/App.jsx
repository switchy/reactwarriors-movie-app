import React from "react";
import Filters from "./Filters/Filters";
import MoviesList from "./Movies/MoviesList";
import Header from "./Header/Header";
import {FormattedMessage, injectIntl} from 'react-intl';
import queryString from 'query-string';
import Cookies from 'universal-cookie';
import {API_KEY_3, API_URL, fetchApi} from "../api/api";

const cookies = new Cookies();

class App extends React.Component {
  constructor() {
    super();

    this.initialSessState = {
      language: null,
      user: null,
      session_id: cookies.get("session_id") || null
    };

    this.initialMovieState = {
      filters: {
        sort_by: "popularity.desc",
        year: String(new Date().getFullYear()),
        genres: []
      },
      page: 1,
      total_pages: null
    };

    this.state = {
      ...this.initialSessState,
      ...this.initialMovieState
    };
  }

  onChangeFilters = (event) => {
    let newFilters = {
      ...this.state.filters,
      [event.target.name]: event.target.value
    };

    this.setState({filters: newFilters});
  };

  onChangePage = (page) => {
    this.setState({
      page:page
    })
  };

  onResetFilters = () => {
    this.setState({
      ...this.initialMovieState
    });
  };

  setTotalPages = (total_pages) => {
    this.setState({
      total_pages: total_pages
    })
  };

  updateUser = (user) => {
    this.setState({
      user: user //можно скоротити до запису user
    })
  };

  updateSessionId = (session_id) => {
    cookies.set("session_id", session_id, {
      path: "/",
      maxAge: 2592000
    });
    this.setState({
      session_id
    });
  };

  closeSession = () => {
    cookies.remove("session_id");
    this.setState({
      ...this.initialMovieState,
      session_id: null,
      user: null
    });
  };

  componentWillReceiveProps(nextProps) {
    if (this.state.language !== nextProps.language) {
      this.setState({
        language: nextProps.language
      });
    }
  }

  componentDidMount() {

    const language = this.props.language;
    this.setState({
      language
    });

    const session_id = cookies.get("session_id");

    let linkQueryParams = {
      api_key: API_KEY_3,
      language: this.props.intl.locale,
    };

    if (session_id) {
      linkQueryParams = {
        ...linkQueryParams,
        session_id: session_id
      };
      fetchApi(`${API_URL}/account?${queryString.stringify(linkQueryParams)}`)
        .then(data => {
          this.updateUser(data);
        });
    }
  }

  render() {
    const { filters, page, total_pages, user } = this.state;
    return (
      <div>
        <Header
          locales={this.props.locales}
          key={`Header${this.props.intl.locale}`}
          updateUser={this.updateUser}
          updateSessionId={this.updateSessionId}
          closeSession={this.closeSession}
          onChangeLanguage={this.props.onChangeLanguage}
          user={user}
        />
        <div className="container">
          <div className="row mt-4">
            <div className="col-4">
              <div className="card" style={{ width: "100%" }}>
                <div className="card-body">
                  <h3><FormattedMessage id="app.filters" defaultMessage="Filters"/>:</h3>
                  <Filters
                    filters={filters}
                    page={page}
                    total_pages={total_pages}
                    onChangeFilters={this.onChangeFilters}
                    onResetFilters={this.onResetFilters}
                    onChangePage={this.onChangePage}
                  />
                </div>
              </div>
            </div>
            <div className="col-8">
              <MoviesList
                key={`MoviesList${this.props.intl.locale}`}
                filters={filters}
                page={page}
                onChangePage={this.onChangePage}
                onChangeTotalPages={this.setTotalPages}
              />
            </div>
          </div>
        </div>
      </div>
    );
  }
}

export default injectIntl(App);