import React from "react";
import { Row, Col, Card } from "react-bootstrap";
import { Link } from "react-router-dom";
import FileTable from "./FileTable";
import DropzoneContainer from "./DropzoneContainer";
import { withTranslation } from "react-i18next";
import { FileStore } from "../stores/FileStore";

import "../assets/Dropzone.css";
import FilterButton from "./FilterButton";
import VisualizeButton from "./VisualizeButton";
import SelectPreprocessedData from "./SelectPreprocessedData";

const FileSection = (props) => {
  const nonFilteredFiles = FileStore.useState((s) => s.nonFilteredFiles);

  return (
    <div>
      <div className="file-related-section">
        <Row>
          {nonFilteredFiles.length > 0 ? (
            <Col>
              <div className="table-section">
                <FileTable />
              </div>
            </Col>
          ) : null}
          <Col>
            <DropzoneContainer />
            {nonFilteredFiles.length > 0 ? (
              <div
                className="container"
                style={{ marginTop: "4%", width: "80%" }}
              >
                <div className="row justify-content-center">
                  <SelectPreprocessedData />
                  <div style={{ margin: "0 4% 0 4%" }}>
                    <FilterButton />
                  </div>
                  <Link to={`${process.env.PUBLIC_URL}/diagram`}>
                    <VisualizeButton />
                  </Link>
                </div>
              </div>
            ) : null}
            {nonFilteredFiles.length === 0 ? (
              <div
              id="file-content-warning"
              style={{ width: "50%", margin: "0 auto", marginTop: "3%" }}
            >
              <Card>
                <Card.Body>
                  <div style={{display: 'flex', alignItems: 'center'}}>
                  <i
                    className="info circle icon"
                    style={{
                      fontSize: "40px",
                      color: "#ffc107",
                      
                      display: 'flex',
                      alignItems: 'center',
                    }}
                  ></i>{" "}
                  <div className="message" style={{textAlign: 'left', marginLeft: '3%'}}>
                  {props.t("file.column.warning")}</div>
                  </div>
                </Card.Body>
              </Card>
            </div>
            ) : null}
            
          </Col>
        </Row>
      </div>
    </div>
  );
};

export default withTranslation()(FileSection);
