import React from "react";
import { Button, Modal, Alert } from "react-bootstrap";
import { withTranslation } from "react-i18next";
import { FileStore } from "../stores/FileStore";
import AsyncSelect from "react-select";
import makeAnimated from "react-select/animated";
import sars from "../data/sars.csv";
import mers from "../data/mers.csv";
import sarscov2 from "../data/sars-cov2.csv";
import * as d3 from "d3";
import "../data/mers.csv";
import "../data/sars.csv";
import "../data/sars-cov2.csv";

const animatedComponents = makeAnimated();

const SelectPreprocessedData = (props) => {
  const isPreprocessedDataModalOpen = FileStore.useState(
    (s) => s.isPreprocessedDataModalOpen
  );
  const pValue = FileStore.useState((s) => s.pValue);
  const foldChange = FileStore.useState((s) => s.foldChange);
  const nonFilteredFiles = FileStore.useState((s) => s.nonFilteredFiles);
  const filteredFiles = FileStore.useState((s) => s.filteredFiles);
  const isFiltered = FileStore.useState((s) => s.isFiltered);
  const isMaxLimitErrorModalOpen = FileStore.useState(
    (s) => s.isMaxLimitErrorModalOpen
  );
  const options = FileStore.useState((s) => s.options);

  const [selectedOptions, setSelectedOptions] = React.useState([]);

  const toggleModal = () => {
    FileStore.update((s) => {
      s.isPreprocessedDataModalOpen = !isPreprocessedDataModalOpen;
    });
  };

  const toggleErrorModal = () => {
    FileStore.update((s) => {
      s.isMaxLimitErrorModalOpen = !isMaxLimitErrorModalOpen;
    });
  };

  const handleChange = (selectedOptions) => {
    setSelectedOptions(selectedOptions);
  };

  const handleSave = () => {
    var map = {
      SARS: sars,
      MERS: mers,
      SARS_COV2: sarscov2,
    };
    var files = [];
    selectedOptions.forEach((obj) => {
      var file_obj = {};
      file_obj.name = obj.value;
      file_obj.content = map[obj.value];
      files.push(file_obj);
    });
    readFiles(files);
  };

  const readFiles = (files) => {
    files.map((file) => {
      d3.csv(file.content).then((data) => {
        readRows(file.name, data);
      });
      return true;
    });
  };

  const readRows = (file_name, rows) => {
    var fileObj = {};
    fileObj["name"] = file_name;
    fileObj["content"] = rows;
    if (isFiltered) {
      filterFile(fileObj);
    }
    if (
      nonFilteredFiles.length === 3 ||
      selectedOptions.length + nonFilteredFiles.length > 3
    ) {
      FileStore.update((s) => {
        s.isPreprocessedDataModalOpen = !isPreprocessedDataModalOpen;
        s.isMaxLimitErrorModalOpen = !isMaxLimitErrorModalOpen;
      });
    } else {
      FileStore.update((s) => {
        s.isPreprocessedDataModalOpen = !isPreprocessedDataModalOpen;
        s.nonFilteredFiles.push(fileObj);
      });
      var toBeDeleted = [];
      selectedOptions.forEach((obj) => {
        toBeDeleted.push(obj.value);
      });
      const toDelete = new Set(toBeDeleted);
      const newOptions = options.filter((obj) => !toDelete.has(obj.value));
      FileStore.update((s) => {
        s.options = newOptions;
      });
    }
  };

  const filterFile = (file) => {
    var filteredRows = [];
    file.content.forEach((row) => {
      if (parseFloat(row.pval) <= pValue && Math.abs(parseFloat(row.de)) >= foldChange) {
        filteredRows.push(row);
      }
    });
    var fileObj = {};
    fileObj["name"] = file.name;
    fileObj["content"] = filteredRows;
    if (
      filteredFiles.length === 3 ||
      selectedOptions.length + filteredFiles.length > 3
    ) {
      FileStore.update((s) => {
        s.isPreprocessedDataModalOpen = !isPreprocessedDataModalOpen;
        s.isMaxLimitErrorModalOpen = !isMaxLimitErrorModalOpen;
      });
    } else {
      FileStore.update((s) => {
        s.isPreprocessedDataModalOpen = !isPreprocessedDataModalOpen;
        s.filteredFiles.push(fileObj);
      });
      var toBeDeleted = [];
      selectedOptions.forEach((obj) => {
        toBeDeleted.push(obj.value);
      });
      const toDelete = new Set(toBeDeleted);
      const newOptions = options.filter((obj) => !toDelete.has(obj.value));
      FileStore.update((s) => {
        s.options = newOptions;
      });
    }
  };

  return (
    <div>
      <Button
        className="shadow-none"
        variant="outline-primary"
        size="sm"
        onClick={toggleModal}
      >
        <i className="file icon"></i> {props.t("preprocessed.modal.title")}
      </Button>

      <Modal show={isPreprocessedDataModalOpen} onHide={toggleModal} backdrop="static">
        <Modal.Header closeButton>
          <Modal.Title>{props.t("preprocessed.modal.title")}</Modal.Title>
        </Modal.Header>
        <Modal.Body style={{ textAlign: "center", padding: "8% 2% 8% 2%" }}>
          <AsyncSelect
            closeMenuOnSelect={false}
            components={animatedComponents}
            isMulti
            options={options}
            onChange={handleChange}
            noOptionsMessage={() => props.t("no.options.message")}
            placeholder={props.t("select.label")}
          />
        </Modal.Body>
        <Modal.Footer>
          <Button variant="secondary" size="sm" onClick={toggleModal}>
            {props.t("edit.close.button.label")}
          </Button>
          <Button variant="primary" size="sm" onClick={handleSave}>
            {props.t("ok")}
          </Button>
        </Modal.Footer>
      </Modal>

      <Modal show={isMaxLimitErrorModalOpen} onHide={toggleErrorModal}>
        <Modal.Body
          style={{
            textAlign: "center",
          }}
        >
          <div>
            <i
              className="exclamation circle icon"
              style={{
                color: "red",
                fontSize: "80px",
                paddingBottom: "8%",
              }}
            ></i>
          </div>
          <Alert
            variant="secondary"
            style={{
              textAlign: "center",
              borderRadius: "0",
              marginTop: "3%",
            }}
          >
            {props.t("file.count.error")}
          </Alert>
          <Button variant="secondary" size="sm" onClick={toggleErrorModal}>
            {props.t("ok")}
          </Button>
        </Modal.Body>
      </Modal>
    </div>
  );
};

export default withTranslation()(SelectPreprocessedData);
