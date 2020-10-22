import React from "react";
import { Button, Modal, Row, Card } from "react-bootstrap";
import { withTranslation } from "react-i18next";
import { FileStore } from "../stores/FileStore";

const FilterButton = (props) => {
  const nonFilteredFiles = FileStore.useState((s) => s.nonFilteredFiles);
  const pValue = FileStore.useState((s) => s.pValue);
  const foldChange = FileStore.useState((s) => s.foldChange);
  const isFilterModalOpen = FileStore.useState((s) => s.isFilterModalOpen);

  // It reads all files that are uploaded beforehand, traverse them and filter based on
  // p-value and fold-change. Then, put these new filtered files into related state.
  // The structure of filteredFiles state is: [{name, content}, {name, content}, ...]
  // The objects in the array are filtered files.
  const filterFiles = () => {
    FileStore.update((s) => {
      s.isFiltered = true;
      s.filteredFiles = [];
    });
    nonFilteredFiles.forEach((file) => {
      var filteredRows = [];
      file.content.forEach((row) => {
        if (
          parseFloat(row.pval) <= pValue &&
          parseFloat(row.fc) >= foldChange
        ) {
          filteredRows.push(row);
        }
      });
      var fileObj = {};
      fileObj["name"] = file.name;
      fileObj["content"] = filteredRows;
      FileStore.update((s) => {
        s.filteredFiles.push(fileObj);
      });
    });
  };

  const toggleFilterModal = () => {
    FileStore.update((s) => {
      s.isFilterModalOpen = !isFilterModalOpen;
    });
  };


  const handleReset = () => {
    FileStore.update((s) => {
      s.isFiltered = false;
    });
  };

  const handleFilterOptions = () => {
    filterFiles();
  };

  const handlePValueChange = (e) => {
    FileStore.update((s) => {
      s.pValue = parseFloat(e.target.value);
    });
  };

  const handlefoldChngChange = (e) => {
    FileStore.update((s) => {
      s.foldChange = parseFloat(e.target.value);
    });
  };

  /********************************/

  return (
    <div id="filter-button">
      <Button
        className="shadow-none"
        variant="outline-primary"
        size="sm"
        disabled={Object.keys(nonFilteredFiles).length === 0}
        onClick={toggleFilterModal}
      >
        <i className="filter icon"></i> {props.t("filter.label")}
      </Button>

      <Modal
        show={isFilterModalOpen}
        onHide={toggleFilterModal}
        backdrop="static"
      >
        <Modal.Header closeButton>
          <Modal.Title>{props.t("filter.label")}</Modal.Title>
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
                  {props.t("filter.description.label")}
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
                  value={pValue}
                  onChange={handlePValueChange}
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
                  value={foldChange}
                  onChange={handlefoldChngChange}
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
            variant="secondary"
            size="sm"
            onClick={(e) => {
                handleReset();
                toggleFilterModal(e);
              }}
          >
            {props.t("filter.reset.button.label")}
          </Button>
          <Button
            variant="primary"
            size="sm"
            onClick={(e) => {
              handleFilterOptions();
              toggleFilterModal(e);
            }}
          >
            {props.t("filter.save.button.label")}
          </Button>
        </Modal.Footer>
      </Modal>
    </div>
  );
};

export default withTranslation()(FilterButton);
