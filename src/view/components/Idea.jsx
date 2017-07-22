import React from 'react';

export default ({ title, writer, empathy_count }) => (
  <div className="col-lg-3 col-sm-6 text-center" id="idea">
    <img className="img-center img-idea" src="/img/firefighter.jpg" />
    <h3 className="idea-tit">{title}</h3>
    <small className="writer">{writer} </small>

    <div className="heart_btn">
      <span className="glyphicon glyphicon-heart" aria-hidden="true"></span>
      <p className="btn_amount">{empathy_count}</p>
    </div>
  </div>
);
