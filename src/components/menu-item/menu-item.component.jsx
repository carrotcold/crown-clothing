import React from 'react';
import { withRouter } from 'react-router-dom';

import './menu-item.styles.scss';

// history, match 는 위에서 내리 꽂아준 props가 아니지만
// withRouter라는 HOC를 이용하여 접근가능하게 만들 수 있다.
const MenuItem = ({ title, imageUrl, size, linkUrl, history, match }) => (
  <div
    className={`${size} menu-item`}
    onClick={() => history.push(`${match.url}${linkUrl}`)}
  >
    <div
      className="background-image"
      style={{ backgroundImage: `url(${imageUrl})` }}
    />
    <div className="content">
      <h1 className="title">{title}</h1>
      <span className="subtitle">구매하기</span>
    </div>
  </div>
);

export default withRouter(MenuItem);
