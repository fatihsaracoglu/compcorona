import React from "react";
import Dropzone from "react-dropzone";
import { parse } from "papaparse";
import { Button, Modal, Alert } from "react-bootstrap";
import DragAndDropIcon from "../assets/drag-drop-icon.jpg";
import { withTranslation } from "react-i18next";
import { FileStore } from "../stores/FileStore";

const DropzoneContainer = (props) => {
  const nonFilteredFiles = FileStore.useState((s) => s.nonFilteredFiles);
  const isFiltered = FileStore.useState((s) => s.isFiltered);
  const pValue = FileStore.useState((s) => s.pValue);
  const foldChange = FileStore.useState((s) => s.foldChange);
  const isMaxLimitErrorModalOpen = FileStore.useState(
    (s) => s.isMaxLimitErrorModalOpen
  );
  const isErrorModalOpen = FileStore.useState((s) => s.isErrorModalOpen);
  const isErrorModalOpen2 = FileStore.useState((s) => s.isErrorModalOpen2);
  const isErrorModalOpen3 = FileStore.useState((s) => s.isErrorModalOpen3);

  // When files are dragged or selected, this function will be called. It takes uploaded files
  // and check their count. If the count is not greater than 3, it will read files and show a model
  // to allow user to make filtering on files.
  const onDrop = async (files) => {
    if (files.length > 3 || nonFilteredFiles.length + files.length > 3) {
      FileStore.update((s) => {
        s.isMaxLimitErrorModalOpen = true;
      });
      setTimeout(() => {
        FileStore.update((s) => {
          s.isMaxLimitErrorModalOpen = false;
        });
      }, 2000);
    } else {
      var allowedFiles = [];
      var file_types = ["text/csv", "text/tab-separated-values", ".csv", "application/vnd.ms-excel", "application/csv", "text/x-csv", "application/x-csv", "text/comma-separated-values", "text/x-comma-separated-values", "text/csv", "text/tab-separated-values", ".tsv", "application/tsv", "text/x-tsv", "application/x-tsv", "text/x-tab-separated-values"];
      files.forEach((file) => {
        if (!file_types.includes(file.type)) {
          FileStore.update((s) => {
            s.isErrorModalOpen = true;
          });
        } else if (file.name === "SARS" || file.name === "MERS" || file.name === "SARS_COV2") {
          FileStore.update((s) => {
            s.isErrorModalOpen2 = true;
          });
        } else {
          allowedFiles.push(file);
        }
      });
      if (allowedFiles.length > 0) {
        FileStore.update((s) => {
          s.activeIndex = 0;
        });
        readFiles(allowedFiles);
      }
    }
  };

  // It gets files argument from onDrag() method and traverse them to parse into rows.
  // It will set the nonFilteredFiles as: [{name, content}, {name, content}, ...].
  // The objects in the array are non-filtered files.
  const readFiles = (files) => {
    // for accessing state
    files.map((file) => {
      const reader = new FileReader();
      reader.onload = (e) => {
        const content = e.target.result;
        var parsedCSV = parse(content, {
          header: true, skipEmptyLines: true
        });
        readRows(file, parsedCSV.data);
      };
      reader.readAsText(file);
      return true;
    });
  };

  const readRows = (file, rows) => {
    var fileObj = {};
    fileObj["name"] = file.name;
    fileObj["content"] = rows;
    if (rows[0].gene_name === undefined) {
      FileStore.update((s) => {
        s.isErrorModalOpen3 = !isErrorModalOpen3;
      });
    } else {
      if (isFiltered) {
        filterFile(fileObj);
      }
      FileStore.update((s) => {
        s.nonFilteredFiles.push(fileObj);
      });
    }

    if (rows[0].fc === undefined || rows[0].pval === undefined) {
      FileStore.update((s) => {
        s.canBeFiltered = false;
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
    FileStore.update((s) => {
      s.filteredFiles.push(fileObj);
    });
  };

  /******** ERROR MODAL ***********/

  const toggleErrorModal = () => {
    FileStore.update((s) => {
      s.isErrorModalOpen = !isErrorModalOpen;
    });
  };

  const toggleErrorModal2 = () => {
    FileStore.update((s) => {
      s.isErrorModalOpen2 = !isErrorModalOpen2;
    });
  }

  const toggleErrorModal3 = () => {
    FileStore.update((s) => {
      s.isErrorModalOpen3 = !isErrorModalOpen3;
    });
  }

  const toggleLimitErrorModal = () => {
    FileStore.update((s) => {
      s.isMaxLimitErrorModalOpen = !isMaxLimitErrorModalOpen;
    });
  }

  /********************************/

  return (
    <div>
      <Dropzone onDrop={onDrop} accept=".csv, text/csv, application/vnd.ms-excel, application/csv, text/x-csv, application/x-csv, text/comma-separated-values, text/x-comma-separated-values, .tsv, text/tsv, application/tsv, text/x-tsv, application/x-tsv, text/tab-separated-values, text/x-tab-separated-values">
        {({ getRootProps, getInputProps }) => (
          <section className="container">
            <div
              {...getRootProps({
                className: "dropzone",
              })}
            >
              <input {...getInputProps()} />
              <img
                alt="file-uploader-icon"
                id="drag-drop-icon"
                src={DragAndDropIcon}
              ></img>
              <div>{props.t("dropzone")}</div>
            </div>
          </section>
        )}
      </Dropzone>
      <Modal show={isMaxLimitErrorModalOpen} onHide={toggleLimitErrorModal}>
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
        </Modal.Body>
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
      </Modal>
      <Modal show={isErrorModalOpen} onHide={toggleErrorModal}>
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
            {props.t("csv.type.error")}
          </Alert>
          <Button variant="secondary" size="sm" onClick={toggleErrorModal}>
            {props.t("ok")}
          </Button>
        </Modal.Body>
      </Modal>
      <Modal show={isErrorModalOpen2} onHide={toggleErrorModal2}>
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
            {props.t("file.name.error.label")}
          </Alert>
          <Button variant="secondary" size="sm" onClick={toggleErrorModal2}>
            {props.t("ok")}
          </Button>
        </Modal.Body>
      </Modal>

      <Modal show={isErrorModalOpen3} onHide={toggleErrorModal3}>
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
            {props.t("file.column.missing.error.modal")}
          </Alert>
          <Button variant="secondary" size="sm" onClick={toggleErrorModal3}>
            {props.t("ok")}
          </Button>
        </Modal.Body>
      </Modal>
    </div>
  );
};

export default withTranslation()(DropzoneContainer);
