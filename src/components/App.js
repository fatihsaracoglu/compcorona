import React from "react";
import Header from "./Header";
import FileUploader from "./FileUploader";
import { BrowserRouter, Route, Redirect } from "react-router-dom";
import VennDiagram from "./VennDiagram";

var data = [];

class App extends React.Component {
  getData = (value) => {
    console.log(value);
    data = value;
  };

  render() {
    return (
      <div>
        <BrowserRouter>
          <div className="container" style={{ textAlign: "center" }}>
            <Route path="/" exact>
              <Header />
              <FileUploader
                sendData={this.getData}
                style={{ marginBottom: "15%" }}
              />
            </Route>
          </div>
          <Route
            path="/diagram"
            exact
            render={(props) =>
              data.length === 0 ? (
                <Redirect to="/" />
              ) : (
                <VennDiagram {...props} data={data} />
              )
            }
          />
        </BrowserRouter>
      </div>
    );
  }
}

export default App;
