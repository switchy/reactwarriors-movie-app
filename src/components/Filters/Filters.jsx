import React from "react";

export default class Filters extends React.Component {
  render() {
    const {
      filters: { sort_by },
      onChangeFilters
    } = this.props;
    return (
      <form className="mb-3">
        <div className="form-group">
          <label htmlFor="sort_by">Сортувати за:</label>
          <select
              className="form-control"
              id="sort_by"
              name="sort_by"
              value={sort_by}
              onChange={onChangeFilters}
          >
            <option value="popularity.desc">Популярні за спаданням</option>
            <option value="popularity.asc">Популярні за зростанням</option>
            <option value="vote_average.desc">Рейтинг за спаданням</option>
            <option value="vote_average.asc">Рейтинг за зростанням</option>
          </select>
        </div>
      </form>
    );
  }
}
