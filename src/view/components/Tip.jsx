import React from 'react';
import {
  Link,
} from 'react-router-dom';

export default ({tip_id, title, user_name, empathy_count }) => (
  <div id="reviewList">
		<div className="reviewContent">
      <div className="reviewImgDiv">
			</div>
		  <div className="reviewInfo">
        <Link to={`/tips/${tip_id}/detail`}><h3 className="tip-title">{title}</h3></Link>
				<h3 id="reviewTitle">가장 중요한 것은 완성도입니다.</h3>
      					<h3 id="reviewAuthor">by <span className="tip-bold">{user_name}</span></h3>
      </div>
	  </div>
  </div>
);
