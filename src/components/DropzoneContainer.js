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
      files.forEach((file) => {
        if (file.type !== "text/csv") {
          FileStore.update((s) => {
            s.isErrorModalOpen = true;
          });
        } else if (file.name === "SARS" || file.name === "MERS" || file.name === "SARS_COV2") {
          //CHANGE THIS LATER
          FileStore.update((s) => {
            s.isErrorModalOpen = true;
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
    if (isFiltered) {
      filterFile(fileObj);
    }
    FileStore.update((s) => {
      s.nonFilteredFiles.push(fileObj);
    });
  };

  const filterFile = (file) => {
    var filteredRows = [];
    file.content.forEach((row) => {
      if (parseFloat(row.pval) <= pValue && parseFloat(row.fc) >= foldChange) {
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

  /********************************/

  return (
    <div>
      <Dropzone onDrop={onDrop}>
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
      <Modal show={isMaxLimitErrorModalOpen}>
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
    </div>
  );
};

export default withTranslation()(DropzoneContainer);
