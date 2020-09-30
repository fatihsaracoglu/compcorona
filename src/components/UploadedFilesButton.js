import React from "react";
import { Button, Modal, Table } from "react-bootstrap";
import EditButton from "./EditButton";

class UploadedFilesButton extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      show: false,
    };
  }

  handleToggle = () => {
    this.setState({
      show: !this.state.show,
    });
  };

  render() {
    return (
      <>
        <Button
          variant="outline-primary"
          size="sm"
          style={{ display: "inline-block", marginRight: "3%" }}
          onClick={this.handleToggle}
        >
          Uploaded Files
        </Button>

        <Modal show={this.state.show} onHide={this.handleToggle}>
          <Modal.Header closeButton>
            <Modal.Title>Uploaded Files</Modal.Title>
          </Modal.Header>
          <Modal.Body>
            <Table responsive="sm">
              <tbody>
                {this.props.fileNames.map((file, index) => {
                  return (
                    <tr key={index}>
                      <td>{file.path}</td>
                      <td>{file.size.toLocaleString() + " KB"}</td>
                      <td style={{ textAlign: "right" }}>
                        <EditButton></EditButton>
                      </td>
                    </tr>
                  );
                })}
              </tbody>
            </Table>
          </Modal.Body>
          <Modal.Footer>
            <Button variant="secondary" size="sm" onClick={this.handleToggle}>
              Close
            </Button>
          </Modal.Footer>
        </Modal>
      </>
    );
  }
}

export default UploadedFilesButton;
