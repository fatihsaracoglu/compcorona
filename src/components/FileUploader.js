import React from "react";
import {
  Button,
  Modal,
  Alert,
  Form,
  Row,
  Col,
  Container,
  Table,
} from "react-bootstrap";
import Dropzone from "react-dropzone";
import { Link } from "react-router-dom";

import "./Dropzone.css";

class FileUploader extends React.Component {
  constructor() {
    super();
    this.onDrop = (files) => {
      files.map((file) => {
        this.setState({
          fileNames: [...this.state.fileNames, file.name],
        });
        return file;
      });
      this.setState({
        files: files,
      });
      //console.log(this.state.files);
      if (files.length > 0) {
        this.setState({
          isOpen: true,
        });
        setTimeout(() => {
          this.setState({
            isOpen: false,
          });
        }, 1000);
      } else if (files.length === 0) {
        this.setState({
          isOpenErrorModal: true,
        });
        setTimeout(() => {
          this.setState({
            isOpenErrorModal: false,
          });
        }, 1500);
      }
      //console.log(acceptedFiles);
      var contents = [];
      files.map(async (file) => {
        var content = await file.text();
        contents.push(content);
      });
      //console.log(contents);
      this.props.sendData(contents);
    };
    this.state = {
      files: [],
      fileNames: [],
      isOpen: false,
      isOpenErrorModal: false,
      isOpenEditModal: false,
      isEditMode: false,
      index: 0,
      text: "",
    };
  }

  deleteFile = (index) => {
    // make new rows. note: react state is immutable.
    const newFileList = this.state.fileNames
      .slice(0, index)
      .concat(this.state.fileNames.slice(index + 1));
    this.setState({
      fileNames: newFileList,
    });
  };

  editFileName = (index) => {
    this.setState({
      isOpenEditModal: !this.state.isOpenEditModal,
      index: index,
      text: this.state.files[index].name,
    });
  };

  handleChange = (e) => {
    this.setState({
      [e.target.name]: e.target.value,
    });
  };

  handleSave = () => {
    let fileNames = this.state.fileNames;
    // 2. Make a shallow copy of the item you want to mutate
    let file = fileNames[this.state.index];
    //console.log(file);
    // 3. Replace the property you're intested in
    file = this.state.text;
    // 4. Put it back into our array. N.B. we *are* mutating the array here, but that's why we made a copy first
    fileNames[this.state.index] = file;
    // 5. Set the state to our new copy
    this.setState({
      filesNames: fileNames,
    });
    //console.log(this.state.fileNames);
  };

  toggleEditModal = () => {
    this.setState({
      isOpenEditModal: !this.state.isOpenEditModal,
    });
  };

  render() {
    // const activeStyle = {
    //   borderColor: "#2196f3",
    // };

    // const acceptStyle = {
    //   borderColor: "#38a169",
    // };

    // const rejectStyle = {
    //   borderColor: "#ff1744",
    // };
    return (
      <div>
        <Container>
          <Row>
            <Col>
              <Dropzone
                onDrop={this.onDrop}
                accept="text/csv"
              >
                {({ getRootProps, getInputProps }) => (
                  <section className="container">
                    <div {...getRootProps({ className: "dropzone" })}>
                      <input {...getInputProps()} />
                      <div>
                        Drag and drop some files here, or click to select files
                      </div>
                    </div>
                  </section>
                )}
              </Dropzone>
              <div style={{ marginTop: "4%" }}>
                <Link to="diagram">
                  <Button
                    variant="outline-primary"
                    size="sm"
                    style={{ display: "inline-block" }}
                    disabled={this.state.fileNames.length === 0}
                  >
                    Proceed <i className="chevron right icon"></i>
                  </Button>
                </Link>
              </div>
            </Col>
            <Col>
              <div
                style={{
                  height: "295px",
                  overflow: "auto",
                  position: "relative",
                }}
              >
                <Table>
                  <thead>
                    <tr>
                      <th>File Name</th>
                      <th>Edit/Remove</th>
                    </tr>
                  </thead>

                  <tbody>
                    {this.state.fileNames.map((file, index) => {
                      return (
                        <tr key={index}>
                          <td>
                            {this.state.isEditMode ? (
                              <input
                                value={this.state.text}
                                onChange={(e) => this.handleChange(e)}
                                type="text"
                              />
                            ) : (
                              file
                            )}
                          </td>
                          <td>
                            <Button
                              onClick={(e) => this.editFileName(index, e)}
                              variant="warning"
                              size="sm"
                              style={{ float: "rigth", marginRight: "5%" }}
                            >
                              <i
                                className="edit icon"
                                style={{ margin: "0 auto" }}
                              ></i>
                            </Button>
                            <Button
                              onClick={() => {
                                this.deleteFile(index);
                              }}
                              variant="danger"
                              size="sm"
                              style={{ float: "rigth" }}
                            >
                              <i
                                className="x icon"
                                style={{ margin: "0 auto" }}
                              ></i>
                            </Button>
                          </td>
                        </tr>
                      );
                    })}
                  </tbody>
                </Table>
              </div>
            </Col>
          </Row>
        </Container>

        <Modal show={this.state.isOpen} onHide={this.closeModal}>
          <Modal.Body style={{ textAlign: "center" }}>
            <div>
              <i
                className="check circle outline icon"
                style={{
                  color: "#38a169",
                  fontSize: "80px",
                  paddingBottom: "8%",
                }}
              ></i>
            </div>
          </Modal.Body>
          <Alert
            variant="secondary"
            style={{ textAlign: "center", borderRadius: "0", marginTop: "3%" }}
          >
            Successfully uploaded!
          </Alert>
        </Modal>

        <Modal show={this.state.isOpenErrorModal} onHide={this.closeErrorModal}>
          <Modal.Body style={{ textAlign: "center" }}>
            <div>
              <i
                className="exclamation circle icon"
                style={{ color: "red", fontSize: "80px", paddingBottom: "8%" }}
              ></i>
            </div>
          </Modal.Body>
          <Alert
            variant="secondary"
            style={{ textAlign: "center", borderRadius: "0", marginTop: "3%" }}
          >
            You can upload only CSV files!
          </Alert>
        </Modal>

        <Modal show={this.state.isOpenEditModal} onHide={this.toggleEditModal}>
          <Modal.Body>
            <Form>
              <Form.Group controlId="formBasicText">
                <Form.Label>File Name</Form.Label>
                <Form.Control
                  type="text"
                  name="text"
                  value={this.state.text}
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
      </div>
    );
  }
}

export default FileUploader;
