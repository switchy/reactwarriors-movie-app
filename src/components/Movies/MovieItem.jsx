import React from "react";
import { DEFAULT_POSTER_UNDEF_PATH } from "../../utils";

export default class MovieItem extends React.Component {
  render() {
    const { item } = this.props;
    let srcImg;
    if (item.backdrop_path ||item.poster_path) {
      srcImg = `https://image.tmdb.org/t/p/w500${item.backdrop_path || item.poster_path}`;
    } else {
      srcImg = DEFAULT_POSTER_UNDEF_PATH;
    }
    return (
      <div className="card" style={{ width: "100%" }}>
        <img
          className="card-img-top card-img--height"
          src={srcImg}
          alt=""
        />
        <div className="card-body">
          <h6 className="card-title">{item.title}</h6>
          <div className="card-text">
            Рейтинг: {item.vote_average}
          </div>
        </div>
      </div>
    );
  }
}
