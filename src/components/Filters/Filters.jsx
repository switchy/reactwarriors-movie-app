import React from "react";

export default class Filters extends React.Component {
  render() {
    const {
      filters: { sort_by },
      page,
      onChangeFilters,
      onChangePage
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
        <div className="btn-group">
          <button
            type="button"
            className="btn btn-light"
            disabled={page <= 1}
            onClick={() => {
              onChangePage(page - 1)
            }}>
            Назад
          </button>
          <button
            type="button"
            className="btn btn-light"
            onClick={() => {
              onChangePage(page + 1)
            }}>
            Вперед
          </button>
        </div>
      </form>
    );
  }
}
