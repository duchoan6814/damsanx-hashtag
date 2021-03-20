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
              <p><Latex>{item}</Latex></p>
              <img src={listImage[index]} />
            </>
          );
        })}

        <p>Ví dụ:</p>
        <Latex>{exam}</Latex>
      </div>
    </div>
  );
};

export default ContentLyThuyet;
