import React from "react";
import {
  Button,
  Modal,
  Row,
  Col,
  Card,
} from "react-bootstrap";
import { Link } from "react-router-dom";
import FileTable from './FileTable';
import DropzoneContainer from './DropzoneContainer';

import "../assets/Dropzone.css";

class FileSection extends React.Component {
  constructor() {
    super();
    this.state = {
      nonFilteredFiles: [],
      filteredFiles: [],
      isMaxLimitErrorModalOpen: false,
      isErrorModalOpen: false,
      isEditModalOpen: false,
      isFilterModalOpen: false,
      isPreviewModalOpen: false,
      fileContent: "",
      previousName: "",
      newName: "",
      pValue: 0.05,
      foldChange: 1,
    };
  }

  // It reads all files that are uploaded beforehand, traverse them and filter based on
  // p-value and fold-change. Then, put these new filtered files into related state.
  // The structure of filteredFiles state is: [{name, content}, {name, content}, ...]
  // The objects in the array are filtered files.
  filterFiles = () => {
    this.setState({
      filteredFiles: [],
    });
    this.state.nonFilteredFiles.forEach((file) => {
      var filteredRows = [];
      file.content.forEach((row) => {
        if (
          parseFloat(row.pval) <= this.state.pValue &&
          parseFloat(row.fc) >= this.state.foldChange
        ) {
          filteredRows.push(row);
        }
      });
      var fileObj = {};
      fileObj["name"] = file.name;
      fileObj["content"] = filteredRows;
      this.setState((state, props) => ({
        filteredFiles: [...state.filteredFiles, fileObj],
      }));
    });
  };

  /********** FILTERING ************/

  toggleFilterModal = () => {
    this.setState({
      isFilterModalOpen: !this.state.isFilterModalOpen,
    });
  };

  handleFilterOptions = () => {
    this.filterFiles();
  };

  handlePValueChange = (e) => {
    this.setState({
      pValue: parseFloat(e.target.value),
    });
  };

  handlefoldChngChange = (e) => {
    this.setState({
      foldChange: parseFloat(e.target.value),
    });
  };

  /********************************/

  /******** To handle state change based on Table */
  handleStateUpdate = (filteredFiles, nonFilteredFiles) => {
    this.setState({
      filteredFiles, nonFilteredFiles
    })
  }

  /******** To handle state change based on Dropzone */
  handleStateUpdateForDropzone = (nonFilteredFiles, isFilterModalOpen) => {
    this.setState({
      nonFilteredFiles, isFilterModalOpen
    })
  }  



  render() {
    return (
      <div>
        <div className="file-related-section">
          <Row>
            {this.state.nonFilteredFiles.length > 0 ? (
              <Col>
                <div className="table-section">
                  <FileTable filteredFiles={this.state.filteredFiles} nonFilteredFiles={this.state.nonFilteredFiles} handleStateUpdate={this.handleStateUpdate} />
                </div>
              </Col>
            ) : null}
            <Col>

              <DropzoneContainer nonFilteredFiles={this.state.nonFilteredFiles} handleStateUpdateForDropzone={this.handleStateUpdateForDropzone}/>
              {this.state.nonFilteredFiles.length > 0 ? (
              <div style={{ marginTop: "4%" }}>
                <Button
                  className="shadow-none"
                  variant="outline-primary"
                  size="sm"
                  style={{ display: "inline-block", marginRight: "4%" }}
                  disabled={Object.keys(this.state.filteredFiles).length === 0}
                  onClick={this.toggleFilterModal}
                >
                  <i className="filter icon"></i> Filtrele
                </Button>
                <Link to="diagram">
                  <Button
                    className="shadow-none"
                    variant="outline-primary"
                    size="sm"
                    style={{ display: "inline-block" }}
                    disabled={
                      Object.keys(this.state.filteredFiles).length === 0
                    }
                  >
                    <i className="magic icon"></i> Görselleştir
                  </Button>
                </Link>
              </div>) : null}
            </Col>
          </Row>
        </div>

        

        

        <Modal
          show={this.state.isFilterModalOpen}
          onHide={this.toggleFilterModal}
          backdrop="static"
        >
          <Modal.Header>
            <Modal.Title>Filtreleme</Modal.Title>
          </Modal.Header>
          <Modal.Body>
            <Card>
              <Card.Body>
                <Row>
                  <i
                    className="info circle icon col-2"
                    style={{
                      fontSize: "45px",
                      color: "#ffc107",
                      lineHeight: "80px",
                      flex: "0 0 14.666667%",
                      marginLeft: "4%",
                    }}
                  ></i>
                  <div className="col-9">
                    p-value için belirlenen değere eşit ve küçük genler
                    seçilirken, fold-change için belirlenen değere eşit ve büyük
                    genler seçilir.
                  </div>
                </Row>
              </Card.Body>
            </Card>

            <div
              className="row justify-content-center"
              style={{ textAlign: "center", marginTop: "8%" }}
            >
              <div
                style={{
                  marginRight: "3%",
                  float: "left",
                  lineHeight: "35px",
                }}
              >
                p-value:{" "}
              </div>
              <div
                className="form-row"
                style={{ marginRight: "7%", float: "left" }}
              >
                <div className="form-group col-md-13">
                  <select
                    className="form-control shadow-none"
                    name="p-value"
                    value={this.state.pValue}
                    onChange={this.handlePValueChange}
                  >
                    <option value="0.01">0.01</option>
                    <option value="0.05">0.05</option>
                    <option value="0.1">0.1</option>
                  </select>
                </div>
              </div>
              <div
                style={{
                  marginRight: "3%",
                  float: "left",
                  lineHeight: "35px",
                }}
              >
                fold-change:{" "}
              </div>
              <div
                className="form-row"
                style={{ marginRight: "7%", float: "left" }}
              >
                <div className="form-group col-md-13">
                  <select
                    className="form-control shadow-none"
                    name="fold-change"
                    value={this.state.foldChange}
                    onChange={this.handlefoldChngChange}
                  >
                    <option value="1">1</option>
                    <option value="1.5">1.5</option>
                    <option value="2">2</option>
                    <option value="3">3</option>
                  </select>
                </div>
              </div>
            </div>
          </Modal.Body>
          <Modal.Footer>
            <Button
              variant="primary"
              size="sm"
              onClick={() => {
                this.handleFilterOptions();
                this.toggleFilterModal();
              }}
            >
              Kaydet
            </Button>
          </Modal.Footer>
        </Modal>
      </div>
    );
  }
}

export default FileSection;
