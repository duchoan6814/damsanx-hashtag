import React from "react";
import "./contentLyThuyet.scss";
import avatar from "../../assets/svg/avatar.svg";
import Latex from "react-latex";

const ContentLyThuyet = ({ hashtag, content, listImage, exam }) => {
  return (
    <div className="content-container">
      <img src={avatar} alt="avatar" />
      <div className="content-ly-thuyet">
        <h3>{hashtag}</h3>
        {content.map((item, index) => {
          return (
            <>
              <p>{item}</p>
              <img src={listImage[index]} />
            </>
          );
        })}

        <p>Ví dụ:</p>
        <p>{exam}</p>
      </div>
    </div>
  );
};

export default ContentLyThuyet;
