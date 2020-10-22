import React from "react";
import { Row, Col } from "react-bootstrap";
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
          </Col>
        </Row>
      </div>
    </div>
  );
};

export default withTranslation()(FileSection);
