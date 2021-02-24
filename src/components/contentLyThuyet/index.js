import React from 'react';
import './contentLyThuyet.scss';
import avatar from '../../assets/svg/avatar.svg';

const ContentLyThuyet = ({hashtag, content, exam}) => {
  return (
    <div className="content-container">
      <img src={avatar} alt="avatar" />
      <div className="content-ly-thuyet">
        <h3>{hashtag}</h3>
        <p>{content}</p>
        <p>{exam}</p>
      </div>
    </div>
  );
};

export default ContentLyThuyet;