import React from "react";
import { Table, Button, Modal, Form } from "react-bootstrap";
import { unparse } from "papaparse";
import { CsvToHtmlTable } from "react-csv-to-table";
import { withTranslation } from "react-i18next";
import { FileStore } from "../stores/FileStore";

const FileTable = (props) => {
  const nonFilteredFiles = FileStore.useState((s) => s.nonFilteredFiles);
  const filteredFiles = FileStore.useState((s) => s.filteredFiles);
  const isFiltered = FileStore.useState((s) => s.isFiltered);
  const isPreviewModalOpen = FileStore.useState((s) => s.isPreviewModalOpen);
  const isEditModalOpen = FileStore.useState((s) => s.isEditModalOpen);
  const isDeleteConfirmationOpen = FileStore.useState(
    (s) => s.isDeleteConfirmationOpen
  );
  const previousName = FileStore.useState((s) => s.previousName);
  const newName = FileStore.useState((s) => s.newName);
  const fileContent = FileStore.useState((s) => s.fileContent);
  const isValidName = FileStore.useState((s) => s.isValidName);
  const toBeDeletedFileName = FileStore.useState((s) => s.toBeDeletedFileName);

  /********** PREVIEWING ****************/

  const togglePreviewModal = (fileContent) => {
    if (!isPreviewModalOpen) {
      var content = unparse(fileContent);
      FileStore.update((s) => {
        s.isPreviewModalOpen = !isPreviewModalOpen;
        s.fileContent = content;
      });
    } else {
      FileStore.update((s) => {
        s.isPreviewModalOpen = !isPreviewModalOpen;
      });
    }
  };

  /********************************/

  /********** EDITING ****************/

  const toggleEditModal = () => {
    FileStore.update((s) => {
      s.newName = "";
      s.isValidName = true;
      s.isEditModalOpen = !isEditModalOpen;
    });
  };

  const handleChange = (e) => {
    FileStore.update((s) => {
      s.newName = e.target.value;
    });
  };

  const editFileName = (fileName) => {
    FileStore.update((s) => {
      s.isEditModalOpen = !isEditModalOpen;
      s.previousName = fileName;
    });
  };

  const handleSave = () => {
    var flag = false;
    var specialNames = ["SARS_GSE56192", "MERS_GSE139516", "MERS_GSE56192", "SARS_COV2_GSE120934", "SARS_COV2_GSE147507"];
    for (var i = 0; i < specialNames.length; i++) {
      if (newName === specialNames[i]) {
        flag = true;
        break;
      }
    }
    // changing name in filtered files
    if (isFiltered) {
      if (
        newName === "" ||
        filteredFiles.findIndex(
          (obj) => obj.name.toLowerCase() === newName.toLowerCase()
        ) !== -1 ||
        flag
      ) {
        FileStore.update((s) => {
          s.isValidName = false;
        });
      } else {
        var objIndex = filteredFiles.findIndex(
          (obj) => obj.name === previousName
        );
        FileStore.update((s) => {
          s.filteredFiles[objIndex].name = newName;
        });
      }
    }

    if (
      newName === "" ||
      nonFilteredFiles.findIndex(
        (obj) => obj.name.toLowerCase() === newName.toLowerCase()
      ) !== -1 ||
      flag
    ) {
      FileStore.update((s) => {
        s.isValidName = false;
      });
    } else {
      // changing name in non-filtered files
      var objIndex2 = nonFilteredFiles.findIndex(
        (obj) => obj.name === previousName
      );
      FileStore.update((s) => {
        s.nonFilteredFiles[objIndex2].name = newName;
      });

      FileStore.update((s) => {
        s.newName = "";
        s.isEditModalOpen = !isEditModalOpen;
        s.isValidName = true;
      });
    }
  };

  /********************************/

  /********** DELETING ****************/

  const toggleConfirmation = (fileName) => {
    FileStore.update((s) => {
      s.isDeleteConfirmationOpen = !isDeleteConfirmationOpen;
      s.toBeDeletedFileName = fileName;
    });
  };

  const deleteFile = () => {
    FileStore.update((s) => {
      s.isDeleteConfirmationOpen = !isDeleteConfirmationOpen;
    });
    // deleting from filtered files
    var deletedFileList = [];
    if (isFiltered) {
      var newfilteredFiles = filteredFiles;
      let obj = newfilteredFiles.find(
        (file) => file.name === toBeDeletedFileName
      );
      let index = newfilteredFiles.indexOf(obj);
      deletedFileList = newfilteredFiles
        .slice(0, index)
        .concat(newfilteredFiles.slice(index + 1));
    }
    // deleting from non-filtered files
    var newfilteredFiles2 = nonFilteredFiles;
    let obj2 = newfilteredFiles2.find(
      (file) => file.name === toBeDeletedFileName
    );
    let index2 = newfilteredFiles2.indexOf(obj2);
    var deletedFileList2 = newfilteredFiles2
      .slice(0, index2)
      .concat(newfilteredFiles2.slice(index2 + 1));

    var special_names = ["SARS_GSE56192", "MERS_GSE139516", "MERS_GSE56192", "SARS_COV2_GSE120934", "SARS_COV2_GSE147507"];
    if (special_names.includes(toBeDeletedFileName)) {
      var optionObj = {};
      optionObj.value = toBeDeletedFileName;
      optionObj.label = toBeDeletedFileName;
      FileStore.update((s) => {
        s.options.push(optionObj);
      });
    }

    FileStore.update((s) => {
      s.nonFilteredFiles = deletedFileList2;
      s.filteredFiles = deletedFileList;
    });
  };

  /********************************/
  return (
    <div>
      <Table>
        <thead>
          <tr>
            <th style={{ width: "55%" }}>{props.t("table.name.label")}</th>
            <th style={{ width: "5%" }}>{props.t("table.count.label")}</th>
            <th style={{ width: "40%" }}>
              {props.t("table.operations.label")}
            </th>
          </tr>
        </thead>

        <tbody>
          {isFiltered
            ? filteredFiles.map((file, index) => {
                return (
                  <tr key={index}>
                    <td>
                      {file.name.length >= 21
                        ? file.name.substring(0, 21) + "..."
                        : file.name}
                    </td>
                    <td>{file.content.length}</td>
                    <td>
                      <Button
                        className="shadow-none"
                        onClick={(e) => togglePreviewModal(file.content)}
                        variant="outline-success"
                        size="sm"
                        id="preview-btn"
                        disabled={file.content.length === 0}
                      >
                        <i className="eye icon" id="icons"></i>
                      </Button>
                      <Button
                        className="shadow-none"
                        onClick={(e) => editFileName(file.name, e)}
                        variant="outline-info"
                        size="sm"
                        id="edit-btn"
                        disabled={
                          file.name === "SARS_GSE56192" ||
                          file.name === "MERS_GSE139516" ||
                          file.name === "MERS_GSE56192" ||
                          file.name === "SARS_COV2_GSE120934" ||
                          file.name === "SARS_COV2_GSE147507"
                        }
                      >
                        <i className="edit icon" id="icons"></i>
                      </Button>
                      <Button
                        className="shadow-none"
                        onClick={() => toggleConfirmation(file.name)}
                        variant="outline-danger"
                        size="sm"
                        id="delete-btn"
                      >
                        <i className="x icon" id="icons"></i>
                      </Button>
                      <Modal
                        show={isDeleteConfirmationOpen}
                        onHide={toggleConfirmation}
                      >
                        <Modal.Body style={{ padding: "5% 0 5% 4%" }}>
                          {props.t("delete.confirm.message")}
                        </Modal.Body>
                        <Modal.Footer>
                          <Button
                            variant="secondary"
                            size="sm"
                            onClick={toggleConfirmation}
                          >
                            {props.t("close")}
                          </Button>
                          <Button
                            variant="danger"
                            size="sm"
                            onClick={deleteFile}
                          >
                            {props.t("yes")}
                          </Button>
                        </Modal.Footer>
                      </Modal>
                    </td>
                  </tr>
                );
              })
            : nonFilteredFiles.map((file, index) => {
                return (
                  <tr key={index}>
                    <td>
                      {file.name.length >= 21
                        ? file.name.substring(0, 21) + "..."
                        : file.name}
                    </td>
                    <td>{file.content.length}</td>
                    <td>
                      <Button
                        className="shadow-none"
                        onClick={(e) => togglePreviewModal(file.content)}
                        variant="outline-success"
                        size="sm"
                        id="preview-btn"
                      >
                        <i className="eye icon" id="icons"></i>
                      </Button>
                      <Button
                        className="shadow-none"
                        onClick={(e) => editFileName(file.name, e)}
                        variant="outline-info"
                        size="sm"
                        id="edit-btn"
                        disabled={
                          file.name === "SARS_GSE56192" ||
                          file.name === "MERS_GSE139516" ||
                          file.name === "MERS_GSE56192" ||
                          file.name === "SARS_COV2_GSE120934" ||
                          file.name === "SARS_COV2_GSE147507"
                        }
                      >
                        <i className="edit icon" id="icons"></i>
                      </Button>
                      <Button
                        className="shadow-none"
                        onClick={() => {
                          toggleConfirmation(file.name);
                        }}
                        variant="outline-danger"
                        size="sm"
                        id="delete-btn"
                      >
                        <i className="x icon" id="icons"></i>
                      </Button>
                      <Modal
                        show={isDeleteConfirmationOpen}
                        onHide={toggleConfirmation}
                      >
                        <Modal.Body style={{ padding: "5% 0 5% 4%" }}>
                          {props.t("delete.confirm.message")}
                        </Modal.Body>
                        <Modal.Footer>
                          <Button
                            variant="secondary"
                            size="sm"
                            onClick={toggleConfirmation}
                          >
                            {props.t("close")}
                          </Button>
                          <Button
                            variant="danger"
                            size="sm"
                            onClick={deleteFile}
                          >
                            {props.t("yes")}
                          </Button>
                        </Modal.Footer>
                      </Modal>
                    </td>
                  </tr>
                );
              })}
        </tbody>
      </Table>
      <Modal show={isEditModalOpen} onHide={toggleEditModal}>
        <Modal.Body>
          <Form
            onSubmit={(e) => {
              e.preventDefault();
              handleSave();
            }}
          >
            <Form.Group controlId="formBasicText">
              <Form.Label>{props.t("table.name.label")}</Form.Label>
              <Form.Control
                style={{ borderColor: isValidName ? null : "red" }}
                type="text"
                name="newName"
                value={newName}
                onChange={(e) => handleChange(e)}
              />
            </Form.Group>
          </Form>
        </Modal.Body>
        <Modal.Footer>
          <Button variant="secondary" size="sm" onClick={toggleEditModal}>
            {props.t("edit.close.button.label")}
          </Button>
          <Button
            variant="primary"
            size="sm"
            onClick={(e) => {
              handleSave();
              //toggleEditModal();
            }}
          >
            {props.t("edit.save.button.label")}
          </Button>
        </Modal.Footer>
      </Modal>

      <Modal show={isPreviewModalOpen} onHide={togglePreviewModal} size="xl">
        <Modal.Header closeButton>
          <Modal.Title>{props.t("gene.table")}</Modal.Title>
        </Modal.Header>
        <Modal.Body>
          <CsvToHtmlTable
            data={fileContent}
            csvDelimiter=","
            tableClassName="table table-striped table-hover table-responsive"
          />
        </Modal.Body>
      </Modal>
    </div>
  );
};

export default withTranslation()(FileTable);
