import React from "react";
import { Table, Button, Modal, Form } from "react-bootstrap";
import { unparse } from "papaparse";
import { CsvToHtmlTable } from "react-csv-to-table";

class FileTable extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      isEditModalOpen: false,
      isPreviewModalOpen: false,
      fileContent: "",
      previousName: "",
      newName: "",
    };
  }

  /********** PREVIEWING ****************/

  togglePreviewModal = (fileContent) => {
    if (!this.state.isPreviewModalOpen) {
      var content = unparse(fileContent);
      this.setState({
        isPreviewModalOpen: !this.state.isPreviewModalOpen,
        fileContent: content,
      });
    } else {
      this.setState({
        isPreviewModalOpen: !this.state.isPreviewModalOpen,
      });
    }
  };

  /********************************/

  /********** EDITING ****************/

  toggleEditModal = () => {
    this.setState({
      isEditModalOpen: !this.state.isEditModalOpen,
    });
  };

  handleChange = (e) => {
    this.setState({
      [e.target.name]: e.target.value,
    });
  };

  editFileName = (fileName) => {
    this.setState({
      isEditModalOpen: !this.state.isEditModalOpen,
      previousName: fileName,
    });
  };

  handleSave = () => {
    var handleStateUpdate = this.props.handleStateUpdate;
    // changing name in filtered files
    var newfilteredFiles = this.props.filteredFiles;
    let obj = newfilteredFiles.find(
      (file) => file.name === this.state.previousName
    );
    let index = newfilteredFiles.indexOf(obj);
    newfilteredFiles.fill((obj.name = this.state.newName), index, index++);
    this.setState({
      newName: "",
    });

    // changing name in non-filtered files
    var newfilteredFiles2 = this.props.nonFilteredFiles;
    let obj2 = newfilteredFiles2.find(
      (file) => file.name === this.state.previousName
    );
    let index2 = newfilteredFiles2.indexOf(obj2);
    newfilteredFiles2.fill((obj2.name = this.state.newName), index2, index2++);
    handleStateUpdate(newfilteredFiles, newfilteredFiles2);
    this.setState({
      newName: "",
    });
  };

  /********************************/

  /********** DELETING ****************/

  deleteFile = (fileName) => {
    var handleStateUpdate = this.props.handleStateUpdate;
    // deleting from filtered files
    var newfilteredFiles = this.props.filteredFiles;
    let obj = newfilteredFiles.find((file) => file.name === fileName);
    let index = newfilteredFiles.indexOf(obj);
    var deletedFileList = newfilteredFiles
      .slice(0, index)
      .concat(newfilteredFiles.slice(index + 1));

    // deleting from non-filtered files
    var newfilteredFiles2 = this.props.nonFilteredFiles;
    let obj2 = newfilteredFiles2.find((file) => file.name === fileName);
    let index2 = newfilteredFiles2.indexOf(obj2);
    var deletedFileList2 = newfilteredFiles2
      .slice(0, index2)
      .concat(newfilteredFiles2.slice(index2 + 1));
    handleStateUpdate(deletedFileList, deletedFileList2);
  };

  /********************************/

  render() {
    return (
      <div>
        <Table>
          <thead>
            <tr>
              <th style={{ width: "55%" }}>Dosya Adı</th>
              <th style={{ width: "5%" }}>Gen Sayısı</th>
              <th style={{ width: "40%" }}>
                Görüntüle | Yeniden Adlandır | Sil
              </th>
            </tr>
          </thead>

          <tbody>
            {this.props.filteredFiles.map((file, index) => {
              return (
                <tr key={index}>
                  <td>{file.name}</td>
                  <td>{file.content.length}</td>
                  <td>
                    <Button
                      className="shadow-none"
                      onClick={(e) => this.togglePreviewModal(file.content)}
                      variant="outline-success"
                      size="sm"
                      id="preview-btn"
                    >
                      <i className="eye icon" id="icons"></i>
                    </Button>
                    <Button
                      className="shadow-none"
                      onClick={(e) => this.editFileName(file.name, e)}
                      variant="outline-info"
                      size="sm"
                      id="edit-btn"
                    >
                      <i className="edit icon" id="icons"></i>
                    </Button>
                    <Button
                      className="shadow-none"
                      onClick={() => {
                        this.deleteFile(file.name);
                      }}
                      variant="outline-danger"
                      size="sm"
                      id="delete-btn"
                    >
                      <i className="x icon" id="icons"></i>
                    </Button>
                  </td>
                </tr>
              );
            })}
          </tbody>
        </Table>
        <Modal show={this.state.isEditModalOpen} onHide={this.toggleEditModal}>
          <Modal.Body>
            <Form>
              <Form.Group controlId="formBasicText">
                <Form.Label>File Name</Form.Label>
                <Form.Control
                  type="text"
                  name="newName"
                  value={this.state.newName}
                  onChange={(e) => this.handleChange(e)}
                />
              </Form.Group>
            </Form>
          </Modal.Body>
          <Modal.Footer>
            <Button
              variant="secondary"
              size="sm"
              onClick={this.toggleEditModal}
            >
              Close
            </Button>
            <Button
              variant="primary"
              size="sm"
              onClick={() => {
                this.handleSave();
                this.toggleEditModal();
              }}
            >
              Save
            </Button>
          </Modal.Footer>
        </Modal>

        <Modal
          show={this.state.isPreviewModalOpen}
          onHide={this.togglePreviewModal}
          size="xl"
        >
          <Modal.Body>
            <CsvToHtmlTable
              data={this.state.fileContent}
              csvDelimiter=","
              tableClassName="table table-striped table-hover table-responsive"
            />
          </Modal.Body>
        </Modal>
      </div>
    );
  }
}

export default FileTable;
