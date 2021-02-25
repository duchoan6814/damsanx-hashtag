import React, { useState, useEffect } from "react";
import { Row, Col } from "antd";
import ContentLyThuyet from "../contentLyThuyet";
import ContentQuestion from "../commons/question";
import { get } from "lodash";
import {
  BrowserRouter as Router,
  Switch,
  Route,
  useParams,
  useLocation,
} from "react-router-dom";
import { convertSlug } from "../../common/helper";

function useQuery() {
  return new URLSearchParams(useLocation().search);
}

const ContentBody = ({ data }) => {
  const [detailData, setDetailData] = useState({});
  const [currentPage, setCurrentPage] = useState(0);
  let { slug } = useParams();
  let query = useQuery();

  console.log("page", currentPage - 1);

  useEffect(() => {
    setDetailData(
      data.find((item, index) => convertSlug(item.hashtag) == slug)
    );
    query.get("page") && setCurrentPage(query.get("page"));
  }, [query.get("page"), slug]);

  useEffect(() => {
    if (currentPage > get(detailData, "listLyThuyet", []).length) {
      setCurrentPage(get(detailData, "listLyThuyet", []).length);
    }

    if (currentPage <= 0) {
      setCurrentPage(1);
    }
  }, [currentPage]);

  return (
    <>
      <ContentLyThuyet
        hashtag={detailData?.hashtag}
        content={get(detailData, `listLyThuyet[${currentPage - 1}].noiDung`)}
        exam={get(detailData, `listLyThuyet[${currentPage - 1}].viDu`)}
      />
      <h3>Bài tập:</h3>
      <Row className="list-question" gutter={[24, 24]}>
        {get(detailData, `listLyThuyet[${currentPage - 1}].listCauHoi`, []).map(
          (item) => (
            <Col span={12}>
              <ContentQuestion
                cauHoi={get(item, "cauHoi", "")}
                dapAn={get(item, "dapAn", [])}
                giaiThich={get(item, "giaiThich", "")}
                dapAnDung={get(item, "dapAnDung", "")}
              />
            </Col>
          )
        )}
      </Row>
    </>
  );
};

export default ContentBody;
