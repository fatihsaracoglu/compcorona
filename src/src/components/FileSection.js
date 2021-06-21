import React from "react";
import { Row, Col, Card, Button } from "react-bootstrap";
import { Link } from "react-router-dom";
import FileTable from "./FileTable";
import DropzoneContainer from "./DropzoneContainer";
import { withTranslation } from "react-i18next";
import { FileStore } from "../stores/FileStore";
import { saveAs } from 'file-saver';

import "../assets/Dropzone.css";
import FilterButton from "./FilterButton";
import VisualizeButton from "./VisualizeButton";
import SelectPreprocessedData from "./SelectPreprocessedData";
import template from '../data/template.csv';


const saveFile = () => {
  saveAs(
    template,
    "template.csv"
  );
}

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
                <div className="justify-content-center">
                  <SelectPreprocessedData />
                  <div style={{marginTop: '2%', display: 'flex', justifyContent: 'center'}}>
                    <Link to={`${process.env.PUBLIC_URL}/diagram`}>
                      <VisualizeButton />
                    </Link>
                    <div style={{ margin: "0 4% 0 4%" }}>
                      <FilterButton />
                    </div>
                  </div>
                </div>
              </div>
            ) : null}
            {nonFilteredFiles.length === 0 ? (
              <div
              id="file-content-warning"
              style={{ width: "65%", margin: "0 auto", marginTop: "3%" }}
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
                  <Button variant="outline-secondary" onClick={saveFile}>Download Template</Button>{' '}
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
