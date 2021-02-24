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

  console.log("page", query.get("page"));

  useEffect(() => {
    setDetailData(
      data.find((item, index) => convertSlug(item.hashtag) == slug)
    );
    query.get("page") ?? setCurrentPage(query.get("page"));
  }, [slug]);

  return (
    <>
      <ContentLyThuyet
        hashtag={detailData?.hashtag}
        content={get(detailData, "listLyThuyet[0].noiDung")}
        exam={get(detailData, "listLyThuyet[0].viDu")}
      />
      <h3>Bài tập:</h3>
      <Row className="list-question" gutter={[24, 24]}>
        {get(detailData, "listLyThuyet[0].listCauHoi", []).map(() => (
          <Col span={12}>
            <ContentQuestion />
          </Col>
        ))}
      </Row>
    </>
  );
};

export default ContentBody;
