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
    <a className={`tag ${selected}`}>
      <p>{content}</p>
    </a>
  );
};

export default Tag;
