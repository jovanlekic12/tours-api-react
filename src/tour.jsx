import React, { useState } from "react";

function Tour(props) {
  const {
    id,
    name,
    info,
    image,
    price,
    handleDeleteTour,
    limitWords,
    expandString,
  } = props;
  const [isExpanded, setIsExpanded] = useState(false);
  return (
    <li className="list__item">
      <div className="image__container">
        <img className="image" src={image} alt="" />
        <p className="price">${price}</p>
      </div>
      <div className="info__container">
        <h3 className="tour__name">{name}</h3>
        <p className="tour__info">
          {isExpanded ? info : limitWords(info, 35)}{" "}
          <button
            onClick={() => setIsExpanded(!isExpanded)}
            className="read__more__btn"
          >
            read more...
          </button>
        </p>
        <button
          className="not__interested__btn"
          onClick={() => handleDeleteTour(id)}
        >
          Not interested
        </button>
      </div>
    </li>
  );
}

export default Tour;
