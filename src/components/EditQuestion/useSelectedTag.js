import React, { useMemo, useState, useRef } from 'react';
import { Tag } from 'antd';

const { CheckableTag } = Tag;
const useSelectedTag = (arrayType, tagDefault) => {
  const checkableTagRef = useRef(null);
  const [selectedTag, setSelectedTag] = useState([
    `${tagDefault || arrayType[0]?.key}`
  ]);

  const [selectContent, setSelectContent] = useState(false);

  const checkedSelectContent = checkedTypeContent => {
    if (checkedTypeContent === 'Content') {
      setSelectContent(true);
    } else {
      setSelectContent(false);
    }
  };

  const handleChangeTag = (tag, checked) => {
    const nextselectedTag = checked
      ? [tag]
      : selectedTag.filter(newTag => newTag !== tag);

    checkedSelectContent(...nextselectedTag);
    setSelectedTag(nextselectedTag);
  };

  const handleCheckDefaultTag = tag => {
    return selectedTag.indexOf(tag) > -1;
  };

  const renderData = useMemo(() => {
    if (arrayType?.length < 0) return null;
    return arrayType?.map(tag => {
      return (
        <CheckableTag
          ref={checkableTagRef}
          key={tag.key}
          checked={handleCheckDefaultTag(tag.key)}
          className="checktag"
          onChange={checked => {
            // prevent change selected tag when click on the same tag
            if (selectedTag[0] === tag.key) return;
            handleChangeTag(tag.key, checked);
          }}
        >
          {tag.name}
        </CheckableTag>
      );
    });
  }, [selectedTag, arrayType]);

  return {
    renderData,
    selectContent,
    selectedTag
  };
};

export default useSelectedTag;
