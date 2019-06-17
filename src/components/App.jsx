import React from "react";
import Filters from "./Filters/Filters";
import MoviesList from "./Movies/MoviesList";

export default class App extends React.Component {
  constructor() {
    super();

    this.initialState = {
      filters: {
        sort_by: "popularity.desc",
        year: String(new Date().getFullYear()),
        genres: []
      },
      page: 1,
      total_pages: null
    };

    this.state = { ...this.initialState };
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
    this.setState({ ...this.initialState});
  };

  setTotalPages = (total_pages) => {
    this.setState({
      total_pages: total_pages
    })
  };

  render() {
    const { filters, page, total_pages } = this.state;
    return (
      <div className="container">
        <div className="row mt-4">
          <div className="col-4">
            <div className="card" style={{ width: "100%" }}>
              <div className="card-body">
                {process.env.R}
                <h3>Фильтри:</h3>
                <Filters
                  filters={filters}
                  page={page}
                  total_pages={total_pages}
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
              onChangeTotalPages={this.setTotalPages}
            />
          </div>
        </div>
      </div>
    );
  }
}
