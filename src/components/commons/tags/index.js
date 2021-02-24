import React, {useState, useEffect} from "react";
import './tags.scss';

const Tag = ({ content, select }) => {
  const [selected, setSelected] = useState('');

  useEffect(() => {
    if (select) {
      setSelected('select-tag');
    }
  }, select)

  return (
    <div className={`tag ${selected}`}>
      <p>{content}</p>
    </div>
  );
};

export default Tag;
