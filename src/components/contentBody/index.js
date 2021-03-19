import React, { useState, useEffect, useContext, useMemo } from "react";
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
import { StoreContext } from "../../Context";

function useQuery() {
  return new URLSearchParams(useLocation().search);
}

const ContentBody = () => {
  const [detailData, setDetailData] = useState({});
  const [currentPage, setCurrentPage] = useState(0);
  const {
    data: [data, setData],
  } = useContext(StoreContext);

  let { slug } = useParams();
  let query = useQuery();

  useEffect(() => {
    setDetailData(
      data.find((item, index) => convertSlug(item.hashtag) === slug) ===
        undefined
        ? data[0]
        : data.find((item, index) => convertSlug(item.hashtag) === slug)
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

  const renderDiemLyThuyet = useMemo(() => {
    const dataTemp = data.find((item, index) => {
      return convertSlug(get(item, "hashtag", "")) === slug;
    });

    return get(dataTemp, "listLyThuyet", []).map((item, index) => (
      <div className="wrap_display">
        <ContentLyThuyet
          hashtag={dataTemp?.hashtag}
          content={item?.noiDung?.listText}
          listImage={item?.noiDung?.image}
          exam={item?.viDu}
        />
        <h3>Ví Dụ:</h3>
        <Row className="list-question" gutter={[24, 24]}>
          {item?.listCauHoi.map((itemm) => (
            <Col span={24}>
              <ContentQuestion
                cauHoi={get(itemm, "cauHoi", "")}
                dapAn={get(itemm, "dapAn", [])}
                giaiThich={get(itemm, "giaiThich", "")}
                dapAnDung={get(itemm, "dapAnDung", "")}
              />
            </Col>
          ))}
        </Row>
      </div>
    ));
  }, [slug]);

  return (
    <>{renderDiemLyThuyet}</>
  );
};

export default ContentBody;
