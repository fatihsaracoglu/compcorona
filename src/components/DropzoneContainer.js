import React from "react";
import Dropzone from "react-dropzone";
import { parse } from "papaparse";
import { Button, Modal, Alert } from "react-bootstrap";
import DragAndDropIcon from '../assets/drag-drop-icon.jpg';

class DropzoneContainer extends React.Component {
  constructor() {
    super();
    this.state = {
      isMaxLimitErrorModalOpen: false,
      isErrorModalOpen: false,
    };
  }

  // When files are dragged or selected, this function will be called. It takes uploaded files
  // and check their count. If the count is not greater than 3, it will read files and show a model
  // to allow user to make filtering on files.
  onDrop = async (files) => {
    if (files.length > 3 || this.props.nonFilteredFiles.length === 3) {
      this.setState({
        isMaxLimitErrorModalOpen: true,
      });
      setTimeout(() => {
        this.setState({
          isMaxLimitErrorModalOpen: false,
        });
      }, 2000);
    } else {
      var allowedFiles = [];
      files.forEach((file) => {
        if (file.type !== "text/csv") {
          this.setState({
            isErrorModalOpen: true,
          });
        } else {
          allowedFiles.push(file);
        }
      });
      if (allowedFiles.length > 0) {
        this.readFiles(allowedFiles);
      }
    }
  };

  // It gets files argument from onDrag() method and traverse them to parse into rows.
  // It will set the nonFilteredFiles as: [{name, content}, {name, content}, ...].
  // The objects in the array are non-filtered files.
  readFiles = (files) => {
    var handleStateUpdateForDropzone = this.props.handleStateUpdateForDropzone;
    // for accessing state
    const self = this;
    files.map((file) => {
      var rows = [];
      var reader = new FileReader();
      reader.readAsText(file);
      reader.onload = (e) => {
        var content = e.target.result;
        var parsedCSV = parse(content, {
          header: true,
        });
        parsedCSV.data.forEach((row) => {
          rows.push(row);
        });
      };
      var fileObj = {};
      fileObj["name"] = file.name;
      fileObj["content"] = rows;
      handleStateUpdateForDropzone(
        [...self.props.nonFilteredFiles, fileObj],
        true
      );
      return true;
    });
  };

  /******** ERROR MODAL ***********/

  toggleErrorModal = () => {
    this.setState({
      isErrorModalOpen: !this.state.isErrorModalOpen,
    });
  };

  /********************************/

  render() {
    return (
      <div>
        <Dropzone onDrop={this.onDrop}>
          {({ getRootProps, getInputProps }) => (
            <section className="container">
              <div
                {...getRootProps({
                  className: "dropzone",
                })}
              >
                <input {...getInputProps()} />
                <img alt="file-uploader-icon" id="drag-drop-icon" src={DragAndDropIcon}></img>
                <div>
                  Dosyaları sürükleyip bırakın, ya da seçmek için tıklayın
                </div>
              </div>
            </section>
          )}
        </Dropzone>
        <Modal show={this.state.isMaxLimitErrorModalOpen}>
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
            En fazla 3 adet dosya yükleyebilirsiniz!
          </Alert>
        </Modal>
        <Modal
          show={this.state.isErrorModalOpen}
          onHide={this.toggleErrorModal}
        >
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
              You can upload only CSV files!
              <br />
              Some of files cannot be uploaded...
            </Alert>
            <Button
              variant="secondary"
              size="sm"
              onClick={this.toggleErrorModal}
            >
              OK
            </Button>
          </Modal.Body>
        </Modal>
      </div>
    );
  }
}

export default DropzoneContainer;
