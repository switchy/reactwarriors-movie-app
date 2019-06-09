import React from "react";
import Filters from "./Filters/Filters";
import MoviesList from "./Movies/MoviesList";

export default class App extends React.Component {
  constructor() {
    super();

    this.initialState = {
      filters: {
        sort_by: "popularity.desc",
        year: new Date().getFullYear().toString(),
        genres: []
      },
      page: 1,
      lastPage: null
    };

    this.state = Object.assign({}, this.initialState);
  }

  onChangeFilters = (event) => {
    let newFilters = {};
    if (event.target.name === 'genres') {
      //Для genres йде список значень
      let genres = [...this.state.filters.genres];
      if (event.target.checked) {
        genres.push(event.target.value);
      } else {
        genres = genres.filter((value) => (value !== event.target.value));
      }

      newFilters = {
        ...this.state.filters,
        genres: genres
      }

    } else {
      newFilters = {
        ...this.state.filters,
        [event.target.name]: event.target.value
      };
    }

    this.setState({filters: newFilters});
  };

  onChangePage = (page) => {
    this.setState({
      page:page
    })
  };

  onResetFilters = () => {
    this.setState({ ...this.initialState});
  };

  setLastPage = (lastPage) => {
    this.setState({
      lastPage: lastPage
    })
  };

  render() {
    const { filters, page, lastPage } = this.state;
    return (
      <div className="container">
        <div className="row mt-4">
          <div className="col-4">
            <div className="card" style={{ width: "100%" }}>
              <div className="card-body">
                <h3>Фильтри:</h3>
                <Filters
                  filters={filters}
                  page={page}
                  lastPage={lastPage}
                  onChangeFilters={this.onChangeFilters}
                  onResetFilters={this.onResetFilters}
                  onChangePage={this.onChangePage}
                  onChangeCheckBox={this.onChangeCheckBox}
                />
              </div>
            </div>
          </div>
          <div className="col-8">
            <MoviesList
              filters={filters}
              page={page}
              onChangePage={this.onChangePage}
              handleEndPage={this.setLastPage}
            />
          </div>
        </div>
      </div>
    );
  }
}
